# 353. Design Snake Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-snake-game](https://leetcode.com/problems/design-snake-game)
**Companies:** Amazon, Amplitude, Atlassian, Bloomberg, Google, Ixl, Microsoft, Salesforce, Uber, Weride

---

## Problem Description

Design the classic snake game on an `h × w` grid. The snake starts at `(0,0)`, moves in directions, eats food to grow, and dies if it hits a wall or itself.

---

## Examples

**Example 1:**
```
SnakeGame snake = new SnakeGame(3, 2, [[1,2],[0,1]])
snake.move("R") → 0   // moves to (0,1)
snake.move("D") → 0   // moves to (1,1)
snake.move("R") → 1   // eats food at (1,2), length becomes 2
snake.move("U") → 1   // moves to (0,2)
snake.move("L") → 2   // eats second food at (0,1), length becomes 3
snake.move("U") → -1  // hits wall, game over
```
*Explanation:* The snake grows when it reaches a food cell; otherwise its tail moves forward. Hitting a wall returns `-1`.

**Example 2:**
```
SnakeGame snake = new SnakeGame(2, 2, [])
snake.move("R") → 0
snake.move("D") → 0
snake.move("L") → 0
snake.move("U") → -1   // collides with its own body
```
*Explanation:* After moving in a square, the snake's head meets its body, causing game over.

---

## Approach: Deque + Set — O(1) per move ✅

```text
CLASS SnakeGame:
    CONSTRUCTOR(width, height, food):
        snake ← DEQUE()               // head at front, tail at back
        snake.PUSH_FRONT((0, 0))
        bodySet ← SET()               // positions occupied by the snake
        bodySet.ADD((0, 0))
        foodList ← food               // list of [row, col]
        foodIdx ← 0
        self.width ← width
        self.height ← height

    FUNCTION move(direction):
        head ← snake.FRONT()
        (dr, dc) ← DIRECTION_OFFSET(direction)
        nr ← head.row + dr
        nc ← head.col + dc
        // Wall collision
        IF nr < 0 OR nr >= self.height OR nc < 0 OR nc >= self.width:
            RETURN -1
        // Food check
        IF foodIdx < LENGTH(foodList) AND [nr, nc] == foodList[foodIdx]:
            foodIdx ← foodIdx + 1          // grow: do NOT remove tail
        ELSE:
            tail ← snake.POP_BACK()
            bodySet.REMOVE(tail)
        // Self‑collision (after tail removal, tail cell is free)
        IF (nr, nc) IN bodySet:
            RETURN -1
        snake.PUSH_FRONT((nr, nc))
        bodySet.ADD((nr, nc))
        RETURN LENGTH(snake) - 1          // score = length - 1
```

---

## Walkthrough

| Step | Direction | New Head | Tail Action | Body Set after move | Return |
|------|-----------|----------|------------|---------------------|--------|
| 1 | R | (0,1) | pop (0,0) | {(0,1)} | 0 |
| 2 | D | (1,1) | pop (0,1) | {(1,1)} | 0 |
| 3 | R (food) | (1,2) | **no pop** (grow) | {(1,1),(1,2)} | 1 |
| 4 | U | (0,2) | pop (1,1) | {(1,2),(0,2)} | 1 |
| 5 | L (food) | (0,1) | **no pop** (grow) | {(0,2),(0,1),(1,2)} | 2 |
| 6 | U | (-1,1) | — | — | -1 (wall) |

The table shows how the deque and set are updated each move, handling growth and collisions.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** per `move` | O(1) — all operations on deque and set are constant time |
| **Space** | O(h·w) for the set of occupied cells plus O(k) for the food list, where k is number of food items |

---

## Follow-Up Questions

1. How would you adapt the design to support variable‑speed snakes or obstacles on the board?
2. Can you extend the solution to return the full path of the snake for debugging purposes?
3. What changes are needed to make the game thread‑safe for a multiplayer version?

---

## Key Takeaway

> **Deque for the snake body (head at front, tail at back) + set for O(1) self‑collision checks. On food: don't pop tail (grow). On move: pop tail first, then check collision (tail cell is now free).**