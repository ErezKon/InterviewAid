# 824. Goat Latin

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/goat-latin](https://leetcode.com/problems/goat-latin)
**Companies:** Apple, Meta, Microsoft

---

## 1. Problem Description

Apply Goat Latin rules: vowel-starting words get `"ma"` appended; consonant-starting words move the first letter to end then add `"ma"`. Add `i+1` `'a'`s to the i-th word.

## 2. Approach: String Processing — O(n) ✅

```
FUNCTION toGoatLatin(sentence):
    vowels = SET('aeiouAEIOU')
    words = sentence.split()
    result = []
    FOR i, word IN enumerate(words):
        IF word[0] IN vowels: word += 'ma'
        ELSE: word = word[1:] + word[0] + 'ma'
        word += 'a' * (i + 1)
        result.ADD(word)
    RETURN JOIN(result, ' ')
```

## Key Takeaway

> Process each word by checking first letter, apply transformation, append increasing `'a'`s.
