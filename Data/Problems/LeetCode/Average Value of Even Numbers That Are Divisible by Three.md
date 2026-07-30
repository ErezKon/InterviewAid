# 2455. Average Value of Even Numbers That Are Divisible by Three

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/average-value-of-even-numbers-that-are-divisible-by-three](https://leetcode.com/problems/average-value-of-even-numbers-that-are-divisible-by-three)
**Companies:** Ibm

---

## 1. Problem Description

Given an integer array `nums`, compute the average of all elements that are both even and divisible by three (i.e., divisible by six). If no such element exists, return 0.

---

## 2. Examples

**Example 1:**
```
nums = [1,2,3,4,5,6]
output = 6
```
*Explanation:* Only `6` satisfies the condition, so the average is `6`.

**Example 2:**
```
nums = [12,18,24]
output = 18
```
*Explanation:* All numbers are divisible by six; average = (12+18+24)/3 = 18.

**Example 3:**
```
nums = [1,3,5]
output = 0
```
*Explanation:* No qualifying numbers, return `0`.

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
