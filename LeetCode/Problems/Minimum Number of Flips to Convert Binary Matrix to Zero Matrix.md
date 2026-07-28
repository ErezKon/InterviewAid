# 1284. Minimum Number of Flips to Convert Binary Matrix to Zero Matrix

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-flips-to-convert-binary-matrix-to-zero-matrix](https://leetcode.com/problems/minimum-number-of-flips-to-convert-binary-matrix-to-zero-matrix)
**Companies:** Airbnb

---

## Problem Description

You are given an `m × n` binary matrix `mat`. In one operation you may select any cell `(i, j)` and flip it **and** all of its four direct neighbors (up, down, left, right) – changing `0` to `1` and `1` to `0`. The goal is to convert the entire matrix to all zeros. Return the minimum number of operations required, or `-1` if it is impossible.

## Examples

1. **Input:** `mat = [[0,0],[0,1]]`
   **Output:** `3`
   **Explanation:** One optimal sequence of flips:
   - Flip `(0,1)` → matrix becomes `[[0,1],[0,0]]`
   - Flip `(1,0)` → `[[1,1],[1,0]]`
   - Flip `(0,0)` → `[[0,0],[0,0]]`
2. **Input:** `mat = [[0]]`
   **Output:** `0`
   **Explanation:** Matrix is already all zeros.

## Approach

**Algorithm:** Breadth‑first search (BFS) over the state space, treating each matrix configuration as a node. Represent a state as a bitmask of size `m·n`. For each state, generate up to `m·n` neighbor states by applying the flip operation at every cell. Use a queue to explore states level‑by‑level until the all‑zero state is reached.

```text
FUNCTION minFlips(mat):
    m ← ROWS(mat)
    n ← COLS(mat)
    start ← ENCODE(mat)                 // bitmask representation
    target ← 0                           // all zeros bitmask
    IF start = target THEN RETURN 0
    visited ← SET()
    visited.ADD(start)
    queue ← QUEUE()
    queue.ENQUEUE((start, 0))           // (state, steps)
    WHILE queue NOT EMPTY DO
        (state, steps) ← queue.DEQUEUE()
        FOR i FROM 0 TO m-1 DO
            FOR j FROM 0 TO n-1 DO
                nextState ← FLIP(state, i, j, m, n)
                IF nextState = target THEN RETURN steps + 1
                IF NOT visited.CONTAINS(nextState) THEN
                    visited.ADD(nextState)
                    queue.ENQUEUE((nextState, steps + 1))
    RETURN -1

FUNCTION FLIP(state, i, j, m, n):
    // Toggle cell (i,j) and its four neighbors in the bitmask
    dirs ← [(0,0),(1,0),(-1,0),(0,1),(0,-1)]
    FOR (dx, dy) IN dirs DO
        x ← i + dx
        y ← j + dy
        IF 0 ≤ x < m AND 0 ≤ y < n THEN
            pos ← x * n + y
            state ← state XOR (1 LEFT_SHIFT pos)
    RETURN state
```

## Walkthrough

For `mat = [[0,0],[0,1]]` (`m=2,n=2`):

- Encode start state → bitmask `1000` (binary, cell order row‑major).
- BFS explores flipping each of the four cells, generating new masks.
- After three levels the all‑zero mask `0000` is reached, yielding answer `3`.

## Complexity Analysis

- **Time:** `O(2^{m·n} * m·n)` in the worst case, because each of the `2^{m·n}` states may generate `m·n` neighbors. Feasible for small matrices (e.g., `m·n ≤ 16`).
- **Space:** `O(2^{m·n})` for the visited set and queue.

## Follow‑Up Questions

- How would you adapt the solution for larger matrices? (Hint: use linear algebra over GF(2) to solve as a system of equations.)
- What if the flip also affected diagonal neighbors?
- Can the problem be solved with A* search using a heuristic based on the number of `1`s?

## Key Takeaway

Model the matrix as a bitmask and perform BFS over all reachable configurations; the shortest path to the all‑zero mask gives the minimum number of flips.
