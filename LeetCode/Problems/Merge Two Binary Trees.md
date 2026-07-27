# 617. Merge Two Binary Trees

**Difficulty:** 🟢 Easy  
**LeetCode:** [https://leetcode.com/problems/merge-two-binary-trees](https://leetcode.com/problems/merge-two-binary-trees)
**Companies:** Amazon, Bloomberg, Google, Josh Technology, Linkedin, Meta, Microsoft, Mongodb

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two binary trees `root1` and `root2`, merge them. When nodes overlap, sum their values. When only one node exists, use that node. Return the merged tree.

**Constraints:**
- Number of nodes in each tree: `[0, 2000]`
- `-10⁴ ≤ Node.val ≤ 10⁴`

---

## Examples

**Example 1:**
```
Tree 1:     1          Tree 2:     2
           / \                    / \
          3   2                  1   3
         /                        \   \
        5                          4   7

Merged:     3
           / \
          4   5
         / \   \
        5   4   7
```

---

## Key Insight

> Recursively traverse both trees simultaneously. At each node: if one is null, return the other. If both exist, sum values and recurse on children. This naturally handles all overlap cases.

---

## Approach

```
FUNCTION mergeTrees(t1, t2):
    IF t1 = NULL THEN RETURN t2
    IF t2 = NULL THEN RETURN t1
    t1.val ← t1.val + t2.val
    t1.left ← mergeTrees(t1.left, t2.left)
    t1.right ← mergeTrees(t1.right, t2.right)
    RETURN t1
```

---

## Walkthrough

```
Tree1: 1(3(5,_), 2), Tree2: 2(1(_,4), 3(_,7))

mergeTrees(1, 2): val=3
  left: mergeTrees(3, 1): val=4
    left: mergeTrees(5, null): return 5
    right: mergeTrees(null, 4): return 4
  right: mergeTrees(2, 3): val=5
    left: mergeTrees(null, null): return null
    right: mergeTrees(null, 7): return 7

Result: 3(4(5,4), 5(_,7)) ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Recursive DFS | **O(min(n, m))** | **O(min(h1, h2))** stack |

We only visit nodes where both trees have nodes.

---

## Follow-Up Questions

1. **Is this in-place?** Yes — it modifies `t1` directly. For a non-destructive version, create new nodes.
2. **Can this be done iteratively?** Yes — use a stack/queue of `(t1_node, t2_node)` pairs.
3. **What if we wanted to subtract instead of add?** Replace `+=` with `-=`.

---

## Key Takeaway

> **Parallel tree traversal** — when operating on two trees simultaneously, recurse on both with null checks as base cases. The structure naturally handles mismatched shapes.

---
