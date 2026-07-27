# 916. Word Subsets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/word-subsets](https://leetcode.com/problems/word-subsets)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Zoho

---

```
FUNCTION wordSubsets(words1, words2):
    // Compute max frequency across all words in words2
    maxFreq = [0] * 26
    FOR word IN words2:
        freq = Counter(word)
        FOR c, count IN freq.items():
            maxFreq[ord(c) - ord('a')] = MAX(maxFreq[...], count)

    result = []
    FOR word IN words1:
        freq = Counter(word)
        IF all(freq[chr(i + ord('a'))] >= maxFreq[i] for i in range(26)):
            result.ADD(word)

    RETURN result
```

Merge all words2 into one max-frequency requirement. Check each word1 against it.
