# 2289. Steps to Make Array Non-decreasing

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/steps-to-make-array-non-decreasing](https://leetcode.com/problems/steps-to-make-array-non-decreasing)
**Companies:** Meta

---

## Problem Description
Given an integer array `nums`, you can increment any element by 1 in one step. Return the minimum number of steps required to make the array non‑decreasing, i.e., `nums[i] <= nums[i+1]` for all valid `i`.

Constraints typically include `1 <= nums.length <= 10^5` and `0 <= nums[i] <= 10^9`.

## Examples
**Example 1**
```
Input: nums = [3,2,5,1,7]
Output: 5
Explanation: Increment nums[1] by 1 (to 3) and nums[3] by 4 (to 5). Total steps = 1 + 4 = 5.
```

**Example 2**
```
Input: nums = [0,1,2,3]
Output: 0
Explanation: The array is already non‑decreasing.
```

## Approach
The problem can be solved greedily by scanning the array from left to right while maintaining the maximum value seen so far. If the current element is smaller than this maximum, we need to raise it to the maximum, adding the difference to the step count.

### Pseudocode
```text
FUNCTION minSteps(nums):
    SET steps ← 0
    SET maxSoFar ← nums[0]
    FOR i ← 1 TO LENGTH(nums) - 1:
        IF nums[i] < maxSoFar:
            SET diff ← maxSoFar - nums[i]
            SET steps ← steps + diff
        ELSE:
            SET maxSoFar ← nums[i]
    RETURN steps
```

## Walkthrough
| Index | nums[i] | maxSoFar (before) | Action | steps (cumulative) |
|-------|---------|-------------------|--------|--------------------|
| 0     | 3       | -                 | set maxSoFar = 3 | 0 |
| 1     | 2       | 3                 | add 1 (3‑2)       | 1 |
| 2     | 5       | 3                 | set maxSoFar = 5 | 1 |
| 3     | 1       | 5                 | add 4 (5‑1)       | 5 |
| 4     | 7       | 5                 | set maxSoFar = 7 | 5 |

The final step count is 5.

## Complexity Analysis
- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only a few variables are used.

## Follow‑Up Questions
1. How would the solution change if you could also decrement elements?
2. Can you extend the approach to return the transformed non‑decreasing array?
3. What if the array is extremely large and stored on disk? How would you process it in chunks?

## Key Takeaway
A simple greedy scan that keeps track of the running maximum yields the minimal number of increments needed to make an array non‑decreasing.
