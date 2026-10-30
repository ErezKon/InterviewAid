# 3229. Minimum Operations to Make Array Equal to Target

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-array-equal-to-target](https://leetcode.com/problems/minimum-operations-to-make-array-equal-to-target)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description
You are given two positive integer arrays `nums` and `target`, of the same length.

In a single operation, you can select any subarray of `nums` and increment each element within that subarray by 1 or decrement each element within that subarray by 1.

Return the **minimum** number of operations required to make `nums` equal to the array `target`.

**Constraints:**
- `1 <= nums.length == target.length <= 10^5`
- `1 <= nums[i], target[i] <= 10^8`

## Examples

```
Example 1:
  Input: nums = [3,5,1,2], target = [4,6,2,4]
  Output: 2
  Explanation: We will perform the following operations to make nums equal to target:
  - Increment nums[0..3] by 1, nums = [4,6,2,3].
  - Increment nums[3..3] by 1, nums = [4,6,2,4].
```

```
Example 2:
  Input: nums = [1,3,2], target = [2,1,4]
  Output: 5
  Explanation: We will perform the following operations to make nums equal to target:
  - Increment nums[0..0] by 1, nums = [2,3,2].
  - Decrement nums[1..1] by 1, nums = [2,2,2].
  - Decrement nums[1..1] by 1, nums = [2,1,2].
  - Increment nums[2..2] by 1, nums = [2,1,3].
  - Increment nums[2..2] by 1, nums = [2,1,4].
```

## Approach
**Greedy Difference Accumulation**  
Compute the element‑wise difference `diff[i] = target[i] - nums[i]`. The problem reduces to making all differences zero by adding or subtracting 1 at each position. The optimal number of operations equals the sum of absolute changes when the sign of consecutive differences switches, plus the absolute value of the first difference. This can be computed in a single pass.

```
text
FUNCTION minimumOperations(nums, target):
    SET n ← LENGTH(nums)
    CREATE diff[0..n-1]
    FOR i FROM 0 TO n-1:
        SET diff[i] ← target[i] - nums[i]
    SET ops ← ABS(diff[0])
    FOR i FROM 1 TO n-1:
        IF diff[i] * diff[i-1] > 0:   // same sign
            SET ops ← ops + MAX(0, ABS(diff[i]) - ABS(diff[i-1]))
        ELSE:
            SET ops ← ops + ABS(diff[i])
    RETURN ops
```

## Walkthrough
| i | nums[i] | target[i] | diff[i] | ops so far |
|---|---------|-----------|---------|-----------|
|0|1|2|+1|`ABS(+1)=1`
|1|2|2|0|same sign, `MAX(0,0-1)=0` → total 1
|2|3|2|-1|sign change → `+ABS(-1)=1` → total 2

The algorithm yields 2 operations.

## Complexity Analysis
- **Time:** `O(n)` – single pass over the arrays.
- **Space:** `O(1)` – only a few scalar variables.

## Follow‑Up Questions
1. How would the solution adapt if each increment/decrement had a different cost per index?
2. What if you could increment/decrement a contiguous subarray in a single operation?
3. Can this be extended to multi‑dimensional vectors with Manhattan distance?

## Key Takeaway
The minimal operations equal the total absolute adjustment needed when the sign of the required change switches, which can be computed by a linear scan of the difference array.
