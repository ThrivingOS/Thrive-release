import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const manifestPath = path.join(root, '.thrive-plugin/plugin.json');

function fail(message) {
  console.error(message);
  process.exit(1);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    fail(`Invalid JSON at ${path.relative(root, filePath)}: ${error.message}`);
  }
}

function validateRelativePath(field, value) {
  if (value == null || value === '') return;
  if (typeof value !== 'string' || !value.startsWith('./')) {
    fail(`${field} must start with ./`);
  }
  if (value.includes('..')) {
    fail(`${field} must not contain ..`);
  }
  const resolved = path.resolve(root, value);
  if (!resolved.startsWith(root)) {
    fail(`${field} must stay inside the plugin root`);
  }
  if (!fs.existsSync(resolved)) {
    fail(`${field} path does not exist: ${value}`);
  }
}

if (!fs.existsSync(manifestPath)) {
  fail('Missing .thrive-plugin/plugin.json');
}

const manifest = readJson(manifestPath);

if (!/^[A-Za-z0-9_-]+$/.test(manifest.name || '')) {
  fail('manifest.name must use only letters, digits, _ and -');
}

if (!manifest.version || typeof manifest.version !== 'string') {
  fail('manifest.version is required');
}

validateRelativePath('skills', manifest.skills);
validateRelativePath('mcpServers', manifest.mcpServers);
validateRelativePath('actions', manifest.actions);
validateRelativePath('media', manifest.media);

for (const value of Object.values(manifest.ui || {})) {
  validateRelativePath('ui slot', value);
}

if (!manifest.permissions || !Array.isArray(manifest.permissions.capabilities)) {
  fail('manifest.permissions.capabilities must be an array');
}

console.log('Plugin template validation passed.');
