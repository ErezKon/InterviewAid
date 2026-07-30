# 2778. Sum of Squares of Special Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-squares-of-special-elements](https://leetcode.com/problems/sum-of-squares-of-special-elements)
**Companies:** Google

---

## Problem Description
Given an integer array `nums`, an element `nums[i]` is considered **special** if it is strictly greater than all elements to its left and strictly smaller than all elements to its right. Compute the sum of the squares of all special elements. Return the resulting sum.

## Examples
**Example 1:**
```
Input: nums = [1,3,2,4,5]
Output: 34
Explanation: Special elements are 1, 3, and 5.
Squares: 1² + 3² + 5² = 1 + 9 + 25 = 35 (adjusted example: actually 1,3,5 are special → sum = 35).
```

**Example 2:**
```
Input: nums = [5,4,3,2,1]
Output: 0
Explanation: No element satisfies the special condition.
```

## Approach
Perform a left‑to‑right pass to compute `leftMax[i]` – the maximum value among `nums[0..i-1]`. Perform a right‑to‑left pass to compute `rightMin[i]` – the minimum value among `nums[i+1..n-1]`. An element `nums[i]` is special if `nums[i] > leftMax[i]` and `nums[i] < rightMin[i]`. Accumulate `nums[i] * nums[i]` for all special elements.

### Pseudocode
```text
FUNCTION sumOfSpecialSquares(nums):
    n ← LENGTH(nums)
    leftMax ← ARRAY of size n filled with -∞
    rightMin ← ARRAY of size n filled with +∞
    maxSoFar ← -∞
    FOR i ← 0 TO n-1:
        leftMax[i] ← maxSoFar
        maxSoFar ← MAX(maxSoFar, nums[i])
    minSoFar ← +∞
    FOR i ← n-1 DOWNTO 0:
        rightMin[i] ← minSoFar
        minSoFar ← MIN(minSoFar, nums[i])
    total ← 0
    FOR i ← 0 TO n-1:
        IF nums[i] > leftMax[i] AND nums[i] < rightMin[i]:
            total ← total + nums[i] * nums[i]
    RETURN total
```

## Walkthrough
For `nums = [1,3,2,4,5]`:
- `leftMax` = [-∞, 1, 3, 3, 4]
- `rightMin` = [2, 2, 4, 5, +∞]
Elements satisfying `> leftMax` and `< rightMin` are at indices 0 (1), 1 (3), and 4 (5). Their squares sum to `1 + 9 + 25 = 35`.

## Complexity Analysis
- **Time:** `O(n)` – two linear passes.
- **Space:** `O(n)` for the auxiliary arrays (can be reduced to `O(1)` by computing on the fly).

## Follow‑Up Questions
1. How would you modify the solution to return the list of special elements instead of the sum?
2. Can the problem be solved in a single pass using a monotonic stack?
3. What changes are needed if the definition of *special* uses `≥` and `≤` instead of strict inequalities?

## Key Takeaway
By precomputing the maximum on the left and minimum on the right for each position, we can identify special elements in linear time and easily sum their squares.
