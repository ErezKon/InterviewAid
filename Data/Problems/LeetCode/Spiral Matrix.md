# 54. Spiral Matrix

**Difficulty:** 🟡 Medium
**Acceptance:** 53.5%
**LeetCode:** [https://leetcode.com/problems/spiral-matrix](https://leetcode.com/problems/spiral-matrix)
**Companies:** Accenture, Adobe, Akamai, Amazon, Amd, Anduril, Apple, Autodesk, Blend, Bloomberg, C3 Ai, Capital One, Cisco, Darwinbox, Databricks, Ebay, Epam Systems, Epic Games, Epic Systems, Flipkart, Goldman Sachs, Google, Ibm, Infosys, Intuit, Josh Technology, Lenskart, Medianet, Meta, Microsoft, Morgan Stanley, Netapp, Nordstrom, Nutanix, Nvidia, Oracle, Paypal, Phonepe, Pornhub, Rbc, Roblox, Salesforce, Sig, Tcs, The Trade Desk, Tiktok, Uber, Visa, Walmart Labs, Wells Fargo, Yahoo, Yandex, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Simulation with Boundaries — O(m·n) ✅](#3-approach-1-simulation-with-boundaries--omn-)
4. [Approach 2: Layer-by-Layer — O(m·n)](#4-approach-2-layer-by-layer--omn)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given an `m x n` matrix, return all elements of the matrix in **spiral order**.

**Constraints:**
- `1 <= m, n <= 10`
- `-100 <= matrix[i][j] <= 100`

---

## 2. Examples

```
Example 1:
  Input:  matrix = [[1,2,3],[4,5,6],[7,8,9]]
  Output: [1,2,3,6,9,8,7,4,5]

Example 2:
  Input:  matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
  Output: [1,2,3,4,8,12,11,10,9,5,6,7]
```

---

## 3. Approach 1: Simulation with Boundaries — O(m·n) ✅

Maintain four boundaries: `top`, `bottom`, `left`, `right`. Traverse each direction in turn, then shrink the corresponding boundary.

```
FUNCTION spiralOrder(matrix):

    result = []
    top    = 0
    bottom = rows - 1
    left   = 0
    right  = cols - 1

    WHILE top <= bottom AND left <= right:

        // Traverse right along top row
        FOR col ← left TO right:
            result.ADD(matrix[top][col])
        top += 1

        // Traverse down along right column
        FOR row ← top TO bottom:
            result.ADD(matrix[row][right])
        right -= 1

        // Traverse left along bottom row (if still valid)
        IF top <= bottom:
            FOR col ← right DOWN TO left:
                result.ADD(matrix[bottom][col])
            bottom -= 1

        // Traverse up along left column (if still valid)
        IF left <= right:
            FOR row ← bottom DOWN TO top:
                result.ADD(matrix[row][left])
            left += 1

    RETURN result
```

---

## 4. Approach 2: Layer-by-Layer — O(m·n)

Process the matrix as concentric rectangular layers from outside to inside.

```
FUNCTION spiralOrder(matrix):

    result = []
    rows = len(matrix)
    cols = len(matrix[0])
    layers = (MIN(rows, cols) + 1) / 2

    FOR layer ← 0 TO layers - 1:
        // Top row of this layer
        FOR col ← layer TO cols - 1 - layer:
            result.ADD(matrix[layer][col])

        // Right column
        FOR row ← layer + 1 TO rows - 1 - layer:
            result.ADD(matrix[row][cols - 1 - layer])

        // Bottom row (if distinct from top)
        IF layer < rows - 1 - layer:
            FOR col ← cols - 2 - layer DOWN TO layer:
                result.ADD(matrix[rows - 1 - layer][col])

        // Left column (if distinct from right)
        IF layer < cols - 1 - layer:
            FOR row ← rows - 2 - layer DOWN TO layer + 1:
                result.ADD(matrix[row][layer])

    RETURN result
```

---

## 5. Walkthrough

```
matrix = [[1,2,3],
          [4,5,6],
          [7,8,9]]

Boundaries: top=0, bottom=2, left=0, right=2

Pass 1:
  → right: 1, 2, 3          top becomes 1
  ↓ down:  6, 9              right becomes 1
  ← left:  8, 7              bottom becomes 1
  ↑ up:    4                  left becomes 1

Pass 2:
  → right: 5                 top becomes 2
  (top > bottom → stop)

Result: [1, 2, 3, 6, 9, 8, 7, 4, 5] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m·n) — each element visited once |
| **Space** | O(1) extra (output not counted) |

---

## 7. Follow-Up Questions

### 7.1 Spiral Matrix II (LeetCode #59)

Given `n`, generate an `n x n` matrix filled with elements 1 to n² in spiral order.

Same boundary approach, but **write** values instead of reading:

```
FUNCTION generateMatrix(n):
    matrix = n × n matrix filled with 0
    num = 1
    top, bottom, left, right = 0, n-1, 0, n-1

    WHILE top <= bottom AND left <= right:
        FOR col ← left TO right:
            matrix[top][col] = num++
        top++
        FOR row ← top TO bottom:
            matrix[row][right] = num++
        right--
        FOR col ← right DOWN TO left:
            matrix[bottom][col] = num++
        bottom--
        FOR row ← bottom DOWN TO top:
            matrix[row][left] = num++
        left++

    RETURN matrix
```

### 7.2 Spiral Matrix III (LeetCode #885)

Start at `(rStart, cStart)` and walk in spiral order, collecting cells within bounds. Use direction vectors and increasing step counts:

Steps pattern: 1, 1, 2, 2, 3, 3, 4, 4, ... (each length used twice, then increment).

### 7.3 How would you handle a non-rectangular (jagged) array?

Track valid indices per row. The boundary approach doesn't directly apply — you'd need to track which cells are visited with a `seen` set.

---

## Key Takeaway

> **Boundary shrinking** is the cleanest spiral traversal technique. The key insight is checking `top <= bottom` and `left <= right` before the reverse traversals to avoid double-counting in non-square matrices.
