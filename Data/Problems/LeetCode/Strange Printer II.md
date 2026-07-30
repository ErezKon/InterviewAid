# 1591. Strange Printer II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/strange-printer-ii](https://leetcode.com/problems/strange-printer-ii)
**Companies:** Google

---

## Problem Description
Given a rectangular grid of characters, each cell contains a lowercase English letter. A printer can print a solid rectangle of any size, turning all cells inside it to the same character in one turn. The printer can only print a rectangle if all cells inside already contain that character or are empty. Determine the minimum number of turns required to print the entire grid.

## Examples
- **Input:**
  ```
  grid = [
    ["a","a","b"],
    ["a","c","b"],
    ["d","c","c"]
  ]
  ```
  **Output:** `4`
  // One possible sequence: print all "a" cells, then "b", then "c", then "d".
- **Input:** `grid = [["a","b"],["b","a"]]` **Output:** `3`
  // Need separate prints for each distinct region.

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
