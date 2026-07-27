# 1759. Count Number of Homogenous Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-number-of-homogenous-substrings](https://leetcode.com/problems/count-number-of-homogenous-substrings)
**Companies:** Google, Virtu

---

## 1. Problem Description

Given a string `s`, count the number of **homogenous** substrings (substrings where all characters are the same). Return modulo 10^9+7.

---

## 2. Key Insight

> Group consecutive identical characters. A run of length `k` contributes `k × (k + 1) / 2` homogenous substrings.

---

## 3. Approach: Group Runs — O(n) ✅

```
FUNCTION countHomogenous(s):
    MOD = 10^9 + 7
    count = 0
    run = 1
    FOR i FROM 1 TO len(s) - 1:
        IF s[i] == s[i-1]:
            run += 1
        ELSE:
            count = (count + run * (run + 1) / 2) % MOD
            run = 1
    count = (count + run * (run + 1) / 2) % MOD
    RETURN count
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> A run of `k` identical characters yields `k(k+1)/2` substrings. Just track run lengths and sum the triangular numbers.
