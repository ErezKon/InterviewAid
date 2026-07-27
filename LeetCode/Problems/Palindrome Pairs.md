# 336. Palindrome Pairs

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/palindrome-pairs](https://leetcode.com/problems/palindrome-pairs)
**Companies:** Airbnb, Amazon, Goldman Sachs, Google, Meta, Microsoft, Wix

---

## Approach: Hash Map + Suffix/Prefix Check — O(n·k²) ✅

```
FUNCTION palindromePairs(words):
    wordMap = {word: i for i, word in enumerate(words)}
    result = []

    FOR i, word IN enumerate(words):
        FOR j ← 0 TO len(word):
            prefix = word[:j]
            suffix = word[j:]

            // If prefix is palindrome, reverse(suffix) + word is palindrome
            IF isPalindrome(prefix):
                rev = REVERSE(suffix)
                IF rev IN wordMap AND wordMap[rev] != i:
                    result.ADD([wordMap[rev], i])

            // If suffix is palindrome, word + reverse(prefix) is palindrome
            IF j < len(word) AND isPalindrome(suffix):
                rev = REVERSE(prefix)
                IF rev IN wordMap AND wordMap[rev] != i:
                    result.ADD([i, wordMap[rev]])

    RETURN result
```
