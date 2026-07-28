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

```text
FUNCTION copyRandomBinaryTree(root):
    IF root IS null: RETURN null
    map ← {}  // original → clone
    
    FUNCTION clone(node):
        IF node IS null: RETURN null
        IF node IN map: RETURN map[node]
        copy ← new Node(node.val)
        map[node] ← copy
        copy.left ← clone(node.left)
        copy.right ← clone(node.right)
        copy.random ← clone(node.random)
        RETURN copy
    
    RETURN clone(root)
```

---

## 4. Examples

| Input Tree | Output Deep Copy |
|------------|-------------------|
| `root = [1,null,2,3]` with random pointers `1.random = 3`, `2.random = 1`, `3.random = null` | A new tree with identical structure and random links, but all nodes are new instances |
| `root = null` | `null` |

---

## 5. Walkthrough

Consider the tree `1 -> 2 -> 3` where `1.random = 3`, `2.random = 1`, `3.random = null`.

1. Call `clone(root)` on node `1`. Since `1` not in map, create `copy1`.
2. Recursively clone left (`null`) → `null`; right child `2` → create `copy2`.
3. For `copy2`, clone its left child `3` → create `copy3`.
4. `copy3`'s children are `null`; return `copy3`.
5. Wire `copy2.random = clone(1)` → returns `copy1` from map.
6. Wire `copy1.random = clone(3)` → returns `copy3`.
7. Final cloned tree mirrors original with correct random pointers.

---

## 6. Complexity Analysis

- **Time:** O(n) – each node visited once.
- **Space:** O(n) – hashmap stores a mapping for each node plus recursion stack.

---

## 7. Follow-Up Questions

- How would you modify the algorithm to work iteratively?
- Can you clone the tree using O(1) extra space (excluding output) by interleaving nodes?

---

## Key Takeaway

> Same pattern as cloning a linked list with random pointers: hashmap from original to clone, then recursively build and wire all pointers.
