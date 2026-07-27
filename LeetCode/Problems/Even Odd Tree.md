# 1609. Even Odd Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/even-odd-tree](https://leetcode.com/problems/even-odd-tree)
**Companies:** Amazon, Bloomberg, Meta

---

## Problem Description

A binary tree is **Even-Odd** if:
- **Even-indexed levels** (0, 2, ...): all values are **odd** and **strictly increasing** left to right.
- **Odd-indexed levels** (1, 3, ...): all values are **even** and **strictly decreasing** left to right.

Return `true` if the tree satisfies these constraints.

---

## Key Insight

> BFS level-by-level. At each level, check parity of values and monotonicity direction based on level index.

---

## Approach: BFS Level Order — O(n) ✅

```
FUNCTION isEvenOddTree(root):
    queue = [root]; level = 0
    WHILE queue:
        prev = -infinity IF level % 2 == 0 ELSE infinity
        FOR node IN queue:
            IF level % 2 == 0:
                IF node.val % 2 == 0 OR node.val <= prev: RETURN false
            ELSE:
                IF node.val % 2 == 1 OR node.val >= prev: RETURN false
            prev = node.val
        queue = [child for node in queue for child in [node.left, node.right] if child]
        level += 1
    RETURN true
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n) — visit each node once |
| **Space** | O(w) — max width of tree |

---

## Key Takeaway

> **BFS level-order traversal with per-level validation. Check value parity and ordering direction based on level index. Straightforward constraint checking.**
