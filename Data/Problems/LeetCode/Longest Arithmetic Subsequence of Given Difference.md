# 1218. Longest Arithmetic Subsequence of Given Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference](https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference)
**Companies:** Google, Meta

---

## 1. Problem Description

Given an integer array `arr` and an integer `difference`, return the length of the longest subsequence in `arr` which is an arithmetic sequence such that the difference between adjacent elements in the subsequence equals `difference`.

A **subsequence** is a sequence that can be derived from `arr` by deleting some or no elements without changing the order of the remaining elements.

**Constraints:**
- `1 <= arr.length <= 10^5`
- `-10^4 <= arr[i], difference <= 10^4`

---

## 2. Approach: Hash Map DP — O(n) ✅

```text
FUNCTION longestSubsequence(arr, difference):
    dp = {}   // value → longest seq ending with this value
    maxLen = 0
    FOR num IN arr:
        dp[num] = dp.get(num - difference, 0) + 1
        maxLen = MAX(maxLen, dp[num])
    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Examples

**Example 1:**
```
Input: arr = [1,2,3,4], difference = 1
Output: 4
Explanation: The longest arithmetic subsequence is [1,2,3,4].
```

**Example 2:**
```
Input: arr = [1,3,5,7], difference = 1
Output: 1
Explanation: The longest arithmetic subsequence is any single element.
```

**Example 3:**
```
Input: arr = [1,5,7,8,5,3,4,2,1], difference = -2
Output: 4
Explanation: The longest arithmetic subsequence is [7,5,3,1].
```

---

## 4. Walkthrough

Consider `arr = [1,5,7,8,5,3,4,2,1]`, `difference = -2`.

1. Process 1: `dp[1] = 1` (no previous `-1`). max=1.
2. Process 5: `dp[5] = dp[7]?` none → 1. max=1.
3. Process 7: `dp[7] = dp[9]?` none → 1.
4. Process 8: `dp[8] = dp[10]?` none → 1.
5. Process 5: `dp[5] = dp[7] + 1 = 2`. max=2.
6. Process 3: `dp[3] = dp[5] + 1 = 3`. max=3.
7. Process 4: `dp[4] = dp[6]?` none → 1.
8. Process 2: `dp[2] = dp[4] + 1 = 2`.
9. Process 1: `dp[1] = dp[3] + 1 = 4`. max=4.

The longest subsequence length is 4.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass through the array.
- **Space:** O(n) – hash map storing the best length for each value.

---

## 6. Follow-Up Questions

- How would the solution change if the difference could vary for each step?
- Can you adapt the algorithm to return the actual subsequence, not just its length?
- What is the impact of duplicate values on the DP state?

---

## 3. Key Takeaway

> Unlike general arithmetic subsequence (O(n²)), fixed difference allows O(n): for each element, look up `num - difference` in the hash map.
