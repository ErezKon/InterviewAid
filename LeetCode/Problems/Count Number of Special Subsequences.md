# 1955. Count Number of Special Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-number-of-special-subsequences](https://leetcode.com/problems/count-number-of-special-subsequences)
**Companies:** Amazon

---

## 1. Problem Description

Given an array `nums` consisting of only 0, 1, and 2, count the number of **special subsequences**: subsequences of the form `0, 0, ..., 0, 1, 1, ..., 1, 2, 2, ..., 2` (one or more of each). Return modulo 10^9+7.

---

## 2. Key Insight

> Track three DP states: `a` = number of subsequences using only 0s, `b` = subsequences of 0s followed by 1s, `c` = complete subsequences (0s, then 1s, then 2s). Each new element extends or doubles the relevant state.

---

## 3. Approach: Three-State DP — O(n) ✅

```
FUNCTION countSpecialSubsequences(nums):
    MOD = 10^9 + 7
    a = b = c = 0  // subsequences ending in phase 0, 1, 2
    
    FOR num IN nums:
        IF num == 0:
            a = (2 * a + 1) % MOD   // extend existing or start new
        ELSE IF num == 1:
            b = (2 * b + a) % MOD   // extend existing or transition from a
        ELSE:  // num == 2
            c = (2 * c + b) % MOD   // extend existing or transition from b
    
    RETURN c
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Classic three-phase subsequence counting: each element either extends an existing subsequence of its phase or transitions from the previous phase. The doubling accounts for include/exclude.
