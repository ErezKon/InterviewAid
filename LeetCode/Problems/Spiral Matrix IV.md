# 2326. Spiral Matrix IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/spiral-matrix-iv](https://leetcode.com/problems/spiral-matrix-iv)
**Companies:** Docusign, Google, Meta, Microsoft

---

```
FUNCTION spiralMatrix(m, n, head):
    matrix = [[-1] * n for _ in range(m)]
    dirs = [(0,1),(1,0),(0,-1),(-1,0)]
    r = c = d = 0
    node = head

    WHILE node:
        matrix[r][c] = node.val
        node = node.next
        nr, nc = r + dirs[d][0], c + dirs[d][1]
        IF NOT (0 <= nr < m AND 0 <= nc < n AND matrix[nr][nc] == -1):
            d = (d + 1) % 4
            nr, nc = r + dirs[d][0], c + dirs[d][1]
        r, c = nr, nc

    RETURN matrix
```
