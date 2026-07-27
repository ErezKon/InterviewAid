# 1382. Balance a Binary Search Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/balance-a-binary-search-tree](https://leetcode.com/problems/balance-a-binary-search-tree)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION balanceBST(root):
    nodes = []
    FUNCTION inorder(node):
        IF node == null: RETURN
        inorder(node.left)
        nodes.ADD(node)
        inorder(node.right)

    inorder(root)

    FUNCTION build(lo, hi):
        IF lo > hi: RETURN null
        mid = (lo + hi) / 2
        node = nodes[mid]
        node.left = build(lo, mid - 1)
        node.right = build(mid + 1, hi)
        RETURN node

    RETURN build(0, len(nodes) - 1)
```
