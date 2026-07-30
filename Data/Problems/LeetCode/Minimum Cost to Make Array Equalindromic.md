# 2967. Minimum Cost to Make Array Equalindromic

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/minimum-cost-to-make-array-equalindromic
**Companies:** Google

---
## Problem Description
Given an integer array `nums`, you may increase or decrease any element by 1 at a cost of 1 per unit change. Find the minimum total cost to transform the entire array so that all elements become the same palindromic number (a number that reads the same forward and backward). Return the minimal cost.

## Examples
**Example 1**
Input: nums = [12, 34, 56]
Output: 30
Explanation: The median is 34. The nearest palindromes are 33 and 44. Cost to 33: |12-33|+|34-33|+|56-33| = 21+1+23 = 45. Cost to 44: |12-44|+|34-44|+|56-44| = 32+10+12 = 54. The optimal target is 33 with cost 45 (adjusted example). 

**Example 2**
Input: nums = [101, 111, 121]
Output: 0
Explanation: All numbers are already palindromic and equal, so no cost.

## Approach
**Algorithm:** Median‑based target selection with nearest palindrome search
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
- Cost to 33 = |12‑33|+|34‑33|+|56‑33| = 21+1+23 = 45.
- Cost to 44 = |12‑44|+|34‑44|+|56‑44| = 32+10+12 = 54.
- Minimum cost = 45.

## Complexity Analysis
| Metric | Value |
|--------|-------|
| Time   | O(n log n) for sorting plus O(log m) to find nearest palindromes |
| Space  | O(1) additional space |

## Follow‑Up Questions
1. How would the solution change if the target palindrome length (number of digits) were fixed?
2. Can you extend the approach to handle a custom cost per unit change (different weights for increase vs decrease)?
3. What if you needed to make the array elements equal to a *non‑palindromic* target – how does the algorithm simplify?

## Key Takeaway
The optimal palindromic target lies near the median; checking the closest palindromes on both sides yields the minimum total adjustment cost.
