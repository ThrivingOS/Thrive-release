import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(root, '.thrive-plugin/plugin.json'), 'utf8'));
const packageName = `${manifest.name}-${manifest.version}.thriveplugin`;
const distDir = path.join(root, 'dist');
const outputPath = path.join(distDir, packageName);

fs.mkdirSync(distDir, { recursive: true });
if (fs.existsSync(outputPath)) fs.rmSync(outputPath);

const includes = [
  '.thrive-plugin',
  'skills',
  'mcp.json',
  'src',
  'README.md',
  'package.json',
];

const existingIncludes = includes.filter((item) => fs.existsSync(path.join(root, item)));
execFileSync('zip', ['-r', outputPath, ...existingIncludes], {
  cwd: root,
  stdio: 'inherit',
});

console.log(`Created ${path.relative(root, outputPath)}`);
