# 174. Dungeon Game

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/dungeon-game](https://leetcode.com/problems/dungeon-game)
**Companies:** Amazon, Bloomberg, Flipkart, Google, Meta, Microsoft, Uber, Zoho

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Reverse DP](#approach-reverse-dp--omn-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

A knight starts at top-left of an `m × n` grid and must reach the bottom-right (princess). Each cell has a value: positive (health boost) or negative (damage). The knight must have `≥ 1` HP at **every** cell. Find the **minimum initial HP** to survive the journey, moving only **right or down**.

**Constraints:**
- `1 <= m, n <= 200`
- `-1000 <= dungeon[i][j] <= 1000`

---

## Examples

```
Input: dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]
Output: 7
Explanation: Path -2 → -3 → 3 → 1 → -5 needs 7 initial HP.
  HP: 7→5→2→5→6→1 (always ≥ 1) ✅
```

---

## Key Insight

> **Forward DP doesn't work** because the optimal path depends on future cells (you might take more damage now to get a big heal later). **Reverse DP** from the princess back to the knight solves this: `dp[i][j]` = minimum HP needed **when entering** cell `(i,j)` to guarantee survival all the way to the end.

---

## Approach: Reverse DP — O(m·n) ✅

```
FUNCTION calculateMinimumHP(dungeon):
    m, n = dimensions
    dp = m × n matrix

    dp[m-1][n-1] = MAX(1, 1 - dungeon[m-1][n-1])

    // Fill last row
    FOR j ← n - 2 DOWN TO 0:
        dp[m-1][j] = MAX(1, dp[m-1][j+1] - dungeon[m-1][j])

    // Fill last column
    FOR i ← m - 2 DOWN TO 0:
        dp[i][n-1] = MAX(1, dp[i+1][n-1] - dungeon[i][n-1])

    // Fill rest
    FOR i ← m - 2 DOWN TO 0:
        FOR j ← n - 2 DOWN TO 0:
            dp[i][j] = MAX(1, MIN(dp[i+1][j], dp[i][j+1]) - dungeon[i][j])

    RETURN dp[0][0]
```

**Formula:** `dp[i][j] = max(1, min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j])`
- Take the cheaper next cell (min of down/right)
- Subtract current cell's effect
- Ensure at least 1 HP

---

## Walkthrough

```
dungeon:        dp (reverse fill):
 -2  -3   3       7   5   2
 -5 -10   1       6  11   5
 10  30  -5       1   1   6

dp[2][2] = max(1, 1-(-5)) = 6
dp[2][1] = max(1, 1-30) = 1
dp[2][0] = max(1, 1-10) = 1
dp[1][2] = max(1, 6-1) = 5
dp[1][1] = max(1, min(1,5)-(-10)) = 11
dp[1][0] = max(1, min(11,5)-(-5)) = 6 (wait, min(11,5)=5+5=10→ actually max(1,5-(-5))=max(1,10)=10? Let me redo)

Redo carefully:
dp[1][0] = max(1, min(dp[2][0], dp[1][1]) - dungeon[1][0])
         = max(1, min(1, 11) - (-5)) = max(1, 1+5) = 6

dp[0][2] = max(1, dp[1][2] - 3) = max(1, 5-3) = 2
dp[0][1] = max(1, min(dp[1][1], dp[0][2]) - (-3)) = max(1, min(11,2)+3) = 5
dp[0][0] = max(1, min(dp[1][0], dp[0][1]) - (-2)) = max(1, min(6,5)+2) = 7

Answer: 7 ✅
```

---

## Complexity Analysis

| Aspect | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | O(m × n) | Fill each cell once |
| **Space** | O(m × n) | dp table (can reduce to O(n) with rolling row) |

---

## Follow-Up Questions

**Q1: Why doesn't forward DP work?**
> Forward DP would need to track both minimum HP along path AND current HP — two variables per state. You can't simply maximize current HP because a path through a healing zone might still require more initial HP.

**Q2: Can you reduce space to O(n)?**
> Yes — process row by row from bottom, keeping only the current and next row. Since we fill right-to-left, a single 1D array suffices.

**Q3: What if the knight could move in all 4 directions?**
> Problem becomes much harder — no longer has optimal substructure for simple DP. Would need BFS/Dijkstra on states `(row, col, hp)`.

---

## Key Takeaway

> **When the optimal choice depends on future outcomes, reverse DP (from destination to start) is the key technique. Classic example of why forward DP fails but backward DP works.**
