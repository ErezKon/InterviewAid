# 3438. Find Valid Pair of Adjacent Digits in String

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google, Oracle
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Count + Linear Scan — O(n) ✅](#2-approach-count--linear-scan--on-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given a digit string `s`, find the first adjacent pair `(s[i], s[i+1])` where both digits are different and each digit's frequency in `s` equals its numeric value. Return the pair as a string, or empty if none exists.

---

## 2. Approach: Count + Linear Scan — O(n) ✅

```text
FUNCTION findValidPair(s):
    // Count frequency of each digit
    count ← COUNTER(s)
    // Scan adjacent pairs
    FOR i ← 0 TO LENGTH(s) - 2 DO
        IF s[i] != s[i+1] AND count[s[i]] == INT(s[i]) AND count[s[i+1]] == INT(s[i+1]):
            RETURN SUBSTRING(s, i, i+2)
    RETURN ''
```

---

## 3. Examples

**Example 1**
```
Input: s = "122333"
Output: "12"
Explanation: Digit '1' appears once, '2' appears twice, and they form the first qualifying adjacent pair.
```
**Example 2**
```
Input: s = "1122"
Output: ""
Explanation: No adjacent pair meets the frequency‑value condition.
```

---

## 4. Walkthrough

Consider `s = "122333"`.
1. Count frequencies: {'1':1, '2':2, '3':3}.
2. Scan pairs:
   - i=0: "12" → both frequencies match their digit values, return "12".
   - The algorithm stops at the first valid pair.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Key Takeaway

> Count digit frequencies first, then scan for the first adjacent pair where both digits match their own frequency. O(n) single pass after counting.
