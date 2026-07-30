# 3619. Count Islands With Total Value Divisible by K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-islands-with-total-value-divisible-by-k](https://leetcode.com/problems/count-islands-with-total-value-divisible-by-k)
**Companies:** Google, Intuit

---

## 1. Problem Description

Given a grid of non‑negative integers and an integer `k`, count connected components (islands) of non‑zero cells where the sum of all cell values in the island is divisible by `k`.

---

## 2. Approach: BFS/DFS + Sum Check — O(m × n) ✅

```text
FUNCTION countIslands(grid, k):
    m ← number of rows, n ← number of columns
    visited ← empty set
    count ← 0
    FOR r FROM 0 TO m-1:
        FOR c FROM 0 TO n-1:
            IF grid[r][c] != 0 AND (r,c) NOT IN visited:
                // explore island
                totalSum ← 0
                stack ← [(r,c)]
                visited.ADD((r,c))
                WHILE stack NOT EMPTY:
                    x, y ← stack.POP()
                    totalSum ← totalSum + grid[x][y]
                    FOR (dx,dy) IN [(1,0),(-1,0),(0,1),(0,-1)]:
                        nx ← x + dx; ny ← y + dy
                        IF 0 ≤ nx < m AND 0 ≤ ny < n AND grid[nx][ny] != 0 AND (nx,ny) NOT IN visited:
                            visited.ADD((nx,ny))
                            stack.PUSH((nx,ny))
                IF totalSum MOD k = 0:
                    count ← count + 1
    RETURN count
```

---

## 3. Examples

| Grid | k | Output | Explanation |
|------|---|--------|-------------|
| `[[1,0,2],[0,3,0],[4,0,5]]` | `3` | `2` | Two islands: `{1,2}` sum = 3 (divisible) and `{3,4,5}` sum = 12 (divisible). |
| `[[0,0],[0,0]]` | `1` | `0` | No non‑zero cells, thus no islands.

---

## 4. Walkthrough

Take the first example grid and `k = 3`:
1. Start at cell (0,0) value = 1 → start new island.
2. Explore its neighbor (0,2) value = 2 via BFS; island sum becomes 1+2 = 3.
3. Sum 3 % 3 = 0 → count = 1.
4. Continue scanning, encounter cell (1,1) value = 3 → new island.
5. BFS reaches (2,0) value = 4 and (2,2) value = 5, total sum = 3+4+5 = 12.
6. 12 % 3 = 0 → count = 2. No other islands remain.

---

## 5. Complexity Analysis

- **Time:** `O(m × n)` – each cell visited at most once.
- **Space:** `O(m × n)` for the visited set / stack in the worst case.

---

## 6. Follow‑Up Questions

- How would you modify the algorithm to return the list of island sums?
- Can the solution be adapted for diagonal connectivity?
- What if the grid is extremely large and does not fit in memory?

---

## Key Takeaway

> Standard flood‑fill finds each connected component while accumulating its total value; after exploration, a simple divisibility check determines whether the island contributes to the answer.
