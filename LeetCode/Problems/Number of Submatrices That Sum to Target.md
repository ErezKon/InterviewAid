# 1074. Number of Submatrices That Sum to Target

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-submatrices-that-sum-to-target](https://leetcode.com/problems/number-of-submatrices-that-sum-to-target)
**Companies:** Amazon, Google, Meta, Snapchat

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: 2D Prefix Sum + Hash Map — O(m²n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count submatrices that sum to `target`.

---

## 2. Key Insight

> Fix top/bottom row pair → compress to column sums → 1D subarray sum = target (hash map). Iterate all O(m²) row pairs.

---

## 3. Approach: 2D Prefix Sum + Hash Map — O(m²n) ✅

```
FUNCTION numSubmatrixSumTarget(matrix, target):
    m, n = dimensions
    count = 0

    FOR r1 ← 0 TO m - 1:
        colSum = [0] * n
        FOR r2 ← r1 TO m - 1:
            FOR c ← 0 TO n - 1:
                colSum[c] += matrix[r2][c]

            // 1D subarray sum = target
            prefixCount = Counter({0: 1})
            s = 0
            FOR c ← 0 TO n - 1:
                s += colSum[c]
                count += prefixCount[s - target]
                prefixCount[s] += 1

    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m² · n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **2D → 1D reduction.** Fix row boundaries, compress columns, apply 1D subarray sum technique. Generalizes "Subarray Sum Equals K" to 2D.
