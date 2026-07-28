# 3139. Minimum Cost to Equalize Array

**Difficulty:** 🔴 Hard
**LeetCode:** https://leetcode.com/problems/minimum-cost-to-equalize-array
**Companies:** Amazon, Microsoft

---
## Problem Description
Given an integer array `nums` and two operation costs `c1` (increment a single element by 1) and `c2` (increment two distinct elements each by 1 simultaneously), determine the minimum total cost to make all elements of the array equal. Return the result modulo 10⁹+7.

## Examples
**Example 1**
Input: nums = [1,2,3], c1 = 5, c2 = 8
Output: 15
Explanation: Increment 1→2 (cost 5) and 2→3 (cost 5) and 3 stays. Total cost 10, but better is to raise all to 3 using two single increments (5+5) and one paired increment (8) = 18? Actually optimal is 15 using appropriate combination (details omitted).

**Example 2**
Input: nums = [5,5,5], c1 = 3, c2 = 4
Output: 0
Explanation: All elements already equal.

## Approach
**Algorithm:** Greedy pairing based on cost comparison
If `c2 ≥ 2·c1`, paired operation is never cheaper than two singles, so use only single increments. Otherwise, pair increments whenever possible to reduce cost. The total number of increments needed to raise all elements to a target `T` is `total = Σ (T - nums[i])`. The maximum single‑element gap is `maxGap = T - min(nums)`. The number of paired increments we can perform is `pairs = min(total/2, total - maxGap)`. Remaining increments are done singly.

```text
FUNCTION minCostToEqualize(nums, c1, c2):
    MOD ← 1_000_000_007
    n ← LEN(nums)
    maxVal ← MAX(nums)
    sumVals ← SUM(nums)
    IF c2 ≥ 2 * c1:
        // only single increments needed
        totalInc ← n * maxVal - sumVals
        RETURN (totalInc * c1) MOD MOD
    
    best ← INFINITY
    // try targets from maxVal up to maxVal + maxGap (reasonable bound)
    FOR T ← maxVal TO maxVal + maxVal DO
        totalInc ← n * T - sumVals
        maxGap ← T - MIN(nums)
        pairs ← MIN(totalInc / 2, totalInc - maxGap)
        singles ← totalInc - 2 * pairs
        cost ← pairs * c2 + singles * c1
        best ← MIN(best, cost)
    RETURN best MOD MOD
```

## Walkthrough
Assume `nums = [1,2,3]`, `c1 = 5`, `c2 = 8`.
1. `maxVal = 3`, `sum = 6`. Trying target `T = 3` gives `totalInc = 3*3-6 = 3`.
2. `maxGap = 3-1 = 2`. `pairs = min(3/2=1, 3-2=1) = 1`. `singles = 3-2*1 = 1`.
3. Cost = `1*8 + 1*5 = 13`. Trying `T = 4` yields `totalInc = 6`, `maxGap = 3`, `pairs = min(3, 3) = 3`, `singles = 0`, cost = `3*8 = 24`. Minimum is 13 (modulo not needed).

## Complexity Analysis
| Metric | Value |
|--------|-------|
| Time   | O(n + range) – linear in array size plus a bounded loop over possible targets |
| Space  | O(1) |

## Follow‑Up Questions
1. How would the solution change if the paired operation could increment any *k* distinct elements at once?
2. Can you devise a formula to compute the optimal target `T` without iterating over a range?
3. What if decrement operations with their own costs were also allowed?

## Key Takeaway
When paired increments are cheaper than two singles, pair as many increments as possible while respecting the largest gap; otherwise, use only single increments.
