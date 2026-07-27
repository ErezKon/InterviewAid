
# 200. Number of Islands

**Difficulty:** 🟡 Medium
**Acceptance:** 64.4%
**LeetCode:** [https://leetcode.com/problems/number-of-islands](https://leetcode.com/problems/number-of-islands)
**Companies:** Accenture, Adobe, Amazon, Amd, Anduril, Aon, Apple, Autodesk, Barclays, Bitgo, Blackrock, Bloomberg, Bytedance, Capital One, Cisco, Citadel, Cloudflare, Comcast, Coupang, Crowdstrike, De Shaw, Docusign, Doordash, Ebay, Expedia, Flipkart, Goldman Sachs, Google, Grammarly, Hashedin, Hive, Huawei, Ibm, Infosys, Intel, Kickdrum, Linkedin, Lucid, Meesho, Meta, Microsoft, Moloco, Nutanix, Nvidia, Okta, Okx, Oracle, Paypal, Phonepe, Pinterest, Qualcomm, Redfin, Rivian, Salesforce, Samsung, Sap, Servicenow, Siemens, Snapchat, Sofi, Splunk, Squarepoint Capital, Tcs, Tesla, Tiktok, Tinkoff, Turing, Two Sigma, Uber, Visa, Walmart Labs, Waymo, Wells Fargo, Whatnot, Wix, Yahoo, Yandex, Zenefits, Zepto, Zoho, Zomato

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: DFS — O(m × n) ✅](#3-approach-1-dfs--om--n-)
4. [Approach 2: BFS — O(m × n)](#4-approach-2-bfs--om--n)
5. [Approach 3: Union-Find — O(m × n)](#5-approach-3-union-find--om--n)
6. [Walkthrough (DFS)](#6-walkthrough-dfs)
7. [Complexity Analysis](#7-complexity-analysis)
8. [Follow-Up Questions](#8-follow-up-questions)

---

## 1. Problem Description

Given an `m × n` 2D grid of `'1'`s (land) and `'0'`s (water), return the **number of islands**.

An **island** is surrounded by water and is formed by connecting adjacent lands **horizontally or vertically** (not diagonally).

---

## 2. Examples

```
Example 1:
  Input:
    1 1 1 1 0
    1 1 0 1 0
    1 1 0 0 0
    0 0 0 0 0
  Output: 1

Example 2:
  Input:
    1 1 0 0 0
    1 1 0 0 0
    0 0 1 0 0
    0 0 0 1 1
  Output: 3
```

---

## 3. Approach 1: DFS — O(m × n) ✅

Scan the grid. When you find a `'1'`, increment the island count and **flood-fill** (sink) the entire island by marking all connected `'1'`s as `'0'`.

```
FUNCTION numIslands(grid):
    count = 0

    FOR r ← 0 TO rows - 1:
        FOR c ← 0 TO cols - 1:
            IF grid[r][c] == '1':
                count += 1
                dfs(grid, r, c)

    RETURN count


FUNCTION dfs(grid, r, c):

    // Boundary and water check
    IF r < 0 OR r >= rows OR c < 0 OR c >= cols:
        RETURN
    IF grid[r][c] == '0':
        RETURN

    grid[r][c] = '0'          // mark as visited (sink the land)

    dfs(grid, r - 1, c)       // up
    dfs(grid, r + 1, c)       // down
    dfs(grid, r, c - 1)       // left
    dfs(grid, r, c + 1)       // right
```

---

## 4. Approach 2: BFS — O(m × n)

Same idea, but use a queue instead of recursion (avoids stack overflow on large grids).

```
FUNCTION numIslandsBFS(grid):
    count = 0

    FOR r ← 0 TO rows - 1:
        FOR c ← 0 TO cols - 1:
            IF grid[r][c] == '1':
                count += 1
                bfs(grid, r, c)

    RETURN count


FUNCTION bfs(grid, r, c):
    queue = [(r, c)]
    grid[r][c] = '0'

    WHILE queue IS NOT EMPTY:
        (row, col) = queue.DEQUEUE()

        FOR each (dr, dc) IN [(-1,0), (1,0), (0,-1), (0,1)]:
            nr = row + dr
            nc = col + dc

            IF 0 <= nr < rows AND 0 <= nc < cols AND grid[nr][nc] == '1':
                grid[nr][nc] = '0'
                queue.ENQUEUE((nr, nc))
```

---

## 5. Approach 3: Union-Find — O(m × n)

Treat each `'1'` cell as a node. Union adjacent land cells. The number of islands equals the number of distinct components.

```
FUNCTION numIslandsUF(grid):
    uf = UnionFind(rows * cols)
    count = 0

    FOR r ← 0 TO rows - 1:
        FOR c ← 0 TO cols - 1:
            IF grid[r][c] == '1':
                count += 1
                id = r * cols + c

                // Union with right and down neighbors
                IF c + 1 < cols AND grid[r][c+1] == '1':
                    IF uf.union(id, r * cols + c + 1):
                        count -= 1

                IF r + 1 < rows AND grid[r+1][c] == '1':
                    IF uf.union(id, (r+1) * cols + c):
                        count -= 1

    RETURN count
```

Union-Find is especially useful for the **streaming** variant (see follow-ups).

---

## 6. Walkthrough (DFS)

```
Grid:
  1 1 0 0 0
  1 1 0 0 0
  0 0 1 0 0
  0 0 0 1 1

Scan (0,0): grid[0][0]='1' → count=1, DFS sinks all connected:
  0 0 0 0 0
  0 0 0 0 0
  0 0 1 0 0
  0 0 0 1 1

Scan (2,2): grid[2][2]='1' → count=2, DFS sinks:
  0 0 0 0 0
  0 0 0 0 0
  0 0 0 0 0
  0 0 0 1 1

Scan (3,3): grid[3][3]='1' → count=3, DFS sinks (3,3) and (3,4):
  0 0 0 0 0
  0 0 0 0 0
  0 0 0 0 0
  0 0 0 0 0

Result: 3 ✅
```

---

## 7. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| **DFS** | **O(m × n)** | O(m × n) worst-case recursion stack |
| **BFS** | **O(m × n)** | O(min(m, n)) queue size |
| **Union-Find** | **O(m × n · α)** | O(m × n) — nearly O(m × n) |

Where α is the inverse Ackermann function (practically constant).

---

## 8. Follow-Up Questions

### 8.1 Number of Islands II (LeetCode #305) — Streaming

Positions are added one at a time. After each addition, return the number of islands.

**Union-Find** is ideal here — each addition is O(α) amortized.

```
FUNCTION numIslandsII(m, n, positions):
    uf = UnionFind(m * n)
    isLand = SET()
    count = 0
    results = []

    FOR each (r, c) IN positions:
        IF (r, c) IN isLand:
            results.ADD(count)
            CONTINUE

        isLand.ADD((r, c))
        count += 1
        id = r * n + c

        FOR each (dr, dc) IN [(-1,0), (1,0), (0,-1), (0,1)]:
            nr = r + dr
            nc = c + dc
            IF (nr, nc) IN isLand:
                IF uf.union(id, nr * n + nc):
                    count -= 1

        results.ADD(count)

    RETURN results
```

### 8.2 Max Area of Island (LeetCode #695)

Instead of counting islands, find the **largest** one. Modify DFS to return the area:

```
FUNCTION maxAreaOfIsland(grid):
    maxArea = 0

    FOR r ← 0 TO rows - 1:
        FOR c ← 0 TO cols - 1:
            IF grid[r][c] == '1':
                area = dfsArea(grid, r, c)
                maxArea = MAX(maxArea, area)

    RETURN maxArea

FUNCTION dfsArea(grid, r, c):
    IF out of bounds OR grid[r][c] == '0':
        RETURN 0

    grid[r][c] = '0'
    RETURN 1 + dfsArea(r-1,c) + dfsArea(r+1,c) + dfsArea(r,c-1) + dfsArea(r,c+1)
```

### 8.3 Surrounded Regions (LeetCode #130)

Capture all `O` regions that are **not** connected to the border. DFS from all border `O`s first to mark them safe, then flip the rest.

### 8.4 Number of Distinct Islands (LeetCode #694)

Count islands with **distinct shapes**. Normalize each island's shape by recording relative coordinates during DFS and use it as a hash key.

---

## Grid/Island Problem Family

| Problem | Key Variation | Technique |
|---------|--------------|-----------|
| **Number of Islands** | Count components | DFS/BFS flood fill |
| **Islands II** (Streaming) | Dynamic additions | Union-Find |
| **Max Area** | Largest component | DFS with area counting |
| **Surrounded Regions** | Border connectivity | DFS from borders |
| **Distinct Islands** | Unique shapes | DFS + shape hashing |
| **Number of Closed Islands** | Not touching border | DFS + border check |

---

## Key Takeaway

> Grid traversal problems are **graph problems in disguise** — each cell is a node, edges connect adjacent cells. DFS flood fill is the go-to technique for connected component problems on grids. For dynamic/streaming versions, Union-Find is the right choice.
