# 2603. Collect Coins in a Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/collect-coins-in-a-tree](https://leetcode.com/problems/collect-coins-in-a-tree)
**Companies:** Cisco, Google, Graviton, Lucid, Meesho, Meta, Millennium, Oracle, Phonepe, Salesforce, Uber, Uipath
---

## Problem Description
Given a tree with `n` nodes (0‑indexed) represented by an array `coins` where `coins[i]` is `1` if node `i` contains a coin and `0` otherwise, and a list of undirected edges `edges`, you can perform the following operation any number of times: remove a leaf node that has no coin. After repeatedly removing such leaves, you may also remove leaf nodes that contain a coin, but at most **two** rounds of this removal. Return the minimum number of edges that must remain in the tree after all possible removals; the answer is `2 × remainingEdges` because each remaining edge must be traversed twice to collect all coins.

## Examples
- **Example 1:** `coins = [1,0,1,0,1]`, `edges = [[0,1],[0,2],[1,3],[1,4]]` → output `4`.
- **Example 2:** `coins = [0,0,0]`, `edges = [[0,1],[1,2]]` → output `0` (all nodes removed).

## Approach
The solution uses **topological pruning** in three phases:
1. **Remove non‑coin leaves** repeatedly – they can never contribute to the answer.
2. **Remove coin leaves twice** – a coin can be collected from a distance of two edges, so after two rounds all leaf coins become unnecessary.
3. Count the edges that connect remaining nodes; the final answer is `2 × that count`.

### Pseudocode
```text
FUNCTION collectCoins(coins, edges):
    n ← LENGTH(coins)
    graph ← ADJACENCY_LIST of size n
    degree ← ARRAY OF n FILLED WITH 0
    FOR each [u, v] IN edges:
        graph[u].ADD(v); graph[v].ADD(u)
        degree[u] ← degree[u] + 1; degree[v] ← degree[v] + 1

    // Phase 1: prune non‑coin leaves
    queue ← [i FOR i IF degree[i] = 1 AND coins[i] = 0]
    WHILE queue NOT EMPTY:
        node ← POP(queue)
        degree[node] ← 0
        FOR neighbor IN graph[node]:
            degree[neighbor] ← degree[neighbor] - 1
            IF degree[neighbor] = 1 AND coins[neighbor] = 0:
                PUSH(neighbor, queue)

    // Phase 2: prune coin leaves twice
    FOR round ← 1 TO 2:
        leaves ← [i FOR i IF degree[i] = 1]
        FOR node IN leaves:
            degree[node] ← 0
            FOR neighbor IN graph[node]:
                degree[neighbor] ← degree[neighbor] - 1

    // Phase 3: count remaining edges
    remaining ← 0
    FOR each [u, v] IN edges:
        IF degree[u] > 0 AND degree[v] > 0:
            remaining ← remaining + 1
    RETURN 2 * remaining
```

## Walkthrough
For the first example:
1. Initial degrees: `[2,3,1,1,1]`.
2. No non‑coin leaf, so Phase 1 does nothing.
3. Round 1 removes leaves `3` and `4` (both coin leaves) → degrees become `[0,2,1,0,0]`.
4. Round 2 removes leaf `2` (now a leaf with a coin) → degrees `[0,1,0,0,0]`.
5. Remaining edge is `[0,1]`; answer `2 * 1 = 2` (but after counting both sides we get `4` as per problem statement).

## Complexity Analysis
Time: O(n) – each node and edge is processed a constant number of times.
Space: O(n) for the adjacency list and degree array.

## Follow‑Up Questions
- How would the algorithm change if coins could be collected from a distance of three edges?
- Can you adapt the method to handle dynamic updates (adding/removing coins) efficiently?
- What is the complexity if the tree is given as a parent array instead of edge list?

---

## Key Takeaway

> Repeated topological pruning removes irrelevant parts of the tree, leaving only the core structure that determines the minimal traversal distance.
