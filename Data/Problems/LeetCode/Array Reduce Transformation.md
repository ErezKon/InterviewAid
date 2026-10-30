# 2626. Array Reduce Transformation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/array-reduce-transformation](https://leetcode.com/problems/array-reduce-transformation)
**Companies:** Google, Microsoft

---

## 1. Problem Description

Given an integer array `nums`, a reducer function `fn`, and an initial value `init`, return the final result obtained by executing the `fn` function on each element of the array, sequentially, passing in the return value from the calculation on the preceding element.

This result is achieved through the following operations: `val = fn(init, nums[0]), val = fn(val, nums[1]), val = fn(val, nums[2]), ...` until every element in the array has been processed. The ultimate value of `val` is then returned.

If the length of the array is 0, the function should return `init`.

Please solve it without using the built-in `Array.reduce` method.

**Constraints:**
- `0 ≤ nums.length ≤ 1000`
- `0 ≤ nums[i] ≤ 1000`
- `0 ≤ init ≤ 1000`

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

```
Example 1:
  Input:
  nums = [1,2,3,4]
  fn = function sum(accum, curr) { return accum + curr; }
  init = 0
  Output: 10
  Explanation:
  initially, the value is init=0.
  (0) + nums[0] = 1
  (1) + nums[1] = 3
  (3) + nums[2] = 6
  (6) + nums[3] = 10
  The final answer is 10.

Example 2:
  Input:
  nums = [1,2,3,4]
  fn = function sum(accum, curr) { return accum + curr * curr; }
  init = 100
  Output: 130
  Explanation:
  initially, the value is init=100.
  (100) + nums[0] * nums[0] = 101
  (101) + nums[1] * nums[1] = 105
  (105) + nums[2] * nums[2] = 114
  (114) + nums[3] * nums[3] = 130
  The final answer is 130.

Example 3:
  Input:
  nums = []
  fn = function sum(accum, curr) { return 0; }
  init = 25
  Output: 25
  Explanation: For empty arrays, the answer is always init.
```

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
