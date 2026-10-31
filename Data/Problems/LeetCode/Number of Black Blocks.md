# 2768. Number of Black Blocks

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-black-blocks](https://leetcode.com/problems/number-of-black-blocks)
**Companies:** Capital One, Google, Roblox, Sig, Square, Stripe, Twitter, Uber, Visa

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given two integers `m` and `n` representing the dimensions of a **0-indexed** `m x n` grid.

You are also given a **0-indexed** 2D integer matrix `coordinates`, where `coordinates[i] = [x, y]` indicates that the cell with coordinates `[x, y]` is colored **black**. All cells in the grid that do not appear in `coordinates` are **white**.

A block is defined as a `2 x 2` submatrix of the grid. More formally, a block with cell `[x, y]` as its top-left corner where `0 <= x < m - 1` and `0 <= y < n - 1` contains the coordinates `[x, y]`, `[x + 1, y]`, `[x, y + 1]`, and `[x + 1, y + 1]`.

Return *a **0-indexed** integer array* `arr` *of size* `5` *such that* `arr[i]` *is the number of blocks that contains exactly* `i` ***black** cells*.

**Constraints:**

- `2 <= m <= 10^5`
- `2 <= n <= 10^5`
- `0 <= coordinates.length <= 10^4`
- `coordinates[i].length == 2`
- `0 <= coordinates[i][0] < m`
- `0 <= coordinates[i][1] < n`
- It is guaranteed that `coordinates` contains pairwise distinct coordinates.

---

## 2. Examples

```
Example 1:
  Input: m = 3, n = 3, coordinates = [[0,0]]
  Output: [3,1,0,0,0]
  Explanation: The grid looks like this:
    B W W
    W W W
    W W W
  There is only 1 block with one black cell, and it is the block starting with cell [0,0].
  The other 3 blocks start with cells [0,1], [1,0] and [1,1]. They all have zero black cells.
  Thus, we return [3,1,0,0,0].
```

```
Example 2:
  Input: m = 3, n = 3, coordinates = [[0,0],[1,1],[0,2]]
  Output: [0,2,2,0,0]
  Explanation: The grid looks like this:
    B W B
    W B W
    W W W
  There are 2 blocks with two black cells (the ones starting with cell coordinates [0,0] and [0,1]).
  The other 2 blocks have starting cell coordinates of [1,0] and [1,1]. They both have 1 black cell.
  Therefore, we return [0,2,2,0,0].
```

---

## 3. Approach

**Key Insight** – Each black cell influences at most four 2×2 blocks (those whose top-left corner is at `(r, c)`, `(r-1, c)`, `(r, c-1)`, or `(r-1, c-1)`). By counting contributions per block we avoid scanning every possible block.

**Algorithm** – Use a hash map where the key is the top-left coordinate of a block and the value is the number of black cells inside it. Iterate over all black cells, update up to four neighboring blocks, then build a histogram of counts `0…4`.

```text
FUNCTION countBlackBlocks(m, n, coordinates):
    blockCount ← MAP()
    FOR each (r, c) IN coordinates:
        FOR dr IN [0, -1]:
            FOR dc IN [0, -1]:
                br ← r + dr
                bc ← c + dc
                IF 0 ≤ br < m-1 AND 0 ≤ bc < n-1:
                    blockCount[(br, bc)] ← blockCount.get((br, bc), 0) + 1
    result ← [0, 0, 0, 0, 0]
    FOR cnt IN blockCount.values():
        result[cnt] ← result[cnt] + 1
    totalBlocks ← (m-1) * (n-1)
    result[0] ← totalBlocks - SUM(result[1:])
    RETURN result
```

---

## 4. Walkthrough

Consider `m = 3, n = 3, coordinates = [[0,0],[0,1],[1,0]]`.

| Step | Black Cell | Affected Blocks (top-left) | Block Counts after update |
|------|------------|----------------------------|---------------------------|
| 1 | (0,0) | (0,0) | {(0,0):1} |
| 2 | (0,1) | (0,0), (0,1) | {(0,0):2, (0,1):1} |
| 3 | (1,0) | (0,0), (1,0) | {(0,0):3, (0,1):1, (1,0):1} |

Histogram: one block with 3 blacks, two blocks with 1 black, remaining blocks (total 4) have 0 blacks → `[0,0,2,1,0]`.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(k) – `k` is the number of black cells |
| **Space** | O(k) – hash map stores at most `4k` entries |

---

## 6. Follow-Up Questions

* How would the solution change if blocks of size `p × q` were required?
* Can the algorithm be adapted to count blocks with at least `t` black cells?
* What if the grid is sparse and stored in a compressed format?

---

## 7. Key Takeaway

> **Reverse mapping:** Instead of examining every possible 2×2 block, map each black cell to the blocks it influences. This yields an O(k) solution where `k` is the number of black cells.
