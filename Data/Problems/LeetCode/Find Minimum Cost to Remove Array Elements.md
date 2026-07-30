# 3469. Find Minimum Cost to Remove Array Elements

**Difficulty:** 🟡 Medium
**Companies:** Bloomberg, De Shaw, Google

---

## Problem Description
Given an integer array `arr`, you may repeatedly remove exactly three elements and pay a cost equal to the value of the largest of the three removed elements. The operation continues until fewer than three elements remain. Determine the minimum total cost required to remove elements so that the array is empty (or contains fewer than three elements).

## Examples
**Example 1**
```
arr = [4, 2, 1, 3]
Remove (4,2,1) → cost 4, remaining [3]
Total cost = 4
```
**Example 2**
```
arr = [5,5,5,5,5]
First remove (5,5,5) → cost 5, remaining [5,5]
No further removals possible, total cost = 5
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
