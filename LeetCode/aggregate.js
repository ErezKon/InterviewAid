const fs = require('fs');
const path = require('path');

const base = 'c:/Code/Interview/LeetCode/Raw By Company';
const outFile = 'c:/Code/Interview/LeetCode/aggregate_output.txt';

const dirs = fs.readdirSync(base).filter(d => {
    try { return fs.statSync(path.join(base, d)).isDirectory(); }
    catch(e) { return false; }
});

const problems = {};

for (const d of dirs) {
    const csvPath = path.join(base, d, 'all.csv');
    if (!fs.existsSync(csvPath)) continue;
    
    const content = fs.readFileSync(csvPath, 'utf-8');
    const lines = content.split('\n');
    // Skip header
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        // Parse CSV: ID,URL,Title,Difficulty,Acceptance %,Frequency %
        const match = line.match(/^(\d+),(https?:\/\/[^,]+),(.+),(Easy|Medium|Hard),([^,]+),([^,]+)$/);
        if (!match) continue;
        const [, id, url, title, difficulty] = match;
        if (!problems[id]) {
            problems[id] = { title: title.trim(), difficulty, url, companies: [] };
        }
        problems[id].companies.push(d);
    }
}

const output = [];
output.push(`Company folders: ${dirs.length}`);
output.push(`Total unique problems: ${Object.keys(problems).length}`);

const easy = Object.values(problems).filter(p => p.difficulty === 'Easy').length;
const med = Object.values(problems).filter(p => p.difficulty === 'Medium').length;
const hard = Object.values(problems).filter(p => p.difficulty === 'Hard').length;
output.push(`Easy: ${easy}, Medium: ${med}, Hard: ${hard}`);

const sorted = Object.entries(problems).sort((a, b) => b[1].companies.length - a[1].companies.length);
output.push('');
output.push('Top 20 most asked problems:');
for (const [pid, p] of sorted.slice(0, 20)) {
    output.push(`  #${pid} ${p.title} (${p.difficulty}) - ${p.companies.length} companies`);
}

fs.writeFileSync(outFile, output.join('\n'), 'utf-8');
