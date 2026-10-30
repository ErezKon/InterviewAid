# 2269. Find the K-Beauty of a Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-k-beauty-of-a-number](https://leetcode.com/problems/find-the-k-beauty-of-a-number)

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

The **k-beauty** of an integer `num` is defined as the number of **substrings** of `num` when it is read as a string that meet the following conditions:

- It has a length of `k`.
- It is a divisor of `num`.

Given integers `num` and `k`, return *the k-beauty of* `num`.

Note:
- **Leading zeros** are allowed.
- `0` is not a divisor of any value.

A **substring** is a contiguous sequence of characters in a string.

**Constraints:**
- `1 <= num <= 10⁹`
- `1 <= k <= num.length` (taking `num` as a string)

---

## 2. Examples

```
Example 1:
  Input: num = 240, k = 2
  Output: 2
  Explanation: The following are the substrings of num of length k:
  - "24" from "240": 24 is a divisor of 240.
  - "40" from "240": 40 is a divisor of 240.
  Therefore, the k-beauty is 2.

Example 2:
  Input: num = 430043, k = 2
  Output: 2
  Explanation: The following are the substrings of num of length k:
  - "43" from "430043": 43 is a divisor of 430043.
  - "30" from "430043": 30 is not a divisor of 430043.
  - "00" from "430043": 0 is not a divisor of 430043.
  - "04" from "430043": 4 is not a divisor of 430043.
  - "43" from "430043": 43 is a divisor of 430043.
  Therefore, the k-beauty is 2.
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
