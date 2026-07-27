# 742. Closest Leaf in a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/closest-leaf-in-a-binary-tree](https://leetcode.com/problems/closest-leaf-in-a-binary-tree)
**Companies:** Amazon, Databricks, Linkedin

---

```
FUNCTION findClosestLeaf(root, k):
    // Build undirected graph from tree
    // BFS from node k to nearest leaf
    graph = defaultdict(list); leaves = set()
    FUNCTION buildGraph(node, parent):
        IF NOT node: RETURN
        IF NOT node.left AND NOT node.right: leaves.ADD(node.val)
        IF parent: graph[node.val].ADD(parent.val); graph[parent.val].ADD(node.val)
        buildGraph(node.left, node); buildGraph(node.right, node)
    buildGraph(root, null)
    // BFS from k
    queue = [k]; visited = {k}
    WHILE queue:
        FOR node IN queue:
            IF node IN leaves: RETURN node
        queue = [n for node in queue for n in graph[node] if n not in visited]
        visited |= SET(queue)
```
