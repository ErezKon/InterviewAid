# 2572. Count the Number of Square-Free Subsets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-square-free-subsets](https://leetcode.com/problems/count-the-number-of-square-free-subsets)
**Companies:** Google, Medianet

---

## Problem Description

A subset is **square-free** if the product of its elements has no perfect square factor other than 1. Count non-empty square-free subsets modulo `10^9 + 7`.

**Constraints:**
- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 30`

---

## Key Insight

Since values ≤ 30, the relevant primes are {2, 3, 5, 7, 11, 13, 17, 19, 23, 29} (10 primes). Represent each value's prime factorization as a **bitmask**. The product is square-free iff no prime appears twice → bitmasks must not overlap. This is a **bitmask DP** problem.

Values with any squared prime factor (4, 8, 9, 12, ...) are inherently invalid and skipped.

---

## Approach

```
FUNCTION squareFreeSubsets(nums):
    MOD = 10^9 + 7
    primes = [2,3,5,7,11,13,17,19,23,29]

    FUNCTION getMask(x):
        mask = 0
        FOR i, p IN enumerate(primes):
            IF x % (p*p) == 0: RETURN -1  // contains p², invalid
            IF x % p == 0: mask |= (1 << i)
        RETURN mask

    dp = [0] * (1 << 10)
    dp[0] = 1

    FOR x IN nums:
        m = getMask(x)
        IF m == -1: CONTINUE
        FOR state ← (1<<10)-1 DOWN TO 0:
            IF (state & m) == 0:
                dp[state | m] = (dp[state | m] + dp[state]) % MOD

    RETURN (SUM(dp) - 1) % MOD   // subtract empty subset
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × 2^10) = O(1024n) |
| **Space** | O(2^10) = O(1024) |

---

## Key Takeaway

> **Square-free product = no prime appears twice. With small values (≤ 30), only 10 primes matter. Bitmask DP on prime usage ensures no overlap. Skip values with squared prime factors.**
