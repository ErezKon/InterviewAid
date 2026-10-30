# 418. Sentence Screen Fitting

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sentence-screen-fitting](https://leetcode.com/problems/sentence-screen-fitting)
**Companies:** Google

---

## Problem Description

Given a `rows x cols` screen and a `sentence` represented as a list of strings, return *the number of times the given sentence can be fitted on the screen*.

The order of words in the sentence must remain unchanged, and a word cannot be split into two lines. A single space must separate two consecutive words in a line.

**Constraints:**

- `1 <= sentence.length <= 100`
- `1 <= sentence[i].length <= 10`
- `sentence[i]` consists of lowercase English letters.
- `1 <= rows, cols <= 2 * 10^4`

---

## Examples

```
Example 1:
  Input: sentence = ["hello","world"], rows = 2, cols = 8
  Output: 1
  Explanation:
  hello---
  world---
  The character '-' signifies an empty space on the screen.
```

```
Example 2:
  Input: sentence = ["a", "bcd", "e"], rows = 3, cols = 6
  Output: 2
  Explanation:
  a-bcd-
  e-a---
  bcd-e-
  The character '-' signifies an empty space on the screen.
```

```
Example 3:
  Input: sentence = ["i","had","apple","pie"], rows = 4, cols = 5
  Output: 1
  Explanation:
  i-had
  apple
  pie-i
  had--
  The character '-' signifies an empty space on the screen.
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
