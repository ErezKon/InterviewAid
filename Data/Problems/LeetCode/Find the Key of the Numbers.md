# 3270. Find the Key of the Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-key-of-the-numbers](https://leetcode.com/problems/find-the-key-of-the-numbers)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Digit-by-Digit Min — O(d) ✅](#3-approach-digit-by-digit-min--od-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given three positive integers `num1`, `num2`, and `num3` (each padded to 4 digits), the **key** is formed by taking the minimum digit at each position across the three numbers.

**Constraints:**
- `1 <= num1, num2, num3 <= 9999`

---

## 2. Examples

```
Example 1:
  Input:  num1 = 1, num2 = 10, num3 = 1000
  Padded: "0001", "0010", "1000"
  Output: 0
  Reason: min(0,0,1)=0, min(0,0,0)=0, min(0,1,0)=0, min(1,0,0)=0 → "0000" = 0.
```

---

## 3. Approach: Digit-by-Digit Min — O(d) ✅

```
FUNCTION generateKey(num1, num2, num3):
    s1 ← PADLEFT(str(num1), 4, '0')
    s2 ← PADLEFT(str(num2), 4, '0')
    s3 ← PADLEFT(str(num3), 4, '0')
    key ← ""
    FOR i ← 0 TO 3 DO
        key += str(MIN(INT(s1[i]), INT(s2[i]), INT(s3[i])))
    RETURN INT(key)
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) — fixed 4 digits |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Pad to equal length, then take per-position min.** A straightforward digit-by-digit operation.
