# 1466. Reorder Routes to Make All Paths Lead to the City Zero

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero)
**Companies:** Amazon, Google, Meta, Microsoft, Tiktok

---

## Problem Description
You are given an integer `n` representing `n` cities labeled from `0` to `n-1` and a list `connections` where each element `[a, b]` denotes a directed road from city `a` to city `b`. The network forms a tree (i.e., exactly `n-1` edges and all cities are reachable). Your goal is to reorient the minimum number of roads so that every city can reach city `0` via directed paths.

## Examples
**Example 1:**
```
Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
Output: 3
Explanation: Reorder edges (1→3), (2→3) and (4→5) to point towards city 0.
```
**Example 2:**
```
Input: n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
Output: 2
Explanation: Reorder edges (1→0) and (3→4) to point towards city 0.
```

## Approach
Treat each road as a bidirectional edge but tag the original direction with a cost of `1` (needs reversal) and the reverse direction with a cost of `0` (already correct). Perform a BFS/DFS starting from city `0`. Whenever we traverse an edge that originally pointed away from `0`, add its cost to the answer. This counts exactly the roads that must be flipped.

```text
FUNCTION minReorder(n, connections):
    SET graph ← MAP from city TO LIST of (neighbor, cost)
    FOR each [a, b] IN connections:
        APPEND (b, 1) TO graph[a]   // original direction, needs flip
        APPEND (a, 0) TO graph[b]   // reverse direction, already correct
    SET visited ← SET{0}
    SET queue ← [0]
    SET flips ← 0
    WHILE queue NOT EMPTY:
        SET node ← DEQUEUE(queue)
        FOR each (nbr, cost) IN graph[node]:
            IF nbr NOT IN visited:
                ADD nbr TO visited
                SET flips ← flips + cost
                ENQUEUE nbr INTO queue
    RETURN flips
```

## Walkthrough
| Step | node | neighbor | cost | flips so far | visited |
|------|------|----------|------|--------------|---------|
| 1 | 0 | 1 (cost 0) | 0 | 0 | {0,1}
| 2 | 0 | 4 (cost 0) | 0 | 0 | {0,1,4}
| 3 | 1 | 3 (cost 1) | 1 | 1 | {0,1,4,3}
| 4 | 4 | 5 (cost 1) | 1 | 2 | {0,1,4,3,5}
| 5 | 3 | 2 (cost 1) | 1 | 3 | {0,1,4,3,5,2}
All cities reachable, total flips = 3.

## Complexity Analysis
- Time: O(n) – each edge is visited twice (once per direction).
- Space: O(n) for the adjacency list and visited set.

## Follow-Up Questions
1. How would the solution change if the graph could contain cycles?
2. Can you compute the answer using a single DFS recursion without an explicit queue?
3. How would you extend the algorithm to also output the list of edges that need to be reversed?

## Key Takeaway
By treating each road as a bidirectional edge with a flip‑cost flag, a simple BFS from city 0 counts exactly the edges that must be reoriented to make all paths lead to the capital.