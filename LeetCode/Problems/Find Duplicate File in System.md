# 609. Find Duplicate File in System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-duplicate-file-in-system](https://leetcode.com/problems/find-duplicate-file-in-system)
**Companies:** Amazon, Anthropic, Applied Intuition, Dropbox, Google, Meta, Microsoft

---

## Problem Description

Given file paths with content, group files with identical content. Return groups with 2+ duplicates.

---

## Approach: HashMap by Content — O(n) ✅

```
FUNCTION findDuplicate(paths):
    contentMap = defaultdict(list)
    FOR path IN paths:
        parts = path.SPLIT(' ')
        dir = parts[0]
        FOR i ← 1 TO len(parts) - 1:
            name, content = parse file(parts[i])
            contentMap[content].ADD(dir + "/" + name)
    RETURN [files for files in contentMap.values() if len(files) > 1]
```

---

## Key Takeaway

> **Group by content using a hashmap. Parse each entry to extract directory, filename, and content. Filter groups with ≥ 2 files.**
