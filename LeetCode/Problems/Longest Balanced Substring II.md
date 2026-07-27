# 3714. Longest Balanced Substring II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-balanced-substring-ii](https://leetcode.com/problems/longest-balanced-substring-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## 1. Problem Description

Find the longest substring with balanced character distribution (each character appears equally).

---

## 2. Approach: Normalized Prefix State — O(n·k) ✅

```
// Track counts of each character
// Normalize by subtracting one reference count
// Hash the normalized state → first occurrence
// Same state at two indices → balanced substring between
```

| Time | Space |
|------|-------|
| O(n · k) | O(n) |

---

## 3. Key Takeaway

> Normalize frequency counts and hash the state. Same normalized state at two positions means a balanced substring between them.
