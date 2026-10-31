# 3599. Partition Array to Minimize XOR

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-array-to-minimize-xor](https://leetcode.com/problems/partition-array-to-minimize-xor)
**Companies:** Google

---

## Problem Description
You are given an integer array `nums` and an integer `k`.

Your task is to partition `nums` into `k` non-empty **subarrays**. For each subarray, compute the bitwise **XOR** of all its elements.

Return the **minimum** possible value of the **maximum XOR** among these `k` subarrays.

**Constraints:**

- `1 <= nums.length <= 250`
- `1 <= nums[i] <= 10^9`
- `1 <= k <= n`

## Examples

```
Example 1:
  Input: nums = [1,2,3], k = 2
  Output: 1
  Explanation: The optimal partition is [1] and [2, 3].
    - XOR of the first subarray is 1.
    - XOR of the second subarray is 2 XOR 3 = 1.
  The maximum XOR among the subarrays is 1, which is the minimum possible.
```

```
Example 2:
  Input: nums = [2,3,3,2], k = 3
  Output: 2
  Explanation: The optimal partition is [2], [3, 3], and [2].
    - XOR of the first subarray is 2.
    - XOR of the second subarray is 3 XOR 3 = 0.
    - XOR of the third subarray is 2.
  The maximum XOR among the subarrays is 2, which is the minimum possible.
```

```
Example 3:
  Input: nums = [1,1,2,3,1], k = 2
  Output: 0
  Explanation: The optimal partition is [1, 1] and [2, 3, 1].
    - XOR of the first subarray is 1 XOR 1 = 0.
    - XOR of the second subarray is 2 XOR 3 XOR 1 = 0.
  The maximum XOR among the subarrays is 0, which is the minimum possible.
```

## Approach
Min-max partition DP with prefix XORs.
- `P[i]` = XOR of `nums[0..i-1]` (`P[0] = 0`), so XOR of `nums[p..i-1]` is `P[i] ^ P[p]`.
- `dp[j][i]` = minimum possible maximum XOR when splitting the first `i` elements into `j` non-empty subarrays.
- Transition: the last subarray is `nums[p..i-1]` for some `p` in `[j-1, i-1]`:
  `dp[j][i] = min over p of max(dp[j-1][p], P[i] ^ P[p])`.
- Base: `dp[0][0] = 0`, everything else INF. Answer: `dp[k][n]`.
- `n <= 250` makes O(k * n^2) (about 1.5 * 10^7) fine.

```text
FUNCTION minXor(nums, k):
    n ← LEN(nums)
    P ← ARRAY n+1, P[0] ← 0
    FOR i ← 0 TO n-1:
        P[i+1] ← P[i] XOR nums[i]
    dp ← (k+1) x (n+1) FILLED WITH INF
    dp[0][0] ← 0
    FOR j ← 1 TO k:
        FOR i ← j TO n:
            FOR p ← j-1 TO i-1:
                dp[j][i] ← MIN(dp[j][i], MAX(dp[j-1][p], P[i] XOR P[p]))
    RETURN dp[k][n]
```

## Walkthrough
Example 1: `nums = [1,2,3]`, `k = 2`.
- Prefix XORs: `P = [0, 1, 3, 0]`.
- `j = 1` (one subarray = whole prefix): `dp[1][1] = 1`, `dp[1][2] = 3`, `dp[1][3] = 0`.
- `j = 2`, `i = 3`:
  - `p = 1`: last part `[2,3]`, XOR `P[3]^P[1] = 1`; `max(dp[1][1]=1, 1) = 1`.
  - `p = 2`: last part `[3]`, XOR `P[3]^P[2] = 3`; `max(dp[1][2]=3, 3) = 3`.
  - `dp[2][3] = min(1, 3) = 1`.
- Answer `1` (partition `[1]`, `[2,3]`).

## Complexity Analysis
- **Time:** O(k * n^2) - for each of `k` layers and `n` end positions, try every last cut.
- **Space:** O(k * n), reducible to O(n) by keeping only layer `j-1`.

## Follow-Up Questions
1. Can you binary search on the answer and check feasibility greedily? Why is that tricky with XOR (not monotonic)?
2. How would you reconstruct the actual partition?
3. What changes if the goal is to minimize the sum of XORs instead of the maximum?

## Key Takeaway
"Split into k subarrays minimizing the max of some segment cost" is a classic layered DP; prefix XORs make each segment cost O(1).
