# 3820. Pythagorean Distance Nodes in a Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/pythagorean-distance-nodes-in-a-tree](https://leetcode.com/problems/pythagorean-distance-nodes-in-a-tree)
**Companies:** Paypal

---

## Problem Description

You are given an integer `n` and an undirected tree with `n` nodes numbered from 0 to `n - 1`. The tree is represented by a 2D array `edges` of length `n - 1`, where `edges[i] = [u_i, v_i]` indicates an undirected edge between `u_i` and `v_i`.

You are also given three **distinct** target nodes `x`, `y`, and `z`.

For any node `u` in the tree:

- Let `dx` be the distance from `u` to node `x`
- Let `dy` be the distance from `u` to node `y`
- Let `dz` be the distance from `u` to node `z`

The node `u` is called **special** if the three distances form a **Pythagorean Triplet**.

Return an integer denoting the number of special nodes in the tree.

A **Pythagorean triplet** consists of three integers `a`, `b`, and `c` which, when sorted in **ascending** order, satisfy `a^2 + b^2 = c^2`.

The **distance** between two nodes in a tree is the number of edges on the unique path between them.

**Constraints:**
- `4 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i] = [u_i, v_i]`
- `0 <= u_i, v_i, x, y, z <= n - 1`
- `x`, `y`, and `z` are pairwise **distinct**.
- The input is generated such that `edges` represent a valid tree.

## Examples

**Example 1:**
```
Input: n = 4, edges = [[0,1],[0,2],[0,3]], x = 1, y = 2, z = 3
Output: 3
Explanation:
For each node, we compute its distances to nodes x = 1, y = 2, and z = 3.
- Node 0 has distances 1, 1, and 1. After sorting, the distances are 1, 1, and 1, which do not satisfy the Pythagorean condition.
- Node 1 has distances 0, 2, and 2. After sorting, the distances are 0, 2, and 2. Since 0^2 + 2^2 = 2^2, node 1 is special.
- Node 2 has distances 2, 0, and 2. After sorting, the distances are 0, 2, and 2. Since 0^2 + 2^2 = 2^2, node 2 is special.
- Node 3 has distances 2, 2, and 0. After sorting, the distances are 0, 2, and 2. This also satisfies the Pythagorean condition.
Therefore, nodes 1, 2, and 3 are special, and the answer is 3.
```

**Example 2:**
```
Input: n = 4, edges = [[0,1],[1,2],[2,3]], x = 0, y = 3, z = 2
Output: 0
Explanation:
For each node, we compute its distances to nodes x = 0, y = 3, and z = 2.
- Node 0 has distances 0, 3, and 2. After sorting, the distances are 0, 2, and 3, which do not satisfy the Pythagorean condition.
- Node 1 has distances 1, 2, and 1. After sorting, the distances are 1, 1, and 2, which do not satisfy the Pythagorean condition.
- Node 2 has distances 2, 1, and 0. After sorting, the distances are 0, 1, and 2, which do not satisfy the Pythagorean condition.
- Node 3 has distances 3, 0, and 1. After sorting, the distances are 0, 1, and 3, which do not satisfy the Pythagorean condition.
No node satisfies the Pythagorean condition. Therefore, the answer is 0.
```

**Example 3:**
```
Input: n = 4, edges = [[0,1],[1,2],[1,3]], x = 1, y = 3, z = 0
Output: 1
Explanation:
For each node, we compute its distances to nodes x = 1, y = 3, and z = 0.
- Node 0 has distances 1, 2, and 0. After sorting, the distances are 0, 1, and 2, which do not satisfy the Pythagorean condition.
- Node 1 has distances 0, 1, and 1. After sorting, the distances are 0, 1, and 1. Since 0^2 + 1^2 = 1^2, node 1 is special.
- Node 2 has distances 1, 2, and 2. After sorting, the distances are 1, 2, and 2, which do not satisfy the Pythagorean condition.
- Node 3 has distances 1, 0, and 2. After sorting, the distances are 0, 1, and 2, which do not satisfy the Pythagorean condition.
Therefore, the answer is 1.
```

## Approach
Only distances to the three fixed targets matter, so compute them with three BFS passes (the tree is unweighted): `dx[]` from `x`, `dy[]` from `y`, `dz[]` from `z`. Then, for every node `u`, sort `(dx[u], dy[u], dz[u])` into `a <= b <= c` and count `u` if `a² + b² = c²`. Note that `0` is allowed, so each target node is special exactly when its distances to the other two targets are equal.

```text
FUNCTION countSpecialNodes(n, edges, x, y, z):
    BUILD adjacency list from edges
    SET dx ← BFS(x)
    SET dy ← BFS(y)
    SET dz ← BFS(z)
    SET count ← 0
    FOR u ← 0 TO n - 1:
        SET (a, b, c) ← SORTED(dx[u], dy[u], dz[u])
        IF a*a + b*b = c*c:
            INCREMENT count
    RETURN count

FUNCTION BFS(source):
    SET dist ← ARRAY OF -1 LENGTH n
    SET dist[source] ← 0
    SET queue ← [source]
    WHILE queue NOT EMPTY:
        SET node ← POP FRONT(queue)
        FOR each next IN adjacency[node]:
            IF dist[next] = -1:
                SET dist[next] ← dist[node] + 1
                PUSH next TO queue
    RETURN dist
```

## Walkthrough
Example 3: `n = 4`, `edges = [[0,1],[1,2],[1,3]]`, `x = 1`, `y = 3`, `z = 0` (star centered at node 1).

| Node | dx (to 1) | dy (to 3) | dz (to 0) | Sorted | a² + b² vs c² | Special? |
|------|-----------|-----------|-----------|--------|---------------|----------|
| 0 | 1 | 2 | 0 | (0,1,2) | 1 vs 4 | no |
| 1 | 0 | 1 | 1 | (0,1,1) | 1 vs 1 | yes |
| 2 | 1 | 2 | 2 | (1,2,2) | 5 vs 4 | no |
| 3 | 1 | 0 | 2 | (0,1,2) | 1 vs 4 | no |

Count = `1`.

## Complexity Analysis
- **Time:** O(n) - three BFS traversals plus a constant-time check per node.
- **Space:** O(n) for the adjacency list, queue, and three distance arrays.

## Follow-Up Questions
1. How would you handle weighted edges (use DFS with accumulated weights, still O(n) on a tree)?
2. How would you answer many queries `(x, y, z)` efficiently (LCA with binary lifting to get each distance in O(log n))?
3. What if the condition involved `k` target nodes instead of three - how does the cost scale?

## Key Takeaway
When a property depends on distances to a few fixed nodes, run one BFS per target and evaluate the condition per node - no pairwise or centroid machinery needed.
