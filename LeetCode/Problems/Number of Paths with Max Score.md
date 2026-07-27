# 1301. Number of Paths with Max Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-paths-with-max-score](https://leetcode.com/problems/number-of-paths-with-max-score)
**Companies:** Amazon, Samsung

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(m·n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Navigate from bottom-right to top-left of a grid collecting max score. Return `[maxScore, numberOfPaths]` mod 10⁹+7. Can only move left, up, or diagonally up-left. Cells may be obstacles.

---

## 2. Key Insight

> DP from bottom-right to top-left. Track both max score and path count at each cell. When a neighbor offers a higher score, reset count. When equal, add to count.

---

## 3. Approach: DP — O(m·n) ✅

```
FUNCTION pathsWithMaxScore(board):
    MOD = 10^9 + 7
    n = len(board)
    score = [[-1]*n for _ in range(n)]
    paths = [[0]*n for _ in range(n)]
    score[n-1][n-1] = 0; paths[n-1][n-1] = 1

    FOR r ← n-1 DOWNTO 0:
        FOR c ← n-1 DOWNTO 0:
            IF board[r][c] == 'X' OR paths[r][c] == 0: CONTINUE
            FOR (nr, nc) IN [(r-1,c), (r,c-1), (r-1,c-1)]:
                IF nr >= 0 AND nc >= 0:
                    val = score[r][c] + digit(board[nr][nc])
                    IF val > score[nr][nc]:
                        score[nr][nc] = val
                        paths[nr][nc] = paths[r][c]
                    ELIF val == score[nr][nc]:
                        paths[nr][nc] = (paths[nr][nc] + paths[r][c]) % MOD

    RETURN [score[0][0], paths[0][0]] if score[0][0] >= 0 else [0, 0]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m · n) |
| **Space** | O(m · n) |

---

## 5. Key Takeaway

> **Dual DP: max score + path count.** Same pattern as "Number of LIS" — reset count on new max, accumulate on tie. Process from destination to source.
