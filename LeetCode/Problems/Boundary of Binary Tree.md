# 545. Boundary of Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/boundary-of-binary-tree](https://leetcode.com/problems/boundary-of-binary-tree)
**Companies:** Adobe, Amazon, Geico, Google, Meta, Microsoft, Nutanix, Oracle, Salesforce, Snowflake, Uber

---

## Approach: Three Passes — O(n) ✅

```
FUNCTION boundaryOfBinaryTree(root):
    IF root is leaf: RETURN [root.val]

    result = [root.val]

    // 1. Left boundary (exclude root and leaves)
    node = root.left
    WHILE node AND NOT isLeaf(node):
        result.ADD(node.val)
        node = node.left IF node.left ELSE node.right

    // 2. All leaves (left to right)
    addLeaves(root, result)

    // 3. Right boundary (exclude root and leaves, add in reverse)
    rightBoundary = []
    node = root.right
    WHILE node AND NOT isLeaf(node):
        rightBoundary.ADD(node.val)
        node = node.right IF node.right ELSE node.left
    result += REVERSE(rightBoundary)

    RETURN result
```
