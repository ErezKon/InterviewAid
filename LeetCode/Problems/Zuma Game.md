# 488. Zuma Game

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/zuma-game](https://leetcode.com/problems/zuma-game)
**Companies:** Amazon, Aurora, Baidu, Google, Inmobi, Phonepe, Zoho

---

## Problem Description
You are given a `board` string representing a row of colored balls and a `hand` string containing balls you can insert. In one move you may insert any ball from `hand` at any position in `board`. After insertion, any group of three or more consecutive balls of the same color disappears, and this may trigger further cascades. The goal is to clear the entire `board` using the fewest possible insertions, or return `-1` if impossible.

## Examples
- **Input:** `board = "WRRBBW"`, `hand = "RB"`
  **Output:** `-1`
  *Explanation:* No sequence of insertions can clear the board.
- **Input:** `board = "WWRRBBWW"`, `hand = "WRBRW"
  **Output:** `2`
  *Explanation:* Insert `R` at position 2 → `WRRRRBBWW` (RRR removed) → `WWBBWW`; then insert `B` at position 2 → `WWBBBWW` (BBB removed) → board cleared.

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

## Follow‑Up Questions
1. How can memoization with dynamic programming improve the search?
2. Can you design a heuristic to prioritize promising insertions and achieve an A*‑like search?
3. How would the solution change if the board were circular?

## Key Takeaway
Limiting insertions to positions that can immediately form a removable group and pruning visited states makes an otherwise exponential search tractable.
