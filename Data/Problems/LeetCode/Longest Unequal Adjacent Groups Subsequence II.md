# 2901. Longest Unequal Adjacent Groups Subsequence II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-ii](https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-ii)
**Companies:** Fourkites, Meta

---

## 1. Problem Description

You are given a string array `words`, and an array `groups`, both arrays having length `n`.

The **hamming distance** between two strings of equal length is the number of positions at which the corresponding characters are **different**.

You need to select the **longest** subsequence from an array of indices `[0, 1, ..., n - 1]`, such that for the subsequence denoted as `[i_0, i_1, ..., i_k-1]` having length `k`, the following holds:

- For **adjacent** indices in the subsequence, their corresponding groups are **unequal**, i.e., `groups[i_j] != groups[i_j+1]`, for each `j` where `0 < j + 1 < k`.
- `words[i_j]` and `words[i_j+1]` are **equal** in length, and the **hamming distance** between them is `1`, where `0 < j + 1 < k`, for all indices in the subsequence.

Return *a string array containing the words corresponding to the indices **(in order)** in the selected subsequence*. If there are multiple answers, return *any of them*.

**Note:** strings in `words` may be **unequal** in length.

**Constraints:**
- `1 <= n == words.length == groups.length <= 1000`
- `1 <= words[i].length <= 10`
- `1 <= groups[i] <= n`
- `words` consists of **distinct** strings.
- `words[i]` consists of lowercase English letters.

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
Input: words = ["bab","dab","cab"], groups = [1,2,2]
Output: ["bab","cab"]
Explanation: A subsequence that can be selected is [0,2].
- groups[0] != groups[2]
- words[0].length == words[2].length, and the hamming distance between them is 1.
So, a valid answer is [words[0],words[2]] = ["bab","cab"].
Another subsequence that can be selected is [0,1].
- groups[0] != groups[1]
- words[0].length == words[1].length, and the hamming distance between them is 1.
So, another valid answer is [words[0],words[1]] = ["bab","dab"].
It can be shown that the length of the longest subsequence of indices that satisfies the conditions is 2.
```

**Example 2:**
```
Input: words = ["a","b","c","d"], groups = [1,2,3,4]
Output: ["a","b","c","d"]
Explanation: We can select the subsequence [0,1,2,3].
It satisfies both conditions.
Hence, the answer is [words[0],words[1],words[2],words[3]] = ["a","b","c","d"].
It has the longest length among all subsequences of indices that satisfy the conditions.
Hence, it is the only answer.
```

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
3. What changes if the Hamming distance constraint is ≤ k instead of exactly 1?

---

## Key Takeaway

> LIS-style DP with two constraints: different groups and Hamming distance exactly 1. Use parent pointers for reconstruction.
