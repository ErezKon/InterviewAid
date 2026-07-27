# 1255. Maximum Score Words Formed by Letters

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-score-words-formed-by-letters](https://leetcode.com/problems/maximum-score-words-formed-by-letters)
**Companies:** Amazon, Bloomberg, Google, Meta

---

```
FUNCTION maxScoreWords(words, letters, score):
    available = Counter(letters)
    maxScore = [0]

    FUNCTION backtrack(idx, remaining, currScore):
        maxScore[0] = MAX(maxScore[0], currScore)
        FOR i ← idx TO len(words) - 1:
            wordCount = Counter(words[i])
            IF all(remaining[c] >= wordCount[c] for c in wordCount):
                FOR c IN wordCount: remaining[c] -= wordCount[c]
                wordScore = SUM(score[ord(c) - ord('a')] * wordCount[c] for c in wordCount)
                backtrack(i + 1, remaining, currScore + wordScore)
                FOR c IN wordCount: remaining[c] += wordCount[c]

    backtrack(0, available, 0)
    RETURN maxScore[0]
```
