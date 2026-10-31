# 453. Minimum Moves to Equal Array Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-equal-array-elements](https://leetcode.com/problems/minimum-moves-to-equal-array-elements)
**Companies:** Amazon, Bloomberg, Coursera, Google, Ibm, Indeed, Meta, Microsoft

---

## Problem Description

Given an integer array `nums` of size `n`, return *the minimum number of moves required to make all array elements equal*.

In one move, you can increment `n - 1` elements of the array by `1`.

**Constraints:**
- `n == nums.length`
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- The answer is guaranteed to fit in a **32-bit** integer.

## Key Insight

Incrementing all but one element is equivalent to decrementing that single element. Therefore the optimal target is the **minimum element** in the array, and the answer is the sum of differences between each element and this minimum.

## Approach

Compute the sum of all elements and the minimum element, then apply the formula.

```text
FUNCTION minMoves(nums):
    // Find the smallest value
    minVal ← MIN(nums)
    // Compute total moves as total sum minus minVal * length
    total ← SUM(nums) - minVal * LEN(nums)
    RETURN total
```

## Examples

**Example 1:**
```
Input: nums = [1,2,3]
Output: 3
Explanation: Only three moves are needed (remember each move increments two elements):
[1,2,3]  =>  [2,3,3]  =>  [3,4,3]  =>  [4,4,4]
```

**Example 2:**
```
Input: nums = [1,1,1]
Output: 0
```

## Walkthrough

Take `[5,6,8,8,5]`:
1. Minimum value = `5`.
2. Compute differences: `0,1,3,3,0`.
3. Sum = `7` moves.

## Complexity Analysis

- **Time:** O(n) – single pass to find min and sum.
- **Space:** O(1) – only a few variables.

## Follow-Up Questions

- How would the solution change if you could increment **any** single element by `1` instead?
- What if each move could increment `k` elements by `1`?
- Can you extend the approach to handle very large arrays that don’t fit in memory?

## Key Takeaway

> Reframing “increment n-1 elements” as “decrement one element” reduces the problem to a simple arithmetic formula based on the minimum value.
