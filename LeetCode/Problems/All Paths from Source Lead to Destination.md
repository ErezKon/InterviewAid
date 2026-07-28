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

```text
FUNCTION leadsToDestination(n, edges, source, destination):
    // build adjacency list
    SET graph ← BUILD_ADJACENCY_LIST(edges)
    SET state ← ARRAY of size n filled with 0   // 0=UNVISITED, 1=IN_PROGRESS, 2=DONE

    FUNCTION dfs(node):
        IF state[node] == 1:
            RETURN false   // cycle detected
        IF state[node] == 2:
            RETURN true    // already verified
        IF graph[node] IS EMPTY:
            RETURN node == destination   // terminal must be destination
        SET state[node] ← 1   // mark IN_PROGRESS
        FOR each next IN graph[node]:
            IF NOT dfs(next):
                RETURN false
        SET state[node] ← 2   // mark DONE
        RETURN true

    RETURN dfs(source)
```

---

## 4. Examples

**Example 1:**
```
Input: n = 3, edges = [[0,1],[0,2],[1,1],[2,1]], source = 0, destination = 1
Output: false
Explanation: There is a path 0 → 2 → 1 that reaches the destination, but also a cycle 1 → 1, causing an infinite path that never ends at destination.
```

**Example 2:**
```
Input: n = 4, edges = [[0,1],[0,2],[1,3],[2,3]], source = 0, destination = 3
Output: true
Explanation: Every path from 0 ends at node 3, and there are no cycles.
```

---

## 5. Walkthrough

Consider the second example with `n = 4` and edges `[[0,1],[0,2],[1,3],[2,3]]`.
| Step | node visited | state before | action | state after |
|------|--------------|--------------|--------|-------------|
| 1 | 0 | all 0 | call dfs(0), mark IN_PROGRESS | state[0]=1 |
| 2 | 1 | state[1]=0 | dfs(1), mark IN_PROGRESS | state[1]=1 |
| 3 | 3 | state[3]=0 | dfs(3) sees no outgoing edges, node==dest → true, mark DONE | state[3]=2 |
| 4 | return to 1 | state[1]=1 | all children true → mark DONE | state[1]=2 |
| 5 | 2 | state[2]=0 | dfs(2), mark IN_PROGRESS | state[2]=1 |
| 6 | 3 again | state[3]=2 | returns true immediately |
| 7 | return to 2 → DONE, then return to 0 → DONE | all true → overall true |

All possible traversals end at the destination without encountering a cycle.

---

## 6. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time   | O(V + E) – each node and edge visited at most once |
| Space  | O(V) – recursion stack / explicit stack plus state array |

---

## 7. Key Takeaway

> Three‑state DFS (white/gray/black) simultaneously detects cycles and ensures every terminal node equals the destination, guaranteeing all paths lead to the target.
