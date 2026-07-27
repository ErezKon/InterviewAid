# 464. Can I Win

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/can-i-win](https://leetcode.com/problems/can-i-win)
**Companies:** Amazon, Google, Linkedin, Meta

---

## Approach: Bitmask DP — O(2^n) ✅

```
FUNCTION canIWin(maxChoosableInteger, desiredTotal):
    IF maxChoosableInteger * (maxChoosableInteger + 1) / 2 < desiredTotal: RETURN false
    memo = {}

    FUNCTION dp(used, remaining):
        IF used IN memo: RETURN memo[used]
        FOR i ← 1 TO maxChoosableInteger:
            IF used & (1 << i): CONTINUE
            IF i >= remaining OR NOT dp(used | (1 << i), remaining - i):
                memo[used] = true
                RETURN true
        memo[used] = false
        RETURN false

    RETURN dp(0, desiredTotal)
```
