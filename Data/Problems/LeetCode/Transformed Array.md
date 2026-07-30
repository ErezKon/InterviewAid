# 3379. Transformed Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/transformed-array](https://leetcode.com/problems/transformed-array)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
Given an integer array `nums` of length `n`, construct a new array `result` where each element `result[i]` is taken from the index `(i + nums[i])` modulo `n`. If `nums[i]` is negative, the shift wraps around to the left. Return the resulting array.

## Examples
- **Example 1:** `nums = [2, -1, 1, 0]` → `result = [1, 2, 0, 0]`. Explanation: each element is placed according to its shifted index.
- **Example 2:** `nums = [0, 0, 0]` → `result = [0, 0, 0]`. No shift occurs.

## Approach
Use direct index calculation with modulo arithmetic to handle wrap‑around for both positive and negative shifts.

```text
FUNCTION constructTransformedArray(nums):
    SET n ← LENGTH(nums)
    SET result ← ARRAY OF SIZE n FILLED WITH 0
    FOR i ← 0 TO n - 1:
        SET shift ← nums[i]
        SET target ← (i + shift) MOD n
        IF target < 0:
            SET target ← target + n
        SET result[i] ← nums[target]
    RETURN result
```

## Walkthrough
| i | nums[i] | shift | target index | result[i] |
|---|---------|-------|--------------|----------|
| 0 | 2       | +2    | (0+2)%4 = 2  | nums[2]=1 |
| 1 | -1      | -1    | (1-1)%4 = 0  | nums[0]=2 |
| 2 | 1       | +1    | (2+1)%4 = 3  | nums[3]=0 |
| 3 | 0       | 0     | (3+0)%4 = 3  | nums[3]=0 |

## Complexity Analysis
- **Time:** O(n) – one pass through the array.
- **Space:** O(n) – the output array.

## Follow‑Up Questions
1. How would you modify the algorithm to perform the transformation in‑place?
2. What if the shift value could be larger than `n`? How does modulo handle it?
3. Can you extend this to a circular linked list representation?

## Key Takeaway
Using modulo arithmetic lets you map each element to its shifted position efficiently, handling both positive and negative offsets with O(n) time and O(n) extra space.
