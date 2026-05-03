import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import process from 'node:process';

const baseRef = process.env.GITHUB_BASE_REF || process.env.THRIVE_PR_BASE_REF || 'origin/main';
const base = baseRef.startsWith('origin/') ? baseRef : `origin/${baseRef}`;

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

function readJsonFromHead(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function readJsonFromBase(filePath) {
  const raw = git(['show', `${base}:${filePath}`]);
  return JSON.parse(raw);
}

function byId(items) {
  return new Map(items.map((item) => [item.id, item]));
}

function changedEntryIds(baseItems, headItems) {
  const before = byId(baseItems);
  const after = byId(headItems);
  const ids = new Set([...before.keys(), ...after.keys()]);
  const changed = [];
  for (const id of ids) {
    const left = before.has(id) ? JSON.stringify(before.get(id)) : null;
    const right = after.has(id) ? JSON.stringify(after.get(id)) : null;
    if (left !== right) changed.push(id);
  }
  return changed;
}

function validateSingleRegistryChange(filePath, label) {
  const before = readJsonFromBase(filePath);
  const after = readJsonFromHead(filePath);
  const changed = changedEntryIds(before, after);
  if (changed.length > 1) {
    throw new Error(`${label}: one PR may change only one entry. Changed: ${changed.join(', ')}`);
  }
  return changed;
}

const changedFiles = git(['diff', '--name-only', `${base}...HEAD`])
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean);

if (changedFiles.length === 0) {
  console.log('No PR changes detected.');
  process.exit(0);
}

const pluginRegistryChanged = changedFiles.includes('registry/community-plugins.json');
const themeRegistryChanged = changedFiles.includes('registry/community-themes.json');
const desktopReleaseChanged = changedFiles.includes('registry/desktop-releases.json');

const registryChangeCount = [pluginRegistryChanged, themeRegistryChanged, desktopReleaseChanged].filter(Boolean).length;

if (registryChangeCount > 1) {
  throw new Error('A PR may change only one registry type: plugin, theme, or desktop release.');
}

if (pluginRegistryChanged) {
  validateSingleRegistryChange('registry/community-plugins.json', 'Plugin registry');
}

if (themeRegistryChanged) {
  validateSingleRegistryChange('registry/community-themes.json', 'Theme registry');
}

if (desktopReleaseChanged) {
  validateSingleRegistryChange('registry/desktop-releases.json', 'Desktop release registry');
}

const generatedDistChanged = changedFiles.some((file) => file.startsWith('dist/') && file.endsWith('.json'));
if (registryChangeCount > 0 && !generatedDistChanged) {
  throw new Error('Registry changes must include rebuilt dist/*.json files. Run npm run build:dist.');
}

console.log('PR shape validation passed.');
