#!/usr/bin/env node
// Validate human-readable zh-TW companions without changing the runtime skill entry point.
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'yaml';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFileSync(join(root, path), 'utf8');
const companion = (path) => path === 'README.md' ? 'README.zh-tw.md' : path.replace(/\.md$/, '.zh-TW.md');
const skill = 'skills/taste-skill';
const sources = ['README.md', 'CHANGELOG.md', 'examples/v2/CREDITS.md',
  `${skill}/README.md`, `${skill}/SKILL.md`,
  ...readdirSync(join(root, skill, 'references')).filter((p) => p.endsWith('.md') && !p.includes('.zh-'))
    .map((p) => `${skill}/references/${p}`)];
const fences = (text) => text.match(/```[^\n]*\n[\s\S]*?```/g) || [];
const prose = (text) => text.replace(/```[^\n]*\n[\s\S]*?```/g, '').replace(/`[^`\n]+`/g, '');
const numberedSections = (text) => [...text.matchAll(/^#{2,3} (\d+(?:\.\d+)*)(?:\.|\s)/gm)].map((m) => m[1]);
const links = (text) => [...text.matchAll(/\]\(([^)]+)\)|(?:href|src|srcset)="([^"]+)"/g)]
  .map((m) => m[1] || m[2]);
const forbidden = /嘅|喺|唔|咗|呢個|嗰|佢哋|反濫觴|飛行前檢查/;
let blocks = 0;
for (const source of sources) {
  const target = companion(source);
  assert.ok(existsSync(join(root, target)), `Missing ${target}`);
  const original = read(source), translated = read(target);
  assert.deepEqual(fences(translated), fences(original), `Code blocks differ: ${target}`);
  blocks += fences(original).length;
  assert.deepEqual(numberedSections(translated), numberedSections(original), `Sections differ: ${target}`);
  assert.ok(!forbidden.test(prose(translated)), `Register violation: ${target}`);
  for (const dest of links(prose(translated))) {
    if (/^(?:https?:|mailto:|#)/.test(dest)) continue;
    assert.ok(existsSync(resolve(root, dirname(target), dest.split('#')[0])), `Broken link ${target}: ${dest}`);
  }
}
// Every installed skill needs a companion, not just the current default.
for (const dir of readdirSync(join(root, 'skills'), { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const source = `skills/${dir.name}/SKILL.md`;
  if (!existsSync(join(root, source))) continue;
  const target = companion(source);
  const original = read(source), translated = read(target);
  assert.equal(translated.match(/^name:.*$/m)?.[0], original.match(/^name:.*$/m)?.[0], `Name changed: ${target}`);
  const frontmatter = translated.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(frontmatter, `Missing frontmatter: ${target}`);
  const doc = parseDocument(frontmatter[1], { strict: true, uniqueKeys: true });
  assert.equal(doc.errors.length, 0, `Invalid YAML: ${target}`);
  assert.equal(doc.warnings.length, 0, `YAML warnings: ${target}`);
  assert.ok(doc.toJS().description.length > 0 && doc.toJS().description.length <= 1024);
}
for (const target of ['skills/SKILL-ROUTING.zh-tw.md']) {
  assert.ok(!forbidden.test(prose(read(target))), `Register violation: ${target}`);
  for (const dest of links(prose(read(target)))) {
    if (/^(?:https?:|mailto:|#)/.test(dest)) continue;
    assert.ok(existsSync(resolve(root, dirname(target), dest.split('#')[0])), `Broken link ${target}: ${dest}`);
  }
}
assert.ok(read('README.md').includes('[繁體中文](README.zh-tw.md)'));
console.log(`ok - ${sources.length} translated documents, ${blocks} unchanged code blocks, names, YAML, sections, register and local links`);
