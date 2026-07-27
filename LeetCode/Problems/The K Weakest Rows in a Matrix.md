# 1337. The K Weakest Rows in a Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix](https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION kWeakestRows(mat, k):
    strength = [(SUM(row), i) for i, row in enumerate(mat)]
    strength.SORT()
    RETURN [idx for _, idx in strength[:k]]
```
