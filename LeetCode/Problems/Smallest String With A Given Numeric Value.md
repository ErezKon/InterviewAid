# 1663. Smallest String With A Given Numeric Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-string-with-a-given-numeric-value](https://leetcode.com/problems/smallest-string-with-a-given-numeric-value)
**Companies:** Lendingkart

---

## Problem Description

Given two integers `n` (string length) and `k` (target numeric value where a=1, b=2, ..., z=26), return the lexicographically smallest string of length `n` with numeric value `k`.

### Examples

- **Input:** `n = 3, k = 27` → **Output:** `"aay"` (1+1+25 = 27)
- **Input:** `n = 5, k = 73` → **Output:** `"aaszz"` (1+1+19+26+26 = 73)

## Approach: Greedy from Right — O(n) ✅

**Key Insight:** Start with all 'a's (cost n). Greedily fill from the right with the largest possible character to use up remaining value.

```
FUNCTION getSmallestString(n, k):
    result = ['a'] * n
    remaining = k - n          // already spent 1 per position

    FOR i ← n - 1 DOWN TO 0:
        add = MIN(25, remaining)
        result[i] = chr(ord('a') + add)
        remaining -= add
        IF remaining == 0: BREAK

    RETURN JOIN(result)
```

### Walkthrough (n=3, k=27)

| Step | i | remaining | add | result |
|------|---|-----------|-----|--------|
| Init | — | 24 | — | [a,a,a] |
| 1 | 2 | 24 | 24 | [a,a,y] |
| 2 | 1 | 0 | 0 | done |

### Complexity

| | |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |
