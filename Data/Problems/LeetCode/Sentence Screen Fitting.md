# 418. Sentence Screen Fitting

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sentence-screen-fitting](https://leetcode.com/problems/sentence-screen-fitting)
**Companies:** Google

---

## Problem Description

Given a sentence (array of words), a screen with `rows` and `cols`, fit the sentence repeatedly onto the screen. Return how many times the full sentence fits.

---

## Examples

**Example 1:**
```
sentence = ["hello","world"], rows = 2, cols = 8
Output: 1
Explanation: The screen can show "hello   " on the first row and "world   " on the second row, fitting the sentence once.
```

**Example 2:**
```
sentence = ["a","bcd","e"], rows = 3, cols = 6
Output: 2
Explanation: The screen displays:
Row1: "a bcd "
Row2: "e a   "
Row3: "bcd e "
The sentence fits twice.
```

---

## Approach: Simulate with Optimization — O(rows · words) ✅

```text
FUNCTION wordsTyping(sentence, rows, cols):
    // Join words with spaces and add trailing space
    s ← JOIN(sentence, ' ') + ' '
    n ← LENGTH(s)
    ptr ← 0

    FOR row ← 0 TO rows - 1:
        ptr ← ptr + cols
        // If pointer lands on a space, move to next character
        IF s[ptr % n] == ' ':
            ptr ← ptr + 1
        ELSE:
            // Move back to the previous space
            WHILE ptr > 0 AND s[(ptr - 1) % n] != ' ':
                ptr ← ptr - 1

    RETURN ptr / n
```

Flatten sentence into one string with spaces. Track position in the repeated string.

---

## Walkthrough

| Step | Row | Pointer after row (ptr) | Action |
|------|-----|------------------------|--------|
| 1 | 0 | ptr = cols = 8 | `ptr % n = 8`, character is space → ptr = 9 |
| 2 | 1 | ptr = 9 + 8 = 17 | `ptr % n = 1`, not space → move back to previous space at index 0 → ptr = 0 |
| End | – | ptr = 9 | `ptr / n = 9 / 12 = 0` full sentences → after two rows we have completed one full sentence |

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| Time   | O(rows × average words per row) — effectively O(rows) after preprocessing |
| Space  | O(1) — only constant extra variables |

---

## Follow-Up Questions

1. How would you adapt the algorithm if words could be hyphenated across lines?
2. Can you compute the result without iterating over each row, using mathematical shortcuts?
3. How does the solution change if the screen can wrap vertically (torus topology)?

---

## Key Takeaway

> Flatten the sentence into a cyclic string and simulate row by row, adjusting the pointer to the nearest space. This yields an O(rows) solution.
