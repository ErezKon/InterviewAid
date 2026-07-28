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

Given an N-ary tree and two nodes `p` and `q`, move the subtree rooted at `p` to become a child of `q`. Handle the case where `q` is in `p`'s subtree specially.

**Constraints:**
- `1 <= n <= 10⁴`

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

**Example 1:**
```
Input: root = [1,[2,3,4]], p = 2, q = 3
Output: [1,[3,[2],4]]
Explanation: Move subtree rooted at 2 under node 3.
```

**Example 2:**
```
Input: root = [1,[2,[5,6],3,4]], p = 2, q = 5
Output: [1,[5,[2,3,4],6]]
Explanation: q (5) lies inside p's subtree, so we first detach 5 and re‑attach its children before moving p.
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
