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

You are given a positive integer `num` consisting only of digits `6` and `9`.

Return *the maximum number you can get by changing **at most** one digit (*`6`* becomes *`9`*, and *`9`* becomes *`6`*)*.

**Constraints:**
- `1 <= num <= 10^4`
- `num` consists of only `6` and `9` digits.

---

## Examples

**Example 1:**
```
Input: num = 9669
Output: 9969
Explanation: Changing the first digit results in 6669.
Changing the second digit results in 9969.
Changing the third digit results in 9699.
Changing the fourth digit results in 9666.
The maximum number is 9969.
```

**Example 2:**
```
Input: num = 9996
Output: 9999
Explanation: Changing the last digit 6 to 9 results in the maximum number.
```

**Example 3:**
```
Input: num = 9999
Output: 9999
Explanation: It is better not to apply any change.
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
