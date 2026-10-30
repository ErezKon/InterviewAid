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

You are given a **0-indexed** integer array `nums`.

The **concatenation** of two numbers is the number formed by concatenating their numerals.

- For example, the concatenation of `15`, `49` is `1549`.

The **concatenation value** of `nums` is initially equal to `0`. Perform this operation until `nums` becomes empty:

- If `nums` has a size greater than one, add the value of the concatenation of the first and the last element to the **concatenation value** of `nums`, and remove those two elements from `nums`. For example, if the `nums` was `[1, 2, 4, 5, 6]`, add 16 to the `concatenation value`.
- If only one element exists in `nums`, add its value to the **concatenation value** of `nums`, then remove it.

Return *the concatenation value of `nums`*.

**Constraints:**
- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 10⁴`

---

## 2. Examples

```
Example 1:
  Input: nums = [7,52,2,4]
  Output: 596
  Explanation: Before performing any operation, nums is [7,52,2,4] and concatenation value is 0.
   - In the first operation:
     We pick the first element, 7, and the last element, 4.
     Their concatenation is 74, and we add it to the concatenation value, so it becomes equal to 74.
     Then we delete them from nums, so nums becomes equal to [52,2].
   - In the second operation:
     We pick the first element, 52, and the last element, 2.
     Their concatenation is 522, and we add it to the concatenation value, so it becomes equal to 596.
     Then we delete them from the nums, so nums becomes empty.
  Since the concatenation value is 596 so the answer is 596.

Example 2:
  Input: nums = [5,14,13,8,12]
  Output: 673
  Explanation: Before performing any operation, nums is [5,14,13,8,12] and concatenation value is 0.
   - In the first operation:
     We pick the first element, 5, and the last element, 12.
     Their concatenation is 512, and we add it to the concatenation value, so it becomes equal to 512.
     Then we delete them from the nums, so nums becomes equal to [14,13,8].
   - In the second operation:
     We pick the first element, 14, and the last element, 8.
     Their concatenation is 148, and we add it to the concatenation value, so it becomes equal to 660.
     Then we delete them from the nums, so nums becomes equal to [13].
   - In the third operation:
     nums has only one element, so we pick 13 and add it to the concatenation value, so it becomes equal to 673.
     Then we delete it from nums, so nums become empty.
  Since the concatenation value is 673 so the answer is 673.
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
