# 289. Game of Life

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/game-of-life](https://leetcode.com/problems/game-of-life)
**Companies:** Acorns, Adobe, Amazon, Anduril, Applied Intuition, Bloomberg, Dropbox, Goldman Sachs, Google, Meta, Microsoft, Riot Games, Salesforce, Snapchat, Two Sigma, Warnermedia

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: In-Place with State Encoding — O(m·n) ✅](#3-approach-in-place-with-state-encoding--omn-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Implement Conway's Game of Life in-place. Each cell lives/dies based on the count of its 8 neighbors. Update all cells simultaneously.

---

## 2. Key Insight

> Use 2 bits to encode both current and next states: bit 0 = current, bit 1 = next. This allows simultaneous update in one pass without extra space.

---

## 3. Approach: In-Place with State Encoding — O(m·n) ✅

```
FUNCTION gameOfLife(board):
    // States: 0=dead→dead, 1=live→dead, 2=dead→live, 3=live→live

    FOR r, c in all cells:
        liveNeighbors = count neighbors where val & 1 == 1

        IF board[r][c] == 1:    // currently alive
            IF liveNeighbors == 2 OR liveNeighbors == 3:
                board[r][c] = 3    // stays alive
        ELSE:                    // currently dead
            IF liveNeighbors == 3:
                board[r][c] = 2    // becomes alive

    // Extract new state
    FOR r, c in all cells:
        board[r][c] >>= 1
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m · n) |
| **Space** | O(1) — in-place |

---

## 5. Key Takeaway

> **Bit encoding** `(current | next << 1)` enables in-place simultaneous update. Read current with `& 1`, extract next with `>> 1`.
