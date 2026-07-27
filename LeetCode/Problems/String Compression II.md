# 1531. String Compression II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/string-compression-ii](https://leetcode.com/problems/string-compression-ii)
**Companies:** Amazon, Github, Google, Microsoft, Toptal

---

## Approach: DP — O(n²k) ✅

```
FUNCTION getLengthOfOptimalCompression(s, k):
    n = len(s)
    memo = {}

    FUNCTION dp(i, k):
        IF k < 0: RETURN infinity
        IF i >= n: RETURN 0
        IF (i, k) IN memo: RETURN memo[(i, k)]

        // Option 1: delete s[i]
        result = dp(i + 1, k - 1)

        // Option 2: keep s[i] and count consecutive same chars
        same = diff = 0
        FOR j ← i TO n - 1:
            IF s[j] == s[i]: same += 1
            ELSE: diff += 1
            IF diff > k: BREAK
            result = MIN(result, encodedLen(same) + dp(j + 1, k - diff))

        memo[(i, k)] = result
        RETURN result

    RETURN dp(0, k)
```
