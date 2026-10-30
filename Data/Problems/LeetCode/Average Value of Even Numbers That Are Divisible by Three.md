# 2455. Average Value of Even Numbers That Are Divisible by Three

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/average-value-of-even-numbers-that-are-divisible-by-three](https://leetcode.com/problems/average-value-of-even-numbers-that-are-divisible-by-three)
**Companies:** Ibm

---

## 1. Problem Description

Given an integer array `nums` of **positive** integers, return *the average value of all even integers that are divisible by* `3`*.*

Note that the **average** of `n` elements is the **sum** of the `n` elements divided by `n` and **rounded down** to the nearest integer.

**Constraints:**
- `1 ≤ nums.length ≤ 1000`
- `1 ≤ nums[i] ≤ 1000`

---

## 2. Examples

```
Example 1:
  Input: nums = [1,3,6,10,12,15]
  Output: 9
  Explanation: 6 and 12 are even numbers that are divisible by 3. (6 + 12) / 2 = 9.

Example 2:
  Input: nums = [1,2,4,7,10]
  Output: 0
  Explanation: There is no single number that satisfies the requirement, so return 0.
```

---

## 3. Approach: Single Pass — O(n) ✅

```text
FUNCTION averageDivisibleBySix(nums):
    SET sum ← 0
    SET count ← 0
    FOR x IN nums:
        IF x MOD 6 = 0:
            SET sum ← sum + x
            SET count ← count + 1
    IF count = 0:
        RETURN 0
    RETURN sum DIV count
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 4. Walkthrough

| Index | x | x MOD 6 | sum | count | Action |
|-------|---|----------|-----|-------|--------|
| 0 | 1 | 1 | 0 | 0 | skip |
| 1 | 2 | 2 | 0 | 0 | skip |
| 2 | 3 | 3 | 0 | 0 | skip |
| 3 | 4 | 4 | 0 | 0 | skip |
| 4 | 5 | 5 | 0 | 0 | skip |
| 5 | 6 | 0 | 6 | 1 | add |

Result = 6 / 1 = 6.

---

## 5. Complexity Analysis

- **Time:** O(n) – one traversal of the array.
- **Space:** O(1) – only two integer variables are used.

---

## 6. Follow-Up Questions

- How would you modify the solution to return the median of qualifying numbers?
- Can you compute the result in a streaming fashion where the array is too large to fit in memory?
- What if the requirement changes to numbers divisible by a given `k` instead of six?

---

## Key Takeaway

> A single pass with running sum and count efficiently computes the average of numbers satisfying a simple modular condition.
