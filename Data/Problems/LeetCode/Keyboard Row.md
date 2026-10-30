# 500. Keyboard Row

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/keyboard-row](https://leetcode.com/problems/keyboard-row)
**Companies:** Amazon, Google, Mathworks, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Set Subset Check — O(n·m) ✅](#4-approach-set-subset-check---onm---✅)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array of strings `words`, return *the words that can be typed using letters of the alphabet on only one row of American keyboard like the image below*.

**Note** that the strings are **case-insensitive**, both lowercased and uppercased of the same letter are treated as if they are at the same row.

In the **American keyboard**:

- the first row consists of the characters `"qwertyuiop"`,
- the second row consists of the characters `"asdfghjkl"`, and
- the third row consists of the characters `"zxcvbnm"`.

![img](https://assets.leetcode.com/uploads/2018/10/12/keyboard.png)

**Constraints:**
- `1 <= words.length <= 20`
- `1 <= words[i].length <= 100`
- `words[i]` consists of English letters (both lowercase and uppercase).

---

## 2. Examples

**Example 1:**
```
Input: words = ["Hello","Alaska","Dad","Peace"]
Output: ["Alaska","Dad"]
Explanation: Both "a" and "A" are in the 2nd row of the American keyboard due to case insensitivity.
```

**Example 2:**
```
Input: words = ["omk"]
Output: []
```

**Example 3:**
```
Input: words = ["adsdf","sfd"]
Output: ["adsdf","sfd"]
```

---

## 3. Key Insight

Represent each keyboard row as a set of characters. A word is valid if its character set is a subset of any row set.

---

## 4. Approach: Set Subset Check — O(n·m) ✅

```text
FUNCTION findWords(words):
    SET rows ← [SET('qwertyuiop'), SET('asdfghjkl'), SET('zxcvbnm')]
    SET result ← []
    FOR word IN words:
        SET w ← SET(word.lower())
        IF ANY(w <= row FOR row IN rows):
            APPEND word TO result
    RETURN result
```

---

## 5. Walkthrough

**Example:** `words = ["Hello","Alaska","Dad","Peace"]`

| word | w (set) | Subset of row? | Action |
|------|---------|----------------|--------|
| Hello | {h,e,l,o} | No (mixes rows) | skip |
| Alaska | {a,l,s,k} | Yes (middle row) | add |
| Dad | {d,a} | Yes (middle row) | add |
| Peace | {p,e,a,c} | No (mixes rows) | skip |

Result → `["Alaska","Dad"]`.

---

## 6. Complexity Analysis

| Metric | Value |
|--------|-------|
| Time | O(n·m) – n words, m average length |
| Space | O(1) – constant row sets, output list excluded |

---

## 7. Follow-Up Questions

1. How would you adapt the solution for a different keyboard layout?
2. Can you solve it without using explicit sets, e.g., with bit‑masking?
3. What is the runtime if the input contains millions of words?

---

## 8. Key Takeaway

> Convert each word to a set of lowercase characters and check if it is a subset of any keyboard row set. This yields a clean, O(n·m) solution.
