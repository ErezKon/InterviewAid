# 330. Patching Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/patching-array](https://leetcode.com/problems/patching-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Problem Description
Given a sorted array of positive integers `nums` and an integer `n`, add the minimum number of patches (positive integers) to `nums` such that every number in the range `[1, n]` can be formed as the sum of some subset of the resulting array.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `nums = [1,3]`, `n = 6` | `1` | Adding `2` allows forming all numbers 1‑6.
| `nums = [1,5,10]`, `n = 20` | `2` | Adding `2` and `4` covers the range.
| `nums = [1,2,2]`, `n = 5` | `0` | No patches needed; range already covered.

## Approach
Maintain the smallest missing value `reach` such that all numbers `[1, reach]` are representable. Iterate through `nums`; if the current number is ≤ `reach+1`, extend `reach`. Otherwise, patch with `reach+1` (which doubles the reachable range). Continue until `reach ≥ n`.

```text
FUNCTION minPatches(nums, n):
    SET patches ← 0
    SET reach ← 0          // currently can form [1, reach]
    SET i ← 0

    WHILE reach < n:
        IF i < LENGTH(nums) AND nums[i] ≤ reach + 1:
            // use existing number to extend range
            SET reach ← reach + nums[i]
            INCREMENT i
        ELSE:
            // patch with smallest missing value
            SET reach ← reach + (reach + 1)
            INCREMENT patches
    ENDWHILE
    RETURN patches
```

## Walkthrough
For `nums = [1,3]`, `n = 6`:

| Step | i | nums[i] | reach before | Action | reach after | patches |
|------|---|----------|--------------|--------|-------------|---------|
| 1 | 0 | 1 | 0 | nums[i] ≤ 1 → reach = 0+1 = 1 | 1 | 0 |
| 2 | 1 | 3 | 1 | nums[i] > 2 → patch with 2 → reach = 1+2 = 3 | 3 | 1 |
| 3 | 1 | 3 | 3 | nums[i] ≤ 4 → reach = 3+3 = 6 | 6 | 1 |

Now `reach = 6 ≥ n`, stop. Total patches = 1.

## Complexity Analysis
- **Time:** O(m) where m is the length of `nums` plus the number of patches (each iteration advances either `i` or adds a patch).
- **Space:** O(1) – only a few variables.

## Follow‑Up Questions
1. How would you adapt the algorithm for unsorted input?
2. Can you output the actual list of patched numbers?
3. What changes are needed if numbers can be negative?

## Key Takeaway
Greedily patch the smallest missing value (`reach+1`) to double the reachable range, achieving the minimal number of additions.
