# 426. Convert Binary Search Tree to Sorted Doubly Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list](https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list)
**Companies:** Amazon, Meta, Microsoft, Tiktok

---

```
FUNCTION treeToDoublyList(root):
    IF NOT root: RETURN null
    first = last = null

    FUNCTION inorder(node):
        IF NOT node: RETURN
        inorder(node.left)
        IF last:
            last.right = node
            node.left = last
        ELSE:
            first = node
        last = node
        inorder(node.right)

    inorder(root)
    first.left = last
    last.right = first
    RETURN first
```

Inorder traversal linking nodes. Connect head and tail for circular list.
