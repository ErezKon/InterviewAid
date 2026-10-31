# 1857. Largest Color Value in a Directed Graph

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/largest-color-value-in-a-directed-graph](https://leetcode.com/problems/largest-color-value-in-a-directed-graph)
**Companies:** Amazon, Google, Juspay, Linkedin, Meta

---

## 1. Problem Description

There is a **directed graph** of `n` colored nodes and `m` edges. The nodes are numbered from `0` to `n - 1`.

You are given a string `colors` where `colors[i]` is a lowercase English letter representing the **color** of the `i`-th node in this graph (**0-indexed**). You are also given a 2D array `edges` where `edges[j] = [a_j, b_j]` indicates that there is a **directed edge** from node `a_j` to node `b_j`.

A valid **path** in the graph is a sequence of nodes `x_1 -> x_2 -> x_3 -> ... -> x_k` such that there is a directed edge from `x_i` to `x_{i+1}` for every `1 <= i < k`. The **color value** of the path is the number of nodes that are colored the **most frequently** occurring color along that path.

Return *the **largest color value** of any valid path in the given graph, or* `-1` *if the graph contains a cycle*.

**Constraints:**
- `n == colors.length`
- `m == edges.length`
- `1 <= n <= 10^5`
- `0 <= m <= 10^5`
- `colors` consists of lowercase English letters.
- `0 <= a_j, b_j < n`

---

## 2. Examples

```
Example 1:
  Input: colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]
  Output: 3
  Explanation: The path 0 -> 2 -> 3 -> 4 contains 3 nodes that are colored "a".
```

```
Example 2:
  Input: colors = "a", edges = [[0,0]]
  Output: -1
  Explanation: There is a cycle from 0 to 0.
```

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

1. Build graph and in-degree: nodes `0` has out-edges to `1` and `2`; `2` → `3`; `3` → `4`. In-degrees: `0:0, 1:1, 2:1, 3:1, 4:1`.
2. Initialize queue with node `0`. Set `dp[0]['a'] = 1`.
3. Dequeue `0`: propagate to `1` and `2`.
   - For neighbor `1` (color `b`): update `dp[1]['a'] = 1`, `dp[1]['b'] = 1`.
   - For neighbor `2` (color `a`): update `dp[2]['a'] = 2` (inherit `1` from `0` + own `a`).
   - Decrease in-degrees; node `1` and `2` become ready, enqueue them.
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

> Topological sorting provides a natural order to propagate per-color counts in a DAG. By maintaining a DP table of size `26 × n`, we compute the maximum color frequency on any path while detecting cycles automatically.