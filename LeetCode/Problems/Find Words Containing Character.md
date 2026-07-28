# 2942. Find Words Containing Character

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-words-containing-character](https://leetcode.com/problems/find-words-containing-character)
**Companies:** Amazon, Bloomberg, Deliveroo, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Linear Scan — O(n · L) ✅](#3-approach-linear-scan--on--l-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given an array of strings `words` and a character `x`, return all indices of words that contain `x`.

**Constraints:**
- `1 <= words.length <= 50`

---

## 2. Examples

**Example 1**
```
Input: words = ["apple", "banana", "cherry"], x = 'a'
Output: [0, 1]
Explanation: "apple" and "banana" contain the character 'a'.
```
**Example 2**
```
Input: words = ["dog", "cat", "mouse"], x = 'z'
Output: []
Explanation: No word contains 'z'.
```
---

## 3. Approach: Linear Scan — O(n · L) ✅

```text
FUNCTION findWordsContaining(words, x):
    result ← []
    FOR i ← 0 TO LENGTH(words) - 1 DO
        IF x IN words[i] THEN
            APPEND i TO result
    RETURN result
```
---

## 4. Walkthrough

Consider `words = ["apple", "banana", "cherry"]`, `x = 'a'`.
1. Initialize empty result list.
2. i=0, "apple" contains 'a' → append 0.
3. i=1, "banana" contains 'a' → append 1.
4. i=2, "cherry" does not contain 'a' → skip.
5. Return `[0, 1]`.
---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · L) — each word scanned for character `x` (L = word length) |
| **Space** | O(k) — result list of size k (number of matching words) |
---

## 6. Key Takeaway

> Simple linear scan with constant‑time character check per word solves the problem efficiently.
