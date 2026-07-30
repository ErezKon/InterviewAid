# 1743. Restore the Array From Adjacent Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/restore-the-array-from-adjacent-pairs](https://leetcode.com/problems/restore-the-array-from-adjacent-pairs)
**Companies:** Amazon, Capital One, Ebay, Google, Meta, Robinhood, Roblox, Sig, Visa

---

## Problem Description

Given a 2D array `adjacentPairs` where each `adjacentPairs[i] = [u, v]` means `u` and `v` are adjacent in the original array, restore and return the original array. The original array has **distinct** elements and exactly one valid restoration exists.

**Constraints:**
- `adjacentPairs.length == n - 1`
- `1 <= n <= 10^5`
- All elements are distinct

---

## Examples

**Example 1:**
- **Input:** `adjacentPairs = [[2,1],[3,4],[3,2]]`
- **Output:** `[1,2,3,4]`

**Example 2:**
- **Input:** `adjacentPairs = [[4,-2],[1,4],[-3,1]]`
- **Output:** `[-2,4,1,-3]`

---

## Key Insight

> The adjacent pairs define a **graph** where each node has degree ≤ 2 (it's a path). The two endpoints have **degree 1**. Start from any endpoint and traverse the path via DFS/BFS.

---

## Approach: Graph Traversal — O(n) ✅

```
FUNCTION restoreArray(adjacentPairs):
    graph = defaultdict(list)
    FOR [u, v] IN adjacentPairs:
        graph[u].ADD(v)
        graph[v].ADD(u)

    // Find endpoint (degree 1)
    start = [k for k, v in graph.items() if len(v) == 1][0]

    result = []
    visited = set()
    FUNCTION dfs(node):
        visited.ADD(node)
        result.ADD(node)
        FOR neighbor IN graph[node]:
            IF neighbor NOT IN visited:
                dfs(neighbor)

    dfs(start)
    RETURN result
```

Build adjacency list. Start from a node with degree 1 (array endpoint) and traverse.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n) — build graph + single DFS traversal |
| Space  | O(n) — adjacency list + visited set |

---

## Key Takeaway

> Adjacent pairs naturally form a path graph — find an endpoint (degree 1 node) and walk the path. This pattern applies whenever you need to reconstruct a sequence from pairwise adjacency information.
