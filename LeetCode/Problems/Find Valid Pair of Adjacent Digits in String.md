# 3438. Find Valid Pair of Adjacent Digits in String

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google, Oracle
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Count + Linear Scan — O(n) ✅](#2-approach-count--linear-scan--on-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given a digit string `s`, find the first adjacent pair `(s[i], s[i+1])` where both digits are different and each digit's frequency in `s` equals its numeric value. Return the pair as a string, or empty if none exists.

---

## 2. Approach: Count + Linear Scan — O(n) ✅

```
FUNCTION findValidPair(s):
    count = Counter(s)
    FOR i ← 0 TO len(s) - 2:
        IF s[i] != s[i+1] AND count[s[i]] == int(s[i]) AND count[s[i+1]] == int(s[i+1]):
            RETURN s[i:i+2]
    RETURN ''
```

---

## 3. Key Takeaway

> Count digit frequencies first, then scan for the first adjacent pair where both digits match their own frequency. O(n) single pass after counting.
