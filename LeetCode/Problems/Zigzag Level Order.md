# 103. Binary Tree Zigzag Level Order Traversal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal)
**Companies:** Accenture, Adobe, Amazon, Apple, Bloomberg, Bytedance, Citadel, Goldman Sachs, Google, Linkedin, Meta, Microsoft, Nutanix, Oracle, Palo Alto Networks, Sigmoid, Tiktok, Walmart Labs, Yandex

---

## Problem Description
Given the root of a binary tree, return the node values of each level in a zigzag order: left‑to‑right for the first level, right‑to‑left for the next, and so on alternating for subsequent levels.

## Examples
- **Input:** `root = [3,9,20,null,null,15,7]`
  **Output:** `[[3],[20,9],[15,7]]`
  *Explanation:* Level 0 left‑to‑right, level 1 right‑to‑left, level 2 left‑to‑right.
- **Input:** `root = [1]`
  **Output:** `[[1]]`
  *Explanation:* Single node tree.

## Approach
Perform a breadth‑first search (BFS) using a queue. For each level, collect node values in order, then reverse the list when the current level should be traversed right‑to‑left.

```text
FUNCTION zigzagLevelOrder(root):
    IF root is null: RETURN []
    SET result ← []
    SET queue ← deque containing root
    SET leftToRight ← true

    WHILE queue is not empty:
        SET levelSize ← queue.SIZE()
        SET level ← []
        FOR i ← 0 TO levelSize - 1:
            SET node ← queue.POPLEFT()
            level.APPEND(node.val)
            IF node.left is not null: queue.APPEND(node.left)
            IF node.right is not null: queue.APPEND(node.right)
        IF NOT leftToRight:
            REVERSE(level)
        result.APPEND(level)
        leftToRight ← NOT leftToRight
    RETURN result
```

## Walkthrough
| Step | Queue (nodes) | Level Collected | Direction |
|------|---------------|----------------|-----------|
| Start | `[3]` | – | left→right |
| Process level 0 | `[]` | `[3]` | left→right |
| Enqueue children | `[9,20]` | – | right←left |
| Process level 1 | `[]` | `[20,9]` (reversed) | right←left |
| Enqueue grandchildren | `[15,7]` | – | left→right |
| Process level 2 | `[]` | `[15,7]` | left→right |

## Complexity Analysis
- **Time:** Each node visited once → **O(n)** where n is number of nodes.
- **Space:** Queue holds at most one level → **O(w)** where w is maximum width of the tree.

## Follow‑Up Questions
1. How would you implement the traversal using a single deque without explicit reversal?
2. Can you modify the algorithm to return the zigzag order in a streaming fashion?
3. How would you adapt the solution for an N‑ary tree?

## Key Takeaway
A simple BFS combined with a direction flag and optional reversal yields zigzag level order traversal efficiently.
