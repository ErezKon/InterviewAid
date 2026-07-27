# 3136. Valid Word

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/valid-word](https://leetcode.com/problems/valid-word)
**Companies:** Amazon, Bloomberg, Expedia, Google, Meta, Microsoft, Tcs, Ukg

---

```
FUNCTION isValid(word):
    IF len(word) < 3: RETURN false

    vowels = set('aeiouAEIOU')
    consonants = set('bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ')
    hasVowel = hasConsonant = false

    FOR c IN word:
        IF c.isalpha():
            IF c IN vowels: hasVowel = true
            ELSE: hasConsonant = true
        ELSE IF NOT c.isdigit():
            RETURN false    // special character

    RETURN hasVowel AND hasConsonant
```
