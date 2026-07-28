# 3073. Maximum Increasing Triplet Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-increasing-triplet-value](https://leetcode.com/problems/maximum-increasing-triplet-value)
**Companies:** Uber

---

## Problem Description
Given an integer array `nums`, find the maximum possible sum of a strictly increasing triplet `nums[i] < nums[j] < nums[k]` with indices `i < j < k`. Return the maximum sum, or `-1` if no such triplet exists.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[1,2,3,4]` | `9` | Triplet `2,3,4` gives sum `9` (maximum). |
| `[5,4,3,2,1]` | `-1` | No increasing triplet.

## Approach
Maintain two auxiliary arrays:
1. `leftMin[i]` – the smallest value to the left of `i`.
2. `rightMax[i]` – the largest value to the right of `i` that is greater than `nums[i]`.
Iterate through the array, and for each middle element `j` where `leftMin[j] < nums[j] < rightMax[j]`, compute the sum and track the maximum.

```text
FUNCTION maxIncreasingTripletSum(nums):
    n ← LENGTH(nums)
    IF n < 3: RETURN -1
    leftMin ← ARRAY of size n
    minVal ← INF
    FOR i FROM 0 TO n-1:
        leftMin[i] ← minVal
        minVal ← MIN(minVal, nums[i])
    // Compute right candidates using a monotonic decreasing stack
    rightMax ← ARRAY of size n INITIALIZED TO -1
    stack ← EMPTY   // will store values in decreasing order
    FOR i FROM n-1 DOWNTO 0:
        // Pop smaller or equal values
        WHILE stack NOT EMPTY AND stack.TOP() <= nums[i]:
            POP(stack)
        IF stack NOT EMPTY:
            rightMax[i] ← stack.TOP()
        PUSH(stack, nums[i])
    maxSum ← -1
    FOR j FROM 0 TO n-1:
        IF leftMin[j] < nums[j] AND rightMax[j] != -1:
            maxSum ← MAX(maxSum, leftMin[j] + nums[j] + rightMax[j])
    RETURN maxSum
```
The stack ensures we find the smallest greater element on the right efficiently.

## Walkthrough
For `nums = [2,5,3,1,4,9]`:
1. `leftMin` becomes `[INF,2,2,2,1,1]`.
2. Scanning from right, the stack yields `rightMax = [-1,9,9,9,9,-1]`.
3. At `j=1` (value 5): left = 2, right = 9 → sum = 16 (max).
4. At `j=4` (value 4): left = 1, right = 9 → sum = 14.
5. Final answer `16`.

## Complexity Analysis
*Time*: **O(n)** – two linear passes and stack operations are amortized O(1).
*Space*: **O(n)** – auxiliary arrays and stack.

## Follow‑Up Questions
1. How would you modify the algorithm to return the actual triplet values?
2. Can the solution be extended to find the maximum sum of an increasing subsequence of length `k`?
3. What changes are needed if the array may contain duplicate values and the triplet must be strictly increasing?

## Key Takeaway
By precomputing the best smaller left value and the best larger right value for each position, a linear‑time scan yields the maximum‑sum increasing triplet.
