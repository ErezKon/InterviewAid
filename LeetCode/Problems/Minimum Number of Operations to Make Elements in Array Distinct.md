# 3396. Minimum Number of Operations to Make Elements in Array Distinct

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-make-elements-in-array-distinct](https://leetcode.com/problems/minimum-number-of-operations-to-make-elements-in-array-distinct)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given an integer array `nums`, you may repeatedly perform the following operation: choose any element and replace it with any integer of your choice. Return the minimum number of operations required to make all elements of `nums` distinct.

---

## Examples

**Example 1:**
```
Input: nums = [1,2,2]
Output: 1
Explanation: Increment the second `2` to `3` (or replace with any unused value).
```

**Example 2:**
```
Input: nums = [3,2,1,2,1,7]
Output: 3
Explanation: One optimal set of changes is to make the array `[3,4,1,5,2,7]`.
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
