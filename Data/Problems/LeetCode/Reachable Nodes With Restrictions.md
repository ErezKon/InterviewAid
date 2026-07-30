# 2368. Reachable Nodes With Restrictions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reachable-nodes-with-restrictions](https://leetcode.com/problems/reachable-nodes-with-restrictions)
**Companies:** Google, Makemytrip

---

## Problem Description
Given an undirected tree with `n` nodes labeled `0` to `n-1` and a list of restricted nodes, you start at node `0`. You may move along any edge to a neighboring node that is **not** restricted. Return the number of nodes you can reach, including the starting node.

## Examples
**Example 1:**
```
edges = [[0,1],[0,2],[1,3],[1,4]]
restricted = [4]
```
You can visit nodes `0,1,2,3` → answer `4`.

**Example 2:**
```
edges = [[0,1],[1,2],[2,3]]
restricted = [2]
```
Only nodes `0` and `1` are reachable → answer `2`.

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
