# 103. Binary Tree Zigzag Level Order Traversal

**Difficulty:** 🟡 Medium
**Acceptance:** 60.0%
**LeetCode:** [https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal)
**Companies:** Accenture, Adobe, Amazon, Apple, Bloomberg, Bytedance, Citadel, Goldman Sachs, Google, Linkedin, Meta, Microsoft, Nutanix, Oracle, Palo Alto Networks, Sigmoid, Tiktok, Walmart Labs, Yandex

---

## 1. Problem Description

Given the root of a binary tree, return the zigzag level order traversal (left-to-right, then right-to-left, alternating).

---

## 2. Approach: BFS with Direction Flag — O(n) ✅

```text
FUNCTION zigzagLevelOrder(root):
    IF root == null: RETURN []
    result = []
    queue = [root]
    leftToRight = true

    WHILE queue not empty:
        levelSize = queue.SIZE()
        level = []
        FOR i ← 0 TO levelSize - 1:
            node = queue.DEQUEUE()
            level.ADD(node.val)
            IF node.left: queue.ENQUEUE(node.left)
            IF node.right: queue.ENQUEUE(node.right)

        IF NOT leftToRight:
            REVERSE(level)

        result.ADD(level)
        leftToRight = NOT leftToRight

    RETURN result
```

---

## 3. Examples

| Input Tree | Output |
|------------|--------|
| `[3,9,20,null,null,15,7]` | `[[3],[20,9],[15,7]]` |
| `[1]` | `[[1]]` |
| `[]` | `[]` |

---

## 4. Walkthrough

Consider the tree `[3,9,20,null,null,15,7]`.

| Step | Queue | Level Collected | Direction |
|------|-------|----------------|-----------|
| Start | `[3]` | `[]` | left→right |
| Process 3 | `[]` → enqueue `9,20` | `[3]` | left→right |
| Flip direction | `[`9,20`]` | `[[3]]` | right→left |
| Process 20 then 9 (reverse) | `[]` → enqueue `15,7` | `[20,9]` | right→left |
| Flip direction | `[`15,7`]` | `[[3],[20,9]]` | left→right |
| Process 15 then 7 | `[]` | `[15,7]` | left→right |
| End | `[]` | `[[3],[20,9],[15,7]]` | — |

---

## 5. Complexity Analysis

- **Time:** O(n) – each node visited once.
- **Space:** O(n) – queue holds at most one level of nodes.

---

## 6. Follow-Up Questions

1. How would you modify the algorithm to return a spiral order (right‑to‑left then left‑to‑right) without reversing lists?
2. Can you solve it using a deque to avoid the explicit reversal step?
3. How would you handle very deep trees where recursion depth is a concern?

---

## Key Takeaway

> Standard BFS level order with a flag to reverse alternate levels. Alternatively, use a deque and append to front/back based on direction.
