# 1476. Subrectangle Queries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/subrectangle-queries](https://leetcode.com/problems/subrectangle-queries)
**Companies:** Google, Info Edge, Nuro

---

```
CLASS SubrectangleQueries:
    CONSTRUCTOR(rectangle): self.rect = rectangle; self.updates = []

    FUNCTION updateSubrectangle(r1, c1, r2, c2, newValue):
        updates.ADD((r1, c1, r2, c2, newValue))

    FUNCTION getValue(row, col):
        FOR (r1, c1, r2, c2, val) IN reversed(updates):
            IF r1 <= row <= r2 AND c1 <= col <= c2: RETURN val
        RETURN rect[row][col]
```
