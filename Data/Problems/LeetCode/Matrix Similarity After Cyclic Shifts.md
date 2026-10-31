# 2946. Matrix Similarity After Cyclic Shifts

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/matrix-similarity-after-cyclic-shifts](https://leetcode.com/problems/matrix-similarity-after-cyclic-shifts)
**Companies:** Amazon, Google, Meta, Microsoft, Salesforce

---

## 1. Problem Description

You are given an `m x n` integer matrix `mat` and an integer `k`. The matrix rows are 0-indexed.

The following process happens `k` times:

- **Even-indexed** rows (0, 2, 4, ...) are cyclically shifted to the left.
- **Odd-indexed** rows (1, 3, 5, ...) are cyclically shifted to the right.

Return `true` if the final modified matrix after `k` steps is identical to the original matrix, and `false` otherwise.

**Constraints:**

- `1 <= mat.length <= 25`
- `1 <= mat[i].length <= 25`
- `1 <= mat[i][j] <= 25`
- `1 <= k <= 50`

---

## 2. Examples

```
Example 1:
  Input: mat = [[1,2,3],[4,5,6],[7,8,9]], k = 4
  Output: false
  Explanation: In each step left shift is applied to rows 0 and 2 (even indices), and right shift to row 1 (odd index).
  After 4 steps the matrix is [[2,3,1],[6,4,5],[8,9,7]], which differs from the original.
```

```
Example 2:
  Input: mat = [[1,2,1,2],[5,5,5,5],[6,3,6,3]], k = 2
  Output: true
  Explanation: After 2 steps each row returns to its original arrangement ([1,2,1,2] and [6,3,6,3] have period 2; [5,5,5,5] is constant).
```

```
Example 3:
  Input: mat = [[2,2],[2,2]], k = 3
  Output: true
  Explanation: As all the values are equal in the matrix, even after performing cyclic shifts the matrix will remain the same.
```

---

## 3. Approach: Direct Comparison — O(m·n) ✅

```text
FUNCTION areSimilar(mat, k):
    FOR each row IN mat:
        n ← LENGTH(row)
        FOR j ← 0 TO n-1:
            IF row[j] != row[(j + k) MOD n]:
                RETURN false
    RETURN true
```

---

## 4. Walkthrough

Consider `mat = [[1,2,3],[4,5,6]]` with `k = 1`:

| Row index | j | row[j] | row[(j+k) mod n] | Equal? |
|-----------|---|--------|-------------------|--------|
| 0 | 0 | 1 | 2 | false → return false |

The algorithm stops at the first mismatch, returning `false`.

---

## 5. Complexity Analysis

- **Time**: O(m·n) – each element is inspected once.
- **Space**: O(1) extra space.

---

## 6. Follow-Up Questions

- How would you handle **different shift values per row**?
- Can you determine the **minimum k** that makes the matrix similar, or report that none exists?
- What changes are needed if the matrix is **circularly shifted column-wise** instead of row-wise?

---

## Key Takeaway

> Directly compare each element with its cyclic counterpart; the matrix is unchanged iff every row is periodic with a period dividing `k`.
