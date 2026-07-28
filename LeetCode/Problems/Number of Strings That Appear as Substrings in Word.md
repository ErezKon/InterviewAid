# 1967. Number of Strings That Appear as Substrings in Word

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-strings-that-appear-as-substrings-in-word](https://leetcode.com/problems/number-of-strings-that-appear-as-substrings-in-word)
**Companies:** Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Simple Check — O(n · m)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an array of strings `patterns` and a string `word`, count how many strings in `patterns` appear as substrings of `word`.

---

## 2. Examples

| patterns | word | Output | Explanation |
|----------|------|--------|-------------|
| `["a","abc","bc","d"]` | `abc` | `3` | "a", "abc", and "bc" are substrings of "abc". |
| `["a","b","c"]` | `aaaaa` | `1` | Only "a" appears as a substring. |
| `[]` | `any` | `0` | No patterns to check. |

---

## 3. Approach: Simple Check — O(n · m) ✅

```text
FUNCTION numOfStrings(patterns, word):
    SET count ← 0
    FOR each p IN patterns:
        IF p IS SUBSTRING OF word:
            SET count ← count + 1
    RETURN count
```

---

## 4. Walkthrough

**Example:** `patterns = ["a","abc","bc","d"]`, `word = "abc"`

| Step | p | Is p in word? | count |
|------|---|---------------|-------|
| 1    | "a"   | yes | 1 |
| 2    | "abc" | yes | 2 |
| 3    | "bc"  | yes | 3 |
| 4    | "d"   | no  | 3 |

The final count is 3.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · m) where n = number of patterns, m = length of `word` |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

1. How would you improve the solution for large inputs where `patterns` and `word` are very long?
2. Can you adapt the algorithm to return the list of matching patterns instead of just the count?
3. How would you handle case‑insensitive substring checks?

---

## 7. Key Takeaway

> **Direct substring checks are simple and effective for small inputs.** For large-scale matching, consider building a trie or using the Aho‑Corasick algorithm.
