# 3486. Longest Special Path II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-special-path-ii](https://leetcode.com/problems/longest-special-path-ii)
**Companies:** Google

---

## 1. Problem Description

Find the longest path in a weighted tree where all node values are distinct along the path. Variant with additional constraints.

---

## 2. Approach: DFS + Sliding Window on Path ✅

```
// DFS from root, maintain current path
// Track last occurrence of each node value
// Sliding window on the path to ensure all values are distinct
// Track max weighted path length
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Combine tree DFS with a sliding window constraint on the root-to-current path. Backtrack window state when returning from DFS.
