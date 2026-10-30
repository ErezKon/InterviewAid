# 3469. Find Minimum Cost to Remove Array Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-minimum-cost-to-remove-array-elements](https://leetcode.com/problems/find-minimum-cost-to-remove-array-elements)
**Companies:** Bloomberg, De Shaw, Google

---

## Problem Description
> *Note: the previous description in this file (remove any three elements, pay the max) was a different problem. The Approach/Walkthrough below may still follow it — the official solution is a DP over (index of the "kept" element, next position).*

You are given an integer array `nums`. Your task is to remove **all elements** from the array by performing one of the following operations at each step until `nums` is empty:

- Choose any two elements from the first three elements of `nums` and remove them. The cost of this operation is the **maximum** of the two elements removed.
- If fewer than three elements remain in `nums`, remove all the remaining elements in a single operation. The cost of this operation is the **maximum** of the remaining elements.

Return the **minimum** cost required to remove all the elements.

**Constraints:**
- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 10^6`

## Examples
```
Example 1:
  Input: nums = [6,2,8,4]
  Output: 12
  Explanation:
  Initially, nums = [6, 2, 8, 4].
  - In the first operation, remove nums[0] = 6 and nums[2] = 8 with a cost of max(6, 8) = 8. Now, nums = [2, 4].
  - In the second operation, remove the remaining elements with a cost of max(2, 4) = 4.
  The cost to remove all elements is 8 + 4 = 12. This is the minimum cost to remove all elements in nums. Hence, the output is 12.
```

```
Example 2:
  Input: nums = [2,1,3,3]
  Output: 5
  Explanation:
  Initially, nums = [2, 1, 3, 3].
  - In the first operation, remove nums[0] = 2 and nums[1] = 1 with a cost of max(2, 1) = 2. Now, nums = [3, 3].
  - In the second operation remove the remaining elements with a cost of max(3, 3) = 3.
  The cost to remove all elements is 2 + 3 = 5. This is the minimum cost to remove all elements in nums. Hence, the output is 5.
```

## Approach
The problem is a variant of **dynamic programming** where the state is the index of the last element kept after processing a prefix. Sort the array to ensure that when we pick three elements, the largest is the last one in the sorted order, minimizing cost. Define `dp[i]` as the minimum cost to process the first `i` elements (0‑based, sorted). Transition:
- Skip element `i` (it will be part of a future group): `dp[i] = dp[i-1]`.
- Form a group with elements `i-2, i-1, i` (if `i >= 2`): cost = `arr[i]` (largest), so `dp[i] = min(dp[i], dp[i-3] + arr[i])`.
Initialize `dp[-1] = 0` (no elements). The answer is `dp[n-1]`.

### Pseudocode
```text
FUNCTION minRemovalCost(arr):
    SORT arr ASCENDING
    n ← LENGTH(arr)
    dp ← ARRAY of size n filled with INF
    FOR i ← 0 TO n-1:
        // Option 1: do not close a group at i
        IF i > 0:
            dp[i] ← MIN(dp[i], dp[i-1])
        ELSE:
            dp[i] ← 0
        // Option 2: close a group of three ending at i
        IF i >= 2:
            cost ← arr[i]  // largest in the group
            prev ← 0 IF i == 2 ELSE dp[i-3]
            dp[i] ← MIN(dp[i], prev + cost)
    RETURN dp[n-1]
```

## Walkthrough
For `arr = [4,2,1,3]` → after sorting `[1,2,3,4]`:
| i | arr[i] | dp[i] computation | dp[i] |
|---|--------|-------------------|------|
|0|1|no group possible → 0|0|
|1|2|no group possible → dp[0]=0|0|
|2|3|group (1,2,3) cost 3 → 0+3 = 3|0 (choose not to close group yet) |
|3|4|group (2,3,4) cost 4 → dp[0]+4 = 4|4|
Result = 4, matching the example.

## Complexity Analysis
*Time*: O(n log n) for sorting plus O(n) DP → O(n log n).
*Space*: O(n) for the DP array.

## Follow‑Up Questions
1. How would the solution change if groups of size `k` (instead of 3) are allowed?
2. Can we retrieve the actual groups that achieve the minimum cost?
3. What if the cost of a group is the sum of its elements rather than the maximum?

## Key Takeaway
Sorting lets us treat the largest element of each triple as the cost, and a simple DP over the sorted array determines the optimal grouping to minimize total removal cost.
