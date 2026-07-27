# 1485. Clone Binary Tree With Random Pointer

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/clone-binary-tree-with-random-pointer](https://leetcode.com/problems/clone-binary-tree-with-random-pointer)
**Companies:** Amazon, Meta

---

## 1. Problem Description

Given a binary tree where each node has an additional `random` pointer that can point to any node in the tree or `null`, return a **deep copy** of the tree.

---

## 2. Key Insight

> Use a hashmap to map original nodes to their clones. First pass: clone the tree structure (left/right). Second pass (or inline): wire up the `random` pointers using the map.

---

## 3. Approach: DFS + HashMap — O(n) ✅

```
FUNCTION copyRandomBinaryTree(root):
    IF root IS null: RETURN null
    map = {}  // original → clone
    
    FUNCTION clone(node):
        IF node IS null: RETURN null
        IF node IN map: RETURN map[node]
        copy = new Node(node.val)
        map[node] = copy
        copy.left = clone(node.left)
        copy.right = clone(node.right)
        copy.random = clone(node.random)
        RETURN copy
    
    RETURN clone(root)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Same pattern as cloning a linked list with random pointers: hashmap from original to clone, then recursively build and wire all pointers.
