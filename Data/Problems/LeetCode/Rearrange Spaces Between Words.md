# 1592. Rearrange Spaces Between Words

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/rearrange-spaces-between-words](https://leetcode.com/problems/rearrange-spaces-between-words)
**Companies:** Google

---

## Problem Description
Given a string `text` consisting of words separated by spaces, redistribute the spaces so that the number of spaces between each pair of adjacent words is equal and as large as possible. Any leftover spaces should be placed at the end of the string. Return the resulting string.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| "  this   is  a sentence " | "this   is   a   sentence" | 9 spaces, 4 words → 3 spaces between each, 0 trailing. |
| " practice   makes   perfect" | "practice makes perfect  " | 7 spaces, 3 words → 3 spaces between, 1 trailing. |

## Approach
1. Count total spaces in `text`.
2. Split `text` by whitespace to obtain the list of words.
3. If there is only one word, return the word followed by all spaces.
4. Otherwise compute `spaceBetween = totalSpaces // (wordCount-1)` and `trailing = totalSpaces % (wordCount-1)`.
5. Join the words with `spaceBetween` spaces and append `trailing` spaces.

```text
FUNCTION reorderSpaces(text):
    totalSpaces ← COUNT of ' ' in text
    words ← SPLIT text BY WHITESPACE (ignore empty strings)
    IF LENGTH(words) == 1:
        RETURN words[0] + REPEAT(' ', totalSpaces)
    spaceBetween ← totalSpaces DIV (LENGTH(words) - 1)
    trailing ← totalSpaces MOD (LENGTH(words) - 1)
    middle ← JOIN(words, REPEAT(' ', spaceBetween))
    RETURN middle + REPEAT(' ', trailing)
```

## Walkthrough
`text = "  this   is  a sentence "`
- totalSpaces = 9, words = ["this","is","a","sentence"]
- spaceBetween = 9 // 3 = 3, trailing = 9 % 3 = 0
- middle = "this   is   a   sentence"
- result = middle (no trailing spaces).

## Complexity Analysis
- **Time:** O(L) where L is the length of the input string (single pass for counting and splitting).
- **Space:** O(W) for the list of words, where W ≤ L.

## Follow-Up Questions
1. How would you modify the solution to preserve the original order of multiple consecutive spaces within words?
2. Can the algorithm be performed in‑place on a mutable character array?
3. How to handle Unicode whitespace characters beyond the ASCII space?

## Key Takeaway
Count spaces, compute equal distribution between words, and place any remainder at the end.
