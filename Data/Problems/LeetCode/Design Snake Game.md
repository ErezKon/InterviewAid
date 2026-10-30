# 353. Design Snake Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-snake-game](https://leetcode.com/problems/design-snake-game)
**Companies:** Amazon, Amplitude, Atlassian, Bloomberg, Google, Ixl, Microsoft, Salesforce, Uber, Weride

---

## Problem Description

Design a Snake game that is played on a device with screen size `height x width`.

The snake is initially positioned at the top left corner `(0, 0)` with a length of `1` unit.

You are given an array `food` where `food[i] = (r_i, c_i)` is the row and column position of a piece of food that the snake can eat. When a snake eats a piece of food, its length and the game's score both increase by `1`.

Each piece of food appears one by one on the screen, meaning the second piece of food will not appear until the snake eats the first piece of food.

When a piece of food appears on the screen, it is **guaranteed** that it will not appear on a block occupied by the snake.

The game is over if the snake goes out of bounds (hits a wall) or if its head occupies a space that its body occupies **after** moving (i.e. a snake of length 4 cannot run into itself).

Implement the `SnakeGame` class:

- `SnakeGame(int width, int height, int[][] food)` Initializes the object with a screen of size `height x width` and the positions of the `food`.
- `int move(String direction)` Returns the score of the game after applying one `direction` move by the snake. If the game is over, return `-1`.

**Constraints:**
- `1 <= width, height <= 10^4`
- `1 <= food.length <= 50`
- `food[i].length == 2`
- `0 <= r_i < height`
- `0 <= c_i < width`
- `direction.length == 1`
- `direction` is `'U'`, `'D'`, `'L'`, or `'R'`.
- At most `10^4` calls will be made to `move`.

---

## Examples

```
Example 1:
  Input:
  ["SnakeGame", "move", "move", "move", "move", "move", "move"]
  [[3, 2, [[1, 2], [0, 1]]], ["R"], ["D"], ["R"], ["U"], ["L"], ["U"]]
  Output:
  [null, 0, 0, 1, 1, 2, -1]
  Explanation:
  SnakeGame snakeGame = new SnakeGame(3, 2, [[1, 2], [0, 1]]);
  snakeGame.move("R"); // return 0
  snakeGame.move("D"); // return 0
  snakeGame.move("R"); // return 1, snake eats the first piece of food. The second piece of food appears at (0, 1).
  snakeGame.move("U"); // return 1
  snakeGame.move("L"); // return 2, snake eats the second food. No more food appears.
  snakeGame.move("U"); // return -1, game over because snake collides with border
```

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