#!/usr/bin/env python3
"""
Audit LeetCode problem files for:
1. Sufficient content (per leetcode-enricher skill)
2. Classification correctness vs problems.json
   - A problem can have one PRIMARY topic and multiple SUB topics
   - Flag "wrong primary" only when it's clearly a default/catch-all
   - Flag "missing sub-topics" when obvious additional topics are missing
"""

import json
import os
import re
from collections import defaultdict
from pathlib import Path

PROBLEMS_DIR = Path("/home/sio/Code/Interview/LeetCode/Problems")
METADATA_FILE = Path("/home/sio/Code/Interview/app/backend/data/metadata/problems.json")
OUTPUT_FILE = Path("/home/sio/Code/Interview/LeetCode/audit_report.md")

# Required sections for "sufficient" content per the enricher skill
REQUIRED_SECTIONS = [
    "problem description",
    "examples",
]
DESIRED_SECTIONS = [
    "approach",
    "walkthrough",
    "complexity",
]

# -------------------------------------------------------------------
# TITLE-BASED topic inference (strong signal → suitable as PRIMARY)
# -------------------------------------------------------------------
TITLE_PRIMARY_MAP = {
    "trees": [
        r"binary tree", r"\bbst\b", r"binary search tree", r"n-ary tree",
        r"\btrie\b", r"quad tree", r"\bsubtree\b",
        r"\binorder\b", r"\bpreorder\b", r"\bpostorder\b",
        r"root to leaf", r"level order", r"tree node",
        r"serialize.*tree", r"deserialize.*tree",
        r"\bancestor\b.*\btree\b", r"depth.*tree", r"height.*tree",
        r"balanced.*tree", r"complete.*tree", r"trim.*tree",
        r"flatten.*tree.*linked", r"prune.*tree", r"tree diameter",
        r"tree.*traversal", r"zigzag.*level", r"\bleaf\b.*tree",
        r"recover.*tree", r"construct.*tree", r"tree.*from",
        r"coprimes.*tree", r"deepest.*leaves",
        r"closest.*search tree", r"search.*tree value",
        r"convert.*bst", r"insert.*bst", r"delete.*bst",
        r"kth.*ancestor.*tree", r"tree score",
    ],
    "graphs": [
        r"\bgraph\b", r"network delay", r"shortest path(?!.*tree)",
        r"course schedule", r"number of islands", r"connected component",
        r"\btopological\b", r"\bbipartite\b", r"clone graph",
        r"alien dictionary", r"word ladder",
        r"\bmaze\b", r"minimum spanning", r"critical connection",
        r"redundant connection", r"pacific atlantic", r"walls and gates",
        r"surrounded region", r"rotting orange", r"shortest bridge",
        r"swim in rising", r"cheapest flight", r"evaluate division",
        r"reorder routes", r"\bprovince\b", r"town judge",
        r"safe state", r"all paths.*source", r"parallel course",
        r"bus route", r"open the lock", r"accounts merge(?! ext)",
        r"network.*connected", r"flower planting",
        r"detonate.*bomb", r"possible.*partition",
    ],
    "linked-list": [
        r"linked list", r"merge.*sorted list",
        r"reverse.*list", r"add two numbers",
        r"copy list.*random", r"flatten.*doubly",
        r"intersection.*list", r"palindrome.*linked",
        r"swap node.*list", r"rotate list", r"partition list",
        r"sort list\b", r"odd even linked", r"reorder list",
        r"middle.*linked", r"remove.*linked",
        r"double.*linked list",
        r"insert.*linked", r"plus one linked",
    ],
    "dynamic-programming": [
        r"house robber", r"\bcoin change\b", r"longest common subsequence",
        r"edit distance", r"\bknapsack\b",
        r"decode ways", r"word break(?!.*extended)",
        r"longest increasing subsequence\b",
        r"unique paths\b(?! iii)", r"minimum path sum\b",
        r"dungeon game", r"burst balloon", r"stone game",
        r"paint house", r"paint fence", r"target sum\b",
        r"partition equal subset", r"cherry pickup",
        r"ones and zeroes", r"interleaving string",
        r"scramble string", r"distinct subsequence\b",
        r"minimum cost.*ticket", r"filling bookcase",
        r"pizza.*slices", r"maximum profit.*scheduling",
        r"palindrome.*subsequence",
        r"minimum falling path", r"longest palindromic substring",
        r"regular expression match", r"wildcard match",
        r"best time.*buy.*sell.*stock(?!.*extended| using)",
        r"minimum insertion.*palindrome",
        r"arithmetic slices.*subsequence",
        r"number of ways.*earn points",
        r"stickers to spell", r"strange printer",
        r"minimum cost.*cut.*stick", r"profitable schemes",
    ],
    "stack-queue": [
        r"valid parenthes\b", r"\bmin stack\b",
        r"implement.*queue.*stack", r"implement.*stack.*queue",
        r"daily temperature", r"next greater",
        r"asteroid collision", r"basic calculator",
        r"decode string\b", r"evaluate.*polish",
        r"car fleet(?! ii)", r"online stock span",
        r"dinner plate.*stack", r"score of parenthes",
        r"largest.*histogram",
        r"remove.*duplicate.*string", r"remove.*parenthes",
        r"simplify path", r"exclusive time",
    ],
    "binary-search": [
        r"^binary search$", r"find minimum in rotated",
        r"search.*rotated sorted", r"find peak element",
        r"search.*2d matrix", r"koko eating",
        r"capacity to ship", r"split array largest sum",
        r"median of two sorted",
        r"first bad version", r"search insert position",
        r"find.*sorted array of unknown",
    ],
    "sliding-window": [
        r"minimum window substring", r"sliding window",
        r"longest substring without repeat",
        r"subarrays.*k different",
        r"longest repeating character replacement",
        r"fruit into basket", r"grumpy bookstore",
        r"max consecutive ones iii",
    ],
    "two-pointers": [
        r"^two sum$", r"^3sum", r"^4sum",
        r"container with most water", r"sort colors\b",
        r"boats to save", r"remove duplicates.*sorted array",
    ],
    "heap-priority-queue": [
        r"merge k sorted", r"find median.*data stream",
        r"meeting room", r"top k frequent",
        r"k closest points", r"\bipo\b",
        r"kth largest.*stream", r"reorganize string",
        r"task scheduler\b(?!.*ii)",
    ],
    "backtracking": [
        r"n-queens", r"sudoku solver",
        r"^permutations\b", r"^combination sum",
        r"^subsets\b", r"letter combination.*phone",
        r"generate parenthes", r"word search\b(?! ii)",
        r"expression add operator",
    ],
    "greedy": [
        r"assign cookie", r"lemonade change", r"gas station\b",
        r"^candy$", r"queue reconstruct.*height",
        r"partition label",
    ],
    "bit-manipulation": [
        r"^single number\b", r"number of 1 bits", r"^counting bits\b",
        r"^reverse bits\b", r"^hamming distance\b", r"^power of two\b",
        r"^power of four\b", r"total hamming distance",
    ],
    "intervals": [
        r"^merge intervals\b", r"^insert interval\b",
        r"interval list intersection", r"meeting room",
        r"non-overlapping interval",
    ],
    "math-geometry": [
        r"^fizz buzz$", r"^count primes\b", r"^happy number\b",
        r"^sqrt", r"^excel sheet", r"^roman to integer",
        r"^integer to roman", r"^rectangle area\b",
        r"erect the fence", r"^convex polygon\b",
    ],
    "data-structures-design": [
        r"^design\b", r"^lru cache\b", r"^lfu cache\b",
        r"implement trie", r"^all o.*one data",
    ],
    "sql-database": [
        r"combine two tables", r"second highest salary", r"nth highest",
        r"rank scores\b", r"^consecutive numbers$",
        r"department.*salary", r"duplicate emails",
        r"customers who never", r"employee.*bonus\b",
        r"rising temperature", r"^big countries\b",
        r"classes with at least", r"exchange seat",
        r"not boring movies", r"human traffic",
        r"friend request", r"sales.*analysis",
        r"game play analysis", r"article view",
        r"reformat.*table", r"product sales analysis",
        r"project employees", r"monthly transaction",
        r"immediate food delivery", r"market analysis",
        r"swap.*employee", r"active business",
        r"active user", r"ad-free session", r"ads performance",
        r"all.*matches.*league", r"all.*pairs.*follower",
        r"all people report", r"all valid triplet.*country",
        r"bank account summary", r"biggest single number",
        r"capital gain", r"calculate.*bonus", r"confirmation rate",
        r"count salary categories", r"daily leads",
        r"customer.*order frequency", r"customer.*placing",
        r"customer.*purchasing", r"customers.*bought.*product",
        r"customer who visited",
        r"^select data$", r"hopper company",
        r"managers with at least", r"employees earning",
        r"employees whose manager",
        r"^find customer referee$", r"^find followers count$",
        r"activity participants", r"count.*experiments",
        r"create.*dataframe", r"change null values",
        r"change data type", r"calculate compressed",
        r"average selling price", r"average time.*process",
        r"percentage.*contest", r"percentage.*letter",
        r"investments in 2016", r"fix names",
        r"report.*dates", r"reported post",
        r"restaurant growth", r"team scores.*football",
        r"weather type", r"unpopular books",
    ],
    "concurrency": [
        r"print in order", r"print zero even odd", r"fizz buzz multithreaded",
        r"building h2o", r"dining philosopher", r"web crawler multi",
    ],
}

# -------------------------------------------------------------------
# CONTENT-BASED topic inference (weaker signal → suitable as SUB-topic)
# A topic needs ≥2 keyword hits in content to count.
# -------------------------------------------------------------------
CONTENT_SUB_HINTS = {
    "trees": [
        r"\bbinary tree\b", r"\bbst\b", r"\bbinary search tree\b",
        r"\binorder\b", r"\bpreorder\b", r"\bpostorder\b",
        r"\bleaf\b.*\bnode", r"\bsubtree\b", r"\btrie\b",
        r"\bn-ary tree\b", r"\broot\b.*\b(left|right)\b",
        r"\bleft child\b", r"\bright child\b",
    ],
    "graphs": [
        r"\bgraph\b", r"\bbfs\b", r"\bdfs\b", r"\btopological\b",
        r"\bshortest path\b", r"\bconnected component\b",
        r"\bisland\b", r"\bbipartite\b",
        r"\bdijkstra\b", r"\bunion.?find\b",
        r"\badjacency\b",
    ],
    "dynamic-programming": [
        r"\bdp\b", r"\bdynamic programming\b", r"\bmemoiz\b",
        r"\bknapsack\b", r"\boptimal substructure\b",
        r"\boverlapping subproblem\b",
        r"dp\[", r"dp table",
    ],
    "linked-list": [
        r"\blinked list\b", r"\blistnode\b", r"\bnext pointer\b",
        r"\bsingly linked\b", r"\bdoubly linked\b",
    ],
    "stack-queue": [
        r"\bstack\b", r"\bqueue\b", r"\bmonotonic stack\b",
        r"\bdeque\b", r"\bpush\b.*\bpop\b",
    ],
    "binary-search": [
        r"\bbinary search\b", r"\blow.*\bhigh\b.*\bmid\b",
        r"\bleft.*\bright.*\bmid\b",
    ],
    "sliding-window": [
        r"\bsliding window\b", r"\bwindow\b.*\bshrink\b",
        r"\bexpand\b.*\bwindow\b",
    ],
    "two-pointers": [
        r"\btwo pointer\b", r"\btwo-pointer\b",
        r"\bleft\b.*\bright\b.*\bpointer\b",
    ],
    "backtracking": [
        r"\bbacktrack\b", r"\brecursive.*\bgenerat\b",
        r"\bpermut\b.*\brecurs\b",
    ],
    "heap-priority-queue": [
        r"\bheap\b", r"\bpriority queue\b",
        r"\bmin.?heap\b", r"\bmax.?heap\b",
        r"\bheapify\b",
    ],
    "greedy": [
        r"\bgreedy\b", r"\bgreedy choice\b",
        r"\blocally optimal\b",
    ],
    "bit-manipulation": [
        r"\bbitwise\b", r"\bbit manipulation\b",
        r"\bxor\b", r"\bbitmask\b",
        r"\bbit shift\b",
    ],
    "intervals": [
        r"\binterval\b", r"\boverlapping\b.*\binterval\b",
        r"\bmerge\b.*\binterval\b",
        r"\bstart\b.*\bend\b.*\binterval\b",
    ],
    "string-manipulation": [
        r"\banagram\b", r"\bpalindrome\b",
        r"\bsubstring\b", r"\bregex\b",
    ],
    "math-geometry": [
        r"\bprime\b", r"\bfactorial\b", r"\bgcd\b",
        r"\bgeometry\b", r"\bcoordinate\b",
        r"\bcombinatori\b",
    ],
}


def load_metadata():
    with open(METADATA_FILE) as f:
        data = json.load(f)
    by_filepath = {}
    by_title = {}
    for entry in data:
        fp = entry.get("filePath", "")
        title = entry.get("title", "")
        by_filepath[fp] = entry
        by_title[title.lower()] = entry
    return data, by_filepath, by_title


def check_file_sufficiency(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception:
        return False, ["unreadable"], False, 0

    content_lower = content.lower()
    lines = content.split("\n")
    non_empty_lines = [l for l in lines if l.strip()]

    has_placeholder = (
        "*solution approach and pseudocode to be added.*" in content_lower
        or "*to be added*" in content_lower
    )

    missing_required = []
    for section in REQUIRED_SECTIONS:
        pattern = r"##\s+(?:\d+\.\s+)?" + re.escape(section)
        if not re.search(pattern, content_lower):
            missing_required.append(section)

    missing_desired = []
    for section in DESIRED_SECTIONS:
        pattern = r"##\s+(?:\d+\.\s+)?" + re.escape(section)
        if not re.search(pattern, content_lower):
            missing_desired.append(section)

    is_sufficient = len(missing_required) == 0 and not has_placeholder
    return is_sufficient, missing_required + missing_desired, has_placeholder, len(non_empty_lines)


def infer_primary_from_title(title):
    """Strong signal: infer the BEST primary topic from title."""
    title_lower = title.lower()
    matches = []
    for topic, patterns in TITLE_PRIMARY_MAP.items():
        for pattern in patterns:
            if re.search(pattern, title_lower):
                matches.append(topic)
                break
    return matches


def infer_subs_from_content(filepath):
    """Weaker signal: infer plausible sub-topics from file content."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception:
        return set()

    content_lower = content.lower()
    suggestions = set()
    for topic, patterns in CONTENT_SUB_HINTS.items():
        hits = sum(1 for p in patterns if re.search(p, content_lower))
        if hits >= 2:
            suggestions.add(topic)
    return suggestions


def classify_issue(meta, title_suggestions, content_suggestions):
    """
    Determine classification issues.
    Returns: (wrong_primary, suggested_primary, missing_subs)
    - wrong_primary: True if primaryTopic is clearly wrong
    - suggested_primary: what it should be (or None)
    - missing_subs: list of sub-topics that should be in topics[]
    """
    current_primary = meta.get("primaryTopic", "")
    current_topics = set(meta.get("topics", []))
    all_suggestions = set(title_suggestions) | content_suggestions

    wrong_primary = False
    suggested_primary = None
    missing_subs = set()

    # --- Check primary ---
    # Only flag "wrong primary" if:
    # 1. Current primary is the default "arrays-hashing"
    # 2. AND there's a title-based suggestion (strong signal)
    # 3. AND that suggestion is NOT "arrays-hashing"
    if current_primary == "arrays-hashing" and title_suggestions:
        # Pick the strongest title-based primary (first match)
        best = title_suggestions[0]
        if best != "arrays-hashing":
            wrong_primary = True
            suggested_primary = best

    # Also flag if current primary is non-default but title strongly
    # suggests something else and current isn't even a sub-topic candidate
    if not wrong_primary and current_primary != "arrays-hashing" and title_suggestions:
        if current_primary not in all_suggestions:
            # Current primary isn't supported by any evidence
            # But only flag if we have a strong title-based suggestion
            wrong_primary = True
            suggested_primary = title_suggestions[0]

    # --- Check sub-topics ---
    # Any suggestion (title or content) not in current topics[] = missing sub
    for s in all_suggestions:
        if s not in current_topics:
            # Don't suggest arrays-hashing as a missing sub (it's the default)
            if s != "arrays-hashing" or current_primary != "arrays-hashing":
                missing_subs.add(s)

    # If we flagged wrong primary, the suggested primary should also
    # be removed from missing_subs (it'll be the new primary)
    if suggested_primary and suggested_primary in missing_subs:
        missing_subs.discard(suggested_primary)

    return wrong_primary, suggested_primary, sorted(missing_subs)


def main():
    print("Loading metadata...")
    data, by_filepath, by_title = load_metadata()

    print("Scanning problem files...")

    insufficient_files = []
    wrong_primary_issues = []
    missing_sub_issues = []
    not_in_metadata = []
    file_count = 0
    sufficient_count = 0

    for md_file in sorted(PROBLEMS_DIR.glob("*.md")):
        if md_file.name == "INDEX.md":
            continue

        file_count += 1
        relative_path = f"LeetCode/Problems/{md_file.name}"

        # --- Sufficiency check ---
        is_sufficient, missing, has_placeholder, line_count = check_file_sufficiency(md_file)
        if not is_sufficient:
            insufficient_files.append({
                "file": md_file.name,
                "missing": missing,
                "has_placeholder": has_placeholder,
                "line_count": line_count,
            })
        else:
            sufficient_count += 1

        # --- Classification check ---
        meta = by_filepath.get(relative_path)
        if not meta:
            title_guess = md_file.stem
            meta = by_title.get(title_guess.lower())

        if not meta:
            not_in_metadata.append(md_file.name)
            continue

        title = meta.get("title", "")
        title_suggestions = infer_primary_from_title(title)
        content_suggestions = infer_subs_from_content(md_file)

        wrong_primary, suggested_primary, missing_subs = classify_issue(
            meta, title_suggestions, content_suggestions
        )

        if wrong_primary:
            wrong_primary_issues.append({
                "file": md_file.name,
                "title": title,
                "current_primary": meta.get("primaryTopic", ""),
                "suggested_primary": suggested_primary,
                "current_topics": meta.get("topics", []),
                "missing_subs": missing_subs,
            })
        elif missing_subs:
            missing_sub_issues.append({
                "file": md_file.name,
                "title": title,
                "current_primary": meta.get("primaryTopic", ""),
                "current_topics": meta.get("topics", []),
                "missing_subs": missing_subs,
            })

    # -------------------------------------------------------------------
    # Generate report
    # -------------------------------------------------------------------
    print("Generating report...")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("# LeetCode Problems Audit Report\n\n")
        f.write(f"**Total files scanned:** {file_count}\n")
        f.write(f"**Sufficient content:** {sufficient_count}\n")
        f.write(f"**Insufficient content:** {len(insufficient_files)}\n")
        f.write(f"**Wrong primary topic:** {len(wrong_primary_issues)}\n")
        f.write(f"**Missing sub-topics:** {len(missing_sub_issues)}\n")
        f.write(f"**Not in problems.json:** {len(not_in_metadata)}\n\n")

        # ===================== INSUFFICIENT CONTENT =====================
        f.write("---\n\n")
        f.write("## 1. Insufficient Content\n\n")
        f.write(f"These **{len(insufficient_files)}** files lack required sections ")
        f.write("per the enricher skill.\n\n")

        missing_desc = [x for x in insufficient_files if "problem description" in x["missing"]]
        missing_other = [x for x in insufficient_files if "problem description" not in x["missing"]]

        if missing_desc:
            f.write(f"### 1a. Missing Problem Description ({len(missing_desc)} files)\n\n")
            f.write("| # | File | Missing Sections | Lines |\n")
            f.write("|---|------|-----------------|-------|\n")
            for i, item in enumerate(missing_desc, 1):
                f.write(f"| {i} | {item['file']} | {', '.join(item['missing'])} | {item['line_count']} |\n")
            f.write("\n")

        if missing_other:
            f.write(f"### 1b. Has Description but Missing Other Sections ({len(missing_other)} files)\n\n")
            f.write("| # | File | Missing Sections | Lines |\n")
            f.write("|---|------|-----------------|-------|\n")
            for i, item in enumerate(missing_other, 1):
                f.write(f"| {i} | {item['file']} | {', '.join(item['missing'])} | {item['line_count']} |\n")
            f.write("\n")

        # ===================== WRONG PRIMARY TOPIC =====================
        f.write("---\n\n")
        f.write("## 2. Wrong Primary Topic\n\n")
        f.write(f"These **{len(wrong_primary_issues)}** problems have a clearly incorrect ")
        f.write("`primaryTopic`. Most are defaulted to `arrays-hashing` when they belong ")
        f.write("to a different category.\n\n")
        f.write("| # | Title | Current Primary | Should Be | Additional Sub-topics |\n")
        f.write("|---|-------|----------------|-----------|----------------------|\n")
        for i, item in enumerate(wrong_primary_issues, 1):
            subs = ", ".join(item["missing_subs"]) if item["missing_subs"] else "—"
            f.write(f"| {i} | {item['title']} | `{item['current_primary']}` | "
                    f"`{item['suggested_primary']}` | {subs} |\n")

        # ===================== MISSING SUB-TOPICS =====================
        f.write("\n---\n\n")
        f.write("## 3. Missing Sub-Topics\n\n")
        f.write(f"These **{len(missing_sub_issues)}** problems have a correct primary topic ")
        f.write("but are missing relevant sub-classifications in their `topics[]` array.\n\n")
        f.write("| # | Title | Primary | Current Topics | Missing Sub-topics |\n")
        f.write("|---|-------|---------|---------------|-------------------|\n")
        for i, item in enumerate(missing_sub_issues, 1):
            current = ", ".join(f"`{t}`" for t in item["current_topics"])
            missing = ", ".join(f"`{t}`" for t in item["missing_subs"])
            f.write(f"| {i} | {item['title']} | `{item['current_primary']}` | "
                    f"{current} | {missing} |\n")

        # ===================== NOT IN METADATA =====================
        if not_in_metadata:
            f.write("\n---\n\n")
            f.write("## 4. Files Not in problems.json\n\n")
            f.write(f"These **{len(not_in_metadata)}** files have no metadata entry:\n\n")
            for i, name in enumerate(not_in_metadata, 1):
                f.write(f"{i}. {name}\n")

        # ===================== SUMMARY =====================
        f.write("\n---\n\n")
        f.write("## Summary\n\n")
        f.write(f"| Metric | Count | % |\n")
        f.write(f"|--------|-------|---|\n")
        pct_suff = f"{100*sufficient_count/file_count:.1f}%" if file_count else "—"
        pct_insuff = f"{100*len(insufficient_files)/file_count:.1f}%" if file_count else "—"
        f.write(f"| Total files | {file_count} | — |\n")
        f.write(f"| Sufficient content | {sufficient_count} | {pct_suff} |\n")
        f.write(f"| Insufficient content | {len(insufficient_files)} | {pct_insuff} |\n")
        f.write(f"| Wrong primary topic | {len(wrong_primary_issues)} | — |\n")
        f.write(f"| Missing sub-topics | {len(missing_sub_issues)} | — |\n")
        f.write(f"| Not in metadata | {len(not_in_metadata)} | — |\n")

    print(f"\nDone! Report: {OUTPUT_FILE}")
    print(f"  Sufficient:     {sufficient_count}/{file_count}")
    print(f"  Insufficient:   {len(insufficient_files)}/{file_count}")
    print(f"  Wrong primary:  {len(wrong_primary_issues)}")
    print(f"  Missing subs:   {len(missing_sub_issues)}")
    print(f"  Not in metadata:{len(not_in_metadata)}")


if __name__ == "__main__":
    main()
