# 1516. Move Sub-Tree of N-Ary Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/move-sub-tree-of-n-ary-tree](https://leetcode.com/problems/move-sub-tree-of-n-ary-tree)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DFS with Parent Tracking — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given the `root` of an N-ary tree of unique values, and two nodes of the tree `p` and `q`.

You should move the subtree of the node `p` to become a direct child of node `q`. If `p` is already a direct child of `q`, do not change anything. Node `p` **must be** the last child in the children list of node `q`.

Return *the root of the tree* after adjusting it.

There are 3 cases for nodes `p` and `q`:

1. Node `q` is in the sub-tree of node `p`.
2. Node `p` is in the sub-tree of node `q`.
3. Neither node `p` is in the sub-tree of node `q` nor node `q` is in the sub-tree of node `p`.

In cases 2 and 3, you just need to move `p` (with its sub-tree) to be a child of `q`, but in case 1 the tree may be disconnected, thus you need to reconnect the tree again. **Please read the examples carefully before solving this problem.**

*Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).*

For example, a 14-node sample tree is serialized as `[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]`.

**Constraints:**
- The total number of nodes is between `[2, 1000]`.
- Each node has a **unique** value.
- `p != null`
- `q != null`
- `p` and `q` are two different nodes (i.e. `p != q`).

---

## 2. Key Insight

> Two cases: (1) If `q` is NOT in `p`'s subtree: detach `p` from its parent, attach `p` as child of `q`. (2) If `q` IS in `p`'s subtree: detach `q` from `p`'s subtree, attach `q`'s children to its former position, then move `p` under `q`.

---

## 3. Approach: DFS with Parent Tracking — O(n) ✅

```text
FUNCTION moveSubTree(root, p, q):
    // Find parents of p and q, check if q is in p's subtree
    parentP, parentQ = findParents(root, p, q)
    qInP = isDescendant(p, q)

    IF q is already parent of p: RETURN root

    // Detach p from its parent
    parentP.children.REMOVE(p)

    IF qInP:
        // Detach q from p's subtree, reconnect q's parent to q's children
        parentQ.children.REMOVE(q)
        parentQ.children.ADD_ALL(q.children)
        q.children = [p]
        IF parentP == null: RETURN q  // p was root
    ELSE:
        q.children.ADD(p)

    RETURN root
```

---

## 4. Examples

```
Example 1:
  Input: root = [1,null,2,3,null,4,5,null,6,null,7,8], p = 4, q = 1
  Output: [1,null,2,3,4,null,5,null,6,null,7,8]
  Explanation: This example follows the second case as node p is in the sub-tree of node q. We move node p with its sub-tree to be a direct child of node q.
  Notice that node 4 is the last child of node 1.
```

```
Example 2:
  Input: root = [1,null,2,3,null,4,5,null,6,null,7,8], p = 7, q = 4
  Output: [1,null,2,3,null,4,5,null,6,null,7,8]
  Explanation: Node 7 is already a direct child of node 4. We don't change anything.
```

```
Example 3:
  Input: root = [1,null,2,3,null,4,5,null,6,null,7,8], p = 3, q = 8
  Output: [1,null,2,null,4,5,null,7,8,null,null,null,3,null,6]
  Explanation: This example follows case 3 because node p is not in the sub-tree of node q and vice-versa. We can move node 3 with its sub-tree and make it as node 8's child.
```

```
Example 4:
  Input: root = [1,null,2,3,null,4], p = 1, q = 4
  Output: [4,null,1,null,2,3]
  Explanation: This example follows case 1 because node q is in the sub-tree of node p. Disconnect 4 with its parent and move node 1 with its sub-tree and make it as node 4's child.
```

---

## 5. Walkthrough

| Step | Action |
|------|--------|
| 1 | Perform DFS to locate nodes `p` and `q` and record their parents. |
| 2 | Check if `q` is a descendant of `p`. |
| 3a | If `q` is **not** in `p`'s subtree: remove `p` from `parentP.children` and append `p` to `q.children`. |
| 3b | If `q` **is** in `p`'s subtree: remove `q` from `parentQ.children`, attach `q.children` to `parentQ.children`, set `q.children = [p]`. |
| 4 | Return the (possibly new) root of the tree. |

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — DFS traversals |
| **Space** | O(n) — recursion stack |

---

## 7. Follow‑Up Questions

- How would you handle the operation if the tree were a binary tree instead of N‑ary?
- Can the move be performed iteratively without recursion?
- How would you extend this to support multiple move operations in a batch?

---

## 8. Key Takeaway

> **Handle the ancestor case carefully.** If `q` is in `p`'s subtree, we must first detach `q` and re‑link its children before moving `p`.
