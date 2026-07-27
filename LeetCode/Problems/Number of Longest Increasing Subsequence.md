# 673. Number of Longest Increasing Subsequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-longest-increasing-subsequence](https://leetcode.com/problems/number-of-longest-increasing-subsequence)
**Companies:** Amazon, Bloomberg, Google, Intuit, Meta, Microsoft, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(n²)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Return the number of longest increasing subsequences. There may be multiple LIS of the same maximum length.

---

## 2. Key Insight

> Track two arrays: `length[i]` = LIS length ending at `i`, `count[i]` = number of such LIS. When a longer sequence is found, reset count. When equal length is found, add to count.

---

## 3. Approach: DP — O(n²) ✅

```
FUNCTION findNumberOfLIS(nums):
    n = len(nums)
    length = [1] * n    // length of LIS ending at i
    count = [1] * n     // count of LIS ending at i

    FOR i ← 1 TO n - 1:
        FOR j ← 0 TO i - 1:
            IF nums[j] < nums[i]:
                IF length[j] + 1 > length[i]:
                    length[i] = length[j] + 1
                    count[i] = count[j]
                ELSE IF length[j] + 1 == length[i]:
                    count[i] += count[j]

    maxLen = MAX(length)
    RETURN SUM(count[i] for i where length[i] == maxLen)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Dual DP arrays: length + count.** Extension of LIS DP. When extending, reset count on new max, accumulate on tie. Sum counts of all positions achieving global max length.
