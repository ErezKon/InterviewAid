# 958. Check Completeness of a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-completeness-of-a-binary-tree](https://leetcode.com/problems/check-completeness-of-a-binary-tree)
**Companies:** Amazon, Google, Lyft, Meta, Microsoft

---

```
FUNCTION isCompleteTree(root):
    queue = [root]
    seenNull = false

    WHILE queue:
        node = queue.DEQUEUE()
        IF node == null:
            seenNull = true
        ELSE:
            IF seenNull: RETURN false
            queue.ENQUEUE(node.left)
            queue.ENQUEUE(node.right)

    RETURN true
```

BFS level order. After first null, all subsequent must be null.
