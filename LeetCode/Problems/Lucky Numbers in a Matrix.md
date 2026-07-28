# 1380. Lucky Numbers in a Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/lucky-numbers-in-a-matrix](https://leetcode.com/problems/lucky-numbers-in-a-matrix)
**Companies:** Amazon, Cisco, Oracle

---

## 1. Problem Description

Given an `m x n` matrix of distinct integers, a lucky number is an element that is the minimum in its row and the maximum in its column. Return all lucky numbers in any order.

---

## 2. Approach: Set Intersection — O(m·n) ✅

```text
FUNCTION luckyNumbers(matrix):
    m ← NUMBER OF ROWS(matrix)
    n ← NUMBER OF COLUMNS(matrix)
    rowMins ← []
    FOR i ← 0 TO m-1:
        minVal ← MINIMUM(matrix[i][j] FOR j ← 0 TO n-1)
        APPEND minVal TO rowMins
    colMaxs ← []
    FOR j ← 0 TO n-1:
        maxVal ← MAXIMUM(matrix[i][j] FOR i ← 0 TO m-1)
        APPEND maxVal TO colMaxs
    RETURN LIST(SET(rowMins) ∩ SET(colMaxs))
```

| Time | Space |
|------|-------|
| O(m·n) | O(m+n) |

---

## 3. Examples

**Example 1:**
```
Input: matrix = [[3,7,8],[9,11,13],[15,16,17]]
Output: [15]
Explanation: 15 is the minimum in its row (third row) and the maximum in its column (first column).
```

**Example 2:**
```
Input: matrix = [[1,10,4,2],[9,3,8,7],[15,16,17,12]]
Output: [12]
Explanation: 12 is the only element that satisfies both conditions.
```

---

## 4. Walkthrough

| Step | Action |
|------|--------|
| 1 | Compute row minima: [3,7,15] |
| 2 | Compute column maxima: [15,16,17,12] |
| 3 | Intersection of sets → {15}. |
| 4 | Return [15] as the lucky number. |

---

## 5. Complexity Analysis

- **Time Complexity:** O(m·n) – each element is visited to compute minima and maxima.
- **Space Complexity:** O(m+n) – storing row minima and column maxima.

---

## Key Takeaway

> By extracting row minima and column maxima into sets, their intersection directly yields the lucky numbers, requiring only a single pass over the matrix.
