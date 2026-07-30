# 2258. Escape the Spreading Fire

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/escape-the-spreading-fire](https://leetcode.com/problems/escape-the-spreading-fire)
**Companies:** Amazon, Google, Snapchat, Uber

---

## Problem Description
You are given a `m x n` grid where each cell can be:
- `0` empty ground,
- `1` a fire source, or
- `2` a person.
Each minute, fire spreads to all 4‑directionally adjacent empty cells. After waiting for `w` minutes (you may choose any non‑negative integer `w`), you start moving from the cell containing `2` to the bottom‑right corner `(m‑1, n‑1)`, also moving one step per minute in 4 directions. You cannot step into a cell on fire. Return the maximum `w` such that you can still reach the destination. If you can survive indefinitely, return `10^9`. If it is impossible even without waiting, return `-1`.

## Examples
```text
Input: grid = [[0,2,0],[0,0,0],[0,0,1]]
Output: 2
Explanation: Wait 2 minutes, then move to the exit before fire reaches you.

Input: grid = [[0,1],[2,0]]
Output: -1
Explanation: Fire reaches the person immediately.
```

## Approach
1. **Pre‑process fire distances**: Run a multi‑source BFS from all fire cells to compute `fireDist[r][c]` = earliest minute fire reaches each cell (∞ if never).
2. **Binary search on waiting time `w`**: The feasible `w` lies between `0` and `m*n` (or a large upper bound). For each `mid`:
   - Perform a BFS for the person starting after `mid` minutes. The person can step into a cell `(r,c)` at time `t` only if `t + mid < fireDist[r][c]` (strictly before fire arrives).
   - If the destination is reachable, `mid` is feasible → search higher; otherwise lower.
3. Edge cases:
   - If the destination is never reached even with `w = 0`, return `-1`.
   - If the person can survive arbitrarily long (fire never reaches the start or destination), return `10^9`.

## Pseudocode
```text
FUNCTION maximumMinutes(grid):
    SET m, n ← dimensions of grid
    // 1. fire distances
    CREATE fireDist[m][n] filled with INF
    INIT queue ← empty
    FOR each cell (r,c) IN grid:
        IF grid[r][c] == 1:   // fire source
            fireDist[r][c] ← 0
            queue.ENQUEUE((r,c))
    WHILE queue NOT EMPTY:
        (r,c) ← queue.DEQUEUE()
        FOR each (nr,nc) in 4‑neighbors of (r,c):
            IF inside grid AND grid[nr][nc] != 1 AND fireDist[nr][nc] == INF:
                fireDist[nr][nc] ← fireDist[r][c] + 1
                queue.ENQUEUE((nr,nc))

    // helper to test a waiting time
    FUNCTION canEscape(wait):
        CREATE visited[m][n] false
        CREATE q ← empty
        IF wait >= fireDist[startRow][startCol]: RETURN false
        q.ENQUEUE((startRow,startCol,0))   // time elapsed after waiting
        visited[startRow][startCol] ← true
        WHILE q NOT EMPTY:
            (r,c,t) ← q.DEQUEUE()
            IF (r,c) == (m-1,n-1): RETURN true
            FOR each (nr,nc) in 4‑neighbors:
                IF NOT inside grid OR visited[nr][nc]: CONTINUE
                SET nextTime ← t + 1
                // person arrives at absolute time wait + nextTime
                IF wait + nextTime < fireDist[nr][nc]:
                    visited[nr][nc] ← true
                    q.ENQUEUE((nr,nc,nextTime))
        RETURN false

    // 2. binary search
    SET lo ← 0, hi ← m * n   // safe upper bound
    IF NOT canEscape(0): RETURN -1
    IF canEscape(hi): RETURN 10^9
    WHILE lo < hi:
        SET mid ← (lo + hi + 1) / 2   // upper mid
        IF canEscape(mid):
            SET lo ← mid
        ELSE:
            SET hi ← mid - 1
    RETURN lo
```

## Walkthrough
1. Compute fire arrival times for each cell.
2. Binary search tries `mid = 2` → BFS shows a safe path exists.
3. Higher `mid` fails, so answer is `2`.

## Complexity Analysis
- **Fire BFS:** O(m·n) time, O(m·n) space.
- **Binary search:** O(log(m·n)) iterations.
- **Person BFS per iteration:** O(m·n) time.
Overall: O(m·n·log(m·n)) time, O(m·n) space.

## Follow‑Up Questions
- How would you adapt the algorithm if fire spreads faster than the person (e.g., two cells per minute)?
- Can you compute the exact maximum waiting time without binary search using a single modified Dijkstra?
- What if there are multiple people starting at different cells?

## Key Takeaway
Separating fire propagation (multi‑source BFS) from the person’s movement and using binary search on the waiting time yields an efficient solution to a seemingly complex time‑dependent path problem.
