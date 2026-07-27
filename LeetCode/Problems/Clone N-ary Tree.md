# 1490. Clone N-ary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/clone-n-ary-tree](https://leetcode.com/problems/clone-n-ary-tree)
**Companies:** Amazon

---

## 1. Problem Description

Given the root of an N-ary tree, return a **deep copy** of the tree. Each node has a `val` and a list of `children`.

---

## 2. Approach: Recursive DFS — O(n) ✅

```
FUNCTION cloneTree(root):
    IF root IS null: RETURN null
    copy = new Node(root.val)
    FOR child IN root.children:
        copy.children.ADD(cloneTree(child))
    RETURN copy
```

| Time | Space |
|------|-------|
| O(n) | O(n) — recursion stack + cloned nodes |

---

## Key Takeaway

> N-ary tree cloning is a straightforward recursive DFS — create a new node, recursively clone each child.
