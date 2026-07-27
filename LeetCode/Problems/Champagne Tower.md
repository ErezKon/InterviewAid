# 799. Champagne Tower

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/champagne-tower](https://leetcode.com/problems/champagne-tower)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok

---

```
FUNCTION champagneTower(poured, query_row, query_glass):
    tower = [[0] * (i + 1) for i in range(query_row + 1)]
    tower[0][0] = poured

    FOR r ← 0 TO query_row - 1:
        FOR c ← 0 TO r:
            overflow = (tower[r][c] - 1) / 2
            IF overflow > 0:
                tower[r+1][c] += overflow
                tower[r+1][c+1] += overflow

    RETURN MIN(1, tower[query_row][query_glass])
```

Simulate overflow. Each glass holds max 1, excess splits evenly.
