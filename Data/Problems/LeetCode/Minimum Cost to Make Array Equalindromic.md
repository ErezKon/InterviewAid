# 2967. Minimum Cost to Make Array Equalindromic

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/minimum-cost-to-make-array-equalindromic
**Companies:** Google

---
## Problem Description
You are given an integer array `nums`.

In one **operation**, you may choose an index `i` and either increment or decrement `nums[i]` by 1.

Return the **minimum** number of operations required to make every element in `nums` **equal** to the **same** positive palindromic integer.

**Constraints:**
- `1 <= n <= 10⁵`
- `1 <= nums[i] <= 10⁹`

## Examples

```
Example 1:
  Input: nums = [1,2,3,4,5]
  Output: 6
  Explanation: Increment nums[0] twice and nums[1] once, then decrement nums[3] once and nums[4] twice. After 6 operations, nums becomes [3,3,3,3,3], and 3 is a positive palindromic integer.
  It can be shown that this is the minimum number of operations required.
```

```
Example 2:
  Input: nums = [10,12,13,14,15]
  Output: 11
  Explanation: Increment nums[0] once, then decrement nums[1], nums[2], nums[3], and nums[4] by 1, 2, 3, and 4, respectively. After 11 operations, nums becomes [11,11,11,11,11], and 11 is a positive palindromic integer.
  It can be shown that this is the minimum number of operations required.
```

```
Example 3:
  Input: nums = [22,33,22,33,22]
  Output: 22
  Explanation: Decrement nums[1] and nums[3] by 11 each. After 22 operations, nums becomes [22,22,22,22,22], and 22 is a positive palindromic integer.
  It can be shown that this is the minimum number of operations required.
```

## Approach
**Algorithm:** Median-based target selection with nearest palindrome search
1. Sort `nums` and find the median value `m` (or any value between the two middle elements for even length). 2. Generate the closest palindrome numbers `p1 ≤ m` and `p2 ≥ m`. 3. Compute total absolute difference cost to each candidate palindrome and return the smaller.

```text
FUNCTION minimumCost(nums):
    SORT nums
    n ← LEN(nums)
    IF n MOD 2 = 1 THEN
        median ← nums[n/2]
    ELSE
        median ← (nums[n/2 - 1] + nums[n/2]) / 2  // any value between them works
    
    p1 ← NEAREST_PALINDROME_LESS_OR_EQUAL(median)
    p2 ← NEAREST_PALINDROME_GREATER_OR_EQUAL(median)
    
    cost1 ← SUM(ABS(num - p1) FOR num IN nums)
    cost2 ← SUM(ABS(num - p2) FOR num IN nums)
    RETURN MIN(cost1, cost2)
```

## Walkthrough
For `nums = [12,34,56]`:
- Sorted → [12,34,56]; median = 34.
- Nearest palindromes: 33 (≤34) and 44 (≥34).
- Cost to 33 = |12-33|+|34-33|+|56-33| = 21+1+23 = 45.
- Cost to 44 = |12-44|+|34-44|+|56-44| = 32+10+12 = 54.
- Minimum cost = 45.

## Complexity Analysis
| Metric | Value |
|--------|-------|
| Time   | O(n log n) for sorting plus O(log m) to find nearest palindromes |
| Space  | O(1) additional space |

## Follow-Up Questions
1. How would the solution change if the target palindrome length (number of digits) were fixed?
2. Can you extend the approach to handle a custom cost per unit change (different weights for increase vs decrease)?
3. What if you needed to make the array elements equal to a *non-palindromic* target – how does the algorithm simplify?

## Key Takeaway
The optimal palindromic target lies near the median; checking the closest palindromes on both sides yields the minimum total adjustment cost.
