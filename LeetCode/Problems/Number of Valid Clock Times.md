# 2437. Number of Valid Clock Times

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-valid-clock-times](https://leetcode.com/problems/number-of-valid-clock-times)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Enumerate — O(1)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Given a time string "HH:MM" with some digits replaced by '?', count valid times.

---

## 2. Approach: Enumerate — O(1) ✅

```
FUNCTION countTime(time):
    count = 0
    FOR h ← 0 TO 23:
        FOR m ← 0 TO 59:
            IF matches(h, m, time): count += 1
    RETURN count
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(24 · 60) = O(1) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **Enumerate all 1440 valid times.** Check each against the pattern. Constant time since the search space is fixed.
