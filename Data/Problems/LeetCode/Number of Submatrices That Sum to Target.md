# 1074. Number of Submatrices That Sum to Target

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-submatrices-that-sum-to-target](https://leetcode.com/problems/number-of-submatrices-that-sum-to-target)
**Companies:** Amazon, Google, Meta, Snapchat

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: 2D Prefix Sum + Hash Map — O(m²n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an `m × n` integer matrix and an integer `target`, count the number of non‑empty submatrices whose elements sum to exactly `target`.

---

## 2. Examples

**Example 1:**
```
Input: matrix = [[0,1,0],[1,1,1],[0,1,0]], target = 0
Output: 4
Explanation: The four submatrices that sum to 0 are the four single‑cell zeros.
```

**Example 2:**
```
Input: matrix = [[1,-1],[ -1,1]], target = 0
Output: 5
Explanation: Submatrices: four 1×1 cells and the whole 2×2 matrix.
```

---

## 3. Approach: 2D Prefix Sum + Hash Map — O(m²n) ✅

Fix a pair of rows `top` and `bottom`. For each column, maintain the cumulative sum between these rows, turning the 2‑D problem into a 1‑D subarray‑sum‑equals‑`target` problem solved with a hash map of prefix sums.

```text
FUNCTION numSubmatrixSumTarget(matrix, target):
    SET m ← number of rows, n ← number of columns
    SET totalCount ← 0
    FOR top ← 0 TO m - 1:
        SET colSum[0…n-1] ← 0
        FOR bottom ← top TO m - 1:
            FOR c ← 0 TO n - 1:
                SET colSum[c] ← colSum[c] + matrix[bottom][c]
            // 1‑D subarray sum = target using prefix sums
            SET prefixCount ← MAP with default 0
            SET prefixCount[0] ← 1
            SET running ← 0
            FOR c ← 0 TO n - 1:
                SET running ← running + colSum[c]
                SET totalCount ← totalCount + prefixCount.get(running - target, 0)
                SET prefixCount[running] ← prefixCount.get(running, 0) + 1
    RETURN totalCount
```

---

## 4. Walkthrough

Take `matrix = [[0,1,0],[1,1,1],[0,1,0]]`, `target = 0`.

| top | bottom | colSum after adding row bottom | Prefix sums | Subarrays reaching target |
|-----|--------|-------------------------------|-------------|---------------------------|
| 0   | 0      | [0,1,0]                       | 0,0,1,1     | 1 (single 0 at col0) |
| 0   | 1      | [1,2,1]                       | 0,1,3,4     | 0 |
| 0   | 2      | [1,3,1]                       | 0,1,4,5     | 0 |
| 1   | 1      | [1,1,1]                       | 0,1,2,3     | 0 |
| 1   | 2      | [1,2,1]                       | 0,1,3,4     | 0 |
| 2   | 2      | [0,1,0]                       | 0,0,1,1     | 3 (three zeros) |

Total count = 4.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m² · n) |
| **Space** | O(n) for `colSum` and hash map |

---

## 6. Follow-Up Questions

- How would you adapt the algorithm for very large matrices that cannot fit in memory?
- Can the approach be extended to count submatrices with sum **≤** or **≥** a target?
- What if the matrix contains only non‑negative numbers—could a sliding‑window technique be used?

---

## 7. Key Takeaway

> **2D → 1D reduction.** By fixing row boundaries and compressing columns, the problem becomes the classic "subarray sum equals K" solved with prefix‑sum hash maps.
