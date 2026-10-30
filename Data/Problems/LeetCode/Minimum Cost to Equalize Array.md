# 3139. Minimum Cost to Equalize Array

**Difficulty:** 🔴 Hard
**LeetCode:** https://leetcode.com/problems/minimum-cost-to-equalize-array
**Companies:** Amazon, Microsoft

---
## Problem Description
You are given an integer array `nums` and two integers `cost1` and `cost2`. You are allowed to perform **either** of the following operations **any** number of times:
- Choose an index `i` from `nums` and **increase** `nums[i]` by `1` for a cost of `cost1`.
- Choose two **different** indices `i`, `j`, from `nums` and **increase** `nums[i]` and `nums[j]` by `1` for a cost of `cost2`.

Return the **minimum cost** required to make all elements in the array **equal**.

Since the answer may be very large, return it **modulo** `10⁹ + 7`.

**Constraints:**
- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁶`
- `1 <= cost1 <= 10⁶`
- `1 <= cost2 <= 10⁶`

## Examples

```
Example 1:
  Input: nums = [4,1], cost1 = 5, cost2 = 2
  Output: 15
  Explanation: The following operations can be performed to make the values equal:
  - Increase nums[1] by 1 for a cost of 5. nums becomes [4,2].
  - Increase nums[1] by 1 for a cost of 5. nums becomes [4,3].
  - Increase nums[1] by 1 for a cost of 5. nums becomes [4,4].
  The total cost is 15.
```

```
Example 2:
  Input: nums = [2,3,3,3,5], cost1 = 2, cost2 = 1
  Output: 6
  Explanation: The following operations can be performed to make the values equal:
  - Increase nums[0] and nums[1] by 1 for a cost of 1. nums becomes [3,4,3,3,5].
  - Increase nums[0] and nums[2] by 1 for a cost of 1. nums becomes [4,4,4,3,5].
  - Increase nums[0] and nums[3] by 1 for a cost of 1. nums becomes [5,4,4,4,5].
  - Increase nums[1] and nums[2] by 1 for a cost of 1. nums becomes [5,5,5,4,5].
  - Increase nums[3] by 1 for a cost of 2. nums becomes [5,5,5,5,5].
  The total cost is 6.
```

```
Example 3:
  Input: nums = [3,5,3], cost1 = 1, cost2 = 3
  Output: 4
  Explanation: The following operations can be performed to make the values equal:
  - Increase nums[0] by 1 for a cost of 1. nums becomes [4,5,3].
  - Increase nums[0] by 1 for a cost of 1. nums becomes [5,5,3].
  - Increase nums[2] by 1 for a cost of 1. nums becomes [5,5,4].
  - Increase nums[2] by 1 for a cost of 1. nums becomes [5,5,5].
  The total cost is 4.
```

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
