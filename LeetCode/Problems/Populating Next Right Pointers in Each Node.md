# 116. Populating Next Right Pointers in Each Node

**Difficulty:** 🟡 Medium
**Acceptance:** 63.0%
**LeetCode:** [https://leetcode.com/problems/populating-next-right-pointers-in-each-node](https://leetcode.com/problems/populating-next-right-pointers-in-each-node)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle, Snowflake, Walmart Labs

---

## 1. Problem Description

Given a **perfect** binary tree, populate each `next` pointer to point to its next right node. If no next right node, set to null.

---

## 2. Approach: Level-by-Level — O(n), O(1) space ✅

```text
FUNCTION connect(root):
    IF root == null: RETURN null
    leftmost = root
    WHILE leftmost.left:
        node = leftmost
        WHILE node:
            node.left.next = node.right
            IF node.next:
                node.right.next = node.next.left
            node = node.next
        leftmost = leftmost.left
    RETURN root
```

Uses the previously established `next` pointers to traverse each level. O(1) extra space.

---

## 3. Examples

| Tree (level order) | `next` pointers after connection |
|--------------------|-----------------------------------|
| `[1,2,3,4,5,6,7]` | `2→3→null`, `4→5→6→7→null` |
| `[1,2,3,null,5,null,7]` (perfect) | `2→3→null`, `5→7→null` |

---

## 4. Walkthrough

Consider the perfect tree `[1,2,3,4,5,6,7]`:
1. Start with `leftmost = 1`. Connect `2.next = 3`.
2. Move to next level: `leftmost = 2`. Connect `4.next = 5`, `5.next = 6`, `6.next = 7` using already‑established `next` from previous level.
3. No further children, algorithm ends. All `next` pointers are set correctly.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 6. Follow-Up Questions

- How would you adapt the solution for a **non‑perfect** binary tree (LeetCode 117)?
- Can you solve it using BFS with a queue instead of pointer manipulation?

---

## Key Takeaway

> Use the `next` pointers from the current level to establish connections on the next level — no queue needed for a perfect binary tree.
