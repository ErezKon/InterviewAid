# 353. Design Snake Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-snake-game](https://leetcode.com/problems/design-snake-game)
**Companies:** Amazon, Amplitude, Atlassian, Bloomberg, Google, Ixl, Microsoft, Salesforce, Uber, Weride

---

## Problem Description

Design the classic snake game on an `h × w` grid. The snake starts at `(0,0)`, moves in directions, eats food to grow, and dies if it hits a wall or itself.

---

## Approach: Deque + Set — O(1) per move ✅

```
CLASS SnakeGame:
    CONSTRUCTOR(width, height, food):
        snake = deque([(0, 0)])
        body = {(0, 0)}
        foodIdx = 0
        self.food = food
        self.width = width
        self.height = height

    FUNCTION move(direction):
        head = snake.FRONT()
        nr, nc = head + direction offset

        // Check wall collision
        IF nr < 0 OR nr >= height OR nc < 0 OR nc >= width:
            RETURN -1

        // Check food
        IF foodIdx < len(food) AND [nr, nc] == food[foodIdx]:
            foodIdx += 1
        ELSE:
            tail = snake.POP_BACK()
            body.REMOVE(tail)

        // Check self collision (after removing tail)
        IF (nr, nc) IN body: RETURN -1

        snake.PUSH_FRONT((nr, nc))
        body.ADD((nr, nc))
        RETURN len(snake) - 1
```

---

## Key Takeaway

> **Deque for the snake body (head at front, tail at back) + set for O(1) self-collision checks. On food: don't pop tail (grow). On move: pop tail first, then check collision (tail cell is now free).**
