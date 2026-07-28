# 689. Maximum Sum of 3 Non-Overlapping Subarrays

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays](https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays)
**Companies:** Amazon, Bloomberg, General Motors, Google, Meta, Microsoft

---

## Problem Description
Given an integer array `nums` and an integer `k`, find three non‑overlapping subarrays of length `k` with maximum total sum. Return the starting indices of the three subarrays.

## Examples
**Example 1**
```
Input: nums = [1,2,1,2,6,7,5,1], k = 2
Output: [0,3,5]
Explanation: Subarrays starting at 0, 3, and 5 are [1,2], [2,6], [7,5] with total sum 23.
```
**Example 2**
```
Input: nums = [1,2,1,2,1,2,1,2,1], k = 2
Output: [0,2,4]
Explanation: Multiple optimal solutions exist; any with maximum total sum is accepted.
```

## Approach
Use dynamic programming with precomputed window sums and best‑left/right indices.
1. Compute `windowSums[i]` = sum of `nums[i..i+k-1]` for all valid `i`.
2. `left[i]` stores the index of the maximum‑sum window in `[0..i]`.
3. `right[i]` stores the index of the maximum‑sum window in `[i..end]` (choose rightmost on ties).
4. Iterate `mid` from `k` to `len(windowSums)-k-1`, combine `left[mid-k]`, `mid`, `right[mid+k]` to get total sum, keep best.
The DP runs in O(n) time.

```text
FUNCTION maxSumOfThreeSubarrays(nums, k):
    n ← LENGTH(nums)
    // 1. Window sums
    windowSums ← ARRAY(n - k + 1)
    curSum ← SUM(nums[0..k-1])
    windowSums[0] ← curSum
    FOR i ← 1 TO n - k:
        curSum ← curSum - nums[i-1] + nums[i+k-1]
        windowSums[i] ← curSum
    // 2. Best left indices
    left ← ARRAY(LENGTH(windowSums))
    best ← 0
    FOR i ← 0 TO LENGTH(windowSums)-1:
        IF windowSums[i] > windowSums[best]:
            best ← i
        left[i] ← best
    // 3. Best right indices (rightmost on ties)
    right ← ARRAY(LENGTH(windowSums))
    best ← LENGTH(windowSums) - 1
    FOR i ← LENGTH(windowSums)-1 DOWNTO 0:
        IF windowSums[i] >= windowSums[best]:
            best ← i
        right[i] ← best
    // 4. Choose middle window
    maxTotal ← -∞
    answer ← [0,0,0]
    FOR mid ← k TO LENGTH(windowSums) - k - 1:
        l ← left[mid - k]
        r ← right[mid + k]
        total ← windowSums[l] + windowSums[mid] + windowSums[r]
        IF total > maxTotal:
            maxTotal ← total
            answer ← [l, mid, r]
    RETURN answer
```

## Walkthrough
For `nums = [1,2,1,2,6,7,5,1]`, `k = 2`:
| i | window sum |
|---|------------|
|0|3|
|1|3|
|2|3|
|3|8|
|4|13|
|5|12|
|6|6|
`left` gives best indices up to each position, `right` gives best from each position. Choosing `mid = 3` yields left = 0, right = 5, total = 3+8+12 = 23, which is maximal.

## Complexity Analysis
*Time*: O(n) – one pass for window sums, two passes for left/right, and one final scan.
*Space*: O(n) for the auxiliary arrays.

## Follow‑Up Questions
1. How would you adapt the algorithm for `m` non‑overlapping subarrays of length `k`?
2. Can the solution be extended to variable‑length subarrays with a total length constraint?
3. How would you modify the DP if the subarrays could overlap but you wanted to maximize the sum of exactly three chosen windows?

## Key Takeaway
Precomputing window sums and maintaining best‑left/right indices enables an O(n) DP that efficiently selects three optimal non‑overlapping subarrays.
