# 609. Find Duplicate File in System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-duplicate-file-in-system](https://leetcode.com/problems/find-duplicate-file-in-system)
**Companies:** Amazon, Anthropic, Applied Intuition, Dropbox, Google, Meta, Microsoft

---

## Problem Description

Given a list `paths` of directory info, including the directory path, and all the files with contents in this directory, return *all the duplicate files in the file system in terms of their paths*. You may return the answer in **any order**.

A group of duplicate files consists of at least two files that have the same content.

A single directory info string in the input list has the following format:

- `"root/d1/d2/.../dm f1.txt(f1_content) f2.txt(f2_content) ... fn.txt(fn_content)"`

It means there are `n` files `(f1.txt, f2.txt ... fn.txt)` with content `(f1_content, f2_content ... fn_content)` respectively in the directory `"root/d1/d2/.../dm"`. Note that `n >= 1` and `m >= 0`. If `m = 0`, it means the directory is just the root directory.

The output is a list of groups of duplicate file paths. For each group, it contains all the file paths of the files that have the same content. A file path is a string that has the following format:

- `"directory_path/file_name.txt"`

**Constraints:**

- `1 <= paths.length <= 2 * 10^4`
- `1 <= paths[i].length <= 3000`
- `1 <= sum(paths[i].length) <= 5 * 10^5`
- `paths[i]` consist of English letters, digits, `'/'`, `'.'`, `'('`, `')'`, and `' '`.
- You may assume no files or directories share the same name in the same directory.
- You may assume each given directory info represents a unique directory. A single blank space separates the directory path and file info.

**Follow up:**

- Imagine you are given a real file system, how will you search files? DFS or BFS?
- If the file content is very large (GB level), how will you modify your solution?
- If you can only read the file by 1kb each time, how will you modify your solution?
- What is the time complexity of your modified solution? What is the most time-consuming part and memory-consuming part of it? How to optimize?
- How to make sure the duplicated files you find are not false positive?

## Examples

```
Example 1:
  Input: paths = ["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)","root 4.txt(efgh)"]
  Output: [["root/a/2.txt","root/c/d/4.txt","root/4.txt"],["root/a/1.txt","root/c/3.txt"]]
```

```
Example 2:
  Input: paths = ["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)"]
  Output: [["root/a/2.txt","root/c/d/4.txt"],["root/a/1.txt","root/c/3.txt"]]
```

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