# 2360. Longest Cycle in a Graph

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-cycle-in-a-graph](https://leetcode.com/problems/longest-cycle-in-a-graph)
**Companies:** Amazon, Google, Juspay, Phonepe

---

## 1. Problem Description

You are given a **directed** graph of `n` nodes numbered from `0` to `n - 1`, where each node has **at most one** outgoing edge.

The graph is represented with a given **0-indexed** array `edges` of size `n`, indicating that there is a directed edge from node `i` to node `edges[i]`. If there is no outgoing edge from node `i`, then `edges[i] == -1`.

Return *the length of the **longest** cycle in the graph*. If no cycle exists, return `-1`.

A cycle is a path that starts and ends at the **same** node.

**Constraints:**
- `n == edges.length`
- `2 <= n <= 10^5`
- `-1 <= edges[i] < n`
- `edges[i] != i`

## 2. Examples

**Example 1:**
```
Input: edges = [3,3,4,2,3]
Output: 3
Explanation: The longest cycle in the graph is the cycle: 2 -> 4 -> 3 -> 2.
The length of this cycle is 3, so 3 is returned.
```

**Example 2:**
```
Input: edges = [2,-1,3,1]
Output: -1
Explanation: There are no cycles in this graph.
```

## 3. Approach: DFS with Path Tracking — O(n) ✅

```text
FUNCTION longestCycle(edges):
    n ← LENGTH(edges)
    visited ← ARRAY of 0's size n   // 0=unvisited, 1=in progress, 2=done
    maxCycle ← -1

    FOR i ← 0 TO n - 1:
        IF visited[i] != 0: CONTINUE
        pathMap ← MAP()
        curr ← i
        step ← 0
        WHILE curr != -1 AND visited[curr] == 0:
            IF curr IN pathMap:
                cycleLen ← step - pathMap[curr]
                maxCycle ← MAX(maxCycle, cycleLen)
                BREAK
            pathMap[curr] ← step
            visited[curr] ← 1
            step ← step + 1
            curr ← edges[curr]
        FOR node IN pathMap.KEYS():
            visited[node] ← 2
    RETURN maxCycle
```

## 4. Walkthrough

Consider `edges = [3,3,4,2,3]`:
1. Start at node 0 → path 0→3→2→4→3, detect cycle when revisiting 3.
2. Recorded steps: 0@0, 3@1, 2@2, 4@3, revisit 3 at step 4 → length = 4-1 = 3.
3. No longer cycles found from other start nodes.

## 5. Complexity Analysis

- **Time:** O(n) – each node visited at most once.
- **Space:** O(n) – for visited array and temporary path map.

## 6. Follow-Up Questions

- How would you modify the algorithm to return the actual nodes in the longest cycle?
- Can you solve the problem using only O(1) extra space?
- What changes are needed if each node can have multiple outgoing edges?

## 7. Key Takeaway

> In a functional graph, tracking the step index of each node during a DFS lets you compute cycle length instantly when a node re-appears in the current path.
