# 3409. Longest Subsequence With Decreasing Adjacent Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-subsequence-with-decreasing-adjacent-difference](https://leetcode.com/problems/longest-subsequence-with-decreasing-adjacent-difference)
**Companies:** Google, Juspay

---

## 1. Problem Description

You are given an array of integers `nums`.

Your task is to find the length of the **longest** subsequence `seq` of `nums`, such that the **absolute differences** between* consecutive* elements form a **non-increasing sequence** of integers. In other words, for a subsequence `seq_0`, `seq_1`, `seq_2`, ..., `seq_m` of `nums`, `|seq_1 - seq_0| >= |seq_2 - seq_1| >= ... >= |seq_m - seq_m - 1|`.

Return the length of such a subsequence.

**Constraints:**
- `2 <= nums.length <= 10^4`
- `1 <= nums[i] <= 300`

---

## 2. Examples

**Example 1:**
```
Input: nums = [16,6,3]
Output: 3
Explanation: The longest subsequence is [16, 6, 3] with the absolute adjacent differences [10, 3].
```

**Example 2:**
```
Input: nums = [6,5,3,4,2,1]
Output: 4
Explanation: The longest subsequence is [6, 4, 2, 1] with the absolute adjacent differences [2, 2, 1].
```

**Example 3:**
```
Input: nums = [10,20,10,19,10,20]
Output: 5
Explanation: The longest subsequence is [10, 20, 10, 19, 10] with the absolute adjacent differences [10, 10, 9, 9].
```

---

## 3. Approach: DP — O(n · M) ✅

```text
// dp[val][diff] = longest subseq ending with value 'val' and last diff 'diff'
// For each element, try extending all valid previous states
// Suffix max optimization on the diff dimension
```

| Time | Space |
|------|-------|
| O(n · M) where M = max value | O(M²) |

---

## 4. Walkthrough

Consider the array `[5, 3, 1, 2, 4]`.

| Index | Value | Possible last diff | dp entry (value, diff) |
|-------|-------|--------------------|-----------------------|
| 0     | 5     | —                  | dp[5][*] = 1          |
| 1     | 3     | |5‑3| = 2           | Extend dp[5][≥2] → dp[3][2] = 2 |
| 2     | 1     | |3‑1| = 2, |5‑1| = 4| | Extend dp[3][2] (diff 2) → dp[1][2] = 3 |
| 3     | 2     | |1‑2| = 1, |3‑2| = 1, |5‑2| = 3| | Extend dp[1][2] (diff 2) → dp[2][1] = 4 |
| 4     | 4     | ...                | No extension keeps non‑increasing diff |

The longest length recorded is **4**, matching the subsequence `[5,3,2,1]`.

---

## 5. Complexity Analysis

- **Time:** O(n · M) where *n* is the array length and *M* is the maximum element value (due to iterating over possible differences).
- **Space:** O(M²) for the DP table storing states for each value‑difference pair.

---

## 6. Follow‑Up Questions

1. How would the solution change if the differences must be **strictly decreasing**?
2. Can the problem be solved in O(n log n) using a segment tree or binary indexed tree?
3. How would you adapt the approach for a streaming input where the array is not known upfront?

---

## 7. Key Takeaway

> Track both the last value and the last absolute difference. A new element can extend a subsequence only if its absolute difference ≤ the previous difference. Use suffix max arrays for optimization.