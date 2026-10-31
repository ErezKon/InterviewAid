# 1301. Number of Paths with Max Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-paths-with-max-score](https://leetcode.com/problems/number-of-paths-with-max-score)
**Companies:** Amazon, Samsung

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(m·n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a square `board` of characters. You can move on the board starting at the bottom right square marked with the character `'S'`.

You need to reach the top left square marked with the character `'E'`. The rest of the squares are labeled either with a numeric character `1, 2, ..., 9` or with an obstacle `'X'`. In one move you can go up, left or up-left (diagonally) only if there is no obstacle there.

Return a list of two integers: the first integer is the maximum sum of numeric characters you can collect, and the second is the number of such paths that you can take to get that maximum sum, **taken modulo `10^9 + 7`**.

In case there is no path, return `[0, 0]`.

**Constraints:**
- `2 <= board.length == board[i].length <= 100`

---

## 2. Key Insight

> Use dynamic programming from the destination to the source, storing at each cell both the best score achievable from that cell to the end and the count of paths that achieve that score. When a neighbor offers a higher score, reset the path count; when equal, accumulate counts.

---

## 3. Approach: DP — O(m·n) ✅

```text
FUNCTION pathsWithMaxScore(board):
    SET MOD ← 10^9 + 7
    SET n ← LENGTH(board)
    CREATE score[n][n] INITIALIZED TO -1
    CREATE paths[n][n] INITIALIZED TO 0
    SET score[n-1][n-1] ← 0
    SET paths[n-1][n-1] ← 1

    FOR r ← n-1 DOWNTO 0:
        FOR c ← n-1 DOWNTO 0:
            IF board[r][c] == 'X' OR paths[r][c] == 0: CONTINUE
            FOR (nr, nc) IN [(r-1,c), (r,c-1), (r-1,c-1)]:
                IF nr ≥ 0 AND nc ≥ 0:
                    SET val ← score[r][c] + DIGIT(board[nr][nc])
                    IF val > score[nr][nc]:
                        SET score[nr][nc] ← val
                        SET paths[nr][nc] ← paths[r][c]
                    ELSE IF val == score[nr][nc]:
                        SET paths[nr][nc] ← (paths[nr][nc] + paths[r][c]) MOD MOD

    IF score[0][0] < 0: RETURN [0, 0]
    RETURN [score[0][0], paths[0][0] MOD MOD]
```

---

## 4. Examples

**Example 1:**
```
Input: board = ["E23","2X2","12S"]
Output: [7,1]
```

**Example 2:**
```
Input: board = ["E12","1X1","21S"]
Output: [4,2]
```

**Example 3:**
```
Input: board = ["E11","XXX","11S"]
Output: [0,0]
```

---

## 5. Walkthrough

Consider Example 1 (3×3 board). The DP starts at cell (2,2) `'S'` with score 0, paths 1. Processing cells backwards, the algorithm computes scores for each reachable cell, updating both score and path count. When reaching the start cell (0,0) `'E'`, the stored score is 4 and paths count is 2.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m·n) where m=n is board dimension |
| **Space** | O(m·n) for score and paths tables |

---

## 7. Key Takeaway

> **Dual DP storing best score and number of optimal paths** enables solving the problem in a single pass from destination to source.
