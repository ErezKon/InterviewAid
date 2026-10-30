# 2602. Minimum Operations to Make All Array Elements Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-all-array-elements-equal](https://leetcode.com/problems/minimum-operations-to-make-all-array-elements-equal)

**Companies:** Amazon, Ibm, Jpmorgan
---

## Problem Description
You are given an array `nums` consisting of positive integers.

You are also given an integer array `queries` of size `m`. For the `i`-th query, you want to make all of the elements of `nums` equal to `queries[i]`. You can perform the following operation on the array **any** number of times:

- **Increase** or **decrease** an element of the array by `1`.

Return *an array* `answer` *of size* `m` *where* `answer[i]` *is the **minimum** number of operations to make all elements of* `nums` *equal to* `queries[i]`.

**Note** that after each query the array is reset to its original state.

**Constraints:**
- `n == nums.length`
- `m == queries.length`
- `1 <= n, m <= 10^5`
- `1 <= nums[i], queries[i] <= 10^9`

## Examples

```
Example 1:
  Input: nums = [3,1,6,8], queries = [1,5]
  Output: [14,10]
  Explanation: For the first query we can do the following operations:
  - Decrease nums[0] 2 times, so that nums = [1,1,6,8].
  - Decrease nums[2] 5 times, so that nums = [1,1,1,8].
  - Decrease nums[3] 7 times, so that nums = [1,1,1,1].
  So the total number of operations for the first query is 2 + 5 + 7 = 14.
  For the second query we can do the following operations:
  - Increase nums[0] 2 times, so that nums = [5,1,6,8].
  - Increase nums[1] 4 times, so that nums = [5,5,6,8].
  - Decrease nums[2] 1 time, so that nums = [5,5,5,8].
  - Decrease nums[3] 3 times, so that nums = [5,5,5,5].
  So the total number of operations for the second query is 2 + 4 + 1 + 3 = 10.
```

```
Example 2:
  Input: nums = [2,9,6,3], queries = [10]
  Output: [20]
  Explanation: We can increase each value in the array to 10. The total number of operations will be 8 + 1 + 4 + 7 = 20.
```

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
