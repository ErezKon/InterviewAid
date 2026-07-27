# 418. Sentence Screen Fitting

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sentence-screen-fitting](https://leetcode.com/problems/sentence-screen-fitting)
**Companies:** Google

---

## Problem Description

Given a sentence (array of words), a screen with `rows` and `cols`, fit the sentence repeatedly onto the screen. Return how many times the full sentence fits.

---

## Approach: Simulate with Optimization — O(rows · words) ✅

```
FUNCTION wordsTyping(sentence, rows, cols):
    s = JOIN(sentence, ' ') + ' '
    n = len(s)
    ptr = 0

    FOR row ← 0 TO rows - 1:
        ptr += cols
        IF s[ptr % n] == ' ':
            ptr += 1
        ELSE:
            WHILE ptr > 0 AND s[(ptr - 1) % n] != ' ':
                ptr -= 1

    RETURN ptr / n
```

Flatten sentence into one string with spaces. Track position in the repeated string.
