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

## Examples

| Input Tree | Output | Explanation |
|------------|--------|-------------|
| `[1,10,4,3,null,7,9,12,8,6,null,null,2]` | `true` | Level 0 (odd, increasing): `1`. Level 1 (even, decreasing): `10 > 4`. Level 2 (odd, increasing): `3 < 7 < 9`. All constraints satisfied. |
| `[5,4,2,3,3,7]` | `false` | Level 0 has odd `5` (OK). Level 1 should be even and decreasing, but values `4` and `2` are even but `4 < 2` violates decreasing order. |
| `[1,2,3,4,5,6,7,8,9,10]` | `false` | Level 0 is odd `1` (OK). Level 1 has even values `2,3` where `3` is odd → parity violation. |

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