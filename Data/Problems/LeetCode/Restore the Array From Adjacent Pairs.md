# 1743. Restore the Array From Adjacent Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/restore-the-array-from-adjacent-pairs](https://leetcode.com/problems/restore-the-array-from-adjacent-pairs)
**Companies:** Amazon, Capital One, Ebay, Google, Meta, Robinhood, Roblox, Sig, Visa

---

## Problem Description

There is an integer array `nums` that consists of `n` **unique **elements, but you have forgotten it. However, you do remember every pair of adjacent elements in `nums`.

You are given a 2D integer array `adjacentPairs` of size `n - 1` where each `adjacentPairs[i] = [u_i, v_i]` indicates that the elements `u_i` and `v_i` are adjacent in `nums`.

It is guaranteed that every adjacent pair of elements `nums[i]` and `nums[i+1]` will exist in `adjacentPairs`, either as `[nums[i], nums[i+1]]` or `[nums[i+1], nums[i]]`. The pairs can appear **in any order**.

Return *the original array *`nums`*. If there are multiple solutions, return **any of them***.

**Constraints:**
- `nums.length == n`
- `adjacentPairs.length == n - 1`
- `adjacentPairs[i].length == 2`
- `2 <= n <= 10^5`
- `-10^5 <= nums[i], u_i, v_i <= 10^5`
- There exists some `nums` that has `adjacentPairs` as its pairs.

---

## Examples

**Example 1:**
```
Input: adjacentPairs = [[2,1],[3,4],[3,2]]
Output: [1,2,3,4]
Explanation: This array has all its adjacent pairs in adjacentPairs.
Notice that adjacentPairs[i] may not be in left-to-right order.
```

**Example 2:**
```
Input: adjacentPairs = [[4,-2],[1,4],[-3,1]]
Output: [-2,4,1,-3]
Explanation: There can be negative numbers.
Another solution is [-3,1,4,-2], which would also be accepted.
```

**Example 3:**
```
Input: adjacentPairs = [[100000,-100000]]
Output: [100000,-100000]
```

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
