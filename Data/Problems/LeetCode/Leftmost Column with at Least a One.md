# 1428. Leftmost Column with at Least a One

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/leftmost-column-with-at-least-a-one](https://leetcode.com/problems/leftmost-column-with-at-least-a-one)
**Companies:** Meta, Sap, Uber

---

## 1. Problem Description

A **row-sorted binary matrix** means that all elements are `0` or `1` and each row of the matrix is sorted in non-decreasing order.

Given a **row-sorted binary matrix** `binaryMatrix`, return *the index (0-indexed) of the **leftmost column** with a 1 in it*. If such an index does not exist, return `-1`.

**You can't access the Binary Matrix directly.** You may only access the matrix using a `BinaryMatrix` interface:

- `BinaryMatrix.get(row, col)` returns the element of the matrix at index `(row, col)` (0-indexed).
- `BinaryMatrix.dimensions()` returns the dimensions of the matrix as a list of 2 elements `[rows, cols]`, which means the matrix is `rows x cols`.

Submissions making more than `1000` calls to `BinaryMatrix.get` will be judged *Wrong Answer*. Also, any solutions that attempt to circumvent the judge will result in disqualification.

For custom testing purposes, the input will be the entire binary matrix `mat`. You will not have access to the binary matrix directly.

**Constraints:**
- `rows == mat.length`
- `cols == mat[i].length`
- `1 <= rows, cols <= 100`
- `mat[i][j]` is either `0` or `1`.
- `mat[i]` is sorted in non-decreasing order.

---

## 2. Approach: Top-Right Walk — O(m + n) ✅

Start from top-right. If 1, move left (potential answer). If 0, move down.

```text
FUNCTION leftMostColumnWithOne(binaryMatrix):
    rows, cols = binaryMatrix.dimensions()
    r ← 0; c ← cols - 1; result ← -1
    WHILE r < rows AND c >= 0:
        IF binaryMatrix.get(r, c) == 1:
            result ← c
            c ← c - 1
        ELSE:
            r ← r + 1
    RETURN result
```

---

## 3. Examples

```
Example 1:
  Input: mat = [[0,0],[1,1]]
  Output: 0
```

```
Example 2:
  Input: mat = [[0,0],[0,1]]
  Output: 1
```

```
Example 3:
  Input: mat = [[0,0],[0,0]]
  Output: -1
```

---

## 4. Walkthrough

| Step | (r,c) | Action | result |
|------|-------|--------|--------|
| 1 | (0,3) | get = 1 → move left | result=3 |
| 2 | (0,2) | get = 0 → move down | result=3 |
| 3 | (1,2) | get = 1 → move left | result=2 |
| 4 | (1,1) | get = 1 → move left | result=1 |
| 5 | (1,0) | get = 0 → move down |
| 6 | (2,0) | get = 0 → move down (out of rows) |
Return result = 1.

---

## 5. Complexity Analysis

- **Time:** O(m + n) – each step discards a row or a column.
- **Space:** O(1) – only a few integer variables.

---

## 6. Follow-Up Questions

- How would you adapt the algorithm if rows were not sorted?
- Can you solve the problem using binary search on each row?
- What changes are needed if the matrix is provided as a stream?

---

## Key Takeaway

> Starting from the top-right corner lets you eliminate an entire row or column with each query, achieving linear time in matrix dimensions.
