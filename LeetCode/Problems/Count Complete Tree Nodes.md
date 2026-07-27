# 222. Count Complete Tree Nodes

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-complete-tree-nodes](https://leetcode.com/problems/count-complete-tree-nodes)
**Companies:** Adobe, Amazon, Bloomberg, Flipkart, Google, Meta, Microsoft

---

## Approach: Binary Search on Last Level — O(log²n) ✅

```
FUNCTION countNodes(root):
    IF root == null: RETURN 0

    leftH = height(root.left)
    rightH = height(root.right)

    IF leftH == rightH:
        // Left subtree is perfect
        RETURN (1 << leftH) + countNodes(root.right)
    ELSE:
        // Right subtree is perfect (one level shorter)
        RETURN (1 << rightH) + countNodes(root.left)

FUNCTION height(node):
    h = 0
    WHILE node: h += 1; node = node.left
    RETURN h
```

Exploit the complete tree property: one subtree is always perfect.
