# 1728. Cat and Mouse II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cat-and-mouse-ii](https://leetcode.com/problems/cat-and-mouse-ii)
**Companies:** Google

---

## 1. Problem Description

Given a grid with walls, a mouse, a cat, and food, determine if the mouse can reach food before the cat catches it. Mouse moves up to `mouseJump` cells, cat up to `catJump` cells per turn. Mouse moves first.

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

**Example 1:**
```
grid = [["#","#","#","#","#"],
        ["#","M",".","C","#"],
        ["#",".","#",".","#"],
        ["#",".","F",".","#"],
        ["#","#","#","#","#"]]
catJump = 1, mouseJump = 2
Output: true
```
*Explanation:* Mouse can reach the food in two moves while avoiding the cat.

**Example 2:**
```
grid = [["#","#","#","#","#"],
        ["#","M",".","C","#"],
        ["#",".","#",".","#"],
        ["#",".","F",".","#"],
        ["#","#","#","#","#"]]
catJump = 2, mouseJump = 1
Output: false
```
*Explanation:* Cat can catch the mouse before it reaches the food.

---

## 5. Walkthrough

| Turn | Player | Position(s) | Decision |
|------|--------|------------|----------|
| 0    | Mouse  | (1,1)      | Moves toward food within 2 steps |
| 1    | Cat    | (1,3)      | Moves towards mouse, cannot catch yet |
| 2    | Mouse  | Reaches food (3,2) | Wins before cat's next move |

---

## 6. Complexity Analysis

- **Time:** O(m² × n² × 128) due to exploring all positions for both players up to depth 128.
- **Space:** O(m² × n² × 128) for memoization table.

---

## Key Takeaway

> Game problems on grids use minimax with memoization. State = (positions of both players, whose turn). Bound the search depth to avoid infinite loops.
