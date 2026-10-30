# 1380. Lucky Numbers in a Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/lucky-numbers-in-a-matrix](https://leetcode.com/problems/lucky-numbers-in-a-matrix)
**Companies:** Amazon, Cisco, Oracle

---

## 1. Problem Description

Given an `m x n` matrix of **distinct **numbers, return *all **lucky numbers** in the matrix in **any **order*.

A **lucky number** is an element of the matrix such that it is the minimum element in its row and maximum in its column.

**Constraints:**
- `m == mat.length`
- `n == mat[i].length`
- `1 <= n, m <= 50`
- `1 <= matrix[i][j] <= 10^5`.
- All elements in the matrix are distinct.

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
Explanation: 15 is the only lucky number since it is the minimum in its row and the maximum in its column.
```

**Example 2:**
```
Input: matrix = [[1,10,4,2],[9,3,8,7],[15,16,17,12]]
Output: [12]
Explanation: 12 is the only lucky number since it is the minimum in its row and the maximum in its column.
```

**Example 3:**
```
Input: matrix = [[7,8],[1,2]]
Output: [7]
Explanation: 7 is the only lucky number since it is the minimum in its row and the maximum in its column.
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
