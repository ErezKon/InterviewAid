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

Given an `m × n` grid of positive integers and an array `queries`, for each `queries[k]` start at `(0,0)` and count how many cells you can visit where **all cells on the path from (0,0) have values strictly less than `queries[k]`**.

Return an array of answers.

**Constraints:**
- `m, n <= 1000`
- `queries.length <= 10^4`
- `1 <= grid[i][j], queries[k] <= 10^6`

---

## Examples

**Example 1:**
```
Input:  grid = [[1,2,3],[2,5,7],[3,5,1]], queries = [5,6,2]
Output: [5,8,1]
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
