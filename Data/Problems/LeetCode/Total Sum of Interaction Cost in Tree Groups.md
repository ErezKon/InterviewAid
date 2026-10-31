# 3786. Total Sum of Interaction Cost in Tree Groups

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/total-sum-of-interaction-cost-in-tree-groups](https://leetcode.com/problems/total-sum-of-interaction-cost-in-tree-groups)
**Companies:** Amazon

---

## Problem Description

> *Note: statement verified via doocs/leetcode.*

You are given an integer `n` and an undirected tree with `n` nodes numbered from 0 to `n - 1`. This is represented by a 2D array `edges` of length `n - 1`, where `edges[i] = [u_i, v_i]` indicates an undirected edge between nodes `u_i` and `v_i`.

You are also given an integer array `group` of length `n`, where `group[i]` denotes the group label assigned to node `i`.

- Two nodes `u` and `v` are considered part of the same group if `group[u] == group[v]`.
- The **interaction cost** between `u` and `v` is defined as the number of edges on the unique path connecting them in the tree.

Return an integer denoting the **sum** of interaction costs over all **unordered** pairs `(u, v)` with `u != v` such that `group[u] == group[v]`.

**Constraints:**
- `1 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i] = [u_i, v_i]`
- `0 <= u_i, v_i <= n - 1`
- `group.length == n`
- `1 <= group[i] <= 20`
- The input is generated such that `edges` represents a valid tree.

## Examples

**Example 1:**
```
Input: n = 3, edges = [[0,1],[1,2]], group = [1,1,1]
Output: 4
Explanation: All nodes belong to group 1. The interaction costs between the pairs of nodes are:
- Nodes (0, 1): 1
- Nodes (1, 2): 1
- Nodes (0, 2): 2
Thus, the total interaction cost is 1 + 1 + 2 = 4.
```

**Example 2:**
```
Input: n = 3, edges = [[0,1],[1,2]], group = [3,2,3]
Output: 2
Explanation:
- Nodes 0 and 2 belong to group 3. The interaction cost between this pair is 2.
- Node 1 belongs to a different group and forms no valid pair. Therefore, the total interaction cost is 2.
```

**Example 3:**
```
Input: n = 4, edges = [[0,1],[0,2],[0,3]], group = [1,1,4,4]
Output: 3
Explanation: Nodes belonging to the same groups and their interaction costs are:
- Group 1: Nodes (0, 1): 1
- Group 4: Nodes (2, 3): 2
Thus, the total interaction cost is 1 + 2 = 3.
```

**Example 4:**
```
Input: n = 2, edges = [[0,1]], group = [9,8]
Output: 0
Explanation: All nodes belong to different groups and there are no valid pairs. Therefore, the total interaction cost is 0.
```

## Approach
Instead of summing path lengths pair by pair, count how many same-group paths use each edge (the classic "contribution of an edge" technique).

Root the tree at node 0. Removing the edge `(parent, child)` splits the tree into the subtree of `child` and the rest. For a label `g`, if the child's subtree contains `c_g` nodes of label `g` and the whole tree contains `total_g`, then exactly `c_g · (total_g − c_g)` same-group pairs have their path crossing this edge, and each such crossing adds 1 to their interaction cost. Summing over all edges and all labels (at most 20) gives the answer.

Per-subtree label counts are computed bottom-up with one iterative DFS (avoids recursion depth issues for n = 10^5). The answer can reach ~n³/6, so use 64-bit integers.

```text
FUNCTION interactionCosts(n, edges, group):
    CREATE adj[n] as empty lists
    FOR each (u, v) IN edges
        APPEND v TO adj[u]
        APPEND u TO adj[v]
    total[1..20] ← 0
    FOR i ← 0 TO n-1
        total[group[i]] ← total[group[i]] + 1
    // iterative DFS from root 0 to get parent[] and a visiting order
    parent[0] ← -1; order ← []; stack ← [0]; mark 0 visited
    WHILE stack not empty
        u ← POP(stack); APPEND u TO order
        FOR v IN adj[u]
            IF v not visited
                mark v visited; parent[v] ← u; PUSH(stack, v)
    cnt[i][g] ← 1 IF group[i] = g ELSE 0
    ans ← 0
    FOR u IN order REVERSED            // children before parents
        IF parent[u] ≠ -1
            FOR g ← 1 TO 20
                c ← cnt[u][g]
                ans ← ans + c * (total[g] - c)   // pairs crossing edge (parent[u], u)
                cnt[parent[u]][g] ← cnt[parent[u]][g] + c
    RETURN ans
```

## Walkthrough
Example 3: `n = 4`, `edges = [[0,1],[0,2],[0,3]]`, `group = [1,1,4,4]`. Totals: `total[1] = 2`, `total[4] = 2`. Root at 0; nodes 1, 2, 3 are leaves.

| Edge (parent, child) | Subtree label counts | Contribution |
|----------------------|----------------------|--------------|
| (0, 1) | g1: 1 | 1 · (2 − 1) = 1 |
| (0, 2) | g4: 1 | 1 · (2 − 1) = 1 |
| (0, 3) | g4: 1 | 1 · (2 − 1) = 1 |

Total = 1 + 1 + 1 = **3**, matching the expected output (pair (0,1) costs 1, pair (2,3) costs 2 = the two edges (0,2) and (0,3)).

## Complexity Analysis
*Time*: `O(20 · n)` — one DFS plus 20 labels per edge.
*Space*: `O(20 · n)` for per-node label counts (can be reduced by processing labels one at a time, or by merging counts into the parent and discarding the child's array).

## Follow-Up Questions
1. If the number of distinct labels were up to `n`, how would you handle it (e.g., small-to-large merging or a virtual tree per label)?
2. How does the solution change if edges have positive weights?
3. How would you answer the same query restricted to pairs from *different* groups?

## Key Takeaway
The sum of pairwise tree distances equals the sum over edges of the number of pairs separated by that edge; with a small label set, tracking per-label subtree counts makes this O(labels · n).
