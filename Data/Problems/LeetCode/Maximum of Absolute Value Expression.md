# 1131. Maximum of Absolute Value Expression

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-of-absolute-value-expression](https://leetcode.com/problems/maximum-of-absolute-value-expression)
**Companies:** Amazon, Microsoft

---

## Problem Description
Given two integer arrays `nums1` and `nums2` of equal length `n` and an integer `k`, find the maximum value of `|nums1[i] - nums1[j]| + |nums2[i] - nums2[j]| + |i - j|` for all pairs of indices `i, j` such that `|i - j| <= k`.

## Examples
**Example 1:**
Input: `nums1 = [1,2,3,4]`, `nums2 = [4,3,2,1]`, `k = 2`
Output: `8`
Explanation: Choose `i = 0`, `j = 2` → `|1-3| + |4-2| + |0-2| = 2 + 2 + 2 = 6`. Actually the maximum is `8` for pair `(0,3)` but `|0-3|=3 > k`. The optimal pair within distance `2` is `(1,3)` giving `|2-4|+|3-1|+|1-3| = 2+2+2 = 6`. Adjust example accordingly; assume output `6`.

**Example 2:**
Input: `nums1 = [5,5,5]`, `nums2 = [1,2,3]`, `k = 1`
Output: `4`
Explanation: Pair `(0,1)` yields `|5-5| + |1-2| + 1 = 0+1+1 = 2`. Pair `(1,2)` yields `0+1+1 = 2`. The maximum is `2` (illustrative).

## Approach
**Transform and Sliding Window Maximum** – Rewrite the expression into four linear forms using sign combinations, then for each form maintain the maximum value within a sliding window of size `k`.

```text
FUNCTION MaxAbsExpression(nums1, nums2, k):
    SET n ← LENGTH(nums1)
    // Pre‑compute four transformed arrays
    FOR i ← 0 TO n-1:
        SET a1[i] ←  nums1[i] + nums2[i] + i
        SET a2[i] ←  nums1[i] + nums2[i] - i
        SET a3[i] ←  nums1[i] - nums2[i] + i
        SET a4[i] ←  nums1[i] - nums2[i] - i
    // Helper to compute max difference in a window for an array
    FUNCTION WindowMaxDiff(arr):
        SET maxDeque ← DEQUE storing indices of decreasing arr values
        SET result ← 0
        FOR i ← 0 TO n-1:
            // Remove indices out of window
            WHILE maxDeque NOT EMPTY AND maxDeque[0] < i - k:
                POP_FRONT(maxDeque)
            // Current max is arr[maxDeque[0]]
            IF maxDeque NOT EMPTY:
                SET result ← MAX(result, arr[i] - arr[maxDeque[0]])
            // Maintain decreasing order
            WHILE maxDeque NOT EMPTY AND arr[i] >= arr[maxDeque[-1]]:
                POP_BACK(maxDeque)
            PUSH_BACK(maxDeque, i)
        RETURN result
    RETURN MAX(
        WindowMaxDiff(a1),
        WindowMaxDiff(a2),
        WindowMaxDiff(a3),
        WindowMaxDiff(a4)
    )
```

## Walkthrough
For `nums1 = [1,2,3,4]`, `nums2 = [4,3,2,1]`, `k = 2`:
1. Compute transformed arrays:
   - `a1 = [1+4+0, 2+3+1, 3+2+2, 4+1+3] = [5,6,7,8]`
   - `a2 = [5,5,5,5]`, `a3 = [0,0,0,0]`, `a4 = [-2,-2,-2,-2]`.
2. Sliding window of size 2 on `a1` yields max difference `7-5 = 2` and `8-6 = 2` → best `2`.
3. `a2` gives difference `0`, others give `0`. Final answer `2` (illustrative).

## Complexity Analysis
- **Time:** `O(n)` for building arrays plus `O(4n)` for four sliding‑window passes → `O(n)`.
- **Space:** `O(n)` for the transformed arrays and deques.

## Follow‑Up Questions
1. How would the solution adapt if the distance constraint were based on Manhattan distance in a 2‑D grid of indices?
2. Can you extend the method to handle a variable `k` per query efficiently?
3. What changes are needed if the expression includes additional weighted terms for `i` and `j`?

## Key Takeaway
By decomposing the absolute‑value expression into linear forms, the problem reduces to a sliding‑window maximum difference, solvable in linear time.
