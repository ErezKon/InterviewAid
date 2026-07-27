# 863. All Nodes Distance K in Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree)
**Companies:** Amazon, Apple, Bloomberg, Flipkart, Google, Meta, Microsoft, Nvidia, Okta, Oracle, Salesforce, Tiktok, Wix

---

## Approach: Convert to Graph + BFS — O(n) ✅

```
FUNCTION distanceK(root, target, k):
    // Build parent pointers
    parent = {}
    FUNCTION buildParent(node, par):
        IF node == null: RETURN
        parent[node] = par
        buildParent(node.left, node)
        buildParent(node.right, node)
    buildParent(root, null)

    // BFS from target
    visited = {target}
    queue = [target]
    dist = 0

    WHILE queue AND dist < k:
        dist += 1
        nextLevel = []
        FOR node IN queue:
            FOR neighbor IN [node.left, node.right, parent[node]]:
                IF neighbor AND neighbor NOT IN visited:
                    visited.ADD(neighbor)
                    nextLevel.ADD(neighbor)
        queue = nextLevel

    RETURN [node.val for node in queue]
```

Build parent pointers to make the tree navigable like an undirected graph, then BFS k levels from target.
