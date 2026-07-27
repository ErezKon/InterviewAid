# 2531. Make Number of Distinct Characters Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-number-of-distinct-characters-equal](https://leetcode.com/problems/make-number-of-distinct-characters-equal)
**Companies:** Google

---

## 1. Problem Description

Swap exactly one character between two strings. Check if it's possible to make both have the same number of distinct characters.

---

## 2. Approach: Enumerate All 26×26 Swaps — O(26²) ✅

```
// Count distinct chars in each string
// For each pair (a, b) where a ∈ word1, b ∈ word2:
//   Simulate the swap: move a from word1→word2, b from word2→word1
//   Check if distinct counts become equal
```

| Time | Space |
|------|-------|
| O(n + 26²) | O(1) |

---

## 3. Key Takeaway

> Only 26×26 = 676 possible swaps to try. For each, compute the effect on distinct counts: removing a char that had count 1 decreases distinct by 1, adding a new char increases by 1.
