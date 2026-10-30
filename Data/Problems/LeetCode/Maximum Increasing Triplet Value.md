# 3073. Maximum Increasing Triplet Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-increasing-triplet-value](https://leetcode.com/problems/maximum-increasing-triplet-value)
**Companies:** Uber

---

## Problem Description

> *Note: the Approach below maximizes the triplet **sum**. Officially the value is `nums[i] - nums[j] + nums[k]` with `i < j < k` and `nums[i] < nums[j] < nums[k]`. Correct idea: for each middle `j`, take the suffix maximum to its right (it must be `> nums[j]`) and the largest value `< nums[j]` to its left (ordered set / `lower_bound`). O(n log n).*

> *Note: premium problem — statement verified via doocs/leetcode.*

Given an array `nums`, return *the **maximum value** of a triplet* `(i, j, k)` *such that* `i < j < k` *and* `nums[i] < nums[j] < nums[k]`.

The **value** of a triplet `(i, j, k)` is `nums[i] - nums[j] + nums[k]`.

**Example 1: **

**Input: ** nums = [5,6,9]

**Output: ** 8

**Explanation: ** We only have one choice for an increasing triplet and that is choosing all three elements. The value of this triplet would be `5 - 6 + 9 = 8`.

**Example 2: **

**Input:**  nums = [1,5,3,6]

**Output:**  4

**Explanation: ** There are only two increasing triplets:

`(0, 1, 3)`: The value of this triplet is `nums[0] - nums[1] + nums[3] = 1 - 5 + 6 = 2`.

`(0, 2, 3)`: The value of this triplet is `nums[0] - nums[2] + nums[3] = 1 - 3 + 6 = 4`.

Thus the answer would be `4`.

**Constraints:**
- `3 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- The input is generated such that at least one triplet meets the given condition.

## Examples



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
