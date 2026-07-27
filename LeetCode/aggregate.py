import os
import csv

base = r'c:\Code\Interview\LeetCode\Raw By Company'
out_file = r'c:\Code\Interview\LeetCode\aggregate_output.txt'
problems = {}
dirs = [d for d in os.listdir(base) if os.path.isdir(os.path.join(base, d))]

lines = []
lines.append(f'Company folders: {len(dirs)}')

for d in dirs:
    f = os.path.join(base, d, 'all.csv')
    if not os.path.exists(f):
        continue
    with open(f, encoding='utf-8') as fh:
        reader = csv.DictReader(fh)
        for row in reader:
            pid = row.get('ID', '').strip()
            if not pid:
                continue
            if pid not in problems:
                problems[pid] = {
                    'title': row['Title'].strip(),
                    'difficulty': row['Difficulty'].strip(),
                    'url': row['URL'].strip(),
                    'companies': []
                }
            problems[pid]['companies'].append(d)

lines.append(f'Total unique problems: {len(problems)}')
easy = sum(1 for p in problems.values() if p['difficulty'] == 'Easy')
med = sum(1 for p in problems.values() if p['difficulty'] == 'Medium')
hard = sum(1 for p in problems.values() if p['difficulty'] == 'Hard')
lines.append(f'Easy: {easy}, Medium: {med}, Hard: {hard}')

by_count = sorted(problems.items(), key=lambda x: len(x[1]['companies']), reverse=True)
lines.append('\nTop 20 most asked problems:')
for pid, p in by_count[:20]:
    lines.append(f"  #{pid} {p['title']} ({p['difficulty']}) - {len(p['companies'])} companies")

with open(out_file, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))
