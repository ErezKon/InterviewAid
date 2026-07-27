# 655. Print Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/print-binary-tree](https://leetcode.com/problems/print-binary-tree)
**Companies:** Amazon, Google, Meta, Microsoft, Poynt

---

```
FUNCTION printTree(root):
    height = getHeight(root)
    rows = height + 1
    cols = 2^(height + 1) - 1
    result = [[""] * cols for _ in range(rows)]

    FUNCTION fill(node, row, lo, hi):
        IF node == null: RETURN
        mid = (lo + hi) / 2
        result[row][mid] = str(node.val)
        fill(node.left, row + 1, lo, mid - 1)
        fill(node.right, row + 1, mid + 1, hi)

    fill(root, 0, 0, cols - 1)
    RETURN result
```
