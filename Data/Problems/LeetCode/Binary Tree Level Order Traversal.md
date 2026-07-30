
# 102. Binary Tree Level Order Traversal

**Difficulty:** 🟡 Medium
**Acceptance:** 69.0%
**LeetCode:** [https://leetcode.com/problems/binary-tree-level-order-traversal](https://leetcode.com/problems/binary-tree-level-order-traversal)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Docusign, Gojek, Goldman Sachs, Google, Linkedin, Meta, Microsoft, Oracle, Palo Alto Networks, Yandex

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Solution: BFS with Queue — O(n) ✅](#3-solution-bfs-with-queue--on-)
4. [Alternative: DFS — O(n)](#4-alternative-dfs--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up: Tree Traversal Family](#7-follow-up-tree-traversal-family)

---

## 1. Problem Description

Given the `root` of a binary tree, return the **level order traversal** of its nodes' values. (i.e., from left to right, level by level).

---

## 2. Examples

```
Example 1:
      3
     / \
    9   20
       /  \
      15   7

  Output: [[3], [9, 20], [15, 7]]

Example 2:
  Input: [1]
  Output: [[1]]

Example 3:
  Input: []
  Output: []
```

---

## 3. Solution: BFS with Queue — O(n) ✅

Process nodes level by level using a queue. At each level, drain all current nodes and enqueue their children.

```
FUNCTION levelOrder(root):
    IF root IS NULL:
        RETURN []

    result = []
    queue  = [root]

    WHILE queue IS NOT EMPTY:
        levelSize = LENGTH(queue)
        level = []

        FOR i ← 0 TO levelSize - 1:
            node = queue.DEQUEUE()
            level.ADD(node.val)

            IF node.left IS NOT NULL:
                queue.ENQUEUE(node.left)
            IF node.right IS NOT NULL:
                queue.ENQUEUE(node.right)

        result.ADD(level)

    RETURN result
```

### Key Point

`levelSize = LENGTH(queue)` captures how many nodes are at the **current** level before processing starts. This separates levels cleanly.

---

## 4. Alternative: DFS — O(n)

Use DFS with a depth parameter to place values in the correct level:

```
FUNCTION levelOrderDFS(root):
    result = []

    FUNCTION dfs(node, depth):
        IF node IS NULL:
            RETURN

        IF depth == LENGTH(result):
            result.ADD([])              // new level

        result[depth].ADD(node.val)

        dfs(node.left, depth + 1)
        dfs(node.right, depth + 1)

    dfs(root, 0)
    RETURN result
```

---

## 5. Walkthrough

```
Tree:
      3
     / \
    9   20
       /  \
      15   7

BFS:
  queue = [3]

  Level 0: size=1
    dequeue 3, add children → queue = [9, 20]
    level = [3]

  Level 1: size=2
    dequeue 9 (no children), dequeue 20 (children 15, 7)
    queue = [15, 7]
    level = [9, 20]

  Level 2: size=2
    dequeue 15 (no children), dequeue 7 (no children)
    queue = []
    level = [15, 7]

Result: [[3], [9, 20], [15, 7]] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — visit every node once |
| **Space** | O(n) — queue holds at most one full level (up to n/2 nodes in a complete tree) |

---

## 7. Follow-Up: Tree Traversal Family

### 7.1 Zigzag Level Order (LeetCode #103)

Alternate direction per level. Reverse odd-indexed levels:

```
FUNCTION zigzagLevelOrder(root):
    result = levelOrder(root)

    FOR i ← 0 TO LENGTH(result) - 1:
        IF i IS ODD:
            REVERSE result[i]

    RETURN result
```

### 7.2 Bottom-Up Level Order (LeetCode #107)

Same as level order, but reverse the final result.

### 7.3 Right Side View (LeetCode #199)

Return the last node at each level. Use level order and take the last element of each level:

```
FUNCTION rightSideView(root):
    levels = levelOrder(root)
    RETURN [level[LAST] FOR each level IN levels]
```

Or: DFS visiting right child first, adding the first node seen at each depth.

### 7.4 Average of Levels (LeetCode #637)

```
FUNCTION averageOfLevels(root):
    levels = levelOrder(root)
    RETURN [AVERAGE(level) FOR each level IN levels]
```

### 7.5 Vertical Order Traversal (LeetCode #987)

Group by column index. Use BFS with `(node, column)` tuples. Sort within same column and row.

---

## Tree Traversal Summary

| Traversal | Order | Technique |
|-----------|-------|-----------|
| **Preorder** | Root → Left → Right | DFS (stack) |
| **Inorder** | Left → Root → Right | DFS (stack) |
| **Postorder** | Left → Right → Root | DFS (stack) |
| **Level Order** | Level by level | BFS (queue) |
| **Zigzag** | Alternating direction | BFS + reverse |
| **Vertical** | Column by column | BFS + column tracking |

---

## Key Takeaway

> BFS with a queue is the natural fit for level-order problems. The key technique is **snapshotting the queue size** at the start of each level to separate levels cleanly. This pattern is reusable for any "process tree level by level" problem.
