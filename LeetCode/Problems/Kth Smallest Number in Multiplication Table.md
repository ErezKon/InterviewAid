# 668. Kth Smallest Number in Multiplication Table

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/kth-smallest-number-in-multiplication-table](https://leetcode.com/problems/kth-smallest-number-in-multiplication-table)
**Companies:** De Shaw, Google, Medianet, Meta, Uber

---

## 1. Problem Description

Given an `m × n` multiplication table (row i, col j → value i×j), find the k-th smallest number.

---

## 2. Approach: Binary Search on Value — O(m log(mn)) ✅

Binary search on the answer. For a candidate `mid`, count values ≤ mid: row `i` contributes `min(mid/i, n)` values.

```
FUNCTION findKthNumber(m, n, k):
    lo, hi = 1, m * n

    WHILE lo < hi:
        mid = (lo + hi) / 2
        count = 0
        FOR i ← 1 TO m:
            count += MIN(mid / i, n)
        IF count >= k: hi = mid
        ELSE: lo = mid + 1

    RETURN lo
```

| Time | Space |
|------|-------|
| O(m · log(m·n)) | O(1) |

---

## 3. Key Takeaway

> Binary search on value + counting elements ≤ mid in each row. Same pattern as "Kth Smallest in Sorted Matrix" but for multiplication tables.
