# 226. Invert Binary Tree

**Difficulty:** 🟢 Easy
**Acceptance:** 78.0%
**LeetCode:** [https://leetcode.com/problems/invert-binary-tree](https://leetcode.com/problems/invert-binary-tree)
**Companies:** Amazon, Bloomberg, Google, Josh Technology, Linkedin, Meta, Microsoft, Oracle, Palo Alto Networks, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Recursion — O(n) ✅](#4-approach-recursion--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given the `root` of a binary tree, invert the tree (mirror it) and return its root.

**Constraints:**
- Number of nodes: `[0, 100]`
- `-100 <= Node.val <= 100`

---

## 2. Examples

```
Input:       4                Output:      4
            / \                           / \
           2   7                         7   2
          / \ / \                       / \ / \
         1  3 6  9                     9  6 3  1
```

---

## 3. Key Insight

Inverting a binary tree means **swapping left and right children** at every node, recursively. Each node is visited exactly once.

---

## 4. Approach: Recursion — O(n) ✅

```
FUNCTION invertTree(root):
    IF root == null: RETURN null

    root.left, root.right = invertTree(root.right), invertTree(root.left)
    RETURN root
```

Iterative BFS:
```
FUNCTION invertTree(root):
    IF root == null: RETURN null
    queue = [root]
    WHILE queue not empty:
        node = queue.DEQUEUE()
        SWAP(node.left, node.right)
        IF node.left: queue.ENQUEUE(node.left)
        IF node.right: queue.ENQUEUE(node.right)
    RETURN root
```

---

## 5. Walkthrough

```
Original:    4
            / \
           2   7

Step 1: invertTree(4)
  → invertTree(7) returns 7 (leaf)
  → invertTree(2) returns 2 (leaf)
  → swap: 4.left = 7, 4.right = 2

Result:      4
            / \
           7   2
```

✅ Children swapped at every level.

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | Visit every node once |
| Space | O(h) recursive / O(n) BFS | Call stack or queue |

---

## 7. Follow-Up Questions

### 7.1 Does inverting twice restore the original?

Yes. Inverting is its own inverse — applying it twice returns the original tree.

### 7.2 What about an n-ary tree?

Reverse the children list at each node: `node.children.reverse()`.

### 7.3 Can this be done in-place?

Yes — the recursive and BFS approaches both modify the tree in-place by swapping pointers.

---

## 8. Key Takeaway

> Swap left and right children at every node, recursively. The famous "Homebrew author couldn't invert a binary tree" interview problem. Both recursive (3 lines) and iterative (BFS) solutions are equally valid.
