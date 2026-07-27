# 919. Complete Binary Tree Inserter

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/complete-binary-tree-inserter](https://leetcode.com/problems/complete-binary-tree-inserter)
**Companies:** Amazon, Google, Meta

---

```
CLASS CBTInserter:
    CONSTRUCTOR(root):
        self.tree = [root]
        // BFS to collect all nodes
        queue = [root]
        WHILE queue:
            node = queue.POPLEFT()
            IF node.left: tree.ADD(node.left); queue.ADD(node.left)
            IF node.right: tree.ADD(node.right); queue.ADD(node.right)

    FUNCTION insert(val):
        node = TreeNode(val)
        tree.ADD(node)
        parent = tree[(len(tree) - 2) // 2]
        IF NOT parent.left: parent.left = node
        ELSE: parent.right = node
        RETURN parent.val

    FUNCTION get_root(): RETURN tree[0]
```
