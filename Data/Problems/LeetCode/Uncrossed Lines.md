# 1035. Uncrossed Lines

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/uncrossed-lines](https://leetcode.com/problems/uncrossed-lines)
**Companies:** Amazon, Google, Microsoft, Phonepe

---

## Problem Description

You are given two integer arrays `nums1` and `nums2`. We write the integers of `nums1` and `nums2` (in the order they are given) on two separate horizontal lines.

We may draw connecting lines: a straight line connecting two numbers `nums1[i]` and `nums2[j]` such that:

- `nums1[i] == nums2[j]`, and
- the line we draw does not intersect any other connecting (non-horizontal) line.

Note that a connecting line cannot intersect even at the endpoints (i.e., each number can only belong to one connecting line).

Return *the maximum number of connecting lines we can draw in this way*.

**Constraints:**
- `1 <= nums1.length, nums2.length <= 500`
- `1 <= nums1[i], nums2[j] <= 2000`

## Examples

**Example 1:**
```
Input: nums1 = [1,4,2], nums2 = [1,2,4]
Output: 2
Explanation: We can draw 2 uncrossed lines as in the diagram.
We cannot draw 3 uncrossed lines, because the line from nums1[1] = 4 to nums2[2] = 4 will intersect the line from nums1[2]=2 to nums2[1]=2.
```

**Example 2:**
```
Input: nums1 = [2,5,1,2,5], nums2 = [10,5,2,1,5,2]
Output: 3
```

**Example 3:**
```
Input: nums1 = [1,3,7,1,7,5], nums2 = [1,9,2,5,1]
Output: 2
```

## Approach
Treat the problem as LCS. Use dynamic programming where `dp[i][j]` stores the LCS length for the first `i` elements of `nums1` and first `j` elements of `nums2`.

```text
FUNCTION MaxUncrossedLines(nums1, nums2):
    SET m ← LENGTH(nums1)
    SET n ← LENGTH(nums2)
    SET dp ← MATRIX (m+1) × (n+1) FILLED WITH 0
    FOR i ← 1 TO m:
        FOR j ← 1 TO n:
            IF nums1[i-1] = nums2[j-1]:
                SET dp[i][j] ← dp[i-1][j-1] + 1
            ELSE:
                SET dp[i][j] ← MAX(dp[i-1][j], dp[i][j-1])
    RETURN dp[m][n]
```

## Walkthrough
Consider `nums1 = [1,4,2]`, `nums2 = [1,2,4]`.
| i/j | 0 | 1 (1) | 2 (2) | 3 (4) |
|-----|---|-------|-------|-------|
| 0   | 0 | 0     | 0     | 0     |
| 1 (1) | 0 | 1 | 1 | 1 |
| 2 (4) | 0 | 1 | 1 | 2 |
| 3 (2) | 0 | 1 | 2 | 2 |
The final cell `dp[3][3] = 2` gives the answer.

## Complexity Analysis
- **Time:** O(m·n) where m and n are the lengths of the two arrays.
- **Space:** O(m·n) for the DP table (can be reduced to O(min(m,n)) with rolling arrays).

## Follow-Up Questions
1. How can you reduce the space complexity to O(min(m, n))?
2. How would you modify the solution to also return the actual lines (indices) drawn?
3. Can this be solved using a patience sorting based LCS reduction for faster performance?

## Key Takeaway
Transforming the uncrossed lines problem into a classic LCS DP formulation yields a simple and optimal solution.
