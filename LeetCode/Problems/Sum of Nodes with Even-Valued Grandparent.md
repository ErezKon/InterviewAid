# 1315. Sum of Nodes with Even-Valued Grandparent

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-nodes-with-even-valued-grandparent](https://leetcode.com/problems/sum-of-nodes-with-even-valued-grandparent)
**Companies:** Amazon, Josh Technology, Meta, Salesforce

---

```
FUNCTION sumEvenGrandparent(root):
    total = 0
    FUNCTION dfs(node, parent, grandparent):
        IF node == null: RETURN
        IF grandparent AND grandparent.val % 2 == 0:
            total += node.val
        dfs(node.left, node, parent)
        dfs(node.right, node, parent)

    dfs(root, null, null)
    RETURN total
```
