# 3352. Count K-Reducible Numbers Less Than N

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-k-reducible-numbers-less-than-n](https://leetcode.com/problems/count-k-reducible-numbers-less-than-n)
**Companies:** Schneider Electric

---

## 1. Problem Description

A number is k-reducible if, after repeatedly replacing it with its popcount (number of set bits), it reaches 1 in at most `k` steps. Count numbers less than `n` (given in binary) that are k-reducible.

---

## 2. Key Insight

> First, precompute `steps[x]` = number of popcount reductions to reach 1, for small `x` (up to ~800, the max popcount of n). Then use **digit DP** on the binary representation of `n` to count numbers with a given popcount, and sum over valid popcounts.

---

## 3. Approach: Digit DP — O(len(n)²) ✅

```
FUNCTION countKReducible(s, k):
    n = len(s)
    MOD = 10^9 + 7
    
    // Precompute steps to reach 1 for small values
    steps = [0] * (n + 1)
    FOR i FROM 2 TO n:
        steps[i] = steps[popcount(i)] + 1
    
    // Digit DP: count binary numbers < s with exactly `b` set bits
    // dp[pos][ones][tight]
    result = 0
    FOR b FROM 1 TO n:
        IF steps[b] < k:  // b itself needs < k more steps (plus 1 for initial reduction)
            result += countWithBits(s, b)  // digit DP for exactly b set bits < s
    
    RETURN result % MOD
```

| Time | Space |
|------|-------|
| O(n²) where n = length of binary string | O(n²) |

---

## Key Takeaway

> Split into: (1) precompute how many steps each popcount value needs, (2) digit DP to count numbers < n with a specific popcount. Sum valid popcounts.
