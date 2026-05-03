import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();

const registryFiles = {
  plugins: 'registry/community-plugins.json',
  removedPlugins: 'registry/community-plugins-removed.json',
  deprecatedPlugins: 'registry/community-plugin-deprecation.json',
  themes: 'registry/community-themes.json',
  removedThemes: 'registry/community-themes-removed.json',
  desktopReleases: 'registry/desktop-releases.json',
};

const allowedPluginCategories = new Set([
  'ai',
  'writing',
  'knowledge',
  'media',
  'download',
  'export',
  'automation',
  'connector',
  'home',
  'utility',
]);

const allowedReviewTiers = new Set(['official', 'verified', 'community']);
const allowedThemeModes = new Set(['light', 'dark']);

const allowedPluginPermissions = new Set([
  'ai.skill',
  'mcp.server',
  'app.connector',
  'knowledge.read',
  'knowledge.import',
  'assets.read',
  'subjects.read',
  'manuscripts.read',
  'manuscripts.write.current',
  'editor.read.current',
  'editor.write.current',
  'media.read',
  'media.import',
  'media.process',
  'video.exportPreset',
  'video.effectPreset',
  'subtitle.stylePreset',
  'audio.processor',
  'cover.template',
  'export.create',
  'network.request.scoped',
  'pluginData.read',
  'pluginData.write',
  'ui.home',
  'ui.settingsPanel',
  'ui.manuscriptSidebar',
  'ui.videoInspectorPanel',
]);

function readJsonArray(relativePath) {
  const fullPath = path.join(root, relativePath);
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  } catch (error) {
    throw new Error(`${relativePath}: invalid JSON: ${error.message}`);
  }
  if (!Array.isArray(parsed)) {
    throw new Error(`${relativePath}: expected a JSON array`);
  }
  return parsed;
}

function assertString(value, field, options = {}) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${field}: expected a non-empty string`);
  }
  if (options.max && value.length > options.max) {
    throw new Error(`${field}: must be at most ${options.max} chars`);
  }
  if (options.pattern && !options.pattern.test(value)) {
    throw new Error(`${field}: invalid format`);
  }
}

function assertUnique(items, field, label) {
  const seen = new Set();
  for (const item of items) {
    const value = item[field];
    if (seen.has(value)) {
      throw new Error(`${label}: duplicate ${field} "${value}"`);
    }
    seen.add(value);
  }
}

function assertNoUnknownKeys(item, allowedKeys, label) {
  for (const key of Object.keys(item)) {
    if (!allowedKeys.has(key)) {
      throw new Error(`${label}: unknown key "${key}"`);
    }
  }
}

function validatePlugins(plugins) {
  assertUnique(plugins, 'id', 'community-plugins');
  const allowedKeys = new Set([
    'id',
    'name',
    'displayName',
    'author',
    'description',
    'repo',
    'category',
    'tags',
    'permissions',
    'reviewTier',
    'minAppVersion',
    'homepage',
    'fundingUrl',
    'packageUrl',
    'sha256',
  ]);
  for (const plugin of plugins) {
    const label = `plugin ${plugin.id || '<missing id>'}`;
    assertNoUnknownKeys(plugin, allowedKeys, label);
    assertString(plugin.id, `${label}.id`, { pattern: /^[A-Za-z0-9_-]+$/ });
    assertString(plugin.name, `${label}.name`, { max: 80 });
    if (plugin.displayName != null) assertString(plugin.displayName, `${label}.displayName`, { max: 80 });
    assertString(plugin.author, `${label}.author`, { max: 80 });
    assertString(plugin.description, `${label}.description`, { max: 220 });
    assertString(plugin.repo, `${label}.repo`, { pattern: /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/ });
    if (!allowedPluginCategories.has(plugin.category)) {
      throw new Error(`${label}.category: unsupported category "${plugin.category}"`);
    }
    if (!allowedReviewTiers.has(plugin.reviewTier)) {
      throw new Error(`${label}.reviewTier: unsupported tier "${plugin.reviewTier}"`);
    }
    if (!Array.isArray(plugin.permissions)) {
      throw new Error(`${label}.permissions: expected array`);
    }
    for (const permission of plugin.permissions) {
      if (!allowedPluginPermissions.has(permission)) {
        throw new Error(`${label}.permissions: unsupported permission "${permission}"`);
      }
    }
    if (plugin.tags != null) {
      if (!Array.isArray(plugin.tags)) throw new Error(`${label}.tags: expected array`);
      if (new Set(plugin.tags).size !== plugin.tags.length) throw new Error(`${label}.tags: duplicate tag`);
      for (const tag of plugin.tags) assertString(tag, `${label}.tags`, { pattern: /^[A-Za-z0-9_-]+$/ });
    }
    if (plugin.sha256 != null) assertString(plugin.sha256, `${label}.sha256`, { pattern: /^[a-fA-F0-9]{64}$/ });
  }
}

function validateThemes(themes) {
  assertUnique(themes, 'id', 'community-themes');
  const allowedKeys = new Set([
    'id',
    'name',
    'author',
    'description',
    'repo',
    'modes',
    'screenshots',
    'reviewTier',
    'minAppVersion',
    'homepage',
    'packageUrl',
    'sha256',
  ]);
  for (const theme of themes) {
    const label = `theme ${theme.id || '<missing id>'}`;
    assertNoUnknownKeys(theme, allowedKeys, label);
    assertString(theme.id, `${label}.id`, { pattern: /^[A-Za-z0-9_-]+$/ });
    assertString(theme.name, `${label}.name`, { max: 80 });
    assertString(theme.author, `${label}.author`, { max: 80 });
    assertString(theme.description, `${label}.description`, { max: 220 });
    assertString(theme.repo, `${label}.repo`, { pattern: /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/ });
    if (!allowedReviewTiers.has(theme.reviewTier)) {
      throw new Error(`${label}.reviewTier: unsupported tier "${theme.reviewTier}"`);
    }
    if (!Array.isArray(theme.modes) || theme.modes.length === 0) {
      throw new Error(`${label}.modes: expected non-empty array`);
    }
    for (const mode of theme.modes) {
      if (!allowedThemeModes.has(mode)) throw new Error(`${label}.modes: unsupported mode "${mode}"`);
    }
    if (theme.screenshots != null && !Array.isArray(theme.screenshots)) {
      throw new Error(`${label}.screenshots: expected array`);
    }
    if (theme.sha256 != null) assertString(theme.sha256, `${label}.sha256`, { pattern: /^[a-fA-F0-9]{64}$/ });
  }
}

function validateDesktopReleases(releases) {
  assertUnique(releases, 'version', 'desktop-releases');
  for (const release of releases) {
    const label = `desktop release ${release.version || '<missing version>'}`;
    assertString(release.version, `${label}.version`);
    assertString(release.releasedAt, `${label}.releasedAt`);
    assertString(release.notes, `${label}.notes`);
    if (!release.assets || typeof release.assets !== 'object' || Array.isArray(release.assets)) {
      throw new Error(`${label}.assets: expected object`);
    }
    if (release.sha256 != null && (typeof release.sha256 !== 'object' || Array.isArray(release.sha256))) {
      throw new Error(`${label}.sha256: expected object`);
    }
  }
}

const plugins = readJsonArray(registryFiles.plugins);
const removedPlugins = readJsonArray(registryFiles.removedPlugins);
const deprecatedPlugins = readJsonArray(registryFiles.deprecatedPlugins);
const themes = readJsonArray(registryFiles.themes);
const removedThemes = readJsonArray(registryFiles.removedThemes);
const desktopReleases = readJsonArray(registryFiles.desktopReleases);

validatePlugins(plugins);
validateThemes(themes);
validateDesktopReleases(desktopReleases);

assertUnique(removedPlugins, 'id', 'community-plugins-removed');
assertUnique(deprecatedPlugins, 'id', 'community-plugin-deprecation');
assertUnique(removedThemes, 'id', 'community-themes-removed');

console.log('Registry validation passed.');
