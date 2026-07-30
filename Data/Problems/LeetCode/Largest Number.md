# 179. Largest Number

**Difficulty:** 🟡 Medium
**Acceptance:** 36.0%
**LeetCode:** [https://leetcode.com/problems/largest-number](https://leetcode.com/problems/largest-number)
**Companies:** Accenture, Adobe, Amazon, Bloomberg, Clevertap, Cvent, Google, Graviton, Infosys, Josh Technology, Meta, Microsoft, Myntra, Nvidia, Nykaa, Oracle, Servicenow, Tcs, Tiktok, Tracxn, Works Applications, Zoho

---

## Problem Description

Given a list of non‑negative integers `nums`, arrange them such that they form the largest possible number when concatenated. Return the result as a string.

Constraints:
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 10^9`

---

## Approach

**Custom Sort — O(n log n)**

```text
FUNCTION largestNumber(nums):
    // Convert each integer to string for concatenation
    SET strs ← [TO_STRING(num) FOR num IN nums]
    // Sort strings by comparator: a before b if a+b > b+a
    SORT strs USING comparator:
        IF a + b > b + a THEN RETURN -1
        ELSE IF a + b < b + a THEN RETURN 1
        ELSE RETURN 0
    SET result ← JOIN(strs)
    // Edge case: when all numbers are 0
    IF result[0] = '0':
        RETURN "0"
    RETURN result
```

---

## Examples

**Example 1:**
```
Input: nums = [10,2]
Output: "210"
Explanation: Concatenating 2 before 10 yields the larger number 210.
```

**Example 2:**
```
Input: nums = [3,30,34,5,9]
Output: "9534330"
Explanation: Ordering by the custom comparator gives 9,5,34,3,30.
```

---

## Walkthrough

For `nums = [3,30,34,5,9]`:
1. Convert to strings → `["3","30","34","5","9"]`.
2. Compare pairs using `a+b` vs `b+a`:
   - "3" vs "30": "330" > "303" → "3" before "30".
   - "34" vs "3": "343" > "334" → "34" before "3".
   - Continue sorting → final order `["9","5","34","3","30"]`.
3. Join → `"9534330"`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n log n · k) where k is average digit length | O(n) |

---

## Follow-Up Questions

1. How would you modify the algorithm to handle very large input sizes where sorting becomes a bottleneck?
2. Can you solve the problem without converting integers to strings?

---

## Key Takeaway

A custom comparator based on string concatenation (`a+b` vs `b+a`) determines the optimal ordering for forming the largest number.
