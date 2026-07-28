# 2901. Longest Unequal Adjacent Groups Subsequence II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-ii](https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-ii)
**Companies:** Fourkites, Meta

---

## 1. Problem Description

Find the longest subsequence of words where adjacent words have different groups and Hamming distance of 1.

---

## 2. Approach: DP — O(n²·L) ✅

```
// dp[i] = longest valid subsequence ending at index i
// For each i, check all j < i:
//   if groups[i] != groups[j] AND len(words[i]) == len(words[j])
//   AND hammingDistance(words[i], words[j]) == 1:
//     dp[i] = max(dp[i], dp[j] + 1)
// Reconstruct using parent pointers
```

| Time | Space |
|------|-------|
| O(n² · L) | O(n) |

---

## 3. Examples

**Example 1:**
```
words = ["cat", "bat", "bet", "bed"]
groups = [1, 2, 2, 1]
```
The longest valid subsequence is `["cat", "bat", "bet", "bed"]` with length 4.

**Example 2:**
```
words = ["abc", "abd", "aac", "bbc"]
groups = [1, 1, 2, 2]
```
The longest valid subsequence is `["abc", "abd"]` with length 2.

---

## 4. Walkthrough

Consider Example 1:
| i | word | group | dp[i] | Reason |
|---|------|-------|------|--------|
| 0 | cat  | 1     | 1    | start |
| 1 | bat  | 2     | 2    | groups differ, hamming=1 (c→b) |
| 2 | bet  | 2     | 2    | cannot extend from index 1 (same group) but can from 0 (cat→bet hamming=2) so keep 2 |
| 3 | bed  | 1     | 3    | extend from index 2 (bet→bed, groups differ, hamming=1) |
The maximum dp value is 3, giving subsequence length 4 including the start element.

---

## 5. Complexity Analysis

- **Time:** O(n²·L) where *n* is number of words and *L* is word length (for Hamming distance).
- **Space:** O(n) for the DP array and parent pointers.

---

## 6. Follow-Up Questions

1. How would you handle variable word lengths?
2. Can the problem be solved in O(n·L) using advanced data structures?
3. What changes if the Hamming distance constraint is ≤ k instead of exactly 1?

---

## Key Takeaway

> LIS-style DP with two constraints: different groups and Hamming distance exactly 1. Use parent pointers for reconstruction.
