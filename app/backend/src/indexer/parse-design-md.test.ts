import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

process.env.CONTENT_ROOT = process.env.CONTENT_ROOT ?? '/home/sio/Code/Interview';
process.env.DB_PATH = process.env.DB_PATH ?? '/tmp/interview-test-design-content.db';

const { DESIGN_DIR } = await import('../config/paths.js');
const { DESIGN_CATEGORIES } = await import('./taxonomy.js');
const { listDesignFiles, parseDesignFile } = await import('./parse-design-md.js');

/** Quality gate over the real design bank in Data/Problems/Design. */
describe('design content (real files)', { skip: !fs.existsSync(DESIGN_DIR) }, () => {
  const files = listDesignFiles(DESIGN_DIR);
  const problems = files.map(f => ({ file: path.relative(DESIGN_DIR, f), p: parseDesignFile(f), raw: fs.readFileSync(f, 'utf-8') }));

  it('has problems in every category', () => {
    for (const c of DESIGN_CATEGORIES) {
      assert.ok(problems.some(x => x.p.category === c.id), `no problems in ${c.label}`);
    }
  });

  it('every file has a matching folder/category, valid header and the common sections', () => {
    for (const { file, p, raw } of problems) {
      const folder = DESIGN_CATEGORIES.find(c => c.id === p.category)!.folder;
      assert.equal(file.split(path.sep)[0], folder, `${file}: category ${p.category} does not match its folder`);
      assert.match(raw, /\*\*Difficulty:\*\*\s*(🟢 Easy|🟡 Medium|🔴 Hard)/, `${file}: difficulty`);
      assert.ok(p.seniority, `${file}: seniority`);
      assert.ok(p.companies.length > 0, `${file}: companies`);
      assert.ok(p.tags.length > 0, `${file}: tags`);
      for (const [name, value] of Object.entries({
        statement: p.statementMd, clarifying: p.clarifyingMd, requirements: p.requirementsMd,
        solution: p.solutionMd, followUps: p.followUpsMd, mistakes: p.mistakesMd, takeaways: p.takeawaysMd,
      })) {
        assert.ok(value && value.length > 40, `${file}: missing/short ${name} section`);
      }
      assert.match(p.solutionMd!, /## Trade-offs/, `${file}: Trade-offs`);
      assert.match(raw, /```mermaid/, `${file}: mermaid diagram`);
      assert.equal((raw.match(/```/g) ?? []).length % 2, 0, `${file}: unbalanced code fences`);
    }
  });

  it('slugs are unique', () => {
    const slugs = problems.map(x => x.p.slug);
    assert.equal(new Set(slugs).size, slugs.length);
  });
});
