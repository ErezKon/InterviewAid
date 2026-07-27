# 110. Balanced Binary Tree

**Difficulty:** 🟢 Easy
**Acceptance:** 53.0%
**LeetCode:** [https://leetcode.com/problems/balanced-binary-tree](https://leetcode.com/problems/balanced-binary-tree)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Viasat, Visa

---

## Approach: Bottom-Up DFS — O(n) ✅

```
FUNCTION isBalanced(root):
    RETURN height(root) != -1

FUNCTION height(node):
    IF node == null: RETURN 0

    left = height(node.left)
    IF left == -1: RETURN -1

    right = height(node.right)
    IF right == -1: RETURN -1

    IF ABS(left - right) > 1: RETURN -1

    RETURN 1 + MAX(left, right)
```

Return -1 as sentinel for "unbalanced." Each node visited once → O(n).
