# 1367. Linked List in Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/linked-list-in-binary-tree](https://leetcode.com/problems/linked-list-in-binary-tree)
**Companies:** Amazon, Bloomberg, Google, Meta, Soundhound

---

## 1. Problem Description

Check if a linked list corresponds to any downward path in a binary tree.

---

## 2. Examples

| Linked List | Binary Tree | Output | Explanation |
|-------------|-------------|--------|-------------|
| `1 → 4 → 2` | ![tree](tree1.png) | `true` | The path `1 → 4 → 2` exists from root to a leaf. |
| `1 → 4 → 3` | ![tree](tree2.png) | `false` | No downward path matches the sequence.

---

## 3. Approach

**Depth‑First Search (DFS) with two‑level recursion** – For each tree node, try to match the linked list starting there; if it fails, recurse on left and right children.

```text
FUNCTION isSubPath(head, root):
    IF root == null:
        RETURN false
    RETURN dfs(head, root) OR isSubPath(head, root.left) OR isSubPath(head, root.right)

FUNCTION dfs(listNode, treeNode):
    IF listNode == null:
        RETURN true
    IF treeNode == null:
        RETURN false
    IF listNode.val != treeNode.val:
        RETURN false
    RETURN dfs(listNode.next, treeNode.left) OR dfs(listNode.next, treeNode.right)
```

---

## 4. Walkthrough

Consider linked list `1 → 4 → 2` and the tree:

```
      1
     / \
    4   5
   / \
  2   3
```

| Step | treeNode.val | listNode.val | Action |
|------|--------------|--------------|--------|
| 1 | 1 (root) | 1 | values match, recurse on children |
| 2 | 4 (left child) | 4 | match, recurse |
| 3 | 2 (left‑left) | 2 | match, list exhausted → return true |

Thus `isSubPath` returns `true`.

---

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time | O(n·m) – for each of the `n` tree nodes we may traverse up to `m` list nodes |
| Space | O(h₁ + h₂) – recursion depth of tree (`h₁`) and list (`h₂`) |

---

## 6. Follow‑Up Questions

1. How can you improve the time complexity using KMP preprocessing on the linked list?
2. What changes are needed if the path can go upwards as well as downwards?
3. How would you handle multiple queries on the same tree efficiently?

---

## Key Takeaway

> Two‑level DFS checks every possible starting point in the tree while matching the linked list along a downward path.
