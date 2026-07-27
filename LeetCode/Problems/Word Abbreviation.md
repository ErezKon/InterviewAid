# 527. Word Abbreviation

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/word-abbreviation](https://leetcode.com/problems/word-abbreviation)
**Companies:** Amazon, Applied Intuition, Google, Snapchat

---

```
FUNCTION wordsAbbreviation(words):
    n = len(words)
    prefix = [1] * n
    result = [abbr(w, 1) for w in words]

    FOR i ← 0 TO n - 1:
        WHILE true:
            dups = set()
            FOR j ← i + 1 TO n - 1:
                IF result[j] == result[i]: dups.ADD(j)
            IF NOT dups: BREAK
            dups.ADD(i)
            FOR j IN dups:
                prefix[j] += 1
                result[j] = abbr(words[j], prefix[j])

    RETURN result

FUNCTION abbr(word, k):
    IF len(word) - k <= 2: RETURN word
    RETURN word[:k] + str(len(word) - k - 1) + word[-1]
```
