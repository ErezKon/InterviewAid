# 1582. Special Positions in a Binary Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/special-positions-in-a-binary-matrix](https://leetcode.com/problems/special-positions-in-a-binary-matrix)
**Companies:** Amazon, Etsy, Google, Meta

---

```
FUNCTION numSpecial(mat):
    rowSum = [SUM(row) for row in mat]
    colSum = [SUM(mat[r][c] for r in range(m)) for c in range(n)]
    count = 0
    FOR r, c where mat[r][c] == 1:
        IF rowSum[r] == 1 AND colSum[c] == 1: count += 1
    RETURN count
```
