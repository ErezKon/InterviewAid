# 2415. Reverse Odd Levels of Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reverse-odd-levels-of-binary-tree](https://leetcode.com/problems/reverse-odd-levels-of-binary-tree)
**Companies:** Amazon, Google, Josh Technology, Jpmorgan

---

## Problem Description

Given the `root` of a **perfect** binary tree, reverse the node values at each **odd** level (1, 3, 5, ...). Level 0 is the root. Return the modified tree.

**Constraints:**
- Tree is perfect (all leaves at same depth, every internal node has 2 children)
- `1 <= number of nodes <= 2^14`

---

## Key Insight

> Since we only need to reverse values (not structure), use BFS and swap values at odd levels. Alternatively, use DFS with mirrored pair traversal.

---

## Approach

```
FUNCTION reverseOddLevels(root):
    queue = [root]; level = 0
    WHILE queue:
        IF level % 2 == 1:
            vals = [node.val for node in queue]
            FOR i, node IN enumerate(queue):
                node.val = vals[len(queue) - 1 - i]
        queue = [child for node in queue for child in [node.left, node.right] if child]
        level += 1
    RETURN root
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n) — visit every node once |
| Space  | O(n) — queue holds up to n/2 nodes at the widest level |

---

## Key Takeaway

> For perfect binary trees, BFS gives direct access to all nodes at each level — swapping values (rather than restructuring pointers) simplifies level-based transformations.
