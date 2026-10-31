# 446. Arithmetic Slices II - Subsequence

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/arithmetic-slices-ii-subsequence](https://leetcode.com/problems/arithmetic-slices-ii-subsequence)
**Companies:** Amazon, Baidu, Bloomberg, Google

---

## Problem Description
Given an integer array `nums`, return *the number of all the **arithmetic subsequences** of* `nums`.

A sequence of numbers is called arithmetic if it consists of **at least three elements** and if the difference between any two consecutive elements is the same.

- For example, `[1, 3, 5, 7, 9]`, `[7, 7, 7, 7]`, and `[3, -1, -5, -9]` are arithmetic sequences.
- For example, `[1, 1, 2, 5, 7]` is not an arithmetic sequence.

A **subsequence** of an array is a sequence that can be formed by removing some elements (possibly none) of the array.

- For example, `[2,5,10]` is a subsequence of `[1,2,1,2,4,1,5,10]`.

The test cases are generated so that the answer fits in **32-bit** integer.

**Constraints:**
- `1 ≤ nums.length ≤ 1000`
- `-2³¹ ≤ nums[i] ≤ 2³¹ - 1`

## Examples
```
Example 1:
  Input: nums = [2,4,6,8,10]
  Output: 7
  Explanation: All arithmetic subsequence slices are:
  [2,4,6]
  [4,6,8]
  [6,8,10]
  [2,4,6,8]
  [4,6,8,10]
  [2,4,6,8,10]
  [2,6,10]
```
```
Example 2:
  Input: nums = [7,7,7,7,7]
  Output: 16
  Explanation: Any subsequence of this array is arithmetic.
```

## Approach
**DP with Hash Map — O(n²)**
We maintain for each index `i` a hash map `dp[i]` where `dp[i][d]` stores the number of arithmetic subsequences of length ≥2 ending at `i` with common difference `d`. For each pair `(j, i)` with `j < i`, we compute `diff = nums[i] - nums[j]`. Any existing subsequence ending at `j` with the same `diff` can be extended by `nums[i]`, contributing `dp[j][diff]` new valid slices (of length ≥3). Additionally, the pair `(nums[j], nums[i])` itself forms a length-2 subsequence, so we increment `dp[i][diff]` by `dp[j][diff] + 1`.

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