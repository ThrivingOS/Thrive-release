import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import process from 'node:process';

const baseRef = process.env.GITHUB_BASE_REF || process.env.THRIVE_PR_BASE_REF || 'origin/main';
const base = baseRef.startsWith('origin/') || baseRef === 'HEAD' || /^[0-9a-f]{7,40}$/i.test(baseRef)
  ? baseRef
  : `origin/${baseRef}`;

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

function readJsonFromHead(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function readJsonFromBase(filePath) {
  try {
    return JSON.parse(git(['show', `${base}:${filePath}`]));
  } catch {
    return [];
  }
}

function keyFor(filePath, item) {
  if (filePath === 'community-css-themes.json') return item.name;
  if (filePath === 'desktop-releases.json') return item.version;
  return item.id;
}

function changedEntryKeys(filePath) {
  const before = readJsonFromBase(filePath);
  const after = readJsonFromHead(filePath);
  const beforeMap = new Map(before.map((item) => [keyFor(filePath, item), item]));
  const afterMap = new Map(after.map((item) => [keyFor(filePath, item), item]));
  const keys = new Set([...beforeMap.keys(), ...afterMap.keys()]);
  const changed = [];
  for (const key of keys) {
    const left = beforeMap.has(key) ? JSON.stringify(beforeMap.get(key)) : null;
    const right = afterMap.has(key) ? JSON.stringify(afterMap.get(key)) : null;
    if (left !== right) changed.push(key);
  }
  return changed;
}

function ensureAppended(filePath, changedKey) {
  const after = readJsonFromHead(filePath);
  const last = after[after.length - 1];
  if (keyFor(filePath, last) !== changedKey) {
    throw new Error(`${filePath}: new submissions must be appended to the end of the list.`);
  }
}

const changedFiles = git(['diff', '--name-only', `${base}...HEAD`])
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean);

if (changedFiles.length === 0) {
  console.log('No PR changes detected.');
  process.exit(0);
}

const submissionFiles = [
  'community-plugins.json',
  'community-skills.json',
  'community-css-themes.json',
  'desktop-releases.json',
];
const changedSubmissionFiles = submissionFiles.filter((file) => changedFiles.includes(file));

if (changedSubmissionFiles.length > 1) {
  throw new Error('A submission PR may change only one registry file.');
}

if (changedSubmissionFiles.length === 1) {
  const filePath = changedSubmissionFiles[0];
  const changed = changedEntryKeys(filePath);
  if (changed.length > 1) {
    throw new Error(`${filePath}: one PR may change only one entry. Changed: ${changed.join(', ')}`);
  }
  if (changed.length === 1) {
    const before = readJsonFromBase(filePath);
    const after = readJsonFromHead(filePath);
    if (after.length > before.length) {
      ensureAppended(filePath, changed[0]);
    }
  }
}

console.log('PR shape validation passed.');
