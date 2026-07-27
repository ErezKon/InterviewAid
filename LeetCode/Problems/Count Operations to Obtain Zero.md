# 2169. Count Operations to Obtain Zero

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-operations-to-obtain-zero](https://leetcode.com/problems/count-operations-to-obtain-zero)
**Companies:** Amazon, Capital One, Google, Payu

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two non-negative integers `num1` and `num2`, in one operation:
- If `num1 >= num2`, subtract `num2` from `num1`: `num1 = num1 - num2`
- Otherwise, subtract `num1` from `num2`: `num2 = num2 - num1`

Return the number of operations needed until either `num1` or `num2` becomes 0.

**Constraints:**
- `0 <= num1, num2 <= 10^5`

---

## Examples

**Example 1:**
- **Input:** `num1 = 2, num2 = 3`
- **Output:** `3`
- **Explanation:** 2,3 → 2,1 → 1,1 → 0,1. Three operations.

**Example 2:**
- **Input:** `num1 = 10, num2 = 10`
- **Output:** `1`
- **Explanation:** 10−10 = 0. One operation.

---

## Key Insight

This is exactly the **Euclidean algorithm** (GCD computation), but instead of returning the GCD, we count the total number of subtraction steps. Each step subtracts the smaller from the larger — identical to the subtraction-based GCD.

---

## Approach

```
FUNCTION countOperations(num1, num2):
    ops = 0
    WHILE num1 > 0 AND num2 > 0:
        IF num1 >= num2: num1 -= num2
        ELSE: num2 -= num1
        ops += 1
    RETURN ops
```

**Optimization (optional):** Replace repeated subtractions with division:
```
FUNCTION countOperationsFast(num1, num2):
    ops = 0
    WHILE num1 > 0 AND num2 > 0:
        ops += num1 / num2       // integer division = number of subtractions
        num1 = num1 % num2
        SWAP(num1, num2)
    RETURN ops
```

---

## Walkthrough

**Input:** `num1 = 2, num2 = 3`

| Step | num1 | num2 | Action | ops |
|---|---|---|---|---|
| 1 | 2 | 3 | 2 < 3 → num2 = 3−2 = 1 | 1 |
| 2 | 2 | 1 | 2 ≥ 1 → num1 = 2−1 = 1 | 2 |
| 3 | 1 | 1 | 1 ≥ 1 → num1 = 1−1 = 0 | 3 |

**Result:** `3` ✅

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(max(num1, num2)) worst case for subtraction version; O(log(min(num1, num2))) for division version |
| **Space** | O(1) |

The subtraction version is slow when one number is much larger (e.g., 100000, 1). The division version matches the Euclidean algorithm's logarithmic complexity.

---

## Follow-Up Questions

**Q1: How does this relate to GCD?**
This is the subtraction-based Euclidean algorithm. The process terminates when one value is 0, and the other equals `gcd(num1, num2)`.

**Q2: Can you optimize with modulo?**
Yes — `num1 -= num2` repeated `num1/num2` times is the same as `num1 = num1 % num2`. Add `num1/num2` to ops and swap. This is O(log n).

**Q3: What if both inputs are 0?**
Zero operations needed — the loop doesn't execute.

---

## Key Takeaway

> **Repeated subtraction of the smaller from the larger is the Euclidean algorithm in disguise. Recognizing this connection lets you optimize from O(n) to O(log n) using modulo.**
