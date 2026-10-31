# 2625. Flatten Deeply Nested Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/flatten-deeply-nested-array](https://leetcode.com/problems/flatten-deeply-nested-array)
**Companies:** Google, Meta, Otterai, Paypal, Rivian, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Recursive Flatten — O(n) ✅](#2-approach-recursive-flatten--on-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given a **multi-dimensional** array `arr` and a depth `n`, return a **flattened** version of that array.

A **multi-dimensional** array is a recursive data structure that contains integers or other **multi-dimensional** arrays.

A **flattened** array is a version of that array with some or all of the sub-arrays removed and replaced with the actual elements in that sub-array. This flattening operation should only be done if the current depth of nesting is less than `n`. The depth of the elements in the first array are considered to be `0`.

Please solve it without the built-in `Array.flat` method. (JavaScript problem)

**Constraints:**
- `0 <= count of numbers in arr <= 10^5`
- `0 <= count of subarrays in arr <= 10^5`
- `maxDepth <= 1000`
- `-1000 <= each number <= 1000`
- `0 <= n <= 1000`

**Examples:**
```
Example 1:
  Input: arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], n = 0
  Output: [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
  Explanation: Passing a depth of n=0 will always result in the original array. This is because the smallest possible depth of a subarray (0) is not less than n=0. Thus, no subarray should be flattened.

Example 2:
  Input: arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], n = 1
  Output: [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]
  Explanation: The subarrays starting with 4, 7, and 13 are all flattened. This is because their depth of 0 is less than 1. However [9, 10, 11] remains unflattened because its depth is 1.

Example 3:
  Input: arr = [[1, 2, 3], [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], n = 2
  Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  Explanation: The maximum depth of any subarray is 1. Thus, all of them are flattened.
```

---

## 2. Approach: Recursive Flatten — O(n) ✅

```
FUNCTION flatten(arr, n):
    IF n == 0:
        RETURN COPY(arr)
    SET result ← []
    FOR each item IN arr:
        IF item IS ARRAY AND n > 0:
            SET flattened ← flatten(item, n - 1)
            EXTEND result WITH flattened
        ELSE:
            APPEND item TO result
    RETURN result
```

---

## Examples

**Example 1:**
```
Input: arr = [1, [2, [3, 4]], 5], n = 1
Output: [1, 2, [3, 4], 5]
```
Explanation: Only the first level of nesting is flattened.

**Example 2:**
```
Input: arr = [1, [2, [3, 4]], 5], n = 2
Output: [1, 2, 3, 4, 5]
```
Explanation: Two levels are flattened, resulting in a fully flat array.

---

## Walkthrough

| Call | n | Action |
|------|---|--------|
| flatten([1, [2, [3,4]], 5], 2) | 2 | Iterate items; encounter sub-array `[2, [3,4]]` → recursive call.
| flatten([2, [3,4]], 1) | 1 | Flatten first level: result `[2, [3,4]]`.
| Combine results → `[1] + [2, [3,4]] + [5]` → `[1,2,[3,4],5]`.
| Since outer call had n=2, the returned `[1,2,[3,4],5]` is processed again, flattening inner `[3,4]` → final `[1,2,3,4,5]`.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(N) – each element visited once |
| **Space** | O(D) – recursion depth proportional to nesting depth |

---

## Follow-Up Questions

- How would you modify the algorithm to flatten the array in-place?
- Can you implement an iterative version using a stack?
- What changes are needed to support streaming input where the array is too large to fit in memory?

---

## 3. Key Takeaway

> Recursively flatten each sub-array, decreasing the depth counter `n` until it reaches zero. Each level processes its elements once, yielding O(N) time.
