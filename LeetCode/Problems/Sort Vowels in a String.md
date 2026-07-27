# 2785. Sort Vowels in a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sort-vowels-in-a-string](https://leetcode.com/problems/sort-vowels-in-a-string)
**Companies:** Amazon, Google, Meta, Microsoft

---

```
FUNCTION sortVowels(s):
    vowels = sorted([c for c in s if c.lower() in 'aeiou'])
    result = list(s); j = 0
    FOR i ← 0 TO len(s) - 1:
        IF s[i].lower() in 'aeiou':
            result[i] = vowels[j]; j += 1
    RETURN JOIN(result)
```
