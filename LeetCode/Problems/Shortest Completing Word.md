# 748. Shortest Completing Word

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/shortest-completing-word](https://leetcode.com/problems/shortest-completing-word)
**Companies:** Google

---

## Problem Description

Given a license plate string and an array of words, find the shortest word that contains all letters from the license plate (ignoring case, digits, spaces).

---

## Approach

```
FUNCTION shortestCompletingWord(licensePlate, words):
    target ← Counter of lowercase letters in licensePlate
    best ← null
    FOR word IN words:
        wCount ← Counter(word.lower())
        IF all(wCount[c] >= target[c] for c in target):
            IF best == null OR len(word) < len(best):
                best ← word
    RETURN best
```

| Time | Space |
|------|-------|
| O(n·w) | O(26) |
