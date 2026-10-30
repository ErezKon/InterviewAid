# 711. Number of Distinct Islands II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-distinct-islands-ii](https://leetcode.com/problems/number-of-distinct-islands-ii)
**Companies:** Amazon, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DFS + Canonical Form — O(m·n·k·log k)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

You are given an `m x n` binary matrix `grid`. An island is a group of `1`'s (representing land) connected **4-directionally** (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

An island is considered to be the same as another if they have the same shape, or have the same shape after **rotation** (90, 180, or 270 degrees only) or **reflection** (left/right direction or up/down direction).

Return *the number of **distinct** islands*.

**Constraints:**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`
- `grid[i][j]` is either `0` or `1`.

---

## 2. Key Insight

> For each island, generate all 8 transformations (4 rotations × 2 reflections). Normalize each: sort cells, translate to origin. The lexicographically smallest is the canonical form.

---

## 3. Approach: DFS + Canonical Form — O(m·n·k·log k) ✅

```
// DFS to find each island's cells
// Normalize: generate all 8 transformations (rotations + reflections)
// Sort cells, translate to origin, pick canonical form
// Count distinct canonical forms
```

---

## 4. Examples

```
Example 1:
  Input: grid = [[1,1,0,0,0],[1,0,0,0,0],[0,0,0,0,1],[0,0,0,1,1]]
  Output: 1
  Explanation: The two islands are considered the same because if we make a 180 degrees clockwise rotation on the first island, then two islands will have the same shapes.
```

```
Example 2:
  Input: grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]
  Output: 1
```

---

## 5. Walkthrough

| Step | Action |
|------|--------|
| 1 | Iterate over each cell; when a `1` is found, start DFS to collect all coordinates of that island.
| 2 | For the collected coordinates, generate the 8 possible transformations (rotate 0°,90°,180°,270° and reflect each).
| 3 | For each transformation, translate coordinates so the smallest x and y become 0 (normalization) and sort them.
| 4 | Choose the lexicographically smallest normalized list as the island's **canonical form**.
| 5 | Insert the canonical form into a hash set. The set size at the end is the number of distinct islands.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m·n·k·log k) where k = island size |
| **Space** | O(m·n) |

---

## 7. Key Takeaway

> **Canonical form under transformations.** Generate all 8 orientations, normalize each (sort + translate to origin), pick the smallest. Same technique used in polyomino classification.
