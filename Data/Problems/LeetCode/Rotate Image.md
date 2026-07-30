
# 48. Rotate Image

**Difficulty:** 🟡 Medium
**Acceptance:** 80.1%
**LeetCode:** [https://leetcode.com/problems/rotate-image](https://leetcode.com/problems/rotate-image)
**Companies:** Accenture, Adobe, Amazon, Anduril, Apple, Att, Bloomberg, Capital One, Cisco, Citi, Flipkart, Goldman Sachs, Google, Ibm, Infosys, Intel, Jpmorgan, Meta, Microsoft, Nutanix, Nvidia, Oracle, Paypal, Qualcomm, Rakuten, Roblox, Samsung, Sig, Tcs, Tesla, Tiktok, Uber, Visa, Walmart Labs, Yandex, Zillow, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Solution: Transpose + Reverse — O(n²) ✅](#3-solution-transpose--reverse--on²-)
4. [Alternative: Four-way Swap — O(n²)](#4-alternative-four-way-swap--on²)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given an `n × n` 2D matrix, rotate it **90 degrees clockwise** **in-place**.

---

## 2. Examples

```
Example 1:
  Input:          Rotated 90° CW:
  1  2  3         7  4  1
  4  5  6    →    8  5  2
  7  8  9         9  6  3

Example 2:
  Input:              Rotated:
   5   1   9  11       15  13   2   5
   2   4   8  10  →    14   3   4   1
  13   3   6   7        12   6   8   9
  15  14  12  16        16  14  10  11
```

---

## 3. Solution: Transpose + Reverse — O(n²) ✅

**90° clockwise rotation = Transpose + Reverse each row**

```
FUNCTION rotate(matrix):
    n = LENGTH(matrix)

    // Step 1: Transpose (swap matrix[i][j] with matrix[j][i])
    FOR i ← 0 TO n - 1:
        FOR j ← i + 1 TO n - 1:
            SWAP(matrix[i][j], matrix[j][i])

    // Step 2: Reverse each row
    FOR i ← 0 TO n - 1:
        REVERSE(matrix[i])
```

### Visual

```
Original:      Transpose:      Reverse rows:
1  2  3        1  4  7         7  4  1
4  5  6   →    2  5  8    →    8  5  2
7  8  9        3  6  9         9  6  3
```

### Why This Works

- **Transpose** mirrors along the main diagonal: (i, j) → (j, i)
- **Reverse rows** mirrors horizontally: (i, j) → (i, n-1-j)
- Combined: (i, j) → (j, n-1-i), which is exactly 90° clockwise rotation.

---

## 4. Alternative: Four-way Swap — O(n²)

Rotate four cells at a time, layer by layer:

```
FUNCTION rotate(matrix):
    n = LENGTH(matrix)

    FOR layer ← 0 TO n/2 - 1:
        first = layer
        last  = n - 1 - layer

        FOR i ← first TO last - 1:
            offset = i - first

            // Save top
            temp = matrix[first][i]

            // left → top
            matrix[first][i] = matrix[last - offset][first]

            // bottom → left
            matrix[last - offset][first] = matrix[last][last - offset]

            // right → bottom
            matrix[last][last - offset] = matrix[i][last]

            // top → right
            matrix[i][last] = temp
```

---

## 5. Walkthrough

```
matrix = [[1,2,3], [4,5,6], [7,8,9]]

Step 1: Transpose
  Swap (0,1)↔(1,0): 2 ↔ 4 → [[1,4,7], [2,5,8], [3,6,9]]
  (Swap matrix[0][1]=2 with matrix[1][0]=4)
  (Swap matrix[0][2]=3 with matrix[2][0]=7)
  (Swap matrix[1][2]=6 with matrix[2][1]=8)

  Result: [[1,4,7], [2,5,8], [3,6,9]]

Step 2: Reverse each row
  [1,4,7] → [7,4,1]
  [2,5,8] → [8,5,2]
  [3,6,9] → [9,6,3]

  Result: [[7,4,1], [8,5,2], [9,6,3]] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) — touch each cell once |
| **Space** | O(1) — in-place |

---

## 7. Follow-Up Questions

### 7.1 Rotate 90° counter-clockwise?

**Reverse rows + Transpose** (reverse the order of operations).

Or: **Transpose + Reverse each column**.

### 7.2 Rotate 180°?

**Reverse each row + Reverse each column** (or reverse the matrix array, then reverse each row).

### 7.3 Spiral Matrix (LeetCode #54)

Traverse the matrix in spiral order:

```
FUNCTION spiralOrder(matrix):
    result = []
    top = 0, bottom = m-1, left = 0, right = n-1

    WHILE top <= bottom AND left <= right:
        // Traverse right
        FOR col ← left TO right: result.ADD(matrix[top][col])
        top += 1

        // Traverse down
        FOR row ← top TO bottom: result.ADD(matrix[row][right])
        right -= 1

        // Traverse left
        IF top <= bottom:
            FOR col ← right DOWNTO left: result.ADD(matrix[bottom][col])
            bottom -= 1

        // Traverse up
        IF left <= right:
            FOR row ← bottom DOWNTO top: result.ADD(matrix[row][left])
            left += 1

    RETURN result
```

### 7.4 Set Matrix Zeroes (LeetCode #73)

If a cell is 0, set its entire row and column to 0. Use the first row/column as markers for O(1) extra space.

---

## Rotation Cheat Sheet

| Rotation | Method |
|----------|--------|
| **90° CW** | Transpose → Reverse rows |
| **90° CCW** | Reverse rows → Transpose |
| **180°** | Reverse rows → Reverse columns |
| **Flip horizontal** | Reverse each row |
| **Flip vertical** | Reverse row order |
| **Transpose** | Swap (i,j) ↔ (j,i) |

---

## Key Takeaway

> Matrix rotation is a **linear algebra** operation. The "transpose + reverse" decomposition is elegant because both operations are simple and in-place. In interviews, demonstrating this decomposition shows mathematical thinking. The alternative four-way swap is more mechanical but equally valid.
