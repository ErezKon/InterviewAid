# 3379. Transformed Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/transformed-array](https://leetcode.com/problems/transformed-array)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description

You are given an integer array `nums` that represents a circular array. Your task is to create a new array `result` of the **same** size, following these rules:

For each index `i` (where `0 <= i < nums.length`), perform the following **independent** actions:

- If `nums[i] > 0`: Start at index `i` and move `nums[i]` steps to the **right** in the circular array. Set `result[i]` to the value of the index where you land.
- If `nums[i] < 0`: Start at index `i` and move `abs(nums[i])` steps to the **left** in the circular array. Set `result[i]` to the value of the index where you land.
- If `nums[i] == 0`: Set `result[i]` to `nums[i]`.

Return the new array `result`.

**Note:** Since `nums` is circular, moving past the last element wraps around to the beginning, and moving before the first element wraps back to the end.

**Constraints:**
- `1 <= nums.length <= 100`
- `-100 <= nums[i] <= 100`

## Examples

**Example 1:**
```
Input: nums = [3,-2,1,1]
Output: [1,1,1,3]
Explanation:
- For nums[0] that is equal to 3, If we move 3 steps to right, we reach nums[3]. So result[0] should be 1.
- For nums[1] that is equal to -2, If we move 2 steps to left, we reach nums[3]. So result[1] should be 1.
- For nums[2] that is equal to 1, If we move 1 step to right, we reach nums[3]. So result[2] should be 1.
- For nums[3] that is equal to 1, If we move 1 step to right, we reach nums[0]. So result[3] should be 3.
```

**Example 2:**
```
Input: nums = [-1,4,-1]
Output: [-1,-1,4]
Explanation:
- For nums[0] that is equal to -1, If we move 1 step to left, we reach nums[2]. So result[0] should be -1.
- For nums[1] that is equal to 4, If we move 4 steps to right, we reach nums[2]. So result[1] should be -1.
- For nums[2] that is equal to -1, If we move 1 step to left, we reach nums[1]. So result[2] should be 4.
```

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
