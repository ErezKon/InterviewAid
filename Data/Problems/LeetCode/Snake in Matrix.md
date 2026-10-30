# 3248. Snake in Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/snake-in-matrix](https://leetcode.com/problems/snake-in-matrix)
**Companies:** Google

---

## Problem Description

There is a snake in an `n x n` matrix `grid` and can move in **four possible directions**. Each cell in the `grid` is identified by the position: `grid[i][j] = (i * n) + j`.

The snake starts at cell 0 and follows a sequence of commands.

You are given an integer `n` representing the size of the `grid` and an array of strings `commands` where each `command[i]` is either `"UP"`, `"RIGHT"`, `"DOWN"`, and `"LEFT"`. It's guaranteed that the snake will remain within the `grid` boundaries throughout its movement.

Return the position of the final cell where the snake ends up after executing `commands`.

**Constraints:**
- `2 <= n <= 10`
- `1 <= commands.length <= 100`
- `commands` consists only of `"UP"`, `"RIGHT"`, `"DOWN"`, and `"LEFT"`.
- The input is generated such the snake will not move outside of the boundaries.

### Examples

```
Example 1:
  Input: n = 2, commands = ["RIGHT","DOWN"]
  Output: 3
  Explanation: Grid:
    0 1
    2 3
    0 -> RIGHT -> 1 -> DOWN -> 3
```

```
Example 2:
  Input: n = 3, commands = ["DOWN","RIGHT","UP"]
  Output: 1
  Explanation: Grid:
    0 1 2
    3 4 5
    6 7 8
    0 -> DOWN -> 3 -> RIGHT -> 4 -> UP -> 1
```

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
