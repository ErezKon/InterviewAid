# 368. Largest Divisible Subset

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-divisible-subset](https://leetcode.com/problems/largest-divisible-subset)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP (like LIS) — O(n²) ✅](#3-approach-dp-like-lis--on²-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Find the largest subset where every pair `(si, sj)` satisfies `si % sj == 0` or `sj % si == 0`.

---

## 2. Key Insight

Sort the array. If `a | b` and `b | c`, then `a | c` (transitivity). So we only need to check divisibility with the last element in the chain — exactly like **Longest Increasing Subsequence** but with divisibility.

---

## 3. Approach: DP (like LIS) — O(n²) ✅

```text
FUNCTION largestDivisibleSubset(nums):
    SORT nums
    n ← LENGTH(nums)
    dp ← ARRAY of size n filled with 1          // length of best subset ending at i
    parent ← ARRAY of size n filled with -1    // previous index in subset

    FOR i ← 1 TO n-1:
        FOR j ← 0 TO i-1:
            IF nums[i] MOD nums[j] = 0 AND dp[j] + 1 > dp[i]:
                dp[i] ← dp[j] + 1
                parent[i] ← j

    // Find index of maximum dp value
    maxIdx ← ARGMAX(dp)
    result ← EMPTY LIST
    WHILE maxIdx ≠ -1:
        PREPEND nums[maxIdx] TO result
        maxIdx ← parent[maxIdx]
    RETURN result
```

---

## 4. Examples

**Example 1:**
```
Input: nums = [1,2,3]
Output: [1,2]   // or [1,3]
Explanation: 1 divides both 2 and 3, forming subsets of size 2. No larger subset exists.
```

**Example 2:**
```
Input: nums = [1,2,4,8]
Output: [1,2,4,8]
Explanation: Every number divides the next, so the whole set is valid.
```

---

## 5. Walkthrough

Consider `nums = [1,2,4,8]`.
1. After sorting: `[1,2,4,8]`.
2. DP iteration builds `dp = [1,2,3,4]` because each number is divisible by the previous one.
3. `parent = [-1,0,1,2]` links each element to its predecessor.
4. Starting from index 3 (value 8) and following parents yields the subset `[1,2,4,8]`.

---

## 6. Complexity Analysis

| Metric | Value |
|--------|-------|
| Time   | O(n²) – double loop similar to LIS |
| Space  | O(n) – dp and parent arrays |

---

## 7. Key Takeaway

> Sort + LIS‑style DP with divisibility instead of `<`. Transitivity of divisibility in sorted order means checking only against the chain's last element is sufficient. Reconstruct via parent pointers.