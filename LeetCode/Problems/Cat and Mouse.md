# 913. Cat and Mouse

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cat-and-mouse](https://leetcode.com/problems/cat-and-mouse)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Zip

---

## Problem Description
Given an undirected graph where node `0` is the mouse hole, node `1` is the cat's starting position, and node `2` is the mouse's starting position, determine the game outcome assuming both players play optimally. Players alternate moves (mouse first). On each turn, a player moves from its current node to any neighboring node (cat cannot move to node `0`). The game ends when the mouse reaches node `0` (mouse wins) or the cat catches the mouse (cat wins) or a state repeats (draw). Return `1` if the mouse wins, `2` if the cat wins, otherwise `0` for a draw.

## Examples
**Example 1:**
```
graph = [[1,2],[0],[0]]
Output: 1
Explanation: Mouse moves to node 0 and wins immediately.
```
**Example 2:**
```
graph = [[1],[0,2],[1]]
Output: 2
Explanation: Cat can force a capture on its turn.
```

## Approach
Perform a reverse BFS (retrograde analysis) from all terminal states. Each state is a tuple `(mousePos, catPos, turn)`. Initialize outcomes for terminal states: mouse at 0 → mouse win, cat == mouse → cat win. Then propagate outcomes backwards: if a player can move to a losing state for the opponent, the current state is a win for the player; otherwise if all moves lead to opponent wins, the current state is a loss. Continue until no state changes.

```text
FUNCTION catMouseGame(graph):
    SET n ← LENGTH(graph)
    // 0=draw, 1=mouse win, 2=cat win
    CREATE 3D ARRAY outcome[n][n][2] FILLED WITH 0
    CREATE queue ← EMPTY

    // Initialize terminal states
    FOR mouse ← 0 TO n-1:
        FOR cat ← 0 TO n-1:
            IF mouse == 0:
                SET outcome[mouse][cat][*] ← 1
                ENQUEUE(queue, (mouse, cat, *))
            ELSE IF cat == mouse:
                SET outcome[mouse][cat][*] ← 2
                ENQUEUE(queue, (mouse, cat, *))

    WHILE queue NOT EMPTY:
        SET (m, c, turn) ← DEQUEUE(queue)
        SET result ← outcome[m][c][turn]
        FOR each predecessor state (pm, pc, prevTurn) THAT can move to (m, c, turn):
            IF outcome[pm][pc][prevTurn] != 0: CONTINUE
            // If current result is a loss for the player who just moved, predecessor is a win for the player whose turn it is now
            IF (result == 2 AND turn == 0) OR (result == 1 AND turn == 1):
                SET outcome[pm][pc][prevTurn] ← result
                ENQUEUE(queue, (pm, pc, prevTurn))
            ELSE:
                // Decrease degree count; if all moves lead to opponent win, mark as opponent win
                DECREMENT degree[pm][pc][prevTurn]
                IF degree[pm][pc][prevTurn] == 0:
                    SET outcome[pm][pc][prevTurn] ← (turn == 0 ? 1 : 2)
                    ENQUEUE(queue, (pm, pc, prevTurn))
    RETURN outcome[2][1][0]  // mouse start=2, cat start=1, mouse turn
```

## Walkthrough
Consider the first example `graph = [[1,2],[0],[0]]`:
1. Initialize terminal: mouse at 0 → mouse win.
2. From state (2,1,mouseTurn), mouse can move to 0 → reaches terminal mouse win, so state is a win.
3. Queue processes and propagates, confirming outcome `1`.

## Complexity Analysis
- **Time:** O(n³) – there are `n * n * 2` states and each edge is examined at most once per state.
- **Space:** O(n³) for the outcome and degree tables.

## Follow-Up Questions
1. How would the solution change if the cat could also move to node 0?
2. Can the algorithm be optimized for sparse graphs?
3. How to extend the game to more than two players?

## Key Takeaway
Retrograde analysis (reverse BFS) converts a complex game with many states into a deterministic outcome by propagating wins and losses from terminal positions.
