import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const skillContent = fs.readFileSync(path.join(root, 'SKILL.md'), 'utf8');

function parseFrontmatter(content) {
  if (!content.startsWith('---\n')) return {};
  const end = content.indexOf('\n---', 4);
  if (end === -1) return {};
  const fields = {};
  for (const line of content.slice(4, end).trim().split('\n')) {
    const match = line.trim().match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    fields[match[1]] = String(match[2] || '').replace(/^['"]|['"]$/g, '').trim();
  }
  return fields;
}

const skillName = parseFrontmatter(skillContent).name;
if (!/^[a-z0-9-]+$/.test(skillName || '')) {
  throw new Error('SKILL.md frontmatter must include name.');
}

const packageName = `${skillName}.thriveskill`;
const distDir = path.join(root, 'dist');
const stagingDir = path.join(distDir, skillName);
const outputPath = path.join(distDir, packageName);

fs.rmSync(stagingDir, { recursive: true, force: true });
fs.mkdirSync(stagingDir, { recursive: true });
if (fs.existsSync(outputPath)) fs.rmSync(outputPath);

const includes = [
  'SKILL.md',
  'README.md',
  'references',
  'scripts',
  'assets',
];

for (const item of includes) {
  const source = path.join(root, item);
  if (!fs.existsSync(source)) continue;
  fs.cpSync(source, path.join(stagingDir, item), { recursive: true });
}

execFileSync('zip', ['-r', outputPath, skillName], {
  cwd: distDir,
  stdio: 'inherit',
});

fs.rmSync(stagingDir, { recursive: true, force: true });
console.log(`Created ${path.relative(root, outputPath)}`);
