# 314. Binary Tree Vertical Order Traversal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-vertical-order-traversal](https://leetcode.com/problems/binary-tree-vertical-order-traversal)
**Companies:** Amazon, Anduril, Apple, Bloomberg, Doordash, Google, Meta, Microsoft, Snapchat

---

## Approach: BFS with Column Tracking — O(n) ✅

```
FUNCTION verticalOrder(root):
    IF root == null: RETURN []
    columns = defaultdict(list)
    queue = [(root, 0)]

    WHILE queue:
        (node, col) = queue.DEQUEUE()
        columns[col].ADD(node.val)
        IF node.left: queue.ENQUEUE((node.left, col - 1))
        IF node.right: queue.ENQUEUE((node.right, col + 1))

    RETURN [columns[c] for c in sorted(columns.keys())]
```

BFS ensures top-to-bottom order within each column. Track column index.
