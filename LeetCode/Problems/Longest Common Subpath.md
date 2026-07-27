# 1923. Longest Common Subpath

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-common-subpath](https://leetcode.com/problems/longest-common-subpath)
**Companies:** Amazon

---

## 1. Problem Description

Given `n` friends walking through cities, find the longest subpath common to all friends' paths.

---

## 2. Approach: Binary Search + Rolling Hash — O(n·L·log L) ✅

```
// Binary search on path length
// For each candidate length, use rolling hash on each friend's path
// Intersect hash sets across all friends
// If intersection non-empty → length is feasible
```

| Time | Space |
|------|-------|
| O(n · L · log L) | O(L) |

---

## 3. Key Takeaway

> Binary search the answer length. For each candidate, compute rolling hashes of all subpaths per friend, then intersect sets. Use double hashing to avoid collisions.
