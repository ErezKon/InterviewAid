# 1857. Largest Color Value in a Directed Graph

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/largest-color-value-in-a-directed-graph](https://leetcode.com/problems/largest-color-value-in-a-directed-graph)
**Companies:** Amazon, Google, Juspay, Linkedin, Meta

---

## 1. Problem Description

Given a directed graph where each node has a color, find the largest "color value" — the max count of any single color on any path. Return -1 if the graph has a cycle.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4],[4,5]]` | `3` | The path `0 -> 2 -> 3 -> 4` contains three `'a'` characters, which is the maximum.
| `colors = "a", edges = [[0,0]]` | `-1` | The graph contains a self‑loop, i.e., a cycle, so return `-1`.
| `colors = "abc", edges = []` | `1` | No edges, each node alone forms a path; the maximum count of any color on a path is `1`.

---

## 3. Approach — Topological Sort + DP ✅

```text
FUNCTION largestPathValue(colors, edges):
    n ← LENGTH(colors)
    BUILD adjacency list graph FROM edges
    inDegree ← ARRAY of size n initialized to 0
    FOR each (u, v) IN edges:
        INCREMENT inDegree[v]
        ADD v TO graph[u]

    // dp[node][c] = max count of color c on any path ending at node
    dp ← n × 26 matrix filled with 0
    queue ← ALL nodes WHERE inDegree[node] == 0
    FOR node IN queue:
        SET dp[node][INDEX(colors[node])] ← 1

    processed ← 0
    WHILE queue IS NOT EMPTY:
        node ← DEQUEUE(queue)
        processed ← processed + 1
        FOR neighbor IN graph[node]:
            FOR c FROM 0 TO 25:
                SET candidate ← dp[node][c] + (1 IF c == INDEX(colors[neighbor]) ELSE 0)
                SET dp[neighbor][c] ← MAX(dp[neighbor][c], candidate)
            DECREMENT inDegree[neighbor]
            IF inDegree[neighbor] == 0:
                ENQUEUE(queue, neighbor)

    IF processed < n:
        RETURN -1  // cycle detected
    RETURN MAX(dp[node][c] FOR all node, c)
```

---

## 4. Walkthrough

**Example:** `colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]`

1. Build graph and in‑degree: nodes `0` has out‑edges to `1` and `2`; `2` → `3`; `3` → `4`. In‑degrees: `0:0, 1:1, 2:1, 3:1, 4:1`.
2. Initialize queue with node `0`. Set `dp[0]['a'] = 1`.
3. Dequeue `0`: propagate to `1` and `2`.
   - For neighbor `1` (color `b`): update `dp[1]['a'] = 1`, `dp[1]['b'] = 1`.
   - For neighbor `2` (color `a`): update `dp[2]['a'] = 2` (inherit `1` from `0` + own `a`).
   - Decrease in‑degrees; node `1` and `2` become ready, enqueue them.
4. Dequeue `1` (no outgoing edges).
5. Dequeue `2`: propagate to `3` (color `c`). Update `dp[3]['a'] = 2`, `dp[3]['c'] = 1`.
6. Dequeue `3`: propagate to `4` (color `a`). Update `dp[4]['a'] = 3` (max path `0→2→3→4`).
7. All nodes processed, no cycle. Maximum value in `dp` matrix is `3`.

---

## 5. Complexity Analysis

| Metric | Value |
|--------|-------|
| Time | O(26·(V + E)) = O(V + E) |
| Space | O(26·V) = O(V) |

---

## 6. Follow-Up Questions

- How would the solution change if colors were not limited to 26 letters?
- Can you adapt the algorithm to also return the actual path achieving the maximum color value?
- What if the graph is extremely large and must be processed in a streaming fashion?

---

## 7. Key Takeaway

> Topological sorting provides a natural order to propagate per‑color counts in a DAG. By maintaining a DP table of size `26 × n`, we compute the maximum color frequency on any path while detecting cycles automatically.