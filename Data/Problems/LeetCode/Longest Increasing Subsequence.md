
# 300. Longest Increasing Subsequence

**Difficulty:** 🟡 Medium
**Acceptance:** 57.2%
**LeetCode:** [https://leetcode.com/problems/longest-increasing-subsequence](https://leetcode.com/problems/longest-increasing-subsequence)
**Companies:** Accenture, Agoda, Amazon, Atlassian, Bloomberg, Bytedance, Citadel, Flexport, Goldman Sachs, Google, Huawei, Infosys, Intuit, Meta, Microsoft, Morgan Stanley, Nvidia, Oracle, Paypal, Salesforce, Samsung, Splunk, Square, Squarepoint Capital, Tcs, Tiktok, Uber, Visa, Walmart Labs, Yandex, Zemoso

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: DP — O(n²)](#3-approach-1-dp--on²)
4. [Approach 2: Patience Sorting (Binary Search) — O(n log n) ✅](#4-approach-2-patience-sorting-binary-search--on-log-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given an integer array `nums`, return the length of the **longest strictly increasing subsequence**.

A **subsequence** is derived by deleting some or no elements without changing the order of remaining elements.

---

## 2. Examples

```
Example 1:
  Input:  [10, 9, 2, 5, 3, 7, 101, 18]
  Output: 4
  Reason: [2, 3, 7, 101] or [2, 3, 7, 18] or [2, 5, 7, 101] etc.

Example 2:
  Input:  [0, 1, 0, 3, 2, 3]
  Output: 4
  Reason: [0, 1, 2, 3]

Example 3:
  Input:  [7, 7, 7, 7, 7]
  Output: 1
```

---

## 3. Approach 1: DP — O(n²)

`dp[i]` = length of the longest increasing subsequence ending at index `i`.

```
FUNCTION lengthOfLIS(nums):
    n = LENGTH(nums)
    dp = ARRAY of n, all 1          // every element is a subsequence of length 1

    FOR i ← 1 TO n - 1:
        FOR j ← 0 TO i - 1:
            IF nums[j] < nums[i]:
                dp[i] = MAX(dp[i], dp[j] + 1)

    RETURN MAX(dp)
```

---

## 4. Approach 2: Patience Sorting (Binary Search) — O(n log n) ✅

### Key Idea

Maintain an array `tails` where `tails[i]` is the **smallest tail element** of all increasing subsequences of length `i + 1`.

For each new number:
- If it's larger than all tails → extend the longest subsequence.
- Otherwise → binary search for the first tail ≥ num and replace it (to keep the smallest possible tail).

`tails` is always sorted, so binary search works.

```
FUNCTION lengthOfLIS(nums):
    tails = []

    FOR each num IN nums:
        pos = binarySearchLeft(tails, num)

        IF pos == LENGTH(tails):
            tails.APPEND(num)       // extend
        ELSE:
            tails[pos] = num        // replace

    RETURN LENGTH(tails)


FUNCTION binarySearchLeft(arr, target):
    lo = 0, hi = LENGTH(arr)

    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF arr[mid] < target:
            lo = mid + 1
        ELSE:
            hi = mid

    RETURN lo
```

### Important

`tails` does NOT contain the actual LIS — it represents the best possible tails. Its **length** equals the LIS length.

---

## 5. Walkthrough

```
nums = [10, 9, 2, 5, 3, 7, 101, 18]

num=10:  tails=[], pos=0 → append  → tails=[10]
num=9:   pos=0 (9<10) → replace    → tails=[9]
num=2:   pos=0 (2<9)  → replace    → tails=[2]
num=5:   pos=1 (5>2)  → append     → tails=[2, 5]
num=3:   pos=1 (3<5)  → replace    → tails=[2, 3]
num=7:   pos=2 (7>3)  → append     → tails=[2, 3, 7]
num=101: pos=3 (101>7) → append    → tails=[2, 3, 7, 101]
num=18:  pos=3 (18<101) → replace  → tails=[2, 3, 7, 18]

LENGTH(tails) = 4 ✅
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | O(n²) | O(n) |
| **Patience Sorting** | **O(n log n)** | **O(n)** |

---

## 7. Follow-Up Questions

### 7.1 How to reconstruct the actual LIS?

With the DP approach, backtrack from the maximum:

```
FUNCTION reconstructLIS(nums):
    n = LENGTH(nums)
    dp = ARRAY of n, all 1
    parent = ARRAY of n, all -1

    FOR i ← 1 TO n - 1:
        FOR j ← 0 TO i - 1:
            IF nums[j] < nums[i] AND dp[j] + 1 > dp[i]:
                dp[i] = dp[j] + 1
                parent[i] = j

    // Find index of maximum
    maxIdx = INDEX_OF_MAX(dp)

    // Backtrack
    lis = []
    WHILE maxIdx != -1:
        lis.PREPEND(nums[maxIdx])
        maxIdx = parent[maxIdx]

    RETURN lis
```

### 7.2 Number of Longest Increasing Subsequences (LeetCode #673)

Track both length and count:

```
FUNCTION findNumberOfLIS(nums):
    n = LENGTH(nums)
    dp    = ARRAY of n, all 1      // length of LIS ending at i
    count = ARRAY of n, all 1      // number of LIS of that length ending at i

    FOR i ← 1 TO n - 1:
        FOR j ← 0 TO i - 1:
            IF nums[j] < nums[i]:
                IF dp[j] + 1 > dp[i]:
                    dp[i] = dp[j] + 1
                    count[i] = count[j]
                ELSE IF dp[j] + 1 == dp[i]:
                    count[i] += count[j]

    maxLen = MAX(dp)
    RETURN SUM(count[i] for i where dp[i] == maxLen)
```

### 7.3 Longest Non-Decreasing Subsequence?

Change the binary search to find the first element **strictly greater** (use `bisect_right` instead of `bisect_left`).

### 7.4 Russian Doll Envelopes (LeetCode #354)

Sort envelopes by width (ascending), then by height (descending for same width). Apply LIS on heights.

```
FUNCTION maxEnvelopes(envelopes):
    SORT envelopes BY (width ASC, height DESC)
    heights = [h for (w, h) in envelopes]
    RETURN lengthOfLIS(heights)
```

### 7.5 Longest Chain of Pairs (LeetCode #646)

Sort by second element, then greedily pick non-overlapping pairs (like activity selection).

---

## Key Takeaway

> LIS has two classic solutions: **O(n²) DP** (easy to understand and implement) and **O(n log n) patience sorting** (optimal). The patience sorting approach — maintaining the smallest possible tails — is a beautiful application of binary search. In interviews, present the DP solution first, then optimize to O(n log n) if time permits.
