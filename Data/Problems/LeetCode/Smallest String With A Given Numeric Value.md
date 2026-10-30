# 1663. Smallest String With A Given Numeric Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-string-with-a-given-numeric-value](https://leetcode.com/problems/smallest-string-with-a-given-numeric-value)
**Companies:** Lendingkart

---

## Problem Description

The **numeric value** of a **lowercase character** is defined as its position `(1-indexed)` in the alphabet, so the numeric value of `a` is `1`, the numeric value of `b` is `2`, the numeric value of `c` is `3`, and so on.

The **numeric value** of a **string** consisting of lowercase characters is defined as the sum of its characters' numeric values. For example, the numeric value of the string `"abe"` is equal to `1 + 2 + 5 = 8`.

You are given two integers `n` and `k`. Return *the **lexicographically smallest string** with **length** equal to `n` and **numeric value** equal to `k`.*

Note that a string `x` is lexicographically smaller than string `y` if `x` comes before `y` in dictionary order, that is, either `x` is a prefix of `y`, or if `i` is the first position such that `x[i] != y[i]`, then `x[i]` comes before `y[i]` in alphabetic order.

**Constraints:**
- `1 <= n <= 10⁵`
- `n <= k <= 26 * n`

### Examples

```
Example 1:
  Input: n = 3, k = 27
  Output: "aay"
  Explanation: The numeric value of the string is 1 + 1 + 25 = 27, and it is the smallest string with such a value and length equal to 3.
```

```
Example 2:
  Input: n = 5, k = 73
  Output: "aaszz"
```

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
