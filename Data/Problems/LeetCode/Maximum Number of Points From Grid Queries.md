# 2503. Maximum Number of Points From Grid Queries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-points-from-grid-queries](https://leetcode.com/problems/maximum-number-of-points-from-grid-queries)
**Companies:** Amazon, Bloomberg, Google, Jpmorgan, Meta, Uber

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an `m x n` integer matrix `grid` and an array `queries` of size `k`.

Find an array `answer` of size `k` such that for each integer `queries[i]` you start in the **top left** cell of the matrix and repeat the following process:

- If `queries[i]` is **strictly** greater than the value of the current cell that you are in, then you get one point if it is your first time visiting this cell, and you can move to any **adjacent** cell in all `4` directions: up, down, left, and right.
- Otherwise, you do not get any points, and you end this process.

After the process, `answer[i]` is the **maximum** number of points you can get. **Note** that for each query you are allowed to visit the same cell **multiple** times.

Return *the resulting array* `answer`.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `2 <= m, n <= 1000`
- `4 <= m * n <= 10^5`
- `k == queries.length`
- `1 <= k <= 10^4`
- `1 <= grid[i][j], queries[i] <= 10^6`

---

## Examples

```
Example 1:
  Input: grid = [[1,2,3],[2,5,7],[3,5,1]], queries = [5,6,2]
  Output: [5,8,1]
  Explanation: The official diagrams show which cells we visit to get points for each query
    (query 5 -> cells with values 1,2,3,2,3 reachable = 5 points;
     query 6 -> all cells except 7 = 8 points; query 2 -> only the top-left cell = 1 point)
```

```
Example 2:
  Input: grid = [[5,2,1],[1,1,2]], queries = [3]
  Output: [0]
  Explanation: We can not get any points because the value of the top left cell is already greater than or equal to 3.
```

---

## Key Insight

> Sort queries in increasing order. Use a **min-heap BFS** from `(0,0)` — expand cells with value < current query. Since queries are sorted, the BFS state carries over between queries (we never need to restart).

---

## Approach: Sort Queries + BFS/Min-Heap — O(mn log(mn) + q log q) ✅

```
FUNCTION maxPoints(grid, queries)
    sortedQ ← sorted (query, originalIndex) pairs
    result ← array of len(queries) zeros

    heap ← MinHeap containing (grid[0][0], 0, 0)
    visited ← set
    count ← 0

    FOR each (q, idx) IN sortedQ DO
        WHILE heap NOT EMPTY AND heap.TOP().value < q DO
            (val, r, c) ← heap.POP()
            IF (r, c) IN visited THEN CONTINUE
            visited.ADD((r, c))
            count ← count + 1
            FOR each (nr, nc) IN neighbors DO
                IF valid AND (nr, nc) NOT IN visited THEN
                    heap.PUSH((grid[nr][nc], nr, nc))
        result[idx] ← count

    RETURN result
END FUNCTION
```

---

## Walkthrough

```
grid = [[1,2,3],[2,5,7],[3,5,1]], queries = [5,6,2]
Sorted queries: [(2,2), (5,0), (6,1)]
```

- q=2: expand cells < 2 from (0,0). Only (0,0)=1 < 2. Count = 1. result[2]=1
- q=5: continue expanding < 5. Cells (0,1)=2, (1,0)=2, (0,2)=3, (2,0)=3 all < 5. Count = 5. result[0]=5
- q=6: expand < 6. Cells (1,1)=5, (2,2)=1 < 6. Count = 5+3=8? Actually (1,1)=5<6 and (2,2)=1<6. result[1]=8

**Result: [5,8,1]** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(mn log(mn) + q log q)** — BFS with heap + sort queries |
| Space  | **O(mn)** — visited set + heap |

---

## Follow-Up Questions

1. **Why sort queries?**
   Processing queries in order lets us reuse BFS state — each query just extends the previous exploration.

2. **Could we use Union-Find instead?**
   Yes — sort all cells by value, union adjacent cells as threshold increases. Also efficient.

3. **What if the start wasn't (0,0)?**
   Same approach but start the BFS from the given cell.

---

## Key Takeaway

> **Offline query processing** — sort queries and carry BFS state forward. The min-heap naturally expands to cells below the current threshold, avoiding redundant work.
