# 1666. Change the Root of a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/change-the-root-of-a-binary-tree](https://leetcode.com/problems/change-the-root-of-a-binary-tree)
**Companies:** Google

---

## 1. Problem Description

Given the `root` of a binary tree and a `leaf` node, reroot the tree so that the `leaf` is the new root.

You can reroot the tree with the following steps for each node `cur` on the path **starting from the** `leaf` up to the `root` **excluding the root**:

1. If `cur` has a left child, then that child becomes `cur`'s right child.
2. `cur`'s original parent becomes `cur`'s left child. Note that in this process the original parent's pointer to `cur` becomes `null`, making it have at most one child.

Return *the new root of the rerooted tree.*

**Note:** Ensure that your solution sets the `Node.parent` pointers correctly after rerooting or you will receive "Wrong Answer".

**Constraints:**
- The number of nodes in the tree is in the range `[2, 100]`.
- `-10^9 <= Node.val <= 10^9`
- All `Node.val` are **unique**.
- `leaf` exist in the tree.

---

## Examples

```
Example 1:
  Input: root = [3,5,1,6,2,0,8,null,null,7,4], leaf = 7
  Output: [7,2,null,5,4,3,6,null,null,null,1,null,null,0,8]
```

```
Example 2:
  Input: root = [3,5,1,6,2,0,8,null,null,7,4], leaf = 0
  Output: [0,1,null,3,8,5,null,null,null,6,2,null,null,7,4]
```

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
3. **Re-attach** the original child (if any) that led to `prev` so the tree structure remains valid.
4. Continue until reaching the original root (where `parent` becomes `null`).
5. The last processed node (`node`) is now the root with correct parent/child links.

---

## Complexity Analysis

- **Time:** O(h) where *h* is the height of the tree – each node on the path to the original root is visited once.
- **Space:** O(1) additional space; only a few pointers are stored.

---

## Follow-Up Questions

- How would you adapt the algorithm if nodes did **not** have parent pointers?
- Can you perform the re-rooting in a single recursive pass?
- What changes are needed for a multi-way tree (each node may have many children)?

---

## Key Takeaway

> Re-rooting with parent pointers is analogous to reversing a singly linked list: walk from the new root to the old root, flipping parent-child links along the way.
