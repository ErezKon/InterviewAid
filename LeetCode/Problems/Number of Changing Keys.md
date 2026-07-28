# 3019. Number of Changing Keys

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-changing-keys](https://leetcode.com/problems/number-of-changing-keys)
**Companies:** Amazon, Apple, Autodesk, Capital One, Visa

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Linear Scan — O(n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Count the number of times the key changes while typing string `s`. Case changes (e.g., `a` → `A`) are not key changes.

---

## 2. Examples

| Input | Output |
|-------|--------|
| `"abAB"` | `2` |
| `"aAaA"` | `0` |
| `"abcde"` | `4` |

*Explanation*: In `"abAB"`, transitions are `a→b` (change), `b→A` (same key, different case), `A→B` (change). Total changes = 2.

---

## 3. Approach: Linear Scan — O(n) ✅

```text
FUNCTION countKeyChanges(s):
    SET changes ← 0
    FOR i ← 1 TO LENGTH(s) - 1:
        IF LOWER(s[i]) != LOWER(s[i-1]):
            INCREMENT changes
    RETURN changes
```

---

## 4. Walkthrough

Consider `s = "abAB"`.

| i | s[i-1] | s[i] | LOWER(s[i-1]) | LOWER(s[i]) | Change? |
|---|--------|------|---------------|------------|---------|
| 1 | a | b | a | b | Yes |
| 2 | b | A | b | a | No (same key) |
| 3 | A | B | a | b | Yes |

`changes` increments twice, yielding result `2`.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass over the string |
| **Space** | O(1) — constant extra memory |

---

## 6. Key Takeaway

> **Case-insensitive consecutive comparison.** Compare `lower()` of adjacent characters. Count transitions.
