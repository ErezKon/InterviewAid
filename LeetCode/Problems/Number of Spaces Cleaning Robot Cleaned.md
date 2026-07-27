# 2061. Number of Spaces Cleaning Robot Cleaned

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-spaces-cleaning-robot-cleaned](https://leetcode.com/problems/number-of-spaces-cleaning-robot-cleaned)
**Companies:** Geico, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Simulation — O(m·n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

A robot starts at (0,0) facing right. It moves forward if possible, else turns right. Count unique cells cleaned before revisiting a cell in the same direction.

---

## 2. Approach: Simulation — O(m·n) ✅

```
FUNCTION numberOfCleanedSpaces(room):
    dirs = [(0,1),(1,0),(0,-1),(-1,0)]
    visited = set()
    r, c, d = 0, 0, 0
    cleaned = set()

    WHILE (r, c, d) NOT IN visited:
        visited.ADD((r, c, d))
        cleaned.ADD((r, c))
        nr, nc = r + dirs[d][0], c + dirs[d][1]
        IF in bounds AND room[nr][nc] == 0:
            r, c = nr, nc
        ELSE:
            d = (d + 1) % 4

    RETURN len(cleaned)
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m · n · 4) — at most 4 directions per cell |
| **Space** | O(m · n) |

---

## 4. Key Takeaway

> **Simulate with state = (row, col, direction).** Cycle detection: stop when same (r, c, d) is revisited. Count unique (r, c) positions.
