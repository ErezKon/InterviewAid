# 1027. Longest Arithmetic Subsequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-arithmetic-subsequence](https://leetcode.com/problems/longest-arithmetic-subsequence)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Snapdeal, Turing

---

## 1. Problem Description

Given an array `nums` of integers, return *the length of the longest arithmetic subsequence in* `nums`.

**Note** that:

- A **subsequence** is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.
- A sequence `seq` is arithmetic if `seq[i + 1] - seq[i]` are all the same value (for `0 <= i < seq.length - 1`).

**Constraints:**
- `2 <= nums.length <= 1500`
- `0 <= nums[i] <= 500`

---

## 2. Approach: DP with Hash Maps — O(n²) ✅

```text
FUNCTION longestArithSeqLength(nums):
    dp = [{} for _ in range(n)]    // dp[i] = {diff: length}
    maxLen = 2
    FOR i ← 1 TO n - 1:
        FOR j ← 0 TO i - 1:
            diff = nums[i] - nums[j]
            dp[i][diff] = dp[j].get(diff, 1) + 1
            maxLen = MAX(maxLen, dp[i][diff])
    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n²) | O(n²) |

---

## 3. Examples

**Example 1:**
```
Input: nums = [3, 6, 9, 12]
Output: 4
Explanation: The whole array is already an arithmetic sequence with a common difference of 3, so the longest arithmetic subsequence is [3, 6, 9, 12], of length 4.
```

**Example 2:**
```
Input: nums = [9, 4, 7, 2, 10]
Output: 3
Explanation: The longest arithmetic subsequence is [4, 7, 10] (indices 1, 2, 4), with a common difference of 3. There is no arithmetic subsequence of length 4.
```

**Example 3:**
```
Input: nums = [20, 1, 15, 3, 10, 5, 8]
Output: 4
Explanation: The longest arithmetic subsequence is [20, 15, 10, 5] (indices 0, 2, 4, 5), with a common difference of -5.
```

---

## 4. Walkthrough

Consider `nums = [9,4,7,2,10]`.

1. Initialize `dp` with empty maps.
2. Pair (9,4): diff = -5 → `dp[1][-5] = 2`.
3. Pair (9,7): diff = -2 → `dp[2][-2] = 2`.
4. Pair (4,7): diff = 3 → `dp[2][3] = 2`.
5. Pair (9,2): diff = -7 → `dp[3][-7] = 2`.
6. Pair (4,2): diff = -2 → `dp[3][-2] = dp[1].get(-2,1)+1 = 2`.
7. Pair (7,2): diff = -5 → `dp[3][-5] = dp[1].get(-5,1)+1 = 3` (extends sequence 9,4,2).
8. Pair (9,10): diff = 1 → `dp[4][1] = 2`.
9. Pair (4,10): diff = 6 → `dp[4][6] = 2`.
10. Pair (7,10): diff = 3 → `dp[4][3] = dp[2].get(3,1)+1 = 3` (extends 4,7,10).
11. Pair (2,10): diff = 8 → `dp[4][8] = 2`.

Maximum length recorded is 3.

---

## 5. Complexity Analysis

- **Time:** O(n²) – examine every pair of indices.
- **Space:** O(n²) – each `dp[i]` may store up to i different differences.

---

## 6. Follow-Up Questions

- How would you adapt the algorithm to also return the actual subsequence?
- Can the solution be optimized for arrays with a limited range of values?
- What changes are needed if the subsequence must be contiguous?

---

## 3. Key Takeaway

> For each pair `(j, i)`, compute diff and extend the chain from `dp[j][diff]`. Hash maps per index store all possible differences. Similar pattern to Longest Fibonacci Subsequence.
