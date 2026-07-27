# 3248. Snake in Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/snake-in-matrix](https://leetcode.com/problems/snake-in-matrix)
**Companies:** Google

---

## Problem Description

A snake starts at cell `(0,0)` in an `n x n` grid. Given a list of commands ("UP", "DOWN", "LEFT", "RIGHT"), return the final cell value where cell `(r,c)` has value `r * n + c`.

### Examples

- **Input:** `n = 2, commands = ["RIGHT","DOWN"]` → **Output:** `3` (position (1,1) = 1*2+1)
- **Input:** `n = 3, commands = ["DOWN","RIGHT","UP"]` → **Output:** `1`

## Approach: Simulation — O(m) ✅

```
FUNCTION finalPositionOfSnake(n, commands):
    r, c = 0, 0
    FOR cmd IN commands:
        IF cmd == "UP": r -= 1
        ELSE IF cmd == "DOWN": r += 1
        ELSE IF cmd == "LEFT": c -= 1
        ELSE IF cmd == "RIGHT": c += 1
    RETURN r * n + c
```

### Complexity

| | |
|---|---|
| **Time** | O(m) — m = number of commands |
| **Space** | O(1) |
