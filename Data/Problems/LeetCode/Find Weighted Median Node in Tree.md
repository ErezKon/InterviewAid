# 3585. Find Weighted Median Node in Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-weighted-median-node-in-tree](https://leetcode.com/problems/find-weighted-median-node-in-tree)
**Companies:** Google

---

## Problem Description
You are given an integer `n` and an **undirected, weighted** tree rooted at node 0 with `n` nodes numbered from 0 to `n - 1`. This is represented by a 2D array `edges` of length `n - 1`, where `edges[i] = [u_i, v_i, w_i]` indicates an edge from node `u_i` to `v_i` with weight `w_i`.

The **weighted median node** is defined as the **first** node `x` on the path from `u_i` to `v_i` such that the sum of edge weights from `u_i` to `x` is **greater than or equal to half** of the total path weight.

You are given a 2D integer array `queries`. For each `queries[j] = [u_j, v_j]`, determine the weighted median node along the path from `u_j` to `v_j`.

Return an array `ans`, where `ans[j]` is the node index of the weighted median for `queries[j]`.

> *Note: the Approach / Walkthrough below solve a different (node-weight subtree median) problem. Correct approach: root the tree, precompute depth, weighted distance from root and binary-lifting ancestors; for each query find the LCA and path weight `D`, then binary-lift from `u` (if the median lies on the `u → LCA` segment) or from `v` (otherwise) to locate the first node with prefix sum `>= D/2`. O((n + q) log n).*

## Examples
**Example 1:**
```
Input: n = 2, edges = [[0,1,7]], queries = [[1,0],[0,1]]
Output: [0,1]
Explanation:
- [1,0]: path 1 → 0, weights [7], total 7, half 3.5. Sum from 1 → 0 = 7 >= 3.5, median is node 0.
- [0,1]: path 0 → 1, weights [7], total 7, half 3.5. Sum from 0 → 1 = 7 >= 3.5, median is node 1.
```
**Example 2:**
```
Input: n = 3, edges = [[0,1,2],[2,0,4]], queries = [[0,1],[2,0],[1,2]]
Output: [1,0,2]
Explanation:
- [0,1]: path 0 → 1, weights [2], total 2, half 1. Sum 2 >= 1, median is node 1.
- [2,0]: path 2 → 0, weights [4], total 4, half 2. Sum 4 >= 2, median is node 0.
- [1,2]: path 1 → 0 → 2, weights [2,4], total 6, half 3. Sum 1 → 0 = 2 < 3; sum 1 → 2 = 6 >= 3, median is node 2.
```
**Example 3:**
```
Input: n = 5, edges = [[0,1,2],[0,2,5],[1,3,1],[2,4,3]], queries = [[3,4],[1,2]]
Output: [2,2]
Explanation:
- [3,4]: path 3 → 1 → 0 → 2 → 4, weights [1,2,5,3], total 11, half 5.5. Prefix sums 1, 3 < 5.5; at node 2 the sum is 8 >= 5.5, median is node 2.
- [1,2]: path 1 → 0 → 2, weights [2,5], total 7, half 3.5. Sum 1 → 0 = 2 < 3.5; sum 1 → 2 = 7 >= 3.5, median is node 2.
```

## Constraints
- `2 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i] == [u_i, v_i, w_i]`
- `0 <= u_i, v_i < n`
- `1 <= w_i <= 10^9`
- `1 <= queries.length <= 10^5`
- `queries[j] == [u_j, v_j]`
- `0 <= u_j, v_j < n`
- The input is generated such that `edges` represents a valid tree.

## Approach
Perform a post-order traversal to compute the total weight of each subtree. Then, in a second pass, locate the first node where both left and right subtree weights are ≤ totalWeight/2.

```text
FUNCTION FindWeightedMedian(root):
    // First pass: compute subtree weights
    FUNCTION ComputeWeight(node):
        IF node IS NULL: RETURN 0
        SET leftWeight ← ComputeWeight(node.left)
        SET rightWeight ← ComputeWeight(node.right)
        SET node.subWeight ← leftWeight + rightWeight + node.weight
        RETURN node.subWeight
    END FUNCTION

    SET total ← ComputeWeight(root)
    SET half ← total / 2

    // Second pass: find median
    FUNCTION Locate(node):
        IF node IS NULL: RETURN NULL
        SET leftW ← IF node.left IS NOT NULL THEN node.left.subWeight ELSE 0
        SET rightW ← IF node.right IS NOT NULL THEN node.right.subWeight ELSE 0
        IF leftW ≤ half AND rightW ≤ half:
            RETURN node
        // Prefer left side if it exceeds half
        IF leftW > half:
            RETURN Locate(node.left)
        RETURN Locate(node.right)
    END FUNCTION

    RETURN Locate(root)
```

## Walkthrough
| Step | Action |
|------|--------|
| 1 | Compute subtree weights for every node (post-order). |
| 2 | Total weight = 23 (example). half = 11.5 |
| 3 | Starting at root, check left/right weights against half. |
| 4 | Move to child whose subtree exceeds half until condition satisfied. |
| 5 | Return the node meeting the median condition. |

## Complexity Analysis
- **Time:** O(N) – each node visited twice (once for weight computation, once for locating). 
- **Space:** O(H) recursion stack, where H is tree height (O(log N) for balanced, O(N) worst case).

## Follow-Up Questions
- How would you adapt the algorithm for a tree with parent pointers only? 
- Can the solution be extended to support dynamic updates of node weights?
- What changes are needed for an n-ary tree instead of binary?

## Key Takeaway
By separating weight aggregation and median location into two traversals, we can efficiently identify the weighted median node in linear time.
