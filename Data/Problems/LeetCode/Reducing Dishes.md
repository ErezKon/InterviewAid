# 1402. Reducing Dishes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/reducing-dishes](https://leetcode.com/problems/reducing-dishes)
**Companies:** Google, Microsoft
---

## Problem Description
A chef has collected data on the `satisfaction` level of his `n` dishes. Chef can cook any dish in 1 unit of time.

**Like-time coefficient** of a dish is defined as the time taken to cook that dish including previous dishes multiplied by its satisfaction level i.e. `time[i] * satisfaction[i]`.

Return the maximum sum of **like-time coefficient** that the chef can obtain after preparing some amount of dishes.

Dishes can be prepared in **any** order and the chef can discard some dishes to get this maximum value.

**Constraints:**

- `n == satisfaction.length`
- `1 <= n <= 500`
- `-1000 <= satisfaction[i] <= 1000`

## Examples

```
Example 1:
  Input: satisfaction = [-1,-8,0,5,-9]
  Output: 14
  Explanation: After Removing the second and last dish, the maximum total like-time coefficient will be equal to (-1*1 + 0*2 + 5*3 = 14).
    Each dish is prepared in one unit of time.
```

```
Example 2:
  Input: satisfaction = [4,3,2]
  Output: 20
  Explanation: Dishes can be prepared in any order, (2*1 + 3*2 + 4*3 = 20)
```

```
Example 3:
  Input: satisfaction = [-1,-4,-5]
  Output: 0
  Explanation: People do not like the dishes. No dish is prepared.
```

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
