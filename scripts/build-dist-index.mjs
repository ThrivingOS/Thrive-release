import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const generatedAt = process.env.THRIVE_REGISTRY_GENERATED_AT || '1970-01-01T00:00:00.000Z';

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function writeJson(relativePath, value) {
  const fullPath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, `${JSON.stringify(value, null, 2)}\n`);
}

const plugins = readJson('registry/community-plugins.json');
const themes = readJson('registry/community-themes.json');
const desktopReleases = readJson('registry/desktop-releases.json');

const pluginsIndex = {
  schemaVersion: 1,
  generatedAt,
  plugins,
};

const themesIndex = {
  schemaVersion: 1,
  generatedAt,
  themes,
};

const desktopReleasesIndex = {
  schemaVersion: 1,
  generatedAt,
  releases: desktopReleases,
};

const marketplaceIndex = {
  schemaVersion: 1,
  generatedAt,
  plugins,
  themes,
  desktopReleases,
};

writeJson('dist/plugins.v1.json', pluginsIndex);
writeJson('dist/themes.v1.json', themesIndex);
writeJson('dist/desktop-releases.v1.json', desktopReleasesIndex);
writeJson('dist/marketplace.v1.json', marketplaceIndex);

console.log(`Generated marketplace indexes at ${generatedAt}.`);
