import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();

const files = {
  plugins: 'community-plugins.json',
  removedPlugins: 'community-plugins-removed.json',
  deprecatedPlugins: 'community-plugin-deprecation.json',
  skills: 'community-skills.json',
  removedSkills: 'community-skills-removed.json',
  deprecatedSkills: 'community-skill-deprecation.json',
  themes: 'community-css-themes.json',
  removedThemes: 'community-css-themes-removed.json',
  desktopReleases: 'desktop-releases.json',
};

function readJsonArray(relativePath) {
  const filePath = path.join(root, relativePath);
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
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

function assertNoUnknownKeys(item, allowedKeys, label) {
  for (const key of Object.keys(item)) {
    if (!allowedKeys.has(key)) {
      throw new Error(`${label}: unknown key "${key}"`);
    }
  }
}

function assertUnique(items, field, label) {
  const seen = new Set();
  for (const item of items) {
    const value = item[field];
    if (value == null) continue;
    if (seen.has(value)) {
      throw new Error(`${label}: duplicate ${field} "${value}"`);
    }
    seen.add(value);
  }
}

function validatePlugins(plugins) {
  const allowedKeys = new Set(['id', 'name', 'author', 'description', 'repo']);
  for (const plugin of plugins) {
    const label = `plugin ${plugin.id || '<missing id>'}`;
    assertNoUnknownKeys(plugin, allowedKeys, label);
    assertString(plugin.id, `${label}.id`, { pattern: /^[a-z0-9-_]+$/ });
    assertString(plugin.name, `${label}.name`, { max: 80 });
    assertString(plugin.author, `${label}.author`, { max: 80 });
    assertString(plugin.description, `${label}.description`, { max: 250 });
    assertString(plugin.repo, `${label}.repo`, { pattern: /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/ });
    if (!/[.?!)。？！）]$/.test(plugin.description)) {
      throw new Error(`${label}.description: should end with one of . ? ! ) 。 ？ ！ ）`);
    }
  }
  assertUnique(plugins, 'id', files.plugins);
  assertUnique(plugins, 'name', files.plugins);
  assertUnique(plugins, 'repo', files.plugins);
}

function validateSkills(skills) {
  const allowedKeys = new Set(['id', 'name', 'author', 'description', 'repo']);
  for (const skill of skills) {
    const label = `skill ${skill.id || '<missing id>'}`;
    assertNoUnknownKeys(skill, allowedKeys, label);
    assertString(skill.id, `${label}.id`, { pattern: /^[a-z0-9-]+$/ });
    assertString(skill.name, `${label}.name`, { max: 80 });
    assertString(skill.author, `${label}.author`, { max: 80 });
    assertString(skill.description, `${label}.description`, { max: 250 });
    assertString(skill.repo, `${label}.repo`, { pattern: /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/ });
    if (!/[.?!)。？！）]$/.test(skill.description)) {
      throw new Error(`${label}.description: should end with one of . ? ! ) 。 ？ ！ ）`);
    }
  }
  assertUnique(skills, 'id', files.skills);
  assertUnique(skills, 'name', files.skills);
  assertUnique(skills, 'repo', files.skills);
}

function validateThemes(themes) {
  const allowedKeys = new Set(['name', 'author', 'repo', 'screenshot', 'modes', 'publish', 'legacy']);
  for (const theme of themes) {
    const label = `theme ${theme.name || '<missing name>'}`;
    assertNoUnknownKeys(theme, allowedKeys, label);
    assertString(theme.name, `${label}.name`, { max: 80, pattern: /^[A-Za-z0-9_\- ]+$/ });
    assertString(theme.author, `${label}.author`, { max: 80 });
    assertString(theme.repo, `${label}.repo`, { pattern: /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/ });
    assertString(theme.screenshot, `${label}.screenshot`, { max: 160 });
    if (!Array.isArray(theme.modes) || theme.modes.length === 0) {
      throw new Error(`${label}.modes: expected non-empty array`);
    }
    for (const mode of theme.modes) {
      if (mode !== 'dark' && mode !== 'light') {
        throw new Error(`${label}.modes: unsupported mode "${mode}"`);
      }
    }
    if (theme.publish != null && typeof theme.publish !== 'boolean') {
      throw new Error(`${label}.publish: expected boolean`);
    }
    if (theme.legacy != null && typeof theme.legacy !== 'boolean') {
      throw new Error(`${label}.legacy: expected boolean`);
    }
  }
  assertUnique(themes, 'name', files.themes);
  assertUnique(themes, 'repo', files.themes);
}

function validateDesktopReleases(releases) {
  for (const release of releases) {
    const label = `desktop release ${release.version || '<missing version>'}`;
    assertString(release.version, `${label}.version`);
    assertString(release.releasedAt, `${label}.releasedAt`);
    assertString(release.notes, `${label}.notes`);
    if (!release.assets || typeof release.assets !== 'object' || Array.isArray(release.assets)) {
      throw new Error(`${label}.assets: expected object`);
    }
  }
  assertUnique(releases, 'version', files.desktopReleases);
}

const plugins = readJsonArray(files.plugins);
const removedPlugins = readJsonArray(files.removedPlugins);
const deprecatedPlugins = readJsonArray(files.deprecatedPlugins);
const skills = readJsonArray(files.skills);
const removedSkills = readJsonArray(files.removedSkills);
const deprecatedSkills = readJsonArray(files.deprecatedSkills);
const themes = readJsonArray(files.themes);
const removedThemes = readJsonArray(files.removedThemes);
const desktopReleases = readJsonArray(files.desktopReleases);

validatePlugins(plugins);
validateSkills(skills);
validateThemes(themes);
validateDesktopReleases(desktopReleases);
assertUnique(removedPlugins, 'id', files.removedPlugins);
assertUnique(deprecatedPlugins, 'id', files.deprecatedPlugins);
assertUnique(removedSkills, 'id', files.removedSkills);
assertUnique(deprecatedSkills, 'id', files.deprecatedSkills);
assertUnique(removedThemes, 'name', files.removedThemes);

console.log('Registry validation passed.');
