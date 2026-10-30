# 1591. Strange Printer II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/strange-printer-ii](https://leetcode.com/problems/strange-printer-ii)
**Companies:** Google

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented "minimum turns" problem; the official problem is a feasibility check. Correct idea: for each color take its bounding rectangle; every other color found inside that rectangle must be printed **after** it → add a dependency edge; return `true` iff the dependency graph over ≤ 60 colors is acyclic (topological sort / DFS cycle check). O(C·m·n).*

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
**Algorithm:** Topological ordering of dependency graph (Greedy + DFS).
- **Insight:** A cell of color X can be printed only after all cells of other colors that appear above it (in the same column) or to its left (in the same row) are printed. This creates a partial order among colors.
- Build a directed graph where an edge X → Y means color X must be printed before color Y.
- The answer equals the number of colors with no incoming edges after repeatedly removing printable colors (i.e., perform topological sort).

### Pseudocode
```text
FUNCTION strangePrinterII(grid):
    nRows ← LENGTH(grid)
    nCols ← LENGTH(grid[0])
    CREATE set colors
    CREATE adjacency list graph
    CREATE indegree map
    // Identify colors and initialize structures
    FOR i ← 0 TO nRows-1:
        FOR j ← 0 TO nCols-1:
            c ← grid[i][j]
            ADD c TO colors
            IF c NOT IN indegree: indegree[c] ← 0
    // Build dependencies
    FOR i ← 0 TO nRows-1:
        FOR j ← 0 TO nCols-1:
            cur ← grid[i][j]
            // Look up cells above in same column
            FOR k ← 0 TO i-1:
                above ← grid[k][j]
                IF above ≠ cur:
                    IF above NOT IN graph[cur]:
                        ADD edge cur → above IN graph
                        indegree[above] ← indegree[above] + 1
            // Look left in same row
            FOR k ← 0 TO j-1:
                left ← grid[i][k]
                IF left ≠ cur:
                    IF left NOT IN graph[cur]:
                        ADD edge cur → left IN graph
                        indegree[left] ← indegree[left] + 1
    // Topological sort
    CREATE queue
    FOR each c IN colors:
        IF indegree[c] = 0:
            ENQUEUE(queue, c)
    turns ← 0
    WHILE queue NOT EMPTY:
        size ← SIZE(queue) // process current layer
        FOR _ ← 1 TO size:
            node ← DEQUEUE(queue)
            FOR neighbor IN graph[node]:
                indegree[neighbor] ← indegree[neighbor] - 1
                IF indegree[neighbor] = 0:
                    ENQUEUE(queue, neighbor)
        turns ← turns + 1
    RETURN turns
```

## Walkthrough
Consider the first example grid. Colors are {a,b,c,d}. Dependencies:
- a must precede c (c appears below a in column 1).
- b must precede c (c appears left of b in row 2).
- d has no incoming edges.
Topological layers: {a,b,d} → {c}. Turns = 2 layers → 4 turns (each layer may require multiple prints for separate rectangles of the same color).

## Complexity Analysis
- **Time:** O(R·C·(R+C)) in worst case for building dependencies, where R and C are rows and columns.
- **Space:** O(K²) for graph where K is number of distinct colors (≤ 26).

## Follow-Up Questions
- How would the solution change if the printer could print non‑contiguous cells of the same color in one turn?
- Can the algorithm be optimized to O(R·C) by scanning rows and columns only once?
- What if colors are represented by integers up to 10⁵ instead of letters?

## Key Takeaway
Model the printing constraints as a dependency graph among colors and compute the minimum turns via topological layering.
