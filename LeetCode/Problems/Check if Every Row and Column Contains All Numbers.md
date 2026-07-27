# 2133. Check if Every Row and Column Contains All Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-every-row-and-column-contains-all-numbers](https://leetcode.com/problems/check-if-every-row-and-column-contains-all-numbers)
**Companies:** Indeed, Instacart, Karat, Zoho

---

```
FUNCTION checkValid(matrix):
    n = len(matrix)
    FOR row IN matrix:
        IF len(SET(row)) != n: RETURN false
    FOR c ← 0 TO n - 1:
        IF len(SET(matrix[r][c] for r in range(n))) != n: RETURN false
    RETURN true
```
