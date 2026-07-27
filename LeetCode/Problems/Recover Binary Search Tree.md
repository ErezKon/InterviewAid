# 99. Recover Binary Search Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/recover-binary-search-tree](https://leetcode.com/problems/recover-binary-search-tree)
**Companies:** Amazon, Bloomberg, Google, Medianet, Meta, Microsoft, Tiktok

---

## Approach: Morris Inorder — O(n), O(1) space ✅

```
FUNCTION recoverTree(root):
    first = second = prev = null

    // Inorder traversal
    FUNCTION inorder(node):
        IF node == null: RETURN
        inorder(node.left)
        IF prev AND prev.val > node.val:
            IF first == null: first = prev
            second = node
        prev = node
        inorder(node.right)

    inorder(root)
    SWAP(first.val, second.val)
```

In inorder, find two nodes that are out of order. First = first larger, second = last smaller.
