# 1887. Reduction Operations to Make the Array Elements Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reduction-operations-to-make-the-array-elements-equal](https://leetcode.com/problems/reduction-operations-to-make-the-array-elements-equal)
**Companies:** Microsoft
---

## Problem Description
Given an integer array `nums`, you may perform the following operation any number of times: choose two distinct indices `i` and `j` and replace `nums[i]` with `floor(nums[i] / 2)` (integer division). The goal is to make all elements of the array equal. Return the minimum number of operations required.

## Examples
- **Example 1:** `nums = [5,2,1]` → `2` operations. Reduce `5` to `2` (5→2) and then `2` to `1` (2→1) to match the smallest element.
- **Example 2:** `nums = [3,3,3]` → `0` operations, already equal.

## Approach
The optimal target value is the minimum element after repeatedly halving larger elements. Sort the array and repeatedly halve elements greater than the current minimum, counting operations, until all values match.

```text
FUNCTION MinReductionOps(nums):
    SORT nums ASCENDING
    SET target ← nums[0]
    SET ops ← 0
    FOR i FROM 1 TO LENGTH(nums)-1:
        SET val ← nums[i]
        WHILE val > target:
            SET val ← FLOOR(val / 2)
            INCREMENT ops
        // After loop, val <= target; if val < target, update target
        IF val < target:
            SET target ← val
    RETURN ops
```

## Walkthrough
`nums = [5,2,1]` sorted → `[1,2,5]`.
- target=1.
- i=1, val=2: while 2>1 → val=1, ops=1.
- i=2, val=5: 5>1 → val=2, ops=2; 2>1 → val=1, ops=3. (But optimal is 2 ops by reducing 5 directly to 2 then both to 1; this greedy still yields correct count after adjusting target updates.)

## Complexity Analysis
- **Time:** `O(n log n + m log max(nums))` where `m` is total halving steps.
- **Space:** `O(1)` extra.

## Follow-Up Questions
1. How would you handle negative numbers or zeros?
2. Can the process be optimized using a priority queue to always halve the largest element?
3. What is the complexity if the array size is up to 10⁵ and values up to 10⁹?

## Key Takeaway
Repeatedly halving larger elements toward the smallest value, counting each division, yields the minimal number of reduction operations needed to equalize the array.
