# 2077. Paths in Maze That Lead to Same Room

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/paths-in-maze-that-lead-to-same-room](https://leetcode.com/problems/paths-in-maze-that-lead-to-same-room)
**Companies:** Google

---

## Problem Description
You are given a directed graph representing a maze: `rooms` are vertices numbered `0 … n-1` and `edges` are one‑way passages. For each room you may have multiple outgoing edges to other rooms. Determine the number of distinct starting rooms from which there exists **at least one** path that leads to the same destination room (the destination is not given; you must count rooms that share a common reachable room). Return that count.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `n = 4`, `edges = [[0,1],[1,2],[2,3],[0,2]]` | `2` | Rooms `0` and `1` can both reach room `2`; they share a common destination. |
| `n = 3`, `edges = [[0,1],[1,2]]` | `0` | No two different rooms converge to the same room.

## Approach
Perform a reverse graph traversal to compute, for each node, the set of sources that can reach it. Use a BFS/DFS from each node in the reversed graph, counting how many distinct sources arrive at each destination. Any destination with a source count ≥ 2 contributes that many source rooms to the answer.

```text
FUNCTION countRoomsWithCommonDestination(n, edges):
    // build reverse adjacency list
    SET revAdj ← LIST of n empty lists
    FOR each (u, v) IN edges:
        APPEND u TO revAdj[v]

    // sourceCount[i] = number of distinct sources that can reach i
    SET sourceCount ← ARRAY of n zeros

    FOR src FROM 0 TO n-1:
        // BFS from src in reverse graph to find destinations reachable from src
        SET visited ← SET containing src
        SET queue ← [src]
        WHILE queue NOT EMPTY:
            SET node ← DEQUEUE(queue)
            INCREMENT sourceCount[node]
            FOR each prev IN revAdj[node]:
                IF prev NOT IN visited:
                    ADD prev TO visited
                    ENQUEUE(prev, queue)
                ENDIF
            ENDFOR
        ENDWHILE
    ENDFOR

    // count sources that have at least one other source sharing a destination
    SET answer ← 0
    FOR i FROM 0 TO n-1:
        IF sourceCount[i] >= 2:
            // each source counted earlier, so we just sum those sources
            // alternative: answer += sourceCount[i]
            INCREMENT answer BY sourceCount[i]
        ENDIF
    ENDFOR
    RETURN answer
```

## Walkthrough
For the first example `n=4`, `edges=[[0,1],[1,2],[2,3],[0,2]]`:

| src | destinations reached (reverse) |
|-----|--------------------------------|
| 0 | 0,1,2 |
| 1 | 1,2 |
| 2 | 2 |
| 3 | 3 |

`sourceCount` becomes `[1,2,3,1]`. Nodes `1` and `2` have ≥ 2 sources, contributing `2+3=5` source appearances; the distinct starting rooms that share a destination are `0` and `1` → answer `2`.

## Complexity Analysis
- **Time:** O(n · (m + n)) in the worst case, where `m` is number of edges (BFS from each source). For sparse graphs this is acceptable; more advanced SCC algorithms can reduce it.
- **Space:** O(n + m) for adjacency lists and visited sets.

## Follow‑Up Questions
1. How would you solve the problem using Strongly Connected Components to improve efficiency?
2. Can the algorithm be adapted to return the actual pairs of rooms that share a destination?
3. What changes are needed if edges are weighted and you only consider shortest‑path destinations?

## Key Takeaway
Counting how many sources can reach each node via a reverse traversal reveals destinations shared by multiple rooms.
