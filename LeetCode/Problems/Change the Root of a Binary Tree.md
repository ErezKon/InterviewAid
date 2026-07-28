# 1666. Change the Root of a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/change-the-root-of-a-binary-tree](https://leetcode.com/problems/change-the-root-of-a-binary-tree)
**Companies:** Google

---

## 1. Problem Description

Given a binary tree where each node has a parent pointer, re‑root the tree at a specified node. All parent and child pointers must be updated so the chosen node becomes the new root.

---

## Examples

| Original Root | New Root | Updated Parent Pointers |
|---------------|----------|--------------------------|
| 1 → 2 → 3    | 3        | 3 becomes root; 2 becomes child of 3; 1 becomes child of 2 |
| 4 → 5        | 5        | 5 becomes root; 4 becomes child of 5 |

---

## 2. Approach: Walk to Root + Reverse Pointers — O(h) ✅

```text
FUNCTION changeRoot(node):
    // Walk from the new root up to the old root, reversing links
    prev ← null
    curr ← node
    WHILE curr IS NOT null:
        parent ← curr.parent
        // Reverse the direction of the edge
        curr.parent ← prev
        // Attach the previous parent as a child of the current node
        IF curr.left == prev:
            curr.left ← parent
        ELSE:
            // Preserve the other child
            other ← curr.left IF curr.right == prev ELSE curr.right
            curr.right ← parent
            curr.left ← other
        prev ← curr
        curr ← parent
    RETURN node  // new root
```

---

## Walkthrough

1. **Start** at the desired new root `node`.
2. **Iterate** upward: store current parent, redirect `parent` pointer to `prev` (the node processed in the previous iteration).
3. **Re‑attach** the original child (if any) that led to `prev` so the tree structure remains valid.
4. Continue until reaching the original root (where `parent` becomes `null`).
5. The last processed node (`node`) is now the root with correct parent/child links.

---

## Complexity Analysis

- **Time:** O(h) where *h* is the height of the tree – each node on the path to the original root is visited once.
- **Space:** O(1) additional space; only a few pointers are stored.

---

## Follow‑Up Questions

- How would you adapt the algorithm if nodes did **not** have parent pointers?
- Can you perform the re‑rooting in a single recursive pass?
- What changes are needed for a multi‑way tree (each node may have many children)?

---

## Key Takeaway

> Re‑rooting with parent pointers is analogous to reversing a singly linked list: walk from the new root to the old root, flipping parent‑child links along the way.
