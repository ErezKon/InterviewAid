# 1166. Design File System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-file-system](https://leetcode.com/problems/design-file-system)
**Companies:** Airbnb, Amazon, Atlassian, Capital One, Coinbase, Doordash, Google, Meta, Microsoft, Oracle, Snowflake, Uber

---

## Problem Description

Design a file system with `createPath(path, value)` (fails if parent doesn't exist or path exists) and `get(path)`.

---

## Approach: Hash Map — O(path length) ✅

```
CLASS FileSystem:
    CONSTRUCTOR:
        paths = {"": -1}    // root

    FUNCTION createPath(path, value):
        parent = path[:path.rfind('/')]
        IF parent NOT IN paths: RETURN false
        IF path IN paths: RETURN false
        paths[path] = value
        RETURN true

    FUNCTION get(path):
        RETURN paths.get(path, -1)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(path length) per operation |
| **Space** | O(total paths) |

---

## Key Takeaway

> **Flat hash map with full paths as keys. Validate parent by extracting prefix up to last `/`. Simpler than a trie for this use case since no listing operations are needed.**
