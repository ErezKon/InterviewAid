# 1043. Partition Array for Maximum Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-array-for-maximum-sum](https://leetcode.com/problems/partition-array-for-maximum-sum)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given an integer array `arr`, partition the array into (contiguous) subarrays of length **at most** `k`. After partitioning, each subarray has their values changed to become the maximum value of that subarray.

Return *the largest sum of the given array after partitioning. Test cases are generated so that the answer fits in a **32-bit** integer.*

**Constraints:**

- `1 <= arr.length <= 500`
- `0 <= arr[i] <= 10^9`
- `1 <= k <= arr.length`

## Examples

```
Example 1:
  Input: arr = [1,15,7,9,2,5,10], k = 3
  Output: 84
  Explanation: arr becomes [15,15,15,9,10,10,10]
```

```
Example 2:
  Input: arr = [1,4,1,5,7,3,6,1,9,9,3], k = 4
  Output: 83
```

```
Example 3:
  Input: arr = [1], k = 1
  Output: 1
```

## Approach
Dynamic programming. Let `dp[i]` be the maximum sum for the prefix `arr[0..i-1]`. For each position `i`, consider all possible partition lengths `j` from 1 to `k` (but not exceeding `i`). Track the maximum value within the last `j` elements and update `dp[i]` with `dp[i-j] + maxVal * j`.

```text
FUNCTION maxSumAfterPartitioning(arr, k):
    n ← LEN(arr)
    dp ← ARRAY n+1 WITH 0
    FOR i ← 1 TO n:
        maxVal ← 0
        FOR j ← 1 TO MIN(k, i):
            maxVal ← MAX(maxVal, arr[i - j])
            dp[i] ← MAX(dp[i], dp[i - j] + maxVal * j)
    RETURN dp[n]
```

## Walkthrough
For `arr = [1,15,7,9,2,5,10]`, `k = 3`:
- i=1: j=1 → dp[1]=1.
- i=2: j=1 → dp[2]=16; j=2 → maxVal=15 → dp[2]=30.
- i=3: consider partitions ending at 3, best is j=3 with maxVal=15 → dp[3]=45.
- Continue similarly; final dp[7]=84.

## Complexity Analysis
- **Time:** O(n·k) where n is array length.
- **Space:** O(n) for the dp array.

## Follow-Up Questions
1. How would you adapt the solution if the partition length must be exactly `k`?
2. Can you solve the problem using a monotonic queue to achieve O(n) time?
3. What changes are needed if each subarray incurs a fixed cost in addition to the sum?

## Key Takeaway
DP over prefix lengths with a bounded inner loop efficiently captures the trade-off between partition size and the benefit of using the maximum element.
