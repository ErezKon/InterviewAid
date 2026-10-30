# 1609. Even Odd Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/even-odd-tree](https://leetcode.com/problems/even-odd-tree)
**Companies:** Amazon, Bloomberg, Meta

---

## Problem Description

A binary tree is named **Even-Odd** if it meets the following conditions:

- The root of the binary tree is at level index `0`, its children are at level index `1`, their children are at level index `2`, etc.
- For every **even-indexed** level, all nodes at the level have **odd** integer values in **strictly increasing** order (from left to right).
- For every **odd-indexed** level, all nodes at the level have **even** integer values in **strictly decreasing** order (from left to right).

Given the `root` of a binary tree, *return* `true` *if the binary tree is **Even-Odd**, otherwise return* `false`*.*

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10^5]`.
- `1 <= Node.val <= 10^6`

---

## Examples

```
Example 1:
  Input: root = [1,10,4,3,null,7,9,12,8,6,null,null,2]
  Output: true
  Explanation: The node values on each level are:
  Level 0: [1]
  Level 1: [10,4]
  Level 2: [3,7,9]
  Level 3: [12,8,6,2]
  Since levels 0 and 2 are all odd and increasing and levels 1 and 3 are all even and decreasing, the tree is Even-Odd.
```

```
Example 2:
  Input: root = [5,4,2,3,3,7]
  Output: false
  Explanation: The node values on each level are:
  Level 0: [5]
  Level 1: [4,2]
  Level 2: [3,3,7]
  Node values in level 2 must be in strictly increasing order, so the tree is not Even-Odd.
```

```
Example 3:
  Input: root = [5,9,1,3,5,7]
  Output: false
  Explanation: Node values in the level 1 should be even integers.
```

---

## Approach: BFS Level Order — O(n) ✅

```text
FUNCTION isEvenOddTree(root):
    IF root IS NULL: RETURN false
    SET queue ← [root]
    SET level ← 0
    WHILE queue NOT EMPTY:
        IF level MOD 2 == 0:
            SET prev ← -INFINITY // need strictly increasing odd numbers
        ELSE:
            SET prev ← INFINITY // need strictly decreasing even numbers
        SET nextQueue ← []
        FOR node IN queue:
            // Parity check
            IF level MOD 2 == 0 AND node.val MOD 2 == 0: RETURN false
            IF level MOD 2 == 1 AND node.val MOD 2 == 1: RETURN false
            // Monotonicity check
            IF level MOD 2 == 0 AND node.val <= prev: RETURN false
            IF level MOD 2 == 1 AND node.val >= prev: RETURN false
            SET prev ← node.val
            // Enqueue children for next level
            IF node.left IS NOT NULL: APPEND node.left TO nextQueue
            IF node.right IS NOT NULL: APPEND node.right TO nextQueue
        SET queue ← nextQueue
        SET level ← level + 1
    RETURN true
```

---

## Walkthrough

Consider the tree `[1,10,4,3,null,7,9,12,8,6,null,null,2]`.

| Level | Nodes (left→right) | Expected Parity | Expected Order | Check |
|-------|--------------------|----------------|----------------|-------|
| 0 | `1` | odd | increasing | `1` is odd, prev = -∞ → OK |
| 1 | `10`, `4` | even | decreasing | `10` > `4` and both even → OK |
| 2 | `3`, `7`, `9` | odd | increasing | `3 < 7 < 9` all odd → OK |
| 3 | `12`, `8`, `6`, `2` | even | decreasing | `12 > 8 > 6 > 2` all even → OK |

All levels satisfy their constraints, so the function returns `true`.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n) — each node visited once |
| **Space** | O(w) — width of the widest level (queue) |

---

## Follow-Up Questions

1. How would you modify the algorithm to return the first level that violates the Even-Odd property?
2. Can this problem be solved with a depth‑first search while still maintaining O(h) auxiliary space, where h is tree height?
3. How would you adapt the solution for a streamed tree representation where children are provided lazily?

---

## Key Takeaway

> **BFS level-order traversal with per‑level validation. Check value parity and ordering direction based on level index. Straightforward constraint checking.**