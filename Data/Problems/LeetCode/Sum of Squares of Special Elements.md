# 2778. Sum of Squares of Special Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-squares-of-special-elements](https://leetcode.com/problems/sum-of-squares-of-special-elements)
**Companies:** Google

---

## Problem Description

> *Note: the Approach/Walkthrough below use an invented "greater than everything left, smaller than everything right" definition. Correct idea: element `nums[i]` (1-indexed) is special iff `n % i == 0`; sum `nums[i]²` over those `i`. O(n).*

You are given a **1-indexed** integer array `nums` of length `n`.

An element `nums[i]` of `nums` is called **special** if `i` divides `n`, i.e. `n % i == 0`.

Return *the **sum of the squares** of all **special** elements of* `nums`.

**Constraints:**
- `1 <= nums.length == n <= 50`
- `1 <= nums[i] <= 50`

## Examples

**Example 1:**
```
Input: nums = [1,2,3,4]
Output: 21
Explanation: There are exactly 3 special elements in nums: nums[1] since 1 divides 4, nums[2] since 2 divides 4, and nums[4] since 4 divides 4.
Hence, the sum of the squares of all special elements of nums is nums[1] * nums[1] + nums[2] * nums[2] + nums[4] * nums[4] = 1 * 1 + 2 * 2 + 4 * 4 = 21.
```

**Example 2:**
```
Input: nums = [2,7,1,19,18,3]
Output: 63
Explanation: There are exactly 4 special elements in nums: nums[1] since 1 divides 6, nums[2] since 2 divides 6, nums[3] since 3 divides 6, and nums[6] since 6 divides 6.
Hence, the sum of the squares of all special elements of nums is nums[1] * nums[1] + nums[2] * nums[2] + nums[3] * nums[3] + nums[6] * nums[6] = 2 * 2 + 7 * 7 + 1 * 1 + 3 * 3 = 63.
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
