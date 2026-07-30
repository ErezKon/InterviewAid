# 2946. Matrix Similarity After Cyclic Shifts

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/matrix-similarity-after-cyclic-shifts](https://leetcode.com/problems/matrix-similarity-after-cyclic-shifts)
**Companies:** Amazon, Google, Meta, Microsoft, Salesforce

---

## 1. Problem Description

Check if a matrix remains the same after cyclically shifting each row by `k` positions.

---

## 2. Examples

| Matrix | k | Output |
|--------|---|--------|
| `[[1,2,3],[4,5,6]]` | 1 | `false` |
| `[[1,2,3],[1,2,3]]` | 3 | `true` |
| `[[7,7,7],[7,7,7]]` | 2 | `true` |

*Explanation*: Shifting each row by `k` positions must result in the original matrix.

---

## 3. Approach: Direct Comparison — O(m·n) ✅

```text
FUNCTION areSimilar(mat, k):
    FOR each row IN mat:
        n ← LENGTH(row)
        FOR j ← 0 TO n‑1:
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

## 6. Follow‑Up Questions

- How would you handle **different shift values per row**?
- Can you determine the **minimum k** that makes the matrix similar, or report that none exists?
- What changes are needed if the matrix is **circularly shifted column‑wise** instead of row‑wise?

---

## Key Takeaway

> Directly compare each element with its cyclic counterpart; the matrix is unchanged iff every row is periodic with a period dividing `k`.
