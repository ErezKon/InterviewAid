# 2269. Find the K-Beauty of a Number

**Difficulty:** 🟢 Easy

**Companies:** Google, Postmates, Quora
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sliding Window on String — O(d) ✅](#4-approach-sliding-window-on-string--od-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given an integer `num` and integer `k`, return the number of substrings of `num` (of length `k`) that divide `num` evenly. These are called the **k-beauties** of the number.

**Constraints:**
- `1 <= num <= 10⁹`
- `1 <= k <= num.length`

---

## 2. Examples

```
Example 1:
  Input:  num = 240, k = 2
  Output: 2
  Reason: Substrings: "24" (240%24=0 ✓), "40" (240%40=0 ✓). Count=2.

Example 2:
  Input:  num = 430043, k = 2
  Output: 2
  Reason: "43" divides 430043. "04"=4, "00"=0 (skip). "04"=4, "43".
```

---

## 3. Key Insight

> Slide a window of length `k` across the string representation of `num`. Convert each substring to an integer and check divisibility. Skip zeros to avoid division by zero.

---

## 4. Approach: Sliding Window on String — O(d) ✅

```
FUNCTION divisorSubstrings(num, k):
    s = str(num); count = 0
    FOR i ← 0 TO len(s) - k:
        sub = int(s[i:i+k])
        IF sub != 0 AND num % sub == 0: count += 1
    RETURN count
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(d) where d = number of digits |
| **Space** | O(d) — string representation |

---

## 6. Key Takeaway

> **Sliding window on digit string** with a divisibility check — simple and direct. Just remember to guard against division by zero.
