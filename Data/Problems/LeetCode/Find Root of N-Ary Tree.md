# 1506. Find Root of N-Ary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-root-of-n-ary-tree](https://leetcode.com/problems/find-root-of-n-ary-tree)
**Companies:** Bloomberg, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: XOR Trick — O(n) ✅](#4-approach-xor-trick--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given all nodes of an N-ary tree as an unordered list, find the **root** node. Each node has a `val` and a `children` list. The tree is guaranteed to be valid and all values are unique.

You must solve it in O(n) time and O(1) extra space.

---

## 2. Examples

```
Example 1:
  Tree:     1
          / | \
         3  2  4
        / \
       5   6
  Input: [nodes in any order]
  Output: node with val=1

Example 2:
  Single node tree.
  Output: that node.
```

---

## 3. Key Insight

> Every node except the root appears exactly once as a child. XOR all node values and all child values together — every non-root value cancels out (appears twice: once as a node, once as a child). The remaining value is the root.

---

## 4. Approach: XOR Trick — O(n) ✅

```
FUNCTION findRoot(tree):
    // XOR all node values, then XOR all child values
    // Root is the one not a child of anyone
    valXor = 0
    FOR node IN tree:
        valXor ^= node.val
        FOR child IN node.children: valXor ^= child.val
    FOR node IN tree:
        IF node.val == valXor: RETURN node
```

---

## 5. Walkthrough

```
Tree: 1 → [3,2,4], 3 → [5,6], 2 → [], 4 → [], 5 → [], 6 → []

XOR all node values: 1 ^ 3 ^ 2 ^ 4 ^ 5 ^ 6
XOR all child values: 3 ^ 2 ^ 4 ^ 5 ^ 6

Combined: 1 ^ 3 ^ 2 ^ 4 ^ 5 ^ 6 ^ 3 ^ 2 ^ 4 ^ 5 ^ 6
        = 1 (everything else cancels)

Find node with val=1 → root ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — visit each node and child once |
| **Space** | O(1) — single XOR variable |

---

## 7. Follow-Up Questions

### 7.1 Could you use a set instead?

Yes — add all node values to a set, remove all child values. The remaining value is the root. But this uses O(n) space.

### 7.2 What if node values are not unique?

The XOR trick fails. You'd need the set approach using node references (identity) instead of values.

### 7.3 Why does XOR work here?

`a ^ a = 0` for any value. Each non-root node is XORed twice (as a node and as someone's child), so it cancels. The root is XORed only once.

---

## 8. Key Takeaway

> **XOR cancellation** identifies the unique element: every non-root appears twice (as node + child), so XOR eliminates them. This is the same trick used in "find the single number" (LC 136).
