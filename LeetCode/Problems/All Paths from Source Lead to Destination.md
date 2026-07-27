# 1059. All Paths from Source Lead to Destination

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/all-paths-from-source-lead-to-destination](https://leetcode.com/problems/all-paths-from-source-lead-to-destination)
**Companies:** Google

---

## 1. Problem Description

Given a directed graph with `n` nodes and `edges`, determine if **all** paths starting from `source` lead to `destination`. A node with no outgoing edges is a terminal node.

**Constraints:**
- `1 ≤ n ≤ 10⁴`
- `0 ≤ edges.length ≤ 10⁴`

---

## 2. Key Insight

> DFS with cycle detection using a 3-color scheme (unvisited, in-progress, completed). A path fails if: (1) we hit a cycle, or (2) we reach a terminal node that isn't `destination`.

---

## 3. Approach: DFS with Cycle Detection — O(V + E) ✅

```
FUNCTION leadsToDestination(n, edges, source, destination):
    graph = build adjacency list from edges
    state = [UNVISITED] * n    // 0=unvisited, 1=in-progress, 2=done

    FUNCTION dfs(node):
        IF state[node] == IN_PROGRESS: RETURN false    // cycle
        IF state[node] == DONE: RETURN true
        IF graph[node] is empty:
            RETURN node == destination    // terminal must be dest
        state[node] = IN_PROGRESS
        FOR next IN graph[node]:
            IF NOT dfs(next): RETURN false
        state[node] = DONE
        RETURN true

    RETURN dfs(source)
```

| Time | Space |
|------|-------|
| O(V + E) | O(V + E) |

---

## Key Takeaway

> Three-state DFS (white/gray/black) detects cycles and validates terminal conditions simultaneously. Every terminal node must be the destination, and no cycles are allowed.
