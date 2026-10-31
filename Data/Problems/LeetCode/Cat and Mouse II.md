# 1728. Cat and Mouse II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cat-and-mouse-ii](https://leetcode.com/problems/cat-and-mouse-ii)
**Companies:** Google

---

## 1. Problem Description

A game is played by a cat and a mouse named Cat and Mouse.

The environment is represented by a `grid` of size `rows x cols`, where each element is a wall, floor, player (Cat, Mouse), or food.

- Players are represented by the characters `'C'` (Cat), `'M'` (Mouse).
- Floors are represented by the character `'.'` and can be walked on.
- Walls are represented by the character `'#'` and cannot be walked on.
- Food is represented by the character `'F'` and can be walked on.
- There is only one of each character `'C'`, `'M'`, and `'F'` in `grid`.

Mouse and Cat play according to the following rules:

- Mouse **moves first**, then they take turns to move.
- During each turn, Cat and Mouse can jump in one of the four directions (left, right, up, down). They cannot jump over the wall nor outside of the `grid`.
- `catJump, mouseJump` are the maximum lengths Cat and Mouse can jump at a time, respectively. Cat and Mouse can jump less than the maximum length.
- Staying in the same position is allowed.
- Mouse can jump over Cat.

The game can end in 4 ways:

- If Cat occupies the same position as Mouse, Cat wins.
- If Cat reaches the food first, Cat wins.
- If Mouse reaches the food first, Mouse wins.
- If Mouse cannot get to the food within 1000 turns, Cat wins.

Given a `rows x cols` matrix `grid` and two integers `catJump` and `mouseJump`, return `true` *if Mouse can win the game if both Cat and Mouse play optimally, otherwise return* `false`.

**Constraints:**
- `rows == grid.length`
- `cols = grid[i].length`
- `1 <= rows, cols <= 8`
- `grid[i][j]` consist only of characters `'C'`, `'M'`, `'F'`, `'.'`, and `'#'`.
- There is only one of each character `'C'`, `'M'`, and `'F'` in `grid`.
- `1 <= catJump, mouseJump <= 8`

---

## 2. Key Insight

> Game theory with memoization. State = (mouse_pos, cat_pos, turn, moves). Mouse wins if it reaches food; cat wins if it catches the mouse or 128+ moves pass. Use top-down DP with memo.

---

## 3. Approach: Minimax DP — O(m²n² × 128) ✅

```text
FUNCTION canMouseWin(grid, catJump, mouseJump):
    memo = {}
    
    FUNCTION dp(mouse, cat, turn):
        IF turn >= 128: RETURN false    // draw = cat wins
        IF (mouse, cat, turn) IN memo: RETURN memo[...]
        IF mouse == food: RETURN true
        IF cat == food OR mouse == cat: RETURN false
        
        isMouseTurn = (turn % 2 == 0)
        IF isMouseTurn:
            // Mouse wins if ANY move leads to win
            FOR each valid mouse move (up to mouseJump):
                IF dp(newMouse, cat, turn + 1): RETURN true
            RETURN false
        ELSE:
            // Cat wins if ANY move leads to mouse loss
            FOR each valid cat move (up to catJump):
                IF NOT dp(mouse, newCat, turn + 1): RETURN false
            RETURN true
    
    RETURN dp(mouseStart, catStart, 0)
```

---

## 4. Examples

```
Example 1:
  Input: grid = ["####F","#C...","M...."], catJump = 1, mouseJump = 2
  Output: true
  Explanation: Cat cannot catch Mouse on its turn nor can it get the food before Mouse.

  Grid:
    # # # # F
    # C . . .
    M . . . .
```

```
Example 2:
  Input: grid = ["M.C...F"], catJump = 1, mouseJump = 4
  Output: true
```

```
Example 3:
  Input: grid = ["M.C...F"], catJump = 1, mouseJump = 3
  Output: false
```

---

## 5. Walkthrough

| Turn | Player | Position(s) | Decision |
|------|--------|------------|----------|
| 0    | Mouse  | (1,1)      | Moves toward food within 2 steps |
| 1    | Cat    | (1,3)      | Moves towards mouse, cannot catch yet |
| 2    | Mouse  | Reaches food (3,2) | Wins before cat's next move |

---

## 6. Complexity Analysis

- **Time:** O(m² × n² × 128) due to exploring all positions for both players up to depth 128.
- **Space:** O(m² × n² × 128) for memoization table.

---

## Key Takeaway

> Game problems on grids use minimax with memoization. State = (positions of both players, whose turn). Bound the search depth to avoid infinite loops.
