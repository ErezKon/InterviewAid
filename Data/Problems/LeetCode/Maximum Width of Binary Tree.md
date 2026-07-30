# 662. Maximum Width of Binary Tree

**Difficulty:** 🟡 Medium
**Acceptance:** 42.0%
**LeetCode:** [https://leetcode.com/problems/maximum-width-of-binary-tree](https://leetcode.com/problems/maximum-width-of-binary-tree)
**Companies:** Amazon, Bloomberg, Bytedance, Flipkart, Google, Meta, Microsoft, Tiktok

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

Given a binary tree, return the **maximum width** — the maximum number of nodes between the leftmost and rightmost non-null nodes at any level (including nulls between them).

**Constraints:**
- Number of nodes in range `[1, 3000]`
- `-100 ≤ Node.val ≤ 100`

---

## Examples

**Example 1:**
```
Input:       1
           /   \
          3     2
         / \     \
        5   3     9

Output: 4
Explanation: Level 2 has width 4 (positions 0–3: nodes 5, 3, null, 9).
```

**Example 2:**
```
Input:       1
           /
          3
         / \
        5   3

Output: 2
Explanation: Level 2 has width 2 (nodes 5 and 3).
```

---

## Key Insight

> Assign each node a **heap-style position index** (root=0, left=2×pos, right=2×pos+1). The width at any level is simply `rightmost_pos - leftmost_pos + 1`, without needing to track null nodes. **Normalize** positions per level to prevent integer overflow.

---

## Approach: BFS with Position Indexing — O(n) ✅

```
FUNCTION widthOfBinaryTree(root):
    IF root = NULL THEN RETURN 0
    maxWidth ← 0
    queue ← [(root, 0)]

    WHILE queue NOT EMPTY DO
        levelSize ← queue.SIZE()
        leftmost ← queue[0].pos
        rightmost ← leftmost

        FOR i ← 0 TO levelSize - 1 DO
            (node, pos) ← queue.DEQUEUE()
            rightmost ← pos

            // Normalize position to prevent overflow
            normalizedPos ← pos - leftmost

            IF node.left THEN
                queue.ENQUEUE((node.left, 2 * normalizedPos))
            IF node.right THEN
                queue.ENQUEUE((node.right, 2 * normalizedPos + 1))

        maxWidth ← MAX(maxWidth, rightmost - leftmost + 1)

    RETURN maxWidth
```

---

## Walkthrough

```
Tree:       1
          /   \
         3     2
        / \     \
       5   3     9

Level 0: queue = [(1, 0)]
  leftmost=0, rightmost=0, width=1
  Enqueue: (3, 0), (2, 1)

Level 1: queue = [(3, 0), (2, 1)]
  leftmost=0, rightmost=1, width=2
  Enqueue: (5, 0), (3, 1), (9, 3)

Level 2: queue = [(5, 0), (3, 1), (9, 3)]
  leftmost=0, rightmost=3, width=4

maxWidth = 4 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| BFS with position indexing | **O(n)** | **O(n)** |

---

## Follow-Up Questions

1. **Why normalize positions per level?** Without normalization, positions double each level. After ~60 levels, they overflow 64-bit integers. Subtracting `leftmost` at each level resets the range.
2. **Can DFS work?** Yes — use DFS and record the first position seen at each depth. Width = current position - first position + 1.
3. **What about a complete binary tree?** Width at level `d` is always `2^d`, so the answer is `2^(depth-1)`.
4. **How does this differ from counting nodes per level?** Width counts the span including gaps (null positions), not just non-null nodes.

---

## Key Takeaway

> **Heap-like indexing (left=2i, right=2i+1)** lets you compute binary tree width without tracking null nodes. Always normalize positions per level to prevent integer overflow.

---
