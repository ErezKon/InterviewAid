# 784. Letter Case Permutation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/letter-case-permutation](https://leetcode.com/problems/letter-case-permutation)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok, Yelp

---

## 1. Problem Description

Given a string of letters and digits, return all strings formed by toggling each letter's case. Digits stay fixed.

---

## 2. Approach: Iterative BFS — O(2^L · n) ✅

```
FUNCTION letterCasePermutation(s):
    result = [""]
    FOR char IN s:
        IF char.isdigit():
            result = [r + char for r in result]
        ELSE:
            result = [r + char.lower() for r in result] + [r + char.upper() for r in result]
    RETURN result
```

| Time | Space |
|------|-------|
| O(2^L · n) where L = # letters | O(2^L · n) |

---

## 3. Key Takeaway

> At each letter, branch into lowercase and uppercase (doubles the result set). Digits just extend all existing strings. Can also solve with backtracking.
