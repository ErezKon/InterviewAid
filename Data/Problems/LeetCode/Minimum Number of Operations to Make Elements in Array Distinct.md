# 3396. Minimum Number of Operations to Make Elements in Array Distinct

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-make-elements-in-array-distinct](https://leetcode.com/problems/minimum-number-of-operations-to-make-elements-in-array-distinct)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

> *Note: the Approach below (sort and increment) solves a different problem. Officially each operation removes the first three elements. Scan from the right to find the last index `i` whose value already appears to its right; the answer is `ceil((i + 1) / 3)`, or 0 if none.*

You are given an integer array `nums`. You need to ensure that the elements in the array are **distinct**. To achieve this, you can perform the following operation any number of times:

- Remove 3 elements from the beginning of the array. If the array has fewer than 3 elements, remove all remaining elements.

**Note** that an empty array is considered to have distinct elements. Return the **minimum** number of operations needed to make the elements in the array distinct.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3,4,2,3,3,5,7]
Output: 2
Explanation: - In the first operation, the first 3 elements are removed, resulting in the array [4, 2, 3, 3, 5, 7].
- In the second operation, the next 3 elements are removed, resulting in the array [3, 5, 7], which has distinct elements.
Therefore, the answer is 2.
```

**Example 2:**
```
Input: nums = [4,5,6,4,4]
Output: 2
Explanation: - In the first operation, the first 3 elements are removed, resulting in the array [4, 4].
- In the second operation, all remaining elements are removed, resulting in an empty array.
Therefore, the answer is 2.
```

**Example 3:**
```
Input: nums = [6,7,8,9]
Output: 0
Explanation: The array already contains distinct elements. Therefore, the answer is 0.
```

---

## Approach

**Greedy – Sort and Increment (O(n log n))**

1. Sort `nums`.
2. Iterate through the sorted list, keeping track of the smallest allowed value `prev + 1`.
3. If the current value is less than this allowed minimum, raise it to the allowed value and add the difference to the operation count.

```text
FUNCTION minOperations(nums):
    SORT(nums)
    ops ← 0
    prev ← -∞
    FOR val IN nums DO
        allowed ← MAX(val, prev + 1)
        ops ← ops + (allowed - val)
        prev ← allowed
    RETURN ops
```

---

## Walkthrough

For `nums = [3,2,1,2,1,7]` after sorting → `[1,1,2,2,3,7]`:
| Index | val | allowed (prev+1) | ops added | new prev |
|-------|-----|------------------|-----------|----------|
|0|1|1|0|1|
|1|1|2|1|2|
|2|2|3|1|3|
|3|2|4|2|4|
|4|3|5|2|5|
|5|7|7|0|7|
Total ops = 6.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + scan | **O(n log n)** | **O(1)** (in‑place) |

---

## Follow-Up Questions

1. How would the algorithm change if you could only increase values (no arbitrary replacement)?
2. Can you output the final distinct array, not just the operation count?
3. What is the complexity if the input size is huge and must be processed in a streaming fashion?

---

## Key Takeaway

Sorting and greedily raising each element to at least one more than the previous distinct value yields the minimal number of operations.
