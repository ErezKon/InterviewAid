# 1254. Number of Closed Islands

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-closed-islands](https://leetcode.com/problems/number-of-closed-islands)
**Companies:** Amazon, Google, Meta, Microsoft, Oracle

---

## Table of Contents

1. [Problem Description](#problem-description)
2. [Examples](#examples)
3. [Approach](#approach)
4. [Walkthrough](#walkthrough)
5. [Complexity Analysis](#complexity-analysis)
6. [Follow-Up Questions](#follow-up-questions)
7. [Key Takeaway](#key-takeaway)

---

## Problem Description

Count **closed islands** — groups of `0`s completely surrounded by `1`s (not touching the border).

---

## Examples

**Example 1:**
```
Input: grid = [[1,1,1,1,1,1,1,0],
               [1,0,0,0,0,1,1,0],
               [1,0,1,0,1,1,1,0],
               [1,0,0,0,0,1,0,1],
               [1,1,1,1,1,1,1,0]]
Output: 2
Explanation: There are two closed islands (the two groups of 0s not touching the border).
```

**Example 2:**
```
Input: grid = [[0,0,1,0,0],
               [0,1,0,1,0],
               [0,1,1,1,0]]
Output: 1
Explanation: The single 0 in the middle is a closed island.
```

---

## Approach

Use a two‑pass depth‑first search (DFS) flood‑fill.
1. **First pass:** Flood‑fill all `0`s that are connected to the border and mark them as visited. These cannot be closed islands.
2. **Second pass:** Iterate over the interior cells; whenever an unvisited `0` is found, perform DFS to mark the whole component and increment the count.

```text
FUNCTION closedIsland(grid):
    // Flood fill border‑connected zeros first
    FOR each cell (r, c) on the border:
        IF grid[r][c] == 0:
            dfs(grid, r, c)    // mark as visited

    count ← 0
    // Count remaining interior islands
    FOR r FROM 1 TO rows-2:
        FOR c FROM 1 TO cols-2:
            IF grid[r][c] == 0:
                dfs(grid, r, c)
                count ← count + 1
    RETURN count
```

---

## Walkthrough

Consider **Example 1**.
| Step | Action | Grid State (excerpt) |
|------|--------|----------------------|
| 1 | Flood‑fill border zeros (top‑right corner) | Border zeros become visited (marked as `2`). |
| 2 | Continue flood‑fill on left border zeros | All border‑connected zeros are marked. |
| 3 | Scan interior: first unvisited `0` at (1,1) → start DFS, marks its component. | First closed island counted. |
| 4 | Continue scanning, find another unvisited `0` at (3,4) → DFS, marks second component. | Second closed island counted. |
| 5 | No more unvisited zeros. Return count = 2. |

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m · n) – each cell visited at most twice |
| **Space** | O(m · n) – recursion stack in worst case |

---

## Follow-Up Questions

1. How would you modify the algorithm to return the coordinates of each closed island?
2. Can you solve the problem using Union‑Find instead of DFS?
3. What changes are needed if the grid is extremely large and cannot fit into memory?

---

## Key Takeaway

> **Eliminate border‑connected components first.** Two‑pass DFS: first remove border islands, then count interior components. Same pattern as "Number of Enclaves".
