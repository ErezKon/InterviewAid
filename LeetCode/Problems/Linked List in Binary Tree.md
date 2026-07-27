# 1367. Linked List in Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/linked-list-in-binary-tree](https://leetcode.com/problems/linked-list-in-binary-tree)
**Companies:** Amazon, Bloomberg, Google, Meta, Soundhound

---

## 1. Problem Description

Check if a linked list corresponds to any downward path in a binary tree.

---

## 2. Approach: DFS — O(n·m) ✅

Try matching the linked list starting from every tree node.

```
FUNCTION isSubPath(head, root):
    IF root == null: RETURN false
    RETURN dfs(head, root) OR isSubPath(head, root.left) OR isSubPath(head, root.right)

FUNCTION dfs(listNode, treeNode):
    IF listNode == null: RETURN true
    IF treeNode == null: RETURN false
    IF listNode.val != treeNode.val: RETURN false
    RETURN dfs(listNode.next, treeNode.left) OR dfs(listNode.next, treeNode.right)
```

| Time | Space |
|------|-------|
| O(n · m) | O(n + m) recursion |

---

## 3. Key Takeaway

> Two-level recursion: outer traverses tree nodes as starting points, inner matches list along a path. Can optimize with KMP on trees for O(n + m).
