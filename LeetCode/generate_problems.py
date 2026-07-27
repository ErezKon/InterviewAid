"""
LeetCode Problem Aggregator & File Generator
=============================================
Parses all company CSV files, builds a master problem index,
generates index.md and skeleton MD files for each unique problem.

Usage: python generate_problems.py
"""

import os
import csv
import re
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RAW_DIR = os.path.join(BASE_DIR, 'Raw By Company')
PROBLEMS_DIR = os.path.join(BASE_DIR, 'Problems')
INDEX_FILE = os.path.join(PROBLEMS_DIR, 'INDEX.md')
PROGRESS_FILE = os.path.join(BASE_DIR, 'problems_data.json')

def sanitize_filename(title):
    """Convert a problem title into a safe filename."""
    # Replace characters that are not valid in filenames
    safe = title.replace('/', '-').replace('\\', '-')
    safe = safe.replace(':', ' -').replace('?', '')
    safe = safe.replace('"', "'").replace('|', '-')
    safe = safe.replace('<', '(').replace('>', ')')
    safe = safe.replace('*', 'x')
    # Remove leading/trailing whitespace and dots
    safe = safe.strip().strip('.')
    return safe


def parse_csv_line(line):
    """Parse a CSV line handling quoted fields with commas."""
    result = []
    current = ''
    in_quotes = False
    for char in line:
        if char == '"':
            in_quotes = not in_quotes
        elif char == ',' and not in_quotes:
            result.append(current.strip())
            current = ''
        else:
            current += char
    result.append(current.strip())
    return result


def collect_problems():
    """Read all company CSVs and aggregate unique problems."""
    problems = {}  # id -> {title, difficulty, url, acceptance, companies: {company: frequency}}
    
    if not os.path.isdir(RAW_DIR):
        print(f"ERROR: Directory not found: {RAW_DIR}")
        return problems
    
    company_dirs = sorted([
        d for d in os.listdir(RAW_DIR)
        if os.path.isdir(os.path.join(RAW_DIR, d))
    ])
    
    print(f"Found {len(company_dirs)} company directories")
    
    for company in company_dirs:
        csv_path = os.path.join(RAW_DIR, company, 'all.csv')
        if not os.path.exists(csv_path):
            continue
        
        try:
            with open(csv_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
        except Exception as e:
            print(f"  Error reading {csv_path}: {e}")
            continue
        
        if len(lines) < 2:
            continue
        
        for line in lines[1:]:  # Skip header
            line = line.strip()
            if not line:
                continue
            
            fields = parse_csv_line(line)
            if len(fields) < 6:
                continue
            
            pid = fields[0].strip()
            if not pid or not pid.isdigit():
                continue
            
            url = fields[1].strip()
            title = fields[2].strip()
            difficulty = fields[3].strip()
            acceptance = fields[4].strip()
            frequency = fields[5].strip()
            
            if pid not in problems:
                problems[pid] = {
                    'id': pid,
                    'title': title,
                    'difficulty': difficulty,
                    'url': url,
                    'acceptance': acceptance,
                    'companies': {}
                }
            
            problems[pid]['companies'][company] = frequency
    
    print(f"Total unique problems: {len(problems)}")
    
    # Stats
    easy = sum(1 for p in problems.values() if p['difficulty'] == 'Easy')
    medium = sum(1 for p in problems.values() if p['difficulty'] == 'Medium')
    hard = sum(1 for p in problems.values() if p['difficulty'] == 'Hard')
    print(f"  Easy: {easy}, Medium: {medium}, Hard: {hard}")
    
    return problems


def generate_index(problems):
    """Generate INDEX.md with all problems organized by company count."""
    os.makedirs(PROBLEMS_DIR, exist_ok=True)
    
    # Sort by number of companies (descending), then by ID
    sorted_problems = sorted(
        problems.values(),
        key=lambda p: (-len(p['companies']), int(p['id']))
    )
    
    lines = []
    lines.append("# LeetCode Problems Index")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append(f"**Total Problems:** {len(problems)}")
    easy = sum(1 for p in problems.values() if p['difficulty'] == 'Easy')
    medium = sum(1 for p in problems.values() if p['difficulty'] == 'Medium')
    hard = sum(1 for p in problems.values() if p['difficulty'] == 'Hard')
    lines.append(f"  |  Easy: {easy}  |  Medium: {medium}  |  Hard: {hard}")
    lines.append("")
    lines.append("---")
    lines.append("")
    
    # Main table
    lines.append("## All Problems")
    lines.append("")
    lines.append("| # | Title | Difficulty | Companies | File |")
    lines.append("|---|-------|------------|-----------|------|")
    
    for p in sorted_problems:
        pid = p['id']
        title = p['title']
        difficulty = p['difficulty']
        filename = sanitize_filename(title) + '.md'
        filepath = os.path.join(PROBLEMS_DIR, filename)
        
        # Difficulty badge
        if difficulty == 'Easy':
            diff_badge = '🟢 Easy'
        elif difficulty == 'Medium':
            diff_badge = '🟡 Medium'
        else:
            diff_badge = '🔴 Hard'
        
        company_list = ', '.join(sorted(p['companies'].keys()))
        company_count = len(p['companies'])
        
        # Truncate company list if too long
        if len(company_list) > 100:
            company_names = sorted(p['companies'].keys())
            company_list = ', '.join(company_names[:5]) + f', ... (+{company_count - 5} more)'
        
        file_link = f"[{filename}]({filename.replace(' ', '%20')})"
        
        lines.append(f"| {pid} | [{title}]({p['url']}) | {diff_badge} | {company_count} cos: {company_list} | {file_link} |")
    
    lines.append("")
    lines.append("---")
    lines.append("")
    
    # Company index
    lines.append("## Problems by Company")
    lines.append("")
    
    company_problems = {}
    for p in problems.values():
        for company in p['companies']:
            if company not in company_problems:
                company_problems[company] = []
            company_problems[company].append(p)
    
    for company in sorted(company_problems.keys()):
        probs = sorted(company_problems[company], key=lambda p: int(p['id']))
        lines.append(f"### {company.replace('-', ' ').title()} ({len(probs)} problems)")
        lines.append("")
        lines.append("| # | Title | Difficulty |")
        lines.append("|---|-------|------------|")
        for p in probs:
            difficulty = p['difficulty']
            if difficulty == 'Easy':
                diff_badge = '🟢 Easy'
            elif difficulty == 'Medium':
                diff_badge = '🟡 Medium'
            else:
                diff_badge = '🔴 Hard'
            lines.append(f"| {p['id']} | [{p['title']}]({sanitize_filename(p['title'])}.md) | {diff_badge} |")
        lines.append("")
    
    with open(INDEX_FILE, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    
    print(f"Generated index: {INDEX_FILE}")


def generate_problem_file(problem):
    """Generate a skeleton MD file for a problem."""
    filename = sanitize_filename(problem['title']) + '.md'
    filepath = os.path.join(PROBLEMS_DIR, filename)
    
    if os.path.exists(filepath):
        return False  # Already exists
    
    pid = problem['id']
    title = problem['title']
    difficulty = problem['difficulty']
    url = problem['url']
    acceptance = problem['acceptance']
    companies = sorted(problem['companies'].keys())
    
    if difficulty == 'Easy':
        diff_badge = '🟢 Easy'
    elif difficulty == 'Medium':
        diff_badge = '🟡 Medium'
    else:
        diff_badge = '🔴 Hard'
    
    lines = []
    lines.append(f"# {pid}. {title}")
    lines.append("")
    lines.append(f"**Difficulty:** {diff_badge}  ")
    lines.append(f"**Acceptance:** {acceptance}  ")
    lines.append(f"**LeetCode:** [{url}]({url})  ")
    lines.append(f"**Companies:** {', '.join(companies)}")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Problem Description")
    lines.append("")
    lines.append("<!-- TODO: Add problem description -->")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Solution")
    lines.append("")
    lines.append("### Approach")
    lines.append("")
    lines.append("<!-- TODO: Add solution approach -->")
    lines.append("")
    lines.append("### Pseudocode")
    lines.append("")
    lines.append("```")
    lines.append("// TODO: Add pseudocode")
    lines.append("```")
    lines.append("")
    lines.append("### Complexity Analysis")
    lines.append("")
    lines.append("| Aspect | Complexity |")
    lines.append("|--------|------------|")
    lines.append("| **Time** | <!-- TODO --> |")
    lines.append("| **Space** | <!-- TODO --> |")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Follow-Up Questions")
    lines.append("")
    lines.append("<!-- TODO: Add follow-up questions and answers -->")
    lines.append("")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    
    return True


def main():
    print("=" * 60)
    print("LeetCode Problem Aggregator & Generator")
    print("=" * 60)
    print()
    
    # Step 1: Collect all problems
    print("Step 1: Parsing company CSVs...")
    problems = collect_problems()
    
    if not problems:
        print("No problems found. Exiting.")
        return
    
    # Save aggregated data for later use
    with open(PROGRESS_FILE, 'w', encoding='utf-8') as f:
        json.dump(problems, f, indent=2, ensure_ascii=False)
    print(f"Saved aggregated data to: {PROGRESS_FILE}")
    
    # Step 2: Generate index
    print("\nStep 2: Generating index...")
    generate_index(problems)
    
    # Step 3: Generate problem files
    print("\nStep 3: Generating problem files...")
    os.makedirs(PROBLEMS_DIR, exist_ok=True)
    
    created = 0
    skipped = 0
    for pid in sorted(problems.keys(), key=int):
        if generate_problem_file(problems[pid]):
            created += 1
        else:
            skipped += 1
    
    print(f"  Created: {created} new files")
    print(f"  Skipped: {skipped} (already exist)")
    
    # Summary
    print("\n" + "=" * 60)
    print("DONE!")
    print(f"  Index:    {INDEX_FILE}")
    print(f"  Problems: {PROBLEMS_DIR}")
    print(f"  Data:     {PROGRESS_FILE}")
    print("=" * 60)
    
    # Top 30 most common problems
    top = sorted(problems.values(), key=lambda p: -len(p['companies']))[:30]
    print("\nTop 30 most frequently asked problems:")
    for i, p in enumerate(top, 1):
        print(f"  {i:2}. #{p['id']:>4} {p['title']:<55} ({p['difficulty']:>6}) - {len(p['companies']):>3} companies")


if __name__ == '__main__':
    import sys
    LOG_FILE = os.path.join(BASE_DIR, 'generate_log.txt')
    try:
        # Redirect all prints to a log file
        log = open(LOG_FILE, 'w', encoding='utf-8')
        original_stdout = sys.stdout
        sys.stdout = log
        main()
        sys.stdout = original_stdout
        log.close()
    except Exception as e:
        with open(LOG_FILE, 'a', encoding='utf-8') as f:
            f.write(f'\nERROR: {e}\n')
            import traceback
            traceback.print_exc(file=f)
