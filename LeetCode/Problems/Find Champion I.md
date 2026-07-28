# 2923. Find Champion I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-champion-i](https://leetcode.com/problems/find-champion-i)
**Companies:** Google

---

## Problem Description

Given a tournament matrix `grid` where `grid[i][j] = 1` means team `i` is stronger than `j`, find the champion (team that beats all others).

---

## Examples

**Example 1:**
```
Input: grid = [[0,1,1],[0,0,1],[0,0,0]]
Output: 0
Explanation: Team 0 beats both team 1 and team 2, so it is the champion.
```

**Example 2:**
```
Input: grid = [[0,0,1],[1,0,0],[0,1,0]]
Output: -1
Explanation: No team beats all others, so there is no champion.
```

---

## Approach: Row Sum Check — O(n²) ✅

```text
FUNCTION findChampion(grid):
    SET n ← LENGTH(grid)
    FOR i ← 0 TO n - 1:
        SET winCount ← SUM(grid[i])
        IF winCount == n - 1:
            RETURN i
    RETURN -1
```

---

## Walkthrough

Consider the first example `grid = [[0,1,1],[0,0,1],[0,0,0]]`.
| Team | Row Sum |
|------|---------|
| 0    | 2 (beats 1 & 2) |
| 1    | 1 (beats 2) |
| 2    | 0 |
The algorithm scans each row; when `i = 0`, `winCount = 2` which equals `n-1 = 2`, so it returns `0` as the champion.

---

## Complexity Analysis

- **Time:** O(n²) – we examine each entry of the n×n matrix.
- **Space:** O(1) – only a few scalar variables are used.

---

## Follow-Up Questions

1. How would you modify the solution to return all teams that win against at least half of the other teams?
2. Can you design an algorithm that works when the input is given as a list of match results instead of a matrix?
3. What if the tournament matrix is sparse? How would you exploit that to improve runtime?

---

## Key Takeaway

> **The champion has `n-1` wins (row sum = n-1). Simple scan of the adjacency matrix.**