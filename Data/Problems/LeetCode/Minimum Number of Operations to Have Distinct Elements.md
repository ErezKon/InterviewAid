# 3779. Minimum Number of Operations to Have Distinct Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-have-distinct-elements](https://leetcode.com/problems/minimum-number-of-operations-to-have-distinct-elements)
**Companies:** Accenture

---

## Problem Description

Given an integer array `nums`, you may perform the following operation any number of times: choose an element `x` and replace it with `x + 1`. Return the minimum number of operations required to make all elements of `nums` distinct.

---

## Examples

**Example 1:**
```
Input: nums = [1,2,2]
Output: 1
Explanation: Increment the second `2` to `3`.
```

**Example 2:**
```
Input: nums = [3,2,1,2,1,7]
Output: 6
Explanation: One optimal sequence of increments results in [3,4,1,5,2,7].
```

---

## Approach

**Greedy – Sort and Increment (O(n log n))**

1. Sort `nums`.
2. Iterate through the sorted array, keeping track of the smallest allowed value `prev + 1`.
3. If the current value is less than this allowed minimum, increment it up to the minimum and add the difference to the operation count.

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

1. How would you adapt the algorithm if you could also decrement elements?
2. Can you return the final distinct array, not just the operation count?
3. What is the complexity if the input size is huge and must be processed in a streaming fashion?

---

## Key Takeaway

Sort the array and greedily raise each element to at least one more than the previous distinct value; the sum of required increments is minimal.
