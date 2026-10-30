# 813. Largest Sum of Averages

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-sum-of-averages](https://leetcode.com/problems/largest-sum-of-averages)
**Companies:** Amazon, Google

---

## 1. Problem Description

You are given an integer array `nums` and an integer `k`. You can partition the array into **at most** `k` non-empty adjacent subarrays. The **score** of a partition is the sum of the averages of each subarray.

Note that the partition must use every integer in `nums`, and that the score is not necessarily an integer.

Return *the maximum **score** you can achieve of all the possible partitions*. Answers within `10^-6` of the actual answer will be accepted.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 10^4`
- `1 <= k <= nums.length`

---

## 2. Examples

```
Example 1:
  Input: nums = [9,1,2,3,9], k = 3
  Output: 20.00000
  Explanation:
  The best choice is to partition nums into [9], [1, 2, 3], [9]. The answer is 9 + (1 + 2 + 3) / 3 + 9 = 20.
  We could have also partitioned nums into [9, 1], [2], [3, 9], for example.
  That partition would lead to a score of 5 + 2 + 6 = 13, which is worse.
```

```
Example 2:
  Input: nums = [1,2,3,4,5,6,7], k = 4
  Output: 20.50000
  Explanation: One optimal partition is [1,2,3,4], [5], [6], [7] → 2.5 + 5 + 6 + 7 = 20.5.
```

---

## 3. Approach: DP with Prefix Sums — O(n²·k) ✅

```text
FUNCTION largestSumOfAverages(nums, k):
    n ← LENGTH(nums)
    prefix ← ARRAY of size n+1, prefix[0] ← 0
    FOR i ← 1 TO n:
        prefix[i] ← prefix[i-1] + nums[i-1]

    dp ← 2‑D ARRAY (n+1) × (k+1) filled with 0
    FOR i ← 1 TO n:
        dp[i][1] ← prefix[i] / i   // one group: average of first i elements

    FOR groups ← 2 TO k:
        FOR i ← groups TO n:
            FOR m ← groups-1 TO i-1:
                avg ← (prefix[i] - prefix[m]) / (i - m)
                dp[i][groups] ← MAX(dp[i][groups], dp[m][groups-1] + avg)

    RETURN dp[n][k]
```

---

## 4. Walkthrough

For `nums = [9,1,2,3,9]`, `k = 3`:
| i | prefix[i] |
|---|-----------|
|0|0|
|1|9|
|2|10|
|3|12|
|4|15|
|5|24|

`dp[1][1] = 9/1 = 9`. Continue filling DP; the optimal split at `m = 1` and `m = 4` yields `9 + (1+2+3)/3 + 9 = 20`.

---

## 5. Complexity Analysis

| Time Complexity | O(n²·k) – three nested loops over groups, end index, and split point |
| Space Complexity | O(n·k) – DP table plus O(n) prefix array |

---

## 6. Follow‑Up Questions

- How would you modify the solution to return the actual partitioning of the array?
- Can the DP be optimized to O(n·k) using monotonic queue or convex hull tricks?
- What changes if the groups must be exactly `k` instead of at most `k`?

---

## Key Takeaway

> Use DP where `dp[i][g]` stores the best sum of averages for the first `i` elements split into `g` groups. Prefix sums give O(1) average computation, leading to an O(n²·k) solution.
