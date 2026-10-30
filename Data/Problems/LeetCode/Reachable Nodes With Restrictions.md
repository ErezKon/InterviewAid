# 2368. Reachable Nodes With Restrictions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reachable-nodes-with-restrictions](https://leetcode.com/problems/reachable-nodes-with-restrictions)
**Companies:** Google, Makemytrip

---

## Problem Description
There is an undirected tree with `n` nodes labeled from `0` to `n - 1` and `n - 1` edges.

You are given a 2D integer array `edges` of length `n - 1` where `edges[i] = [ai, bi]` indicates that there is an edge between nodes `ai` and `bi` in the tree. You are also given an integer array `restricted` which represents **restricted** nodes.

Return *the **maximum** number of nodes you can reach from node* `0` *without visiting a restricted node.*

Note that node `0` will **not** be a restricted node.

**Constraints:**

- `2 <= n <= 10⁵`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= ai, bi < n`
- `ai != bi`
- `edges` represents a valid tree.
- `1 <= restricted.length < n`
- `1 <= restricted[i] < n`
- All the values of `restricted` are **unique**.

## Examples

```
Example 1:
  Input: n = 7, edges = [[0,1],[1,2],[3,1],[4,0],[0,5],[5,6]], restricted = [4,5]
  Output: 4
  Explanation: We have that [0,1,2,3] are the only nodes that can be reached from node 0 without visiting a restricted node.
```

```
Example 2:
  Input: n = 7, edges = [[0,1],[0,2],[0,5],[0,4],[3,2],[6,5]], restricted = [4,2,1]
  Output: 3
  Explanation: We have that [0,5,6] are the only nodes that can be reached from node 0 without visiting a restricted node.
```

## Approach
Perform a **DFS/BFS** from node `0` while skipping restricted nodes. Mark visited nodes to avoid cycles.

```text
FUNCTION reachableNodes(n, edges, restricted):
    adj ← MAP node → LIST of neighbors
    FOR each (u,v) IN edges:
        APPEND v TO adj[u]
        APPEND u TO adj[v]
    restrictedSet ← SET(restricted)
    visited ← SET()
    stack ← [0]
    WHILE stack NOT EMPTY:
        node ← POP(stack)
        IF node IN visited OR node IN restrictedSet: CONTINUE
        ADD node TO visited
        FOR neighbor IN adj[node]:
            IF neighbor NOT IN visited AND neighbor NOT IN restrictedSet:
                PUSH neighbor ONTO stack
    RETURN SIZE(visited)
```

## Walkthrough
| Step | Stack | Visited | Action |
|------|-------|---------|--------|
| Init | [0] | {} | start at 0 |
| Pop 0 | [] | {0} | add neighbors 1,2 |
| Push 1,2 | [1,2] | {0} | |
| Pop 2 | [1] | {0,2} | neighbor 0 already visited |
| Pop 1 | [] | {0,1,2} | neighbor 3 added, 4 skipped (restricted) |
| Pop 3 | [] | {0,1,2,3} | end |
Result = 4.

## Complexity Analysis
- **Time:** `O(n)` – each node and edge visited at most once.
- **Space:** `O(n)` for adjacency list, visited set, and stack.

## Follow‑Up Questions
1. How would you modify the algorithm if the tree were directed?
2. Can you compute the answer without building an explicit adjacency list, using union‑find instead?
3. What if each edge had a weight and you needed the shortest reachable distance avoiding restricted nodes?

## Key Takeaway
A simple graph traversal that respects a forbidden‑node set efficiently counts all reachable nodes in a tree.
