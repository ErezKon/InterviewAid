# 1361. Validate Binary Tree Nodes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/validate-binary-tree-nodes](https://leetcode.com/problems/validate-binary-tree-nodes)
**Companies:** Google, Meta, Microsoft

---

```
FUNCTION validateBinaryTreeNodes(n, leftChild, rightChild):
    inDeg = [0] * n
    FOR i ← 0 TO n - 1:
        IF leftChild[i] != -1: inDeg[leftChild[i]] += 1
        IF rightChild[i] != -1: inDeg[rightChild[i]] += 1
    roots = [i for i in range(n) if inDeg[i] == 0]
    IF len(roots) != 1: RETURN false
    // BFS from root, check all nodes visited exactly once
    visited = set(); queue = [roots[0]]
    WHILE queue:
        node = queue.POPLEFT()
        IF node IN visited: RETURN false
        visited.ADD(node)
        IF leftChild[node] != -1: queue.ADD(leftChild[node])
        IF rightChild[node] != -1: queue.ADD(rightChild[node])
    RETURN len(visited) == n
```
