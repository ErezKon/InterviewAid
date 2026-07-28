# 546. Remove Boxes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/remove-boxes](https://leetcode.com/problems/remove-boxes)
**Companies:** Amazon, Capital One, Google, Meta, Microsoft, Phonepe, Sprinklr, Tencent, Teradata, Zeta

---

## Problem Description
Given an array `boxes` of positive integers where each integer represents a color, you may remove any contiguous segment of boxes of the same color. Removing a segment of length `k` yields `k*k` points. After removal, the remaining boxes shift to fill the gap. Return the maximum points achievable.

## Examples
**Example 1**
```
Input: boxes = [1,3,2,2,2,3,4,3,1]
Output: 23
Explanation: Remove the three 2's (3*3=9), then the two 3's (2*2=4), then the remaining boxes for a total of 23.
```
**Example 2**
```
Input: boxes = [1,1,1]
Output: 9
Explanation: Remove all three at once for 3*3=9 points.
```

## Approach
Use 3‑dimensional dynamic programming where `dp(l, r, k)` denotes the maximum points for subarray `boxes[l..r]` with `k` extra boxes of the same color as `boxes[l]` appended to its left. The recurrence either removes the left group now or merges it with a later same‑color box after clearing the middle part.

```text
FUNCTION removeBoxes(boxes):
    n ← LENGTH(boxes)
    memo ← 3D array of size n×n×n initialized to 0

    FUNCTION dp(l, r, k):
        IF l > r: RETURN 0
        IF memo[l][r][k] ≠ 0: RETURN memo[l][r][k]
        // Collapse consecutive same‑color boxes at the left
        WHILE l + 1 ≤ r AND boxes[l+1] = boxes[l]:
            l ← l + 1; k ← k + 1
        // Option 1: remove the left group now
        result ← (k + 1)² + dp(l + 1, r, 0)
        // Option 2: try to merge with a later same‑color box
        FOR m ← l + 1 TO r:
            IF boxes[m] = boxes[l]:
                result ← MAX(result, dp(l + 1, m - 1, 0) + dp(m, r, k + 1))
        memo[l][r][k] ← result
        RETURN result

    RETURN dp(0, n - 1, 0)
```

## Walkthrough
For `boxes = [1,1,2,2,2,1]`:
| Step | Subarray | k | Decision | Points |
|------|----------|---|----------|--------|
| 1 | dp(0,5,0) | 0 | Merge first two 1's with last 1 | → dp(2,4,2) |
| 2 | dp(2,4,2) | 2 | Remove three 2's now | (2+1)² + dp(5,5,0) = 9 + 1 = 10 |
| 3 | dp(5,5,0) | 0 | Remove final 1 | 1² = 1 |
| Total | | | | 11 |
The DP explores all merge possibilities to achieve the optimal 23 points for the full example.

## Complexity Analysis
Time: `O(n⁴)` in the worst case due to three dimensions and an inner loop over `m`.
Space: `O(n³)` for the memoization table.

## Follow-Up Questions
1. Can the DP be optimized to `O(n³)` using monotonicity or pruning?
2. How would the solution change if removal gave `k` points instead of `k*k`?
3. What if the colors are limited to a small alphabet—can we use a more compact state representation?

## Key Takeaway
Modeling the problem with `dp(l, r, k)` captures the benefit of delaying removal to merge same‑color groups, enabling the optimal scoring strategy.
