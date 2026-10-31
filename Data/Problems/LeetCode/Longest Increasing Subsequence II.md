# 2407. Longest Increasing Subsequence II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-increasing-subsequence-ii](https://leetcode.com/problems/longest-increasing-subsequence-ii)
**Companies:** Google

---

## 1. Problem Description

You are given an integer array `nums` and an integer `k`.

Find the longest subsequence of `nums` that meets the following requirements:

- The subsequence is **strictly increasing** and
- The difference between adjacent elements in the subsequence is **at most** `k`.

Return* the length of the **longest** **subsequence** that meets the requirements.*

A **subsequence** is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i], k <= 10^5`

---

## 2. Examples

**Example 1:**
```
Input: nums = [4,2,1,4,3,4,5,8,15], k = 3
Output: 5
Explanation: The longest subsequence that meets the requirements is [1,3,4,5,8].
The subsequence has a length of 5, so we return 5.
Note that the subsequence [1,3,4,5,8,15] does not meet the requirements because 15 - 8 = 7 is larger than 3.
```

**Example 2:**
```
Input: nums = [7,4,5,1,8,12,4,7], k = 5
Output: 4
Explanation: The longest subsequence that meets the requirements is [4,5,8,12].
The subsequence has a length of 4, so we return 4.
```

**Example 3:**
```
Input: nums = [1,5], k = 1
Output: 1
Explanation: The longest subsequence that meets the requirements is [1].
The subsequence has a length of 1, so we return 1.
```

---

## 3. Approach: Segment Tree — O(n log M) ✅

```text
FUNCTION longestIncreasingSubseq(nums, k):
    // dp[value] = longest subseq ending with this value
    segTree ← BUILD segment tree for range [0, MAX(nums)] with all zeros
    FOR val IN nums:
        left ← MAX(0, val - k)
        right ← val - 1
        best ← QUERY segTree FOR max in [left, right]
        curLen ← best + 1
        UPDATE segTree AT position val WITH MAX(existing, curLen)
    RETURN QUERY segTree FOR max over entire range
```

---

## 4. Walkthrough

Consider `nums = [1,3,5,4,7]`, `k = 2`.

| Step | val | Query Range | best before | curLen | segTree update |
|------|-----|-------------|-------------|--------|----------------|
| 1 | 1 | [0,0] | 0 | 1 | dp[1]=1 |
| 2 | 3 | [1,2] | 1 | 2 | dp[3]=2 |
| 3 | 5 | [3,4] | 2 | 3 | dp[5]=3 |
| 4 | 4 | [2,3] | 2 | 3 | dp[4]=3 (ties with dp[5]) |
| 5 | 7 | [5,6] | 3 | 4 | dp[7]=4 |

The maximum length stored is 4.

---

## 5. Complexity Analysis

- **Time:** O(n · log M) where M = max value in `nums` (segment-tree queries and updates).
- **Space:** O(M) for the segment tree (can be compressed to O(n) with coordinate compression).

---

## 6. Follow-Up Questions

- How would the solution change if `k` were unlimited (standard LIS)?
- Can you solve it using a balanced binary search tree instead of a segment tree?
- What if the array is streamed and you must answer queries online?

---

## 7. Key Takeaway

> Use a segment tree (or BIT) to maintain the best subsequence length for each value range, enabling O(log M) updates and queries for the `k`-bounded LIS.
