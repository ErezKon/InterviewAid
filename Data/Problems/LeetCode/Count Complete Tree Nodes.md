# 222. Count Complete Tree Nodes

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-complete-tree-nodes](https://leetcode.com/problems/count-complete-tree-nodes)
**Companies:** Adobe, Amazon, Bloomberg, Flipkart, Google, Meta, Microsoft

---

## Problem Description
Given the root of a **complete binary tree**, return the total number of nodes in the tree. A complete binary tree is a binary tree in which every level, except possibly the last, is completely filled, and all nodes are as far left as possible.

## Examples
**Example 1:**
```
Input: root = [1,2,3,4,5,6]
Output: 6
Explanation: The tree has 6 nodes.
```
**Example 2:**
```
Input: root = []
Output: 0
Explanation: An empty tree contains no nodes.
```

## Approach
**Binary Search on the Last Level** – O(log² n)
The height of a complete tree is at most log n. By checking whether a node exists at a given index on the last level using binary search, we can determine the number of nodes on that level.

```text
FUNCTION countNodes(root):
    IF root == null: RETURN 0
    h ← computeHeight(root)
    IF h == 0: RETURN 1
    // Number of nodes above the last level
    upperCount ← (1 << h) - 1
    // Binary search on the last level indices [0, 2^h - 1]
    left ← 0; right ← (1 << h) - 1
    WHILE left ≤ right:
        mid ← (left + right) // 2
        IF exists(mid, h, root):
            left ← mid + 1
        ELSE:
            right ← mid - 1
    // left is the count of nodes on the last level
    RETURN upperCount + left

FUNCTION computeHeight(node):
    h ← 0
    WHILE node.left != null:
        h ← h + 1
        node ← node.left
    RETURN h

FUNCTION exists(idx, h, node):
    left ← 0; right ← (1 << h) - 1
    FOR i ← h-1 DOWNTO 0:
        mid ← (left + right) // 2
        IF idx ≤ mid:
            node ← node.left
            right ← mid
        ELSE:
            node ← node.right
            left ← mid + 1
    RETURN node != null
```
The `exists` helper checks if a node at a given index exists by traversing from the root using the binary representation of the index.

## Walkthrough
| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Compute tree height `h = 2` (levels 0‑2) | Traverses leftmost path 1→2→4 |
| 2 | Upper nodes count = 2^2‑1 = 3 | Nodes on levels 0‑1 |
| 3 | Binary search indices 0‑3 on last level | Checks existence of nodes 4,5,6,7 |
| 4 | `exists` returns true for indices 0,1,2 and false for 3 | Node 7 is missing |
| 5 | `left` ends at 3 → three nodes on last level |
| 6 | Total = 3 + 3 = 6 |

## Complexity Analysis
- **Time:** O(log² n) – height computation O(log n) and binary search O(log n) each checking existence in O(log n).
- **Space:** O(log n) recursion stack for height/computation.

## Follow-Up Questions
1. How would you count nodes in a **perfect** binary tree in O(1)?
2. Can you adapt the algorithm to return the **k-th** node in level‑order?
3. How would you modify the solution for a **complete n‑ary tree**?

## Key Takeaway
Leverage the structural property of complete trees: binary search on the last level reduces the problem from O(n) to O(log² n).
