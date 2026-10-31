# 116. Populating Next Right Pointers in Each Node

**Difficulty:** 🟡 Medium
**Acceptance:** 63.0%
**LeetCode:** [https://leetcode.com/problems/populating-next-right-pointers-in-each-node](https://leetcode.com/problems/populating-next-right-pointers-in-each-node)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle, Snowflake, Walmart Labs

---

## 1. Problem Description

You are given a **perfect binary tree** where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:

```
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
```

Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to `NULL`.

Initially, all next pointers are set to `NULL`.

**Constraints:**
- The number of nodes in the tree is in the range `[0, 2^12 - 1]`.
- `-1000 <= Node.val <= 1000`

**Follow-up:**
- You may only use constant extra space.
- The recursive approach is fine. You may assume implicit stack space does not count as extra space for this problem.

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

**Example 1:**
```
Input: root = [1,2,3,4,5,6,7]
Output: [1,#,2,3,#,4,5,6,7,#]
Explanation: Given the above perfect binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.
```

**Example 2:**
```
Input: root = []
Output: []
```

---

## 4. Walkthrough

Consider the perfect tree `[1,2,3,4,5,6,7]`:
1. Start with `leftmost = 1`. Connect `2.next = 3`.
2. Move to next level: `leftmost = 2`. Connect `4.next = 5`, `5.next = 6`, `6.next = 7` using already-established `next` from previous level.
3. No further children, algorithm ends. All `next` pointers are set correctly.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 6. Follow-Up Questions

- How would you adapt the solution for a **non-perfect** binary tree (LeetCode 117)?
- Can you solve it using BFS with a queue instead of pointer manipulation?

---

## Key Takeaway

> Use the `next` pointers from the current level to establish connections on the next level — no queue needed for a perfect binary tree.
