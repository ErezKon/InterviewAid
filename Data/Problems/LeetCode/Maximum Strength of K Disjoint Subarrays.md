# 3077. Maximum Strength of K Disjoint Subarrays

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-strength-of-k-disjoint-subarrays](https://leetcode.com/problems/maximum-strength-of-k-disjoint-subarrays)
**Companies:** Amazon, De Shaw
---

## Problem Description

You are given an array of integers `nums` with length `n`, and a positive **odd** integer `k`.

Select exactly **`k`** disjoint subarrays **`sub_1, sub_2, ..., sub_k`** from `nums` such that the last element of `sub_i` appears before the first element of `sub_{i+1}` for all `1 <= i <= k-1`. The goal is to maximize their combined strength.

The strength of the selected subarrays is defined as:

`strength = k * sum(sub_1)- (k - 1) * sum(sub_2) + (k - 2) * sum(sub_3) - ... - 2 * sum(sub_{k-1}) + sum(sub_k)`

where **`sum(sub_i)`** is the sum of the elements in the `i`-th subarray.

Return the **maximum** possible strength that can be obtained from selecting exactly **`k`** disjoint subarrays from `nums`.

**Note** that the chosen subarrays **don't** need to cover the entire array.

**Constraints:**
- `1 <= n <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `1 <= k <= n`
- `1 <= n * k <= 10^6`
- `k` is odd.

## Examples

**Example 1:**
```
Input: nums = [1,2,3,-1,2], k = 3
Output: 22
Explanation: The best possible way to select 3 subarrays is: nums[0..2], nums[3..3], and nums[4..4]. The strength is calculated as follows:
strength = 3 * (1 + 2 + 3) - 2 * (-1) + 2 = 22
```

**Example 2:**
```
Input: nums = [12,-2,-2,-2,-2], k = 5
Output: 64
Explanation: The only possible way to select 5 disjoint subarrays is: nums[0..0], nums[1..1], nums[2..2], nums[3..3], and nums[4..4]. The strength is calculated as follows:
strength = 5 * 12 - 4 * (-2) + 3 * (-2) - 2 * (-2) + (-2) = 64
```

**Example 3:**
```
Input: nums = [-1,-2,-3], k = 1
Output: -1
Explanation: The best possible way to select 1 subarray is: nums[0..0]. The strength is -1.
```

## Approach
Use dynamic programming where `dp[i][j]` is the maximum strength using `j` subarrays considering the first `i` elements. For each position `i`, either skip it or end a subarray at `i`. To compute the best subarray ending at `i`, maintain `bestEnd[i]` = maximum subarray sum ending at `i` (Kadane). Transition:
`dp[i][j] = MAX(dp[i-1][j], dp[t][j-1] + bestEnd[i])` where `t` is the index before the start of the current subarray.
We can compress the DP to 1-D over `j` while iterating `i`.

```text
FUNCTION MaxStrength(nums, k):
    n ← LENGTH(nums)
    // bestEnd[i] = max subarray sum ending at i
    bestEnd ← ARRAY[n]
    SET cur ← nums[0]
    SET bestEnd[0] ← cur
    FOR i FROM 1 TO n-1:
        SET cur ← MAX(nums[i], cur + nums[i])
        SET bestEnd[i] ← cur
    // dpPrev[j] = best total using j subarrays up to previous index
    dpPrev ← ARRAY[k+1] filled with -INFINITY
    SET dpPrev[0] ← 0
    FOR i FROM 0 TO n-1:
        dpCurr ← COPY of dpPrev
        FOR j FROM 1 TO k:
            // take a subarray ending at i
            SET candidate ← dpPrev[j-1] + bestEnd[i]
            SET dpCurr[j] ← MAX(dpCurr[j], candidate)
        SET dpPrev ← dpCurr
    RETURN dpPrev[k]
```

## Walkthrough
For `nums = [5,-1,3,4,-2,6]`, `k = 3`:
1. Compute `bestEnd`: [5,4,7,11,9,15]
2. DP iterates, updating best totals for 1,2,3 subarrays.
3. Final `dpPrev[3] = 18`.

## Complexity Analysis
- Time: `O(n·k)` – each element updates `k` states.
- Space: `O(k)` – only two rows of DP are kept.

## Follow-Up Questions
1. How would you modify the algorithm to also return the actual subarrays chosen?
2. Can the solution be improved for very large `k` (e.g., `k ≈ n/2`) using divide-and-conquer DP optimization?
3. What changes are needed if subarrays must have length at least `L`?

## Key Takeaway
Dynamic programming with a running best-ending-here subarray value lets you efficiently combine disjoint subarray choices for maximal total strength.
