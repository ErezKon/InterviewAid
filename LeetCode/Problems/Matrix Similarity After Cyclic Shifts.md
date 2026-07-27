# 2946. Matrix Similarity After Cyclic Shifts

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/matrix-similarity-after-cyclic-shifts](https://leetcode.com/problems/matrix-similarity-after-cyclic-shifts)
**Companies:** Amazon, Google, Meta, Microsoft, Salesforce

---

## 1. Problem Description

Check if a matrix remains the same after cyclically shifting each row by `k` positions.

---

## 2. Approach: Direct Comparison — O(m·n) ✅

```
FUNCTION areSimilar(mat, k):
    FOR row IN mat:
        n = len(row)
        FOR j ← 0 TO n - 1:
            IF row[j] != row[(j + k) % n]: RETURN false
    RETURN true
```

| Time | Space |
|------|-------|
| O(m · n) | O(1) |

---

## 3. Key Takeaway

> For each row, check if `row[j] == row[(j+k) % n]` for all j. The matrix is unchanged iff every row is periodic with period dividing k.
