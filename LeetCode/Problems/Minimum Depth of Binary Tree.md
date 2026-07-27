# 111. Minimum Depth of Binary Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-depth-of-binary-tree](https://leetcode.com/problems/minimum-depth-of-binary-tree)
**Companies:** Amazon, Bloomberg, Google, Livspace, Meta, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: BFS — O(n)](#approach-bfs--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a binary tree, find its **minimum depth** — the number of nodes along the shortest path from the root to the nearest **leaf** node.

**Constraints:**
- `0 ≤ number of nodes ≤ 10⁵`
- `-1000 ≤ Node.val ≤ 1000`

---

## Examples

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
        3
       / \
      9   20
         /  \
        15   7
Output: 2
Explanation: Shortest path is 3→9 (depth 2). Node 9 is a leaf.
```

**Example 2:**
```
Input: root = [2,null,3,null,4,null,5,null,6]
Output: 5
Explanation: Tree is a skewed line. Only leaf is at depth 5.
```

---

## Key Insight

> **BFS** finds the minimum depth optimally — it explores level by level and returns the moment it hits the first leaf, potentially skipping large subtrees. DFS works too, but be careful: a node with only one child is **not** a leaf.

---

## Approach: BFS — O(n) ✅

BFS finds the first leaf node (minimum depth) without exploring the entire tree.

```
FUNCTION minDepth(root):
    IF root == null: RETURN 0
    queue = [(root, 1)]

    WHILE queue:
        (node, depth) = queue.DEQUEUE()
        IF node.left == null AND node.right == null:
            RETURN depth
        IF node.left: queue.ENQUEUE((node.left, depth + 1))
        IF node.right: queue.ENQUEUE((node.right, depth + 1))
```

DFS alternative (be careful: min depth is to a **leaf**, not just null):
```
FUNCTION minDepth(root):
    IF root == null: RETURN 0
    IF root.left == null: RETURN 1 + minDepth(root.right)
    IF root.right == null: RETURN 1 + minDepth(root.left)
    RETURN 1 + MIN(minDepth(root.left), minDepth(root.right))
```

---

## Walkthrough

```
        3
       / \
      9   20
         /  \
        15   7
```

| Level | Nodes | Leaf found? |
|-------|-------|-------------|
| 1 | [3] | No (has children) |
| 2 | [9, 20] | **9 is a leaf!** → return 2 |

BFS stops early — never explores level 3. **Result: 2** ✅

---

## Complexity Analysis

| Aspect | BFS | DFS |
|--------|-----|-----|
| **Time** | O(n) worst, but often less (early stop) | O(n) — must explore all |
| **Space** | O(w) — width of tree | O(h) — height of tree |

---

## Follow-Up Questions

1. **Why not just `min(left, right) + 1`?** A node with one null child isn't a leaf — you'd incorrectly count depth 0 for the null side. Must handle one-child nodes explicitly.
2. **BFS vs DFS for min depth?** BFS is typically better — it stops at the first leaf found. DFS must explore the entire tree.
3. **What about maximum depth?** Same approaches, but DFS is simpler for max depth: `1 + max(left, right)`.

---

## Key Takeaway

> For **minimum depth**, BFS is the natural choice — it finds the nearest leaf in level-order without exploring unnecessary subtrees. The DFS trap: always handle the one-child case explicitly.
