# 773. Sliding Puzzle

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sliding-puzzle](https://leetcode.com/problems/sliding-puzzle)
**Companies:** Airbnb, Amazon, Google, Meta, Microsoft, Nvidia, Uber

---

## Problem Description

On a `2 × 3` board, there are tiles numbered `1` through `5` and one empty square represented by `0`. A move consists of swapping `0` with an adjacent tile (up, down, left, right).

Return the minimum number of moves to reach the state `[[1,2,3],[4,5,0]]`. If it's impossible, return `-1`.

### Examples

**Example 1:**
- **Input:** `board = [[1,2,3],[4,0,5]]`
- **Output:** `1`
- **Explanation:** Swap 0 and 5.

**Example 2:**
- **Input:** `board = [[1,2,3],[5,4,0]]`
- **Output:** `-1`

**Example 3:**
- **Input:** `board = [[4,1,2],[5,0,3]]`
- **Output:** `5`

### Constraints

- `board.length == 2`, `board[i].length == 3`
- Board is a permutation of `[0, 1, 2, 3, 4, 5]`

---

## Approach: BFS — O(6!) ✅

Flatten the board to a string and BFS over all reachable states. The 2×3 grid has at most `6! = 720` states, so BFS is efficient.

Precompute adjacency: position `i` can swap with `neighbors[i]`.

```
FUNCTION slidingPuzzle(board):
    target = "123450"
    start = flatten board to string
    IF start == target: RETURN 0

    neighbors = [[1,3],[0,2,4],[1,5],[0,4],[1,3,5],[2,4]]
    visited = {start}
    queue = [(start, 0)]

    WHILE queue:
        (state, moves) = queue.DEQUEUE()
        zeroIdx = state.INDEX('0')
        FOR neighbor IN neighbors[zeroIdx]:
            newState = SWAP(state, zeroIdx, neighbor)
            IF newState == target: RETURN moves + 1
            IF newState NOT IN visited:
                visited.ADD(newState)
                queue.ENQUEUE((newState, moves + 1))

    RETURN -1
```

### Grid Position Mapping

```
0 | 1 | 2
---------
3 | 4 | 5
```

`neighbors[0] = [1,3]`, `neighbors[4] = [1,3,5]`, etc.

### Walkthrough — `board = [[1,2,3],[4,0,5]]` → `"123405"`

| Level | States explored | Target found? |
|-------|----------------|---------------|
| 0     | "123405"       | No            |
| 1     | "123045", "123450", "120435" | "123450" = target! |

Result: `1`

| Time | Space |
|------|-------|
| O(6!) = O(720) | O(6!) |

---

## Follow-up

- For larger boards (e.g., 15-puzzle), use **A\* search** with Manhattan distance heuristic.
