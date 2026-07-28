# 2936. Number of Equal Numbers Blocks

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-equal-numbers-blocks](https://leetcode.com/problems/number-of-equal-numbers-blocks)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Binary Search for Block Boundaries — O(b log n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a "Big Array" accessible only via an API that returns the value at index `i`, count the number of **blocks** of consecutive equal numbers.

---

## 2. Examples

**Example 1:**
```
Input: arr = [1,1,2,2,2,3]
Output: 3
Explanation: The blocks are [1,1], [2,2,2], and [3].
```

**Example 2:**
```
Input: arr = [5,5,5,5]
Output: 1
Explanation: All elements form a single block.
```

---

## 3. Key Insight

> Binary search for the end of each block. Starting from the first element of a block, binary search for the last position with the same value. Then the next block starts right after.

---

## 4. Approach: Binary Search for Block Boundaries — O(b log n) ✅

```text
FUNCTION countBlocks(arr):
    n ← arr.length()
    blocks ← 0
    i ← 0
    WHILE i < n:
        val ← arr[i]
        // binary search for last index with same value
        lo ← i
        hi ← n - 1
        WHILE lo < hi:
            mid ← (lo + hi + 1) / 2
            IF arr[mid] == val:
                lo ← mid
            ELSE:
                hi ← mid - 1
        // lo is last index of current block
        blocks ← blocks + 1
        i ← lo + 1
    RETURN blocks
```

---

## 5. Walkthrough

For `arr = [1,1,2,2,2,3]`:

| Iteration | i (start) | val | lo/hi search result | Block end index | Next i |
|-----------|-----------|-----|---------------------|-----------------|--------|
| 1 | 0 | 1 | lo ends at 1 | 1 | 2 |
| 2 | 2 | 2 | lo ends at 4 | 4 | 5 |
| 3 | 5 | 3 | lo ends at 5 | 5 | 6 (end) |

Three blocks are counted.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(b · log n) where b = number of blocks |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

1. How would you adapt the algorithm if the API also supports a `rangeSum(i, j)` operation?
2. Can you achieve O(b) queries using exponential search instead of binary search?
3. What changes are needed if the array may contain `null` values that should be ignored?

---

## 8. Key Takeaway

> **Binary search to skip blocks.** When only API access is available, binary search for block boundaries to minimize queries. Each block costs O(log n) queries.
