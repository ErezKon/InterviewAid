# 3619. Count Islands With Total Value Divisible by K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-islands-with-total-value-divisible-by-k](https://leetcode.com/problems/count-islands-with-total-value-divisible-by-k)
**Companies:** Google, Intuit

---

## 1. Problem Description

Given a grid of non-negative integers and an integer `k`, count connected components (islands) of non-zero cells where the sum of all cell values in the island is divisible by `k`.

---

## 2. Approach: BFS/DFS + Sum Check — O(m × n) ✅

```
FUNCTION countIslands(grid, k):
    m, n = dimensions
    visited = set()
    count = 0
    
    FOR r FROM 0 TO m-1:
        FOR c FROM 0 TO n-1:
            IF grid[r][c] != 0 AND (r,c) NOT IN visited:
                // BFS/DFS to find island and compute sum
                totalSum = 0
                queue = [(r, c)]
                visited.ADD((r, c))
                WHILE queue:
                    x, y = queue.pop()
                    totalSum += grid[x][y]
                    FOR dx, dy IN directions:
                        nx, ny = x+dx, y+dy
                        IF valid AND grid[nx][ny] != 0 AND (nx,ny) NOT IN visited:
                            visited.ADD((nx, ny))
                            queue.ADD((nx, ny))
                IF totalSum % k == 0:
                    count += 1
    RETURN count
```

| Time | Space |
|------|-------|
| O(m × n) | O(m × n) |

---

## Key Takeaway

> Standard flood-fill to find connected components, accumulating the sum. After exploring each island, check divisibility by `k`.
