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

Given an array of strings, return the words that can be typed using letters from only **one row** of an American QWERTY keyboard.

---

## 2. Examples

| words | Output |
|-------|--------|
| ["Hello","Alaska","Dad","Peace"] | ["Alaska","Dad"] |
| ["omg","lol","zoo"] | ["omg","lol"] |

*Explanation:* "Alaska" and "Dad" use only the middle row, while "Hello" mixes rows.

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
