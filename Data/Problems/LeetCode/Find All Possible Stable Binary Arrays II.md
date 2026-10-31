# 3130. Find All Possible Stable Binary Arrays II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-all-possible-stable-binary-arrays-ii](https://leetcode.com/problems/find-all-possible-stable-binary-arrays-ii)
**Companies:** Amazon, Ibm

---

## Problem Description

You are given 3 positive integers `num_zeros`, `num_ones`, and `limit`.

A binary array `arr` is called **stable** if:

- The number of occurrences of 0 in `arr` is **exactly **`num_zeros`.
- The number of occurrences of 1 in `arr` is **exactly** `num_ones`.
- Each subarray of `arr` with a size greater than `limit` must contain **at least** one occurrence of **both** 0 and 1.

Return an integer denoting the *total* number of **stable** binary arrays.

Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= zero, one, limit <= 1000`

---

## Examples

**Example 1:**
```
Input: zero = 1, one = 1, limit = 2
Output: 2
Explanation: The two possible stable binary arrays are [1,0] and [0,1].
```

**Example 2:**
```
Input: zero = 1, one = 2, limit = 1
Output: 1
Explanation: The only possible stable binary array is [1,0,1].
```

**Example 3:**
```
Input: zero = 3, one = 3, limit = 2
Output: 14
Explanation: All the possible stable binary arrays are [0,0,1,0,1,1], [0,0,1,1,0,1], [0,1,0,0,1,1], [0,1,0,1,0,1], [0,1,0,1,1,0], [0,1,1,0,0,1], [0,1,1,0,1,0], [1,0,0,1,0,1], [1,0,0,1,1,0], [1,0,1,0,0,1], [1,0,1,0,1,0], [1,0,1,1,0,0], [1,1,0,0,1,0], and [1,1,0,1,0,0].
```

---

## Approach: Optimized DP — O(zero × one) ✅

Same recurrence as Part I with sliding window subtraction to enforce the consecutive limit constraint:

```text
dp[i][j][0] = dp[i-1][j][0] + dp[i-1][j][1] - dp[i-limit-1][j][1]
dp[i][j][1] = dp[i][j-1][0] + dp[i][j-1][1] - dp[i][j-limit-1][0]
```

---

## Walkthrough

Consider `zero = 2`, `one = 2`, `limit = 2`.

| i (zeros used) | j (ones used) | dp[i][j][0] | dp[i][j][1] |
|----------------|---------------|------------|------------|
| 0 | 0 | 1 (empty) | 0 |
| 1 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 |
| 1 | 1 | 2 (01,10) | 2 |
| 2 | 1 | 3 | 3 |
| 1 | 2 | 3 | 3 |
| 2 | 2 | 6 | 6 |

The final answer is `dp[2][2][0] + dp[2][2][1] = 6`.

---

## Complexity Analysis

- **Time:** O(zero × one) – each state is computed in O(1) using sliding-window sums.
- **Space:** O(zero × one) – two 2-D tables for ending with 0 and 1 (can be reduced to O(one) with rolling arrays).

---

## Follow-Up Questions

1. How would you modify the DP if the limit applied only to zeros but not ones?
2. Can the solution be extended to count arrays with a given number of alternating blocks?
3. What if the array length is fixed but the counts of zeros and ones are not?

---

## Key Takeaway

> **Same logic as Part I, but the larger constraints demand careful modular arithmetic and efficient DP transitions without extra loops.**