import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const skillPath = path.join(root, 'SKILL.md');

function fail(message) {
  console.error(message);
  process.exit(1);
}

function parseFrontmatter(content) {
  if (!content.startsWith('---\n')) {
    fail('SKILL.md must start with YAML frontmatter.');
  }
  const end = content.indexOf('\n---', 4);
  if (end === -1) {
    fail('SKILL.md frontmatter is not closed.');
  }
  const raw = content.slice(4, end).trim();
  const fields = {};
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    fields[match[1]] = match[2].trim();
  }
  return fields;
}

function unquote(value) {
  return String(value || '').replace(/^['"]|['"]$/g, '').trim();
}

function assertSafePath(relativePath) {
  if (relativePath.includes('..')) {
    fail(`Unsafe path in template: ${relativePath}`);
  }
  const resolved = path.resolve(root, relativePath);
  if (!resolved.startsWith(root)) {
    fail(`Path escapes template root: ${relativePath}`);
  }
}

if (!fs.existsSync(skillPath)) {
  fail('Missing SKILL.md');
}

const content = fs.readFileSync(skillPath, 'utf8');
const frontmatter = parseFrontmatter(content);
const name = unquote(frontmatter.name);
const description = unquote(frontmatter.description);

if (!/^[a-z0-9-]{1,64}$/.test(name)) {
  fail('SKILL.md name must use lowercase letters, digits, and hyphens only.');
}

if (!description || description.length > 250) {
  fail('SKILL.md description must be non-empty and at most 250 characters.');
}

for (const directory of ['references', 'scripts', 'assets']) {
  const dirPath = path.join(root, directory);
  if (!fs.existsSync(dirPath)) continue;
  for (const item of fs.readdirSync(dirPath, { recursive: true })) {
    assertSafePath(path.join(directory, item.toString()));
    const fullPath = path.join(dirPath, item.toString());
    if (fs.lstatSync(fullPath).isSymbolicLink()) {
      fail(`Symlinks are not allowed: ${path.relative(root, fullPath)}`);
    }
  }
}

console.log('Skill template validation passed.');
