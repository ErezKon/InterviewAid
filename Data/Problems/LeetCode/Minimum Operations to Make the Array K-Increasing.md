# 2111. Minimum Operations to Make the Array K-Increasing

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-the-array-k-increasing](https://leetcode.com/problems/minimum-operations-to-make-the-array-k-increasing)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: LIS per Subsequence — O(n log n)](#4-approach-lis-per-subsequence--on-log-n)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array `arr` of `n` positive integers and an integer `k`, the array is called **K-increasing** if `arr[i] <= arr[i + k]` for every index `i` where `i + k < n`.

In one operation, you can pick any index `i` and change `arr[i]` to **any** positive integer.

Return the **minimum** number of operations needed to make the array K-increasing.

**Constraints:**
- `1 <= arr.length <= 10⁵`
- `1 <= arr[i], k <= arr.length`

---

## 2. Examples

```
Example 1:
  Input: arr = [5,4,3,2,1], k = 1
  Output: 4
  Explanation: K=1 means the whole array must be non-decreasing.
               Keep arr[0]=5, change the rest → [5,5,5,5,5]. 4 operations.

Example 2:
  Input: arr = [4,1,5,2,6,2], k = 2
  Output: 0
  Explanation: Subsequences at indices {0,2,4}=[4,5,6] and {1,3,5}=[1,2,2]
               are already non-decreasing. No operations needed.

Example 3:
  Input: arr = [4,1,5,2,6,2], k = 3
  Output: 2
  Explanation: Subsequences: {0,3}=[4,2] and {1,4}=[1,6] and {2,5}=[5,2].
               Fix [4,2]→[4,4] (1 op) and [5,2]→[5,5] (1 op). Total = 2.
```

---

## 3. Key Insight

> The K-increasing condition only links elements that are `k` apart. This means the array splits into **k independent subsequences**: indices `{0, k, 2k, ...}`, `{1, k+1, 2k+1, ...}`, ..., `{k-1, 2k-1, ...}`. Each subsequence must be independently non-decreasing.

For each subsequence, the minimum operations = `length - LIS length` (where LIS allows equal elements, i.e., **Longest Non-Decreasing Subsequence**).

---

## 4. Approach: LIS per Subsequence — O(n log n) ✅

```
FUNCTION kIncreasing(arr, k):
    totalOps = 0

    FOR start ← 0 TO k - 1:
        // Extract the subsequence
        sub = []
        i = start
        WHILE i < len(arr):
            sub.APPEND(arr[i])
            i += k

        // Find Longest Non-Decreasing Subsequence (LNDS)
        totalOps += len(sub) - LNDS(sub)

    RETURN totalOps


FUNCTION LNDS(seq):
    // Like LIS but with <= (use upper_bound / bisect_right)
    tails = []
    FOR x IN seq:
        pos = BISECT_RIGHT(tails, x)
        IF pos == len(tails):
            tails.APPEND(x)
        ELSE:
            tails[pos] = x
    RETURN len(tails)
```

**Why `bisect_right`?** We want non-decreasing (≤), so equal elements are allowed. Using `bisect_right` ensures we extend the subsequence when the new element equals the last tail.

---

## 5. Walkthrough

```
arr = [4, 1, 5, 2, 6, 2], k = 2

Subsequences:
  start=0: indices {0,2,4} → [4, 5, 6]
  start=1: indices {1,3,5} → [1, 2, 2]

Subsequence [4, 5, 6]:
  LNDS: tails after each element:
    4 → [4]
    5 → [4, 5]
    6 → [4, 5, 6]
  LNDS = 3, ops = 3 - 3 = 0

Subsequence [1, 2, 2]:
  LNDS: tails after each element:
    1 → [1]
    2 → [1, 2]
    2 → [1, 2] (bisect_right(2) = 2, extend → [1, 2, 2])
  LNDS = 3, ops = 3 - 3 = 0

Total = 0 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — each element processed once in its subsequence's LIS |
| **Space** | O(n) — for the subsequence arrays and tails array |

---

## 7. Follow-Up Questions

**Q1: Why not just sort each subsequence?**
Sorting tells you the target but not which elements to keep. LIS tells you the maximum elements you can keep unchanged, minimizing operations.

**Q2: What if we needed strictly increasing instead of non-decreasing?**
Use `bisect_left` instead of `bisect_right` in the LNDS function — this gives standard LIS.

**Q3: Can we do this in-place without extracting subsequences?**
Yes, you can iterate with stride `k` directly, but extracting is cleaner and doesn't change asymptotic complexity.

---

## 8. Key Takeaway

> **Decompose the problem by stride** — K-increasing means k independent subsequences. The minimum changes to make a sequence non-decreasing equals `length - LNDS`, computed via patience sorting with `bisect_right`.
