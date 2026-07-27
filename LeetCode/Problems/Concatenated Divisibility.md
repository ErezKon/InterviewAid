# 3533. Concatenated Divisibility

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/concatenated-divisibility](https://leetcode.com/problems/concatenated-divisibility)
**Companies:** Meta

---

## 1. Problem Description

Given an array `nums` and integer `k`, find all permutations of `nums` such that concatenating all numbers in order forms a number divisible by `k`. Return the lexicographically smallest such permutation, or empty if none exists.

---

## 2. Key Insight

> Use bitmask DP tracking `(used_mask, remainder_mod_k)`. When concatenating number `x` to a value with remainder `r`, the new remainder is `(r × 10^digits(x) + x) % k`. Precompute `10^digits(x) % k` for each element.

---

## 3. Approach: Bitmask DP — O(2^n × k × n) ✅

```
FUNCTION concatenatedDivisibility(nums, k):
    n = len(nums)
    SORT nums  // for lexicographic smallest
    
    // precompute shift[i] = 10^(digits of nums[i]) % k
    shift = [pow(10, len(str(nums[i])), k) for i in range(n)]
    
    // dp[mask][rem] = true if reachable
    // backtrack to find lexicographically smallest
    dp = [dict() for _ in range(1 << n)]
    dp[0][0] = -1  // base: empty, remainder 0
    
    FOR mask FROM 0 TO (1 << n) - 1:
        FOR rem IN dp[mask]:
            FOR i FROM 0 TO n-1:
                IF mask & (1 << i): CONTINUE
                // skip duplicates for lex smallest
                newRem = (rem * shift[i] + nums[i]) % k
                newMask = mask | (1 << i)
                IF newRem NOT IN dp[newMask]:
                    dp[newMask][newRem] = (mask, rem, i)
    
    fullMask = (1 << n) - 1
    IF 0 NOT IN dp[fullMask]: RETURN []
    // backtrack to reconstruct
    ...
```

| Time | Space |
|------|-------|
| O(2^n × k × n) | O(2^n × k) |

---

## Key Takeaway

> Concatenation divisibility is tracked via modular arithmetic on the remainder. Bitmask DP over permutations with remainder state efficiently handles small `n` (≤ 15–20).
