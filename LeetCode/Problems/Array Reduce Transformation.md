# 2626. Array Reduce Transformation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/array-reduce-transformation](https://leetcode.com/problems/array-reduce-transformation)
**Companies:** Google, Microsoft

---

## 1. Problem Description

Implement a custom `reduce` function that takes an array `nums`, a reducer function `fn(accum, curr)`, and an initial value `init`. Return the result of applying the reducer sequentially. If the array is empty, return `init`. *(JavaScript problem)*

---

## 2. Approach: Iterative Accumulation — O(n) ✅

```text
FUNCTION reduceArray(nums, fn, init):
    SET accum ← init
    FOR each num IN nums:
        SET accum ← fn(accum, num)
    END FOR
    RETURN accum
```

---

## 3. Examples

**Example 1:**
```
nums = [1,2,3,4]
fn = (a, b) => a + b
init = 0
```
Result: `10` (sum of all elements).

**Example 2:**
```
nums = [1,2,3,4]
fn = (a, b) => a * b
init = 1
```
Result: `24` (product of all elements).

---

## 4. Walkthrough

| Step | accum before | num | accum after |
|------|--------------|-----|------------|
| 1 | 0 | 1 | 1 |
| 2 | 1 | 2 | 3 |
| 3 | 3 | 3 | 6 |
| 4 | 6 | 4 | 10 |

The accumulator starts at `init` and is updated by applying `fn` with each array element.

---

## 5. Complexity Analysis

- **Time:** O(n) – each element is visited once.
- **Space:** O(1) – only a few scalar variables are used.

---

## 6. Follow-Up Questions

1. How would you modify the function to support early termination (e.g., stop when a condition is met)?
2. Can you implement `reduce` recursively?
3. How would you handle asynchronous reducer functions?

---

## Key Takeaway

> `reduce` is a fold operation: iterate through the array, accumulating results via the reducer function. Handle the empty array case by returning `init`.
