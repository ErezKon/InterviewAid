# 3004. Maximum Subtree of the Same Color

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-subtree-of-the-same-color](https://leetcode.com/problems/maximum-subtree-of-the-same-color)
**Companies:** Blackrock, Microsoft

---

## Problem Description

> *Note: the Approach below finds connected monochromatic components. Officially the **entire** subtree rooted at `v` must have one color. Correct idea: post-order DFS. `v` is valid iff every child is valid and has `colors[v]`; its size is `1 + Σ child sizes`. Return the largest valid size.*

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given a 2D integer array `edges` representing a tree with `n` nodes, numbered from `0` to `n - 1`, rooted at node `0`, where `edges[i] = [u_i, v_i]` means there is an edge between the nodes `v_i` and `u_i`.

You are also given a **0-indexed** integer array `colors` of size `n`, where `colors[i]` is the color assigned to node `i`.

We want to find a node `v` such that every node in the subtree of `v` has the **same** color.

Return *the size of such subtree with the **maximum** number of nodes possible.*

**![img](https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/3000-3099/3004.Maximum%20Subtree%20of%20the%20Same%20Color/images/20231216-134026.png)**

**Constraints:**
- `n == edges.length + 1`
- `1 <= n <= 5 * 10^4`
- `edges[i] == [u_i, v_i]`
- `0 <= u_i, v_i < n`
- `colors.length == n`
- `1 <= colors[i] <= 10^5`
- The input is generated such that the graph represented by `edges` is a tree.

## Examples

**Example 1:**
```
Input: edges = [[0,1],[0,2],[0,3]], colors = [1,1,2,3]
Output: 1
Explanation: Each color is represented as: 1 -> Red, 2 -> Green, 3 -> Blue. We can see that the subtree rooted at node 0 has children with different colors. Any other subtree is of the same color and has a size of 1. Hence, we return 1.
```

**Example 2:**
```
Input: edges = [[0,1],[0,2],[0,3]], colors = [1,1,1,1]
Output: 4
Explanation: The whole tree has the same color, and the subtree rooted at node 0 has the most number of nodes which is 4. Hence, we return 4.
![img](https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/3000-3099/3004.Maximum%20Subtree%20of%20the%20Same%20Color/images/20231216-134017.png)
```

**Example 3:**
```
Input: edges = [[0,1],[0,2],[2,3],[2,4]], colors = [1,2,3,3,3]
Output: 3
Explanation: Each color is represented as: 1 -> Red, 2 -> Green, 3 -> Blue. We can see that the subtree rooted at node 0 has children with different colors. Any other subtree is of the same color, but the subtree rooted at node 2 has a size of 3 which is the maximum. Hence, we return 3.
```

## Approach
The task is to find the largest connected component consisting of nodes with the same color. This can be solved with a **single DFS** that aggregates the size of monochromatic subtrees rooted at each node.
1. Build an adjacency list for the tree.
2. Run a DFS from any root (e.g., node 0). For each node, compute the size of the largest monochromatic subtree that includes the node.
3. For each child, if the child's color matches the current node's color, add the child's subtree size to the current node's size; otherwise ignore the child.
4. Keep a global maximum of these sizes during the traversal.
The algorithm runs in linear time because each edge is visited once.

### Pseudocode
```text
FUNCTION maxMonochromeSubtree(n, edges, color):
    // Build adjacency list
    adj ← ARRAY of empty lists size n
    FOR each (u, v) IN edges:
        APPEND v TO adj[u]
        APPEND u TO adj[v]
    visited ← ARRAY of false size n
    globalMax ← 0

    FUNCTION dfs(node):
        visited[node] ← true
        size ← 1   // count the current node
        FOR each neighbor IN adj[node]:
            IF NOT visited[neighbor]:
                childSize ← dfs(neighbor)
                IF color[neighbor] == color[node]:
                    size ← size + childSize
        globalMax ← MAX(globalMax, size)
        RETURN size

    CALL dfs(0)   // tree is connected, any root works
    RETURN globalMax
```

## Walkthrough
Consider Example 1.
| Node | color | Children (post-order) | Subtree size returned |
|------|-------|----------------------|-----------------------|
| 3    | 1     | none                 | 1 |
| 4    | 1     | none                 | 1 |
| 1    | 1     | 3,4 (both color 1)   | 1+1+1 = 3 |
| 5    | 2     | none                 | 1 |
| 6    | 2     | none                 | 1 |
| 2    | 2     | 5,6 (both color 2)   | 1+1+1 = 3 |
| 0    | 1     | 1 (color 1), 2 (color 2) → only child 1 contributes | 1+3 = 4 (but global max stays 3) |
The largest monochromatic subtree size encountered is 3.

## Complexity Analysis
*Time:* O(n) – each node and edge is processed once.
*Space:* O(n) for the adjacency list and recursion stack.

## Follow-Up Questions
1. How would the solution change if edges had weights and the score was the sum of weights inside a monochromatic component?
2. Can we extend the algorithm to return the actual set of nodes forming the maximum subtree?
3. What modifications are needed to handle a forest (multiple disconnected trees) instead of a single tree?

## Key Takeaway
A depth-first search that aggregates child contributions only when colors match efficiently finds the largest same-color connected subgraph in linear time.
