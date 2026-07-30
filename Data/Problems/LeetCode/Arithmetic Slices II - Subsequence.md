# 446. Arithmetic Slices II - Subsequence

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/arithmetic-slices-ii-subsequence](https://leetcode.com/problems/arithmetic-slices-ii-subsequence)
**Companies:** Amazon, Baidu, Bloomberg, Google

---

## Problem Description
Given an integer array `nums`, return the number of arithmetic subsequence slices in `nums`. A subsequence slice is a sequence of at least three indices `i < j < k` such that `nums[i], nums[j], nums[k]` form an arithmetic progression (the difference between consecutive elements is constant). Subsequences are not required to be contiguous.

## Examples
**Example 1:**
```
Input: nums = [2,4,6,8,10]
Output: 7
Explanation: The arithmetic subsequence slices are:
[2,4,6], [4,6,8], [6,8,10], [2,4,6,8], [4,6,8,10], [2,4,6,8,10], [2,6,10]
```

**Example 2:**
```
Input: nums = [7,7,7,7]
Output: 5
Explanation: All possible subsequences of length ≥3 are arithmetic because the difference is 0.
```

## Approach
**DP with Hash Map — O(n²)**
We maintain for each index `i` a hash map `dp[i]` where `dp[i][d]` stores the number of arithmetic subsequences of length ≥2 ending at `i` with common difference `d`. For each pair `(j, i)` with `j < i`, we compute `diff = nums[i] - nums[j]`. Any existing subsequence ending at `j` with the same `diff` can be extended by `nums[i]`, contributing `dp[j][diff]` new valid slices (of length ≥3). Additionally, the pair `(nums[j], nums[i])` itself forms a length‑2 subsequence, so we increment `dp[i][diff]` by `dp[j][diff] + 1`.

```text
FUNCTION numberOfArithmeticSlices(nums):
    n ← LENGTH(nums)
    dp ← ARRAY of n HASHMAPs
    total ← 0
    FOR i ← 0 TO n-1:
        FOR j ← 0 TO i-1:
            diff ← nums[i] - nums[j]
            count ← dp[j].GET(diff, 0)
            total ← total + count          // extend existing subsequences
            dp[i][diff] ← dp[i].GET(diff, 0) + count + 1
    RETURN total
```

## Walkthrough
Consider `nums = [2,4,6,8]`.
| i | j | diff | count (dp[j][diff]) | total increment | dp[i][diff] after update |
|---|---|------|--------------------|----------------|--------------------------|
|1|0|2|0|0|dp[1][2]=1 (pair 2,4) |
|2|0|4|0|0|dp[2][4]=1 |
|2|1|2|1|1|dp[2][2]=2 (pair 4,6 + extend) |
|3|0|6|0|0|dp[3][6]=1 |
|3|1|4|1|1|dp[3][4]=2 |
|3|2|2|2|2|dp[3][2]=3 |
Total = 1 (from i=2,j=1) + 1 (i=3,j=1) + 2 (i=3,j=2) = 4 arithmetic slices, matching the manual count.

## Complexity Analysis
- **Time:** O(n²) – we examine each pair of indices.
- **Space:** O(n²) in the worst case for the hash maps storing differences.

## Follow-Up Questions
1. How would the solution change if we only counted subsequences of exactly length 3?
2. Can we reduce space usage by compressing differences?
3. How does the algorithm adapt to streaming input where numbers arrive one by one?

## Key Takeaway
By storing counts of arithmetic subsequences ending at each index for every possible difference, we can extend them efficiently, turning an exponential enumeration into an O(n²) DP solution.