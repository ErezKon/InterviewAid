"""
Update Companies in Problem Files
==================================
Reads problems_data.json (aggregated from all company CSVs) and updates
the **Companies:** line in each problem file under Problems/.

- If a file has a **Companies:** line, it replaces it with the full list.
- If a file has no **Companies:** line, it inserts one after the last
  metadata line (after **LeetCode:** or **Acceptance:**).

Usage: python update_companies.py
"""

import os
import re
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROBLEMS_DIR = os.path.join(BASE_DIR, 'Problems')
DATA_FILE = os.path.join(BASE_DIR, 'problems_data.json')


def format_company_name(folder_name):
    """Convert folder name like 'goldman-sachs' to 'Goldman Sachs'."""
    return folder_name.replace('-', ' ').title()


def build_id_to_companies(data):
    """Build a dict: problem_id (str) -> sorted list of formatted company names."""
    mapping = {}
    for pid, info in data.items():
        companies = sorted(info.get('companies', {}).keys())
        mapping[pid] = [format_company_name(c) for c in companies]
    return mapping


def extract_problem_id(lines):
    """Extract problem ID from the title line like '# 542. 01 Matrix'."""
    for line in lines:
        m = re.match(r'^#\s+(\d+)\.', line.strip())
        if m:
            return m.group(1)
    return None


def update_file(filepath, id_to_companies):
    """Update a single problem file. Returns (status, problem_id)."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.split('\n')
    pid = extract_problem_id(lines)
    if not pid:
        return 'no_id', None

    companies = id_to_companies.get(pid)
    if not companies:
        return 'no_data', pid

    companies_line = f"**Companies:** {', '.join(companies)}"

    # Check if there's already a **Companies:** line
    companies_idx = None
    for i, line in enumerate(lines):
        if line.strip().startswith('**Companies:**'):
            companies_idx = i
            break

    if companies_idx is not None:
        # Check if it's already correct
        if lines[companies_idx].strip() == companies_line:
            return 'unchanged', pid
        lines[companies_idx] = companies_line
    else:
        # Find insertion point: after the last metadata line before ---
        insert_idx = None
        for i, line in enumerate(lines):
            stripped = line.strip()
            if stripped.startswith('**LeetCode:**') or stripped.startswith('**Acceptance:**'):
                insert_idx = i + 1
            elif stripped == '---' and insert_idx is not None:
                break
            elif stripped == '---' and insert_idx is None:
                # --- before any metadata found, insert before it
                insert_idx = i
                break

        if insert_idx is None:
            # Fallback: insert after title line
            for i, line in enumerate(lines):
                if re.match(r'^#\s+\d+\.', line.strip()):
                    insert_idx = i + 1
                    # Skip blank line after title if present
                    if insert_idx < len(lines) and lines[insert_idx].strip() == '':
                        insert_idx += 1
                    break

        if insert_idx is None:
            return 'no_insert_point', pid

        lines.insert(insert_idx, companies_line)

    new_content = '\n'.join(lines)
    if new_content == content:
        return 'unchanged', pid

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    return 'updated', pid


def main():
    # Load aggregated data
    if not os.path.exists(DATA_FILE):
        print(f"ERROR: {DATA_FILE} not found. Run generate_problems.py first.")
        return

    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    print(f"Loaded {len(data)} problems from {DATA_FILE}")

    id_to_companies = build_id_to_companies(data)

    # Process all problem files
    files = sorted([
        f for f in os.listdir(PROBLEMS_DIR)
        if f.endswith('.md') and f != 'INDEX.md'
    ])

    stats = {'updated': 0, 'unchanged': 0, 'no_id': 0, 'no_data': 0, 'no_insert_point': 0}

    for filename in files:
        filepath = os.path.join(PROBLEMS_DIR, filename)
        status, pid = update_file(filepath, id_to_companies)
        stats[status] += 1

        if status == 'updated':
            count = len(id_to_companies.get(pid, []))
            print(f"  UPDATED: {filename} (#{pid}, {count} companies)")
        elif status == 'no_id':
            print(f"  SKIP (no ID): {filename}")
        elif status == 'no_data':
            print(f"  SKIP (no company data): {filename} (#{pid})")

    print(f"\nDone! Processed {len(files)} files.")
    print(f"  Updated:    {stats['updated']}")
    print(f"  Unchanged:  {stats['unchanged']}")
    print(f"  No ID:      {stats['no_id']}")
    print(f"  No data:    {stats['no_data']}")
    print(f"  No insert:  {stats['no_insert_point']}")


if __name__ == '__main__':
    main()
