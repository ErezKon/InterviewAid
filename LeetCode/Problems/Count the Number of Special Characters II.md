# 3121. Count the Number of Special Characters II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-special-characters-ii](https://leetcode.com/problems/count-the-number-of-special-characters-ii)
**Companies:** Amazon, Microsoft

---

## Problem Description

A letter is **special** if it appears in both lowercase and uppercase in `word`, AND every occurrence of the lowercase letter comes before every occurrence of the uppercase letter. Count special letters.

---

## Approach

```
FUNCTION numberOfSpecialChars(word):
    lastLower = {}   // char → last index of lowercase
    firstUpper = {}  // char → first index of uppercase
    FOR i, c IN enumerate(word):
        IF c.islower(): lastLower[c] = i
        ELSE: firstUpper[c.lower()] = MIN(firstUpper.get(c.lower(), i), i)

    count = 0
    FOR c IN 'a'..'z':
        IF c IN lastLower AND c IN firstUpper:
            IF lastLower[c] < firstUpper[c]: count += 1
    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(26) = O(1) |

---

## Key Takeaway

> **Track last lowercase index and first uppercase index for each letter. A letter is special if both exist and last_lower < first_upper.**
