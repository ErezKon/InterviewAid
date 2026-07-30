# 863. All Nodes Distance K in Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree)
**Companies:** Amazon, Apple, Bloomberg, Flipkart, Google, Meta, Microsoft, Nvidia, Okta, Oracle, Salesforce, Tiktok, Wix

---

## Problem Description
Given the root of a binary tree, a target node `target`, and an integer `k`, return the values of all nodes that are exactly `k` edges away from the target node.

## Examples
**Example 1**
Input: `root = [3,5,1,6,2,0,8,null,null,7,4]`, `target = 5`, `k = 2`
Output: `[7,4,1]`
Explanation: Nodes 7, 4, and 1 are two edges away from node 5.

**Example 2**
Input: `root = [1]`, `target = 1`, `k = 3`
Output: `[]`
Explanation: No nodes are at distance 3.

## Approach
**Algorithm:** Convert the tree to an undirected graph using parent pointers, then perform BFS from the target.
1. **Build parent map** – DFS/BFS to record each node's parent.
2. **BFS** – start from `target`, explore neighbors (left child, right child, parent) level by level until reaching distance `k`.
3. Collect all node values in the queue when the current distance equals `k`.

## Walkthrough
| Step | Nodes visited | Queue | Distance |
|------|----------------|-------|----------|
| 0 | target (5) | [5] | 0 |
| 1 | expand to 6,2,3 | [6,2,3] | 1 |
| 2 | expand to 7,4,1 (from 2 and 3) | [7,4,1] | 2 → collect these values |

## Complexity Analysis
- **Time:** O(N) where N is the number of nodes (each node visited at most once).
- **Space:** O(N) for the parent map and BFS queue.

## Follow‑Up Questions
1. How would you modify the solution to return nodes in sorted order?
2. Can you solve the problem without extra space for the parent map by using recursion?
3. What changes are needed if the tree is not binary but an N‑ary tree?

## Key Takeaway
Transforming a binary tree into an undirected graph via parent pointers enables a simple BFS to find all nodes at a given distance from a target.

---

```text
FUNCTION distanceK(root, target, k):
    parent ← MAP()
    // Build parent pointers
    FUNCTION dfs(node, par):
        IF node = null: RETURN
        parent[node] ← par
        dfs(node.left, node)
        dfs(node.right, node)
    dfs(root, null)

    visited ← SET(target)
    queue ← [target]
    dist ← 0
    WHILE queue NOT EMPTY AND dist < k:
        dist ← dist + 1
        nextQueue ← []
        FOR node IN queue:
            FOR neighbor IN [node.left, node.right, parent[node]]:
                IF neighbor != null AND neighbor NOT IN visited:
                    ADD neighbor TO visited
                    APPEND neighbor TO nextQueue
        queue ← nextQueue
    RETURN [node.val FOR node IN queue]
```