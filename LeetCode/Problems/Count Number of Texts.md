# 2266. Count Number of Texts

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-number-of-texts](https://leetcode.com/problems/count-number-of-texts)
**Companies:** Amazon, Goldman Sachs, Microsoft

---

```
FUNCTION countTexts(pressedKeys):
    MOD = 10^9 + 7
    n = len(pressedKeys)
    dp = [0] * (n + 1)
    dp[0] = 1

    FOR i ← 1 TO n:
        dp[i] = dp[i-1]
        maxLen = 4 IF pressedKeys[i-1] IN '79' ELSE 3
        FOR j ← 2 TO maxLen:
            IF i - j >= 0 AND pressedKeys[i-j] == pressedKeys[i-1]:
                dp[i] = (dp[i] + dp[i-j]) % MOD
            ELSE:
                BREAK

    RETURN dp[n]
```

Like decode ways. Keys 7 and 9 have 4 letters, others have 3.
