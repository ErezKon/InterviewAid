# 1591. Strange Printer II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/strange-printer-ii](https://leetcode.com/problems/strange-printer-ii)
**Companies:** Google

---

## Problem Description

There is a strange printer with the following two special requirements:

- On each turn, the printer will print a solid rectangular pattern of a single color on the grid. This will cover up the existing colors in the rectangle.
- Once the printer has used a color for the above operation, **the same color cannot be used again**.

You are given a `m x n` matrix `targetGrid`, where `targetGrid[row][col]` is the color in the position `(row, col)` of the grid.

Return `true` *if it is possible to print the matrix* `targetGrid`*,* *otherwise, return* `false`.

**Constraints:**
- `m == targetGrid.length`
- `n == targetGrid[i].length`
- `1 <= m, n <= 60`
- `1 <= targetGrid[row][col] <= 60`

## Examples

**Example 1:**
```
Input: targetGrid = [[1,1,1,1],[1,2,2,1],[1,2,2,1],[1,1,1,1]]
Output: true
```

**Example 2:**
```
Input: targetGrid = [[1,1,1,1],[1,1,3,3],[1,1,3,4],[5,5,1,4]]
Output: true
```

**Example 3:**
```
Input: targetGrid = [[1,2,1],[2,1,2],[1,2,1]]
Output: false
Explanation: It is impossible to form targetGrid because it is not allowed to print the same color in different turns.
```

## Approach
**Algorithm:** Bounding rectangles + dependency graph + cycle check (Kahn's topological sort).
- **Insight:** Since each color is printed exactly once as a solid rectangle, color `c` must have been printed over (at least) its bounding rectangle - the smallest rectangle containing all its cells. Any cell of a different color `d` inside that rectangle means `d` covered `c`, so `c` must be printed **before** `d`.
- Build a directed graph with an edge `c → d` for each such pair. The grid is printable iff this graph has no cycle (a valid print order is any topological order).
- There are at most 60 colors, so the graph is tiny; scanning each color's rectangle costs at most `m·n`.

### Pseudocode
```text
FUNCTION isPrintable(grid):
    m ← LENGTH(grid)
    n ← LENGTH(grid[0])
    // 1. Bounding rectangle per color
    FOR EACH color c: top[c] ← ∞, bottom[c] ← -∞, left[c] ← ∞, right[c] ← -∞
    FOR i ← 0 TO m-1:
        FOR j ← 0 TO n-1:
            c ← grid[i][j]
            top[c] ← MIN(top[c], i);    bottom[c] ← MAX(bottom[c], i)
            left[c] ← MIN(left[c], j);  right[c] ← MAX(right[c], j)
    // 2. Dependency edges c → d (c printed before d)
    CREATE adjacency sets graph, indegree map (0 for every present color)
    FOR EACH present color c:
        FOR i ← top[c] TO bottom[c]:
            FOR j ← left[c] TO right[c]:
                d ← grid[i][j]
                IF d ≠ c AND d NOT IN graph[c]:
                    ADD d TO graph[c]
                    indegree[d] ← indegree[d] + 1
    // 3. Kahn's algorithm
    queue ← all colors with indegree 0
    processed ← 0
    WHILE queue NOT EMPTY:
        c ← DEQUEUE(queue)
        processed ← processed + 1
        FOR d IN graph[c]:
            indegree[d] ← indegree[d] - 1
            IF indegree[d] = 0: ENQUEUE(queue, d)
    RETURN processed = number of present colors
```

## Walkthrough
Example 2: `targetGrid = [[1,1,1,1],[1,1,3,3],[1,1,3,4],[5,5,1,4]]`

| color | bounding rectangle (rows, cols) | other colors inside | edges |
|-------|---------------------------------|---------------------|-------|
| 1 | rows 0-3, cols 0-3 | 3, 4, 5 | 1→3, 1→4, 1→5 |
| 3 | rows 1-2, cols 2-3 | 4 (at (2,3)) | 3→4 |
| 4 | rows 2-3, col 3 | none | - |
| 5 | row 3, cols 0-1 | none | - |

Indegrees: `1:0, 3:1, 4:2, 5:1`. Kahn: process 1 → (3 and 5 become 0) → process 3 → (4 becomes 0) → process 5 → process 4. All 4 colors processed → `true`.

For Example 3, color 1's rectangle contains 2 and color 2's rectangle contains 1, giving the cycle `1 → 2 → 1` → `false`.

## Complexity Analysis
- **Time:** O(C·m·n) where C ≤ 60 is the number of colors (each color scans its rectangle), plus O(C²) for the topological sort.
- **Space:** O(C²) for the dependency graph, O(C) for rectangles and indegrees.

## Follow-Up Questions
- How would you return an actual print order instead of just `true`/`false`?
- Can you solve it by "reverse peeling": repeatedly remove a color whose rectangle contains only itself or already-removed cells?
- What changes if a color may be used up to twice?

## Key Takeaway
Turn "which rectangle covered which" into precedence constraints between colors; printability is then exactly the absence of a cycle in the dependency graph.
