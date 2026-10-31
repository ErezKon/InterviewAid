# 488. Zuma Game

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/zuma-game](https://leetcode.com/problems/zuma-game)
**Companies:** Amazon, Aurora, Baidu, Google, Inmobi, Phonepe, Zoho

---

## Problem Description

You are playing a variation of the game Zuma.

In this variation of Zuma, there is a **single row** of colored balls on a board, where each ball can be colored red `'R'`, yellow `'Y'`, blue `'B'`, green `'G'`, or white `'W'`. You also have several colored balls in your hand.

Your goal is to **clear all** of the balls from the board. On each turn:

- Pick **any** ball from your hand and insert it in between two balls in the row or on either end of the row.
- If there is a group of **three or more consecutive balls** of the **same color**, remove the group of balls from the board.

- If this removal causes more groups of three or more of the same color to form, then continue removing each group until there are none left.

- If there are no more balls on the board, then you win the game.
- Repeat this process until you either win or do not have any more balls in your hand.

Given a string `board`, representing the row of balls on the board, and a string `hand`, representing the balls in your hand, return *the **minimum** number of balls you have to insert to clear all the balls from the board. If you cannot clear all the balls from the board using the balls in your hand, return *`-1`.

**Constraints:**
- `1 <= board.length <= 16`
- `1 <= hand.length <= 5`
- `board` and `hand` consist of the characters `'R'`, `'Y'`, `'B'`, `'G'`, and `'W'`.
- The initial row of balls on the board will **not** have any groups of three or more consecutive balls of the same color.

## Examples

**Example 1:**
```
Input: board = "WRRBBW", hand = "RB"
Output: -1
Explanation: It is impossible to clear all the balls. The best you can do is:
- Insert 'R' so the board becomes WRRRBBW. WRRRBBW -> WBBW.
- Insert 'B' so the board becomes WBBBW. WBBBW -> WW.
There are still balls remaining on the board, and you are out of balls to insert.
```

**Example 2:**
```
Input: board = "WWRRBBWW", hand = "WRBRW"
Output: 2
Explanation: To make the board empty:
- Insert 'R' so the board becomes WWRRRBBWW. WWRRRBBWW -> WWBBWW.
- Insert 'B' so the board becomes WWBBBWW. WWBBBWW -> WWWW -> empty.
2 balls from your hand were needed to clear the board.
```

**Example 3:**
```
Input: board = "G", hand = "GGGGG"
Output: 2
Explanation: To make the board empty:
- Insert 'G' so the board becomes GG.
- Insert 'G' so the board becomes GGG. GGG -> empty.
2 balls from your hand were needed to clear the board.
```

## Approach
Use BFS/DFS with state pruning. Each state consists of the current `board` and the multiset of remaining `hand` balls. From a state, generate next states by inserting a ball only at positions where it can immediately create or extend a group of three. After insertion, repeatedly remove any groups of three or more. Store visited states to avoid repetition.

```text
FUNCTION findMinStep(board, hand):
    SET initialState ← (board, SORTED(hand))
    SET queue ← deque containing (initialState, 0) // 0 steps so far
    SET visited ← {initialState}

    WHILE queue is not empty:
        SET (currBoard, currHand), steps ← queue.POPLEFT()
        IF currBoard is empty: RETURN steps
        FOR each position i in 0..LEN(currBoard):
            FOR each index j in 0..LEN(currHand)-1:
                SET ball ← currHand[j]
                IF insertion of ball at i can form a group of ≥3:
                    SET newBoard ← INSERT(ball, i, currBoard)
                    CALL eliminate(newBoard) // repeatedly delete groups ≥3
                    SET newHand ← currHand with index j removed
                    SET newState ← (newBoard, SORTED(newHand))
                    IF newState NOT IN visited:
                        visited.ADD(newState)
                        queue.APPEND((newState, steps+1))
    RETURN -1

FUNCTION eliminate(board):
    REPEAT:
        SET changed ← false
        SET i ← 0
        WHILE i < LEN(board):
            SET j ← i
            WHILE j < LEN(board) AND board[j] == board[i]:
                j ← j + 1
            IF j - i >= 3:
                board ← board[0:i] + board[j:]
                SET changed ← true
                BREAK
            i ← j
    UNTIL NOT changed
    RETURN board
```

## Walkthrough
Consider `board = "WRRBBW"`, `hand = "RB"`.
1. Initial state `(WRRBBW, RB)`. No insertion creates a group of three, so no next states.
2. Queue empties → return `-1`.
For the solvable example, the BFS explores inserting `R` at position 2, triggers elimination, then inserts `B` leading to an empty board in 2 steps.

## Complexity Analysis
- **Time:** In the worst case the search space is exponential; each insertion creates a new state, but pruning drastically reduces it.
- **Space:** Stores visited states, also exponential in the worst case.

## Follow-Up Questions
1. How can memoization with dynamic programming improve the search?
2. Can you design a heuristic to prioritize promising insertions and achieve an A*-like search?
3. How would the solution change if the board were circular?

## Key Takeaway
Limiting insertions to positions that can immediately form a removable group and pruning visited states makes an otherwise exponential search tractable.
