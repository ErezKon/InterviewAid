# 3713. Longest Balanced Substring I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-balanced-substring-i](https://leetcode.com/problems/longest-balanced-substring-i)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## 1. Problem Description

Find the longest substring where each distinct character appears the same number of times.

---

## 2. Approach: Sliding Window / Prefix State — O(n·k) ✅

```
// For each possible number of distinct chars (1..26):
//   Sliding window tracking frequencies
//   Valid when all present chars have equal count
// OR use normalized prefix state hashing
```

| Time | Space |
|------|-------|
| O(26 · n) = O(n) | O(26) = O(1) |

---

## 3. Key Takeaway

> Either enumerate the target number of distinct characters with sliding window, or use normalized prefix state hashing. Both yield O(n) overall.
