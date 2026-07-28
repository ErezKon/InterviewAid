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

Given an `m × n` grid and a list of coordinates of black cells, count how many 2×2 sub‑grids contain exactly `0`, `1`, `2`, `3`, or `4` black cells.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `m = 3, n = 3, coordinates = [[0,0],[0,1],[1,0]]` | `[0,0,2,1,0]` | Two blocks have one black cell, one block has two black cells, the rest have none. |
| `m = 2, n = 2, coordinates = []` | `[1,0,0,0,0]` | The single 2×2 block contains no black cells. |

---

## 3. Approach

**Key Insight** – Each black cell influences at most four 2×2 blocks (those whose top‑left corner is at `(r, c)`, `(r‑1, c)`, `(r, c‑1)`, or `(r‑1, c‑1)`). By counting contributions per block we avoid scanning every possible block.

**Algorithm** – Use a hash map where the key is the top‑left coordinate of a block and the value is the number of black cells inside it. Iterate over all black cells, update up to four neighboring blocks, then build a histogram of counts `0…4`.

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

| Step | Black Cell | Affected Blocks (top‑left) | Block Counts after update |
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
