# 3541. Find Most Frequent Vowel and Consonant

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google, Meta
---

```
FUNCTION maxFreqSum(s):
    vowels = Counter(c for c in s if c in 'aeiou')
    consonants = Counter(c for c in s if c not in 'aeiou')
    RETURN (max(vowels.values()) if vowels else 0) + (max(consonants.values()) if consonants else 0)
```
