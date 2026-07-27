# 1948. Delete Duplicate Folders in System

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/delete-duplicate-folders-in-system](https://leetcode.com/problems/delete-duplicate-folders-in-system)
**Companies:** Amazon, Bloomberg, Bookingcom, Google, Microsoft, Nvidia

---

## Problem Description

Given folder paths, delete all subtrees that are structurally identical (duplicate folder structures). Return remaining paths.

---

## Key Insight

Two subtrees are identical iff they have the same serialized structure. Build a trie, serialize each subtree bottom-up, and mark duplicates for deletion.

---

## Approach: Trie + Serialization — O(n·L) ✅

```
FUNCTION deleteDuplicateFolder(paths):
    trie = build from paths
    serialize each node's subtree
    count serializations
    mark nodes with count > 1 for deletion
    collect remaining paths
    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × L) where L = max path length |
| **Space** | O(n × L) |

---

## Key Takeaway

> **Subtree deduplication via serialization: serialize each subtree bottom-up into a canonical string, count occurrences, and delete any subtree whose serialization appears more than once.**
