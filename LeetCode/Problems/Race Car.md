# 818. Race Car

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/race-car](https://leetcode.com/problems/race-car)
**Companies:** Amazon, Anduril, Google, Meta, Turing

---

## Approach: BFS or DP — O(t log t) ✅

```
FUNCTION racecar(target):
    dp = [0] * (target + 1)
    FOR t ← 1 TO target:
        k = t.bit_length()
        IF t == (1 << k) - 1:
            dp[t] = k    // exactly 2^k - 1
            CONTINUE
        // Overshoot then reverse
        dp[t] = k + 1 + dp[(1 << k) - 1 - t]
        // Undershoot, reverse, then continue
        FOR j ← 0 TO k - 2:
            remain = t - (1 << (k-1)) + (1 << j)
            dp[t] = MIN(dp[t], k - 1 + j + 2 + dp[remain])
    RETURN dp[target]
```
