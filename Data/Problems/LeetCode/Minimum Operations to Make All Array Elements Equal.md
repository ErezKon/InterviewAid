# 2602. Minimum Operations to Make All Array Elements Equal

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Ibm, Jpmorgan
---

## Problem Description
Given an integer array `nums` and a list of query values, for each query `q` compute the minimum total number of increment or decrement operations required to change every element of `nums` so that they all become equal to `q`. An operation increments or decrements an element by 1.

## Examples
- **Input:** `nums = [1,2,3]`, `queries = [2]`  
  **Output:** `[2]`  
  **Explanation:** Change 1→2 (1 op) and 3→2 (1 op); total 2.
- **Input:** `nums = [1,5,6]`, `queries = [3,5]`  
  **Output:** `[7,5]`

## Approach
**Greedy with Sorting and Prefix Sums**  
Sorting the array allows us to compute the cost for any target `q` in O(log n) using prefix sums. For a target `q`, elements left of the insertion point need to be increased, and elements right need to be decreased. The total cost is:
`q * leftCount - leftSum + rightSum - q * rightCount`.

```
text
FUNCTION minOperations(nums, queries):
    SORT nums ASCENDING
    SET n ← LENGTH(nums)
    CREATE prefix[0] ← 0
    FOR i FROM 1 TO n:
        SET prefix[i] ← prefix[i-1] + nums[i-1]
    SET results ← []
    FOR each q IN queries:
        SET idx ← LOWER_BOUND(nums, q)   // first index where nums[idx] ≥ q
        SET leftCount ← idx
        SET leftSum ← prefix[idx]
        SET rightCount ← n - idx
        SET rightSum ← prefix[n] - prefix[idx]
        SET cost ← q * leftCount - leftSum + rightSum - q * rightCount
        APPEND cost TO results
    RETURN results
```

## Walkthrough
Consider `nums = [1,5,6]` and `q = 3`.
1. After sorting: `[1,5,6]`; prefix = `[0,1,6,12]`.
2. `idx = 1` (first element ≥ 3 is 5).
3. `leftCount = 1`, `leftSum = 1`; `rightCount = 2`, `rightSum = 11`.
4. `cost = 3*1 - 1 + 11 - 3*2 = 2 + 5 = 7` operations.

## Complexity Analysis
- **Time:** Sorting `O(n log n)` plus `O(m log n)` for `m` queries.
- **Space:** `O(n)` for the prefix sum array.

## Follow‑Up Questions
1. How would you handle updates to `nums` (insertions/deletions) while still answering queries efficiently?
2. What if each operation had a different cost depending on the element value?
3. Can this approach be extended to multi‑dimensional points with Manhattan distance?

## Key Takeaway
Sorting once and using prefix sums enables constant‑time cost calculation for any target value, turning a naïve O(n·m) solution into O(n log n + m log n).
