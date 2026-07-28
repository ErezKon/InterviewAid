# 1166. Design File System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-file-system](https://leetcode.com/problems/design-file-system)
**Companies:** Airbnb, Amazon, Atlassian, Capital One, Coinbase, Doordash, Google, Meta, Microsoft, Oracle, Snowflake, Uber

---

## Problem Description

Design a file system with `createPath(path, value)` (fails if parent doesn't exist or path exists) and `get(path)`.

---

## Approach: Hash Map — O(path length) ✅

```text
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

## Examples

| Operation | Result |
|-----------|--------|
| `createPath("/a", 1)` | `true` (creates `/a` with value 1) |
| `createPath("/a/b", 2)` | `true` (parent `/a` exists) |
| `createPath("/c/d", 3)` | `false` (parent `/c` missing) |
| `get("/a")` | `1` |
| `get("/a/b")` | `2` |
| `get("/c")` | `-1` (path not found) |

---

## Walkthrough

1. **Initialize** – `paths` contains only the root `""`.
2. **createPath("/a",1)** – parent is `""` (exists), `/a` not present → store `paths["/a"] = 1`.
3. **createPath("/a/b",2)** – parent `"/a"` exists, `/a/b` new → store `paths["/a/b"] = 2`.
4. **createPath("/c/d",3)** – parent `"/c"` missing → return `false`.
5. **get("/a")** – lookup returns `1`.
6. **get("/a/b")** – lookup returns `2`.
7. **get("/c")** – not in map → return `-1`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(path length) per operation |
| **Space** | O(total paths) |

---

## Key Takeaway

> **Flat hash map with full paths as keys. Validate parent by extracting prefix up to last `/`. Simpler than a trie for this use case since no listing operations are needed.**
