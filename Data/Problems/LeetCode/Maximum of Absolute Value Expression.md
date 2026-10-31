# 1131. Maximum of Absolute Value Expression

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-of-absolute-value-expression](https://leetcode.com/problems/maximum-of-absolute-value-expression)
**Companies:** Amazon, Microsoft

---

## Problem Description

> *Note: the Approach below adds a window constraint `|i - j| ≤ k` that is not in the official problem. Drop the window: for each of the four forms `arr1[i] ± arr2[i] ± i`, take `max − min` over the whole array and return the largest. O(n).*

Given two arrays of integers with equal lengths, return the maximum value of:

`|arr1[i] - arr1[j]| + |arr2[i] - arr2[j]| + |i - j|`

where the maximum is taken over all `0 <= i, j < arr1.length`.

**Constraints:**
- `2 <= arr1.length == arr2.length <= 40000`
- `-10^6 <= arr1[i], arr2[i] <= 10^6`

## Examples

**Example 1:**
```
Input: arr1 = [1,2,3,4], arr2 = [-1,4,5,6]
Output: 13
```

**Example 2:**
```
Input: arr1 = [1,-2,-5,0,10], arr2 = [0,-2,-1,-7,-4]
Output: 20
```

## Approach
**Transform and Sliding Window Maximum** – Rewrite the expression into four linear forms using sign combinations, then for each form maintain the maximum value within a sliding window of size `k`.

```text
FUNCTION MaxAbsExpression(nums1, nums2, k):
    SET n ← LENGTH(nums1)
    // Pre-compute four transformed arrays
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
- **Time:** `O(n)` for building arrays plus `O(4n)` for four sliding-window passes → `O(n)`.
- **Space:** `O(n)` for the transformed arrays and deques.

## Follow-Up Questions
1. How would the solution adapt if the distance constraint were based on Manhattan distance in a 2-D grid of indices?
2. Can you extend the method to handle a variable `k` per query efficiently?
3. What changes are needed if the expression includes additional weighted terms for `i` and `j`?

## Key Takeaway
By decomposing the absolute-value expression into linear forms, the problem reduces to a sliding-window maximum difference, solvable in linear time.
