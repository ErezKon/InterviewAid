# 1323. Maximum 69 Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-69-number](https://leetcode.com/problems/maximum-69-number)
**Companies:** Amazon, Bloomberg, Google, Hrt, Hsbc, Meta, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Greedy — O(d)](#approach-greedy--od-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a positive integer consisting only of digits `6` and `9`, change **at most one** digit to maximize the number.

**Constraints:**
- `1 ≤ num ≤ 10⁴`
- Digits are only `6` or `9`.

---

## Examples

**Example 1:**
```
Input:  num = 9669
Output: 9969
Explanation: Change the first '6' (hundreds place) to '9'.
```

**Example 2:**
```
Input:  num = 9999
Output: 9999
Explanation: No change needed — already maximum.
```

---

## Key Insight

> Changing a `6` to `9` always increases the number. To maximize, change the **leftmost (most significant) `6`** to `9`.

---

## Approach: Greedy — O(d) ✅

```
FUNCTION maximum69Number(num):
    RETURN int(str(num).replace('6', '9', 1))
```

Replace only the first occurrence of '6' with '9'.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| String replace | **O(d)** | O(d) |

Where d = number of digits.

---

## Key Takeaway

> **Change the leftmost '6' to '9' for maximum impact.** The most significant digit contributes the most to the number's value.
