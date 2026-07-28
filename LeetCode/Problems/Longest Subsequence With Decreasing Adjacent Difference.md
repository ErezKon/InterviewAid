# 3409. Longest Subsequence With Decreasing Adjacent Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-subsequence-with-decreasing-adjacent-difference](https://leetcode.com/problems/longest-subsequence-with-decreasing-adjacent-difference)
**Companies:** Google, Juspay

---

## 1. Problem Description

Find the longest subsequence where the absolute difference between consecutive elements is non-increasing.

---

## 2. Examples

**Example 1:**
```
Input: nums = [5, 3, 1, 2, 4]
Output: 4
Explanation: The subsequence [5, 3, 2, 1] has adjacent absolute differences 2, 1, 1 which are non‑increasing. Its length 4 is maximal.
```

**Example 2:**
```
Input: nums = [1, 2, 3, 4]
Output: 2
Explanation: Any two‑element subsequence satisfies the condition; longer ones do not because differences increase.
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