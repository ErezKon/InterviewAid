# 609. Find Duplicate File in System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-duplicate-file-in-system](https://leetcode.com/problems/find-duplicate-file-in-system)
**Companies:** Amazon, Anthropic, Applied Intuition, Dropbox, Google, Meta, Microsoft

---

## Problem Description

Given file paths with content, group files with identical content. Return groups with 2+ duplicates.

## Examples

**Example 1:**
```
Input: ["root/a 1.txt(abcd) 2.txt(efgh)",
        "root/c 3.txt(abcd)",
        "root/c/d 4.txt(efgh)",
        "root 5.txt(ijkl)"]
Output: [["root/a/1.txt","root/c/3.txt"],["root/a/2.txt","root/c/d/4.txt"]]
```
Explanation: Files `1.txt` and `3.txt` share content "abcd", while `2.txt` and `4.txt` share "efgh".

**Example 2:**
```
Input: ["root/a 1.txt(abcd) 2.txt(abcd)",
        "root/b 3.txt(abcd)"]
Output: [["root/a/1.txt","root/a/2.txt","root/b/3.txt"]]
```
Explanation: All three files contain the same content.

## Approach: HashMap by Content — O(n) ✅

```text
FUNCTION findDuplicate(paths):
    // Map content string to list of file paths
    SET contentMap ← defaultdict(list)
    FOR path IN paths:
        SET parts ← SPLIT(path, ' ')
        SET dir ← parts[0]
        FOR i ← 1 TO LENGTH(parts) - 1:
            SET nameContent ← parts[i]
            // nameContent format: "filename(content)"
            SET name ← SUBSTRING_BEFORE(nameContent, '(')
            SET content ← SUBSTRING_BETWEEN(nameContent, '(', ')')
            SET fullPath ← CONCAT(dir, '/', name)
            APPEND fullPath TO contentMap[content]
    RETURN [group FOR group IN contentMap.values() IF LENGTH(group) > 1]
```

## Walkthrough

Consider the first example input.
| Step | Directory | Files Processed | contentMap after step |
|------|-----------|----------------|----------------------|
| 1 | root/a | 1.txt(abcd) → add "root/a/1.txt" to map["abcd"] | {"abcd": ["root/a/1.txt"]}
| 2 | root/a | 2.txt(efgh) → add "root/a/2.txt" to map["efgh"] | {"abcd": ["root/a/1.txt"], "efgh": ["root/a/2.txt"]}
| 3 | root/c | 3.txt(abcd) → append to map["abcd"] | {"abcd": ["root/a/1.txt","root/c/3.txt"], "efgh": ["root/a/2.txt"]}
| 4 | root/c/d | 4.txt(efgh) → append to map["efgh"] | {"abcd": ["root/a/1.txt","root/c/3.txt"], "efgh": ["root/a/2.txt","root/c/d/4.txt"]}
| 5 | root | 5.txt(ijkl) → map["ijkl"] has only one entry, ignored later |
After processing all paths, filter groups with size ≥2, yielding the two duplicate groups shown in the output.

## Complexity Analysis

- **Time:** O(N) where N is total number of files, each parsed once.
- **Space:** O(N) for the hashmap storing file paths grouped by content.

## Follow-Up Questions

1. How would you modify the solution to handle extremely large files where reading the entire content into memory is infeasible?
2. Can you extend the approach to support streaming input where file paths arrive incrementally?
3. How would you adapt the algorithm to find duplicate *directories* based on their file structures?

---

## Key Takeaway

> **Group by content using a hashmap. Parse each entry to extract directory, filename, and content. Filter groups with ≥ 2 files.**