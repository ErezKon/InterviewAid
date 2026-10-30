# 1466. Reorder Routes to Make All Paths Lead to the City Zero

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero)
**Companies:** Amazon, Google, Meta, Microsoft, Tiktok

---

## Problem Description

There are `n` cities numbered from `0` to `n - 1` and `n - 1` roads such that there is only one way to travel between two different cities (this network form a tree). Last year, The ministry of transport decided to orient the roads in one direction because they are too narrow.

Roads are represented by `connections` where `connections[i] = [a_i, b_i]` represents a road from city `a_i` to city `b_i`.

This year, there will be a big event in the capital (city `0`), and many people want to travel to this city.

Your task consists of reorienting some roads such that each city can visit the city `0`. Return the **minimum** number of edges changed.

It's **guaranteed** that each city can reach city `0` after reorder.

**Constraints:**
- `2 <= n <= 5 * 10^4`
- `connections.length == n - 1`
- `connections[i].length == 2`
- `0 <= a_i, b_i <= n - 1`
- `a_i != b_i`

## Examples

**Example 1:**
```
Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
Output: 3
Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).
```

**Example 2:**
```
Input: n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
Output: 2
Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).
```

**Example 3:**
```
Input: n = 3, connections = [[1,0],[2,0]]
Output: 0
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