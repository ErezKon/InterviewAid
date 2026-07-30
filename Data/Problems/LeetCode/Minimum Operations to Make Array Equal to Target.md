# 3229. Minimum Operations to Make Array Equal to Target

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-array-equal-to-target](https://leetcode.com/problems/minimum-operations-to-make-array-equal-to-target)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description
Given two integer arrays `nums` and `target` of equal length, you may perform the following operation any number of times: select an index `i` and increment **or** decrement `nums[i]` by 1. Determine the minimum number of operations required to transform `nums` into `target`.

## Examples
- **Input:** `nums = [1,2,3]`, `target = [2,2,2]`  
  **Output:** `2`  
  **Explanation:** Increment `nums[0]` (1→2) and decrement `nums[2]` (3→2).
- **Input:** `nums = [5,0,2]`, `target = [0,5,2]`  
  **Output:** `10`  
  **Explanation:** Move 5 units from index 0 to index 1.

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
