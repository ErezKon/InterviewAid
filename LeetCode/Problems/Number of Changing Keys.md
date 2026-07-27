# 3019. Number of Changing Keys

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-changing-keys](https://leetcode.com/problems/number-of-changing-keys)
**Companies:** Amazon, Apple, Autodesk, Capital One, Visa

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Linear Scan — O(n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Count the number of times the key changes while typing string `s`. Case changes (e.g., `a` → `A`) are not key changes.

---

## 2. Approach: Linear Scan — O(n) ✅

```
FUNCTION countKeyChanges(s):
    RETURN SUM(1 for i in range(1, len(s)) if s[i].lower() != s[i-1].lower())
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **Case-insensitive consecutive comparison.** Compare `lower()` of adjacent characters. Count transitions.
