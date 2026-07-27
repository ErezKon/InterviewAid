# 472. Concatenated Words

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/concatenated-words](https://leetcode.com/problems/concatenated-words)
**Companies:** Amazon, Ebay, Tiktok

---

```
FUNCTION findAllConcatenatedWordsInADict(words):
    wordSet = SET(words)
    result = []

    FUNCTION canForm(word):
        dp = [false] * (len(word) + 1); dp[0] = true
        FOR i ← 1 TO len(word):
            FOR j ← 0 TO i - 1:
                IF dp[j] AND word[j:i] IN wordSet AND NOT (j == 0 AND i == len(word)):
                    dp[i] = true; BREAK
        RETURN dp[len(word)]

    FOR word IN words:
        IF len(word) > 0 AND canForm(word): result.ADD(word)
    RETURN result
```
