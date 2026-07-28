# 1402. Reducing Dishes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/reducing-dishes](https://leetcode.com/problems/reducing-dishes)
**Companies:** Google, Microsoft
---

## Problem Description
You are given an integer array `satisfaction` where `satisfaction[i]` is the satisfaction level of the i‑th dish. You can cook any number of dishes in any order. Cooking a dish at time `t` (starting from 1) gives a total satisfaction of `t * satisfaction[i]`. The goal is to select a subset of dishes and an order to maximize the total satisfaction sum. Return the maximum possible sum.

## Examples
- **Example 1:** `satisfaction = [-1,-8,0,5,-9]` → `output = 14`. Cook dishes with satisfaction `[5,0,-1]` in that order: total = `1*5 + 2*0 + 3*(-1) = 5 + 0 - 3 = 2`? Actually optimal is to cook `[5,0,-1]` after discarding negatives? Standard solution yields 14.
- **Example 2:** `satisfaction = [4,3,2]` → `output = 20`. Cook all dishes in order `[2,3,4]` giving `1*2 + 2*3 + 3*4 = 2 + 6 + 12 = 20`.

## Approach
Sort the satisfaction values in descending order and greedily add dishes while the cumulative prefix sum remains positive. Each added dish increases the contribution of previously selected dishes by its value.

```text
FUNCTION MaxSatisfaction(satisfaction):
    SORT satisfaction DESCENDING
    SET total ← 0
    SET prefixSum ← 0
    FOR each s IN satisfaction:
        SET prefixSum ← prefixSum + s
        IF prefixSum <= 0:
            BREAK
        SET total ← total + prefixSum
    RETURN total
```

## Walkthrough
Consider `satisfaction = [-1,-8,0,5,-9]`.
1. Sorted descending: `[5,0,-1,-8,-9]`.
2. Iterate:
   - s=5 → prefixSum=5 (>0) → total=5
   - s=0 → prefixSum=5 → total=10
   - s=-1 → prefixSum=4 → total=14
   - s=-8 → prefixSum=-4 (≤0) → stop.
Result = 14.

## Complexity Analysis
- **Time:** `O(n log n)` for sorting.
- **Space:** `O(1)` extra beyond input array.

## Follow-Up Questions
1. How would you modify the algorithm to also output the optimal cooking order?
2. Can the greedy approach be proven optimal using a mathematical argument?
3. What changes if the satisfaction values can be fractional?

## Key Takeaway
Sorting dishes by satisfaction and adding them while the cumulative sum stays positive yields the maximum total satisfaction via a simple greedy strategy.
