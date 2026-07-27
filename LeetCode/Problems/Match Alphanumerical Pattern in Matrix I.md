# 3078. Match Alphanumerical Pattern in Matrix I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/match-alphanumerical-pattern-in-matrix-i](https://leetcode.com/problems/match-alphanumerical-pattern-in-matrix-i)
**Companies:** Uber, Visa

---

## 1. Problem Description

Find the top-left position where a pattern (digits and letters) matches a submatrix. Digits match exactly, letters are wildcards with consistent mapping.

---

## 2. Approach: Brute Force with Mapping — O(m·n·p·q) ✅

```
// For each possible top-left position:
//   Try to match pattern to submatrix
//   Digits: exact match
//   Letters: track mapping (letter → digit), ensure consistency
```

| Time | Space |
|------|-------|
| O(m · n · p · q) | O(26) |

---

## 3. Key Takeaway

> Brute force all positions. For letter wildcards, maintain a bidirectional mapping (letter↔digit) to ensure consistency within each match attempt.
