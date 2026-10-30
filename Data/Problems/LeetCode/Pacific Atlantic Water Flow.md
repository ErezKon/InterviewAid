# 417. Pacific Atlantic Water Flow

**Difficulty:** 🟡 Medium
**Acceptance:** 56.0%
**LeetCode:** [https://leetcode.com/problems/pacific-atlantic-water-flow](https://leetcode.com/problems/pacific-atlantic-water-flow)
**Companies:** Adobe, Amazon, Bloomberg, Flipkart, Google, Meta, Microsoft, Nutanix, Servicenow, Tiktok, Uber, Urban Company

---

## 1. Problem Description

There is an `m x n` rectangular island that borders both the **Pacific Ocean** and **Atlantic Ocean**. The **Pacific Ocean** touches the island's left and top edges, and the **Atlantic Ocean** touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an `m x n` integer matrix `heights` where `heights[r][c]` represents the **height above sea level** of the cell at coordinate `(r, c)`.

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is **less than or equal to** the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return *a **2D list** of grid coordinates* `result` *where* `result[i] = [ri, ci]` *denotes that rain water can flow from cell* `(ri, ci)` *to **both** the Pacific and Atlantic oceans*.

**Constraints:**

- `m == heights.length`
- `n == heights[r].length`
- `1 <= m, n <= 200`
- `0 <= heights[r][c] <= 10^5`

---

## 2. Examples

```
Example 1:
  Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
  Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
  Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
    [0,4]: [0,4] -> Pacific Ocean
           [0,4] -> Atlantic Ocean
    [1,3]: [1,3] -> [0,3] -> Pacific Ocean
           [1,3] -> [1,4] -> Atlantic Ocean
    [1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean
           [1,4] -> Atlantic Ocean
    [2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean
           [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
    [3,0]: [3,0] -> Pacific Ocean
           [3,0] -> [4,0] -> Atlantic Ocean
    [3,1]: [3,1] -> [3,0] -> Pacific Ocean
           [3,1] -> [4,1] -> Atlantic Ocean
    [4,0]: [4,0] -> Pacific Ocean
           [4,0] -> Atlantic Ocean
  Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.
```

```
Example 2:
  Input: heights = [[1]]
  Output: [[0,0]]
  Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.
```

---

## 3. Approach: Reverse BFS/DFS from Oceans — O(m·n) ✅

```text
FUNCTION pacificAtlantic(heights):
    m ← number of rows, n ← number of columns
    pacific ← m×n boolean matrix initialized to FALSE
    atlantic ← m×n boolean matrix initialized to FALSE

    // Start DFS/BFS from Pacific borders (top row + left column)
    FOR each cell (r, c) on top row OR left column:
        dfs(r, c, heights, pacific)

    // Start DFS/BFS from Atlantic borders (bottom row + right column)
    FOR each cell (r, c) on bottom row OR right column:
        dfs(r, c, heights, atlantic)

    result ← []
    FOR r ← 0 TO m-1:
        FOR c ← 0 TO n-1:
            IF pacific[r][c] AND atlantic[r][c]:
                APPEND [r, c] TO result
    RETURN result

FUNCTION dfs(r, c, heights, visited):
    visited[r][c] ← TRUE
    FOR each (dr, dc) IN [(1,0), (-1,0), (0,1), (0,-1)]:
        nr ← r + dr, nc ← c + dc
        IF nr IN [0,m) AND nc IN [0,n) AND NOT visited[nr][nc] AND heights[nr][nc] >= heights[r][c]:
            dfs(nr, nc, heights, visited)
```

| Time | Space |
|------|-------|
| O(m·n) | O(m·n) |

---

## 4. Walkthrough

Consider the matrix:
```
1 2 2
3 2 3
2 4 5
```
1. **Pacific DFS** starts from cells `(0,0)`, `(0,1)`, `(0,2)`, `(1,0)`. It can reach cells `{(0,0),(0,1),(0,2),(1,0),(1,1),(2,0)}`.
2. **Atlantic DFS** starts from cells `(2,2)`, `(2,1)`, `(2,0)`, `(1,2)`. It can reach cells `{(2,2),(2,1),(2,0),(1,2),(0,2),(1,1),(0,1)}`.
3. **Intersection** of the two reachable sets yields the result coordinates listed in the example.

---

## 5. Complexity Analysis

- **Time:** Each cell is visited at most twice (once from each ocean) → **O(m·n)**.
- **Space:** Two boolean matrices of size `m·n` and recursion/queue stack → **O(m·n)** auxiliary space.

---

## 6. Follow-Up Questions

1. How would you adapt the solution to work with **diagonal** water flow?
2. Can you implement the same logic using an **iterative BFS** with a queue instead of recursion?
3. How would the algorithm change if the water could also flow **downhill** (to lower heights) as well as uphill?

---

## Key Takeaway

> Reverse the flow: instead of checking every cell individually, start from the oceans and flow **uphill**. This captures all cells that can reach each ocean in linear time.
