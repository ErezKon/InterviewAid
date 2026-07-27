# 2936. Number of Equal Numbers Blocks

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-equal-numbers-blocks](https://leetcode.com/problems/number-of-equal-numbers-blocks)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Binary Search for Block Boundaries — O(b log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a "Big Array" accessible only via an API that returns the value at index `i`, count the number of **blocks** of consecutive equal numbers.

---

## 2. Key Insight

> Binary search for the end of each block. Starting from the first element of a block, binary search for the last position with the same value. Then the next block starts right after.

---

## 3. Approach: Binary Search for Block Boundaries — O(b log n) ✅

```
FUNCTION countBlocks(arr):
    n = arr.length()
    blocks = 0
    i = 0
    WHILE i < n:
        val = arr[i]
        // Binary search for last index with same value
        lo, hi = i, n - 1
        WHILE lo < hi:
            mid = (lo + hi + 1) / 2
            IF arr[mid] == val: lo = mid
            ELSE: hi = mid - 1
        blocks += 1
        i = lo + 1
    RETURN blocks
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(b · log n) where b = number of blocks |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Binary search to skip blocks.** When only API access is available, binary search for block boundaries to minimize queries. Each block costs O(log n) queries.
