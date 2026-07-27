# 2562. Find the Array Concatenation Value

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-array-concatenation-value](https://leetcode.com/problems/find-the-array-concatenation-value)
**Companies:** Amazon, Ibm

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Two Pointers — O(n) ✅](#4-approach-two-pointers--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a 0-indexed integer array `nums`, find its **concatenation value**. Repeatedly take the first and last elements, concatenate their string representations into one number, and add to the total. If one element remains, add it directly.

**Constraints:**
- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 10⁴`

---

## 2. Examples

```
Example 1:
  Input:  nums = [7, 52, 2, 4]
  Output: 596
  Reason: Concat(7, 4) = 74. Concat(52, 2) = 522. Total = 74 + 522 = 596.

Example 2:
  Input:  nums = [5, 14, 13, 8, 12]
  Output: 673
  Reason: Concat(5,12)=512, Concat(14,8)=148, middle=13. 512+148+13=673.
```

---

## 3. Key Insight

> Use two pointers from both ends. To concatenate numbers `a` and `b`: compute `a * 10^(digits_of_b) + b`. This avoids string conversion.

---

## 4. Approach: Two Pointers — O(n) ✅

```
FUNCTION findTheArrayConcVal(nums):
    result ← 0
    lo ← 0
    hi ← LENGTH(nums) - 1

    WHILE lo < hi DO
        // Concatenate nums[lo] and nums[hi]
        concat ← INT(STR(nums[lo]) + STR(nums[hi]))
        result += concat
        lo += 1
        hi -= 1

    IF lo == hi THEN
        result += nums[lo]

    RETURN result
```

---

## 5. Walkthrough

```
nums = [7, 52, 2, 4]

lo=0, hi=3: concat("7","4") = 74, result = 74
lo=1, hi=2: concat("52","2") = 522, result = 596
lo=2 > hi=1 → done

Result: 596 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — each element visited once |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Two-pointer inward sweep** handles the "take from both ends" pattern. String concatenation of numbers is `a * 10^len(b) + b` or simply `int(str(a) + str(b))`.
