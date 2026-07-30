# 419. Battleships in a Board

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/battleships-in-a-board
**Companies:** Amazon, Bloomberg, Google, Hsbc, Meta, Microsoft, Microstrategy, Tinkoff
---

## Problem Description
Given a 2‑D board of characters where `'X'` represents part of a battleship and `'.'` represents empty water, count the number of distinct battleships. Battleships are placed either horizontally or vertically, never adjacent to each other (no neighboring `'X'` horizontally, vertically, or diagonally). Return the total count.

## Examples
**Example 1**
```
Input: board = [["X",".","X","X"],[".",".",".","."],["X",".",".","X"]]
Output: 3
Explanation: The board contains three battleships.
```
**Example 2**
```
Input: board = [[".",".","."]]
Output: 0
```

## Approach
Iterate through each cell. When an `'X'` is found, it is the start of a new battleship only if there is no `'X'` directly above or to the left. Increment the count in that case.

```text
FUNCTION countBattleships(board):
    count ← 0
    rows ← LENGTH(board)
    cols ← LENGTH(board[0])
    FOR r ← 0 TO rows-1:
        FOR c ← 0 TO cols-1:
            IF board[r][c] == 'X':
                IF r > 0 AND board[r-1][c] == 'X':
                    CONTINUE   // part of vertical ship
                IF c > 0 AND board[r][c-1] == 'X':
                    CONTINUE   // part of horizontal ship
                count ← count + 1
    RETURN count
```

## Walkthrough
For the first example, the algorithm counts the cells (0,0), (0,2), and (2,0) as starts because they have no `'X'` above or left, yielding a total of 3.

## Complexity Analysis
*Time*: O(m·n) – each cell visited once.
*Space*: O(1) – only a few counters.

## Follow‑Up Questions
1. How would you modify the solution to handle boards where ships may touch diagonally?
2. Can you compute the count in a single pass without storing the board dimensions explicitly?
3. What changes are needed if ships can be of arbitrary shape (not just straight lines)?

## Key Takeaway
Counting only the top‑left cell of each ship provides a constant‑space solution by leveraging the non‑adjacency guarantee.
