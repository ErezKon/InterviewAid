# 1592. Rearrange Spaces Between Words

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/rearrange-spaces-between-words](https://leetcode.com/problems/rearrange-spaces-between-words)
**Companies:** Google

---

## Problem Description
You are given a string `text` of words that are placed among some number of spaces. Each word consists of one or more lowercase English letters and are separated by at least one space. It's guaranteed that `text` **contains at least one word**.

Rearrange the spaces so that there is an **equal** number of spaces between every pair of adjacent words and that number is **maximized**. If you cannot redistribute all the spaces equally, place the **extra spaces at the end**, meaning the returned string should be the same length as `text`.

Return *the string after rearranging the spaces*.

**Constraints:**

- `1 <= text.length <= 100`
- `text` consists of lowercase English letters and `' '`.
- `text` contains at least one word.

## Examples

```
Example 1:
  Input: text = "  this   is  a sentence "
  Output: "this   is   a   sentence"
  Explanation: There are a total of 9 spaces and 4 words. We can evenly divide the 9 spaces between the words: 9 / (4-1) = 3 spaces.
```

```
Example 2:
  Input: text = " practice   makes   perfect"
  Output: "practice   makes   perfect "
  Explanation: There are a total of 7 spaces and 3 words. 7 / (3-1) = 3 spaces plus 1 extra space. We place this extra space at the end of the string.
```

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
