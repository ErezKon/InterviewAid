# 942. DI String Match

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/di-string-match](https://leetcode.com/problems/di-string-match)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description

A permutation `perm` of `n + 1` integers of all the integers in the range `[0, n]` can be represented as a string `s` of length `n` where:

- `s[i] == 'I'` if `perm[i] < perm[i + 1]`, and
- `s[i] == 'D'` if `perm[i] > perm[i + 1]`.

Given a string `s`, reconstruct the permutation `perm` and return it. If there are multiple valid permutations `perm`, return **any of them**.

**Constraints:**

- `1 <= s.length <= 10^5`
- `s[i]` is either `'I'` or `'D'`.

---

## Examples

```
Example 1:
  Input: s = "IDID"
  Output: [0,4,1,3,2]
```

```
Example 2:
  Input: s = "III"
  Output: [0,1,2,3]
```

```
Example 3:
  Input: s = "DDI"
  Output: [3,2,0,1]
```

---

## Key Insight

> Greedy: for 'I', place the smallest remaining number (guarantees the next is larger). For 'D', place the largest remaining (guarantees the next is smaller). Use two pointers `lo` and `hi`.

---

## Approach: Two Pointers Greedy ✅

```text
FUNCTION diStringMatch(s):
    lo ← 0
    hi ← LENGTH(s)
    result ← []
    FOR c IN s:
        IF c == 'I':
            APPEND lo TO result
            lo ← lo + 1
        ELSE:
            APPEND hi TO result
            hi ← hi - 1
    APPEND lo TO result  // lo == hi now
    RETURN result
```

---

## Walkthrough

```text
s = "IDID"  →  n = 4, lo=0, hi=4

I → add 0, lo=1
D → add 4, hi=3
I → add 1, lo=2
D → add 3, hi=2
Final: add lo=2

Result: [0, 4, 1, 3, 2]  →  0<4, 4>1, 1<3, 3>2 ✅
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Single pass |
| **Space** | O(n) | Result array |

---

## Key Takeaway

> **Greedy two-pointer: 'I' takes the smallest available, 'D' takes the largest. This always produces a valid permutation in one pass.**