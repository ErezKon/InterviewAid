# 1967. Number of Strings That Appear as Substrings in Word

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-strings-that-appear-as-substrings-in-word](https://leetcode.com/problems/number-of-strings-that-appear-as-substrings-in-word)
**Companies:** Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Simple Check — O(n · m)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Count how many strings in `patterns` appear as substrings of `word`.

---

## 2. Approach: Simple Check — O(n · m) ✅

```
FUNCTION numOfStrings(patterns, word):
    RETURN SUM(1 for p in patterns if p in word)
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · m) where n = patterns length, m = word length |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **Direct substring check.** For small inputs, built-in `in` operator is sufficient. For large scale, use Aho-Corasick.
