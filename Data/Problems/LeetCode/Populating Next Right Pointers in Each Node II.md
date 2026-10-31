# 117. Populating Next Right Pointers in Each Node II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Snowflake, Uber

---

## Problem Description

Given a binary tree

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

**Follow-up:**
- You may only use constant extra space.
- The recursive approach is fine. You may assume implicit stack space does not count as extra space for this problem.

**Constraints:**
- The number of nodes in the tree is in the range `[0, 6000]`.
- `-100 <= Node.val <= 100`

## Examples

**Example 1:**
```
Input: root = [1,2,3,4,5,null,7]
Output: [1,#,2,3,#,4,5,7,#]
Explanation: Given the above binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.
```

**Example 2:**
```
Input: root = []
Output: []
```

## Approach
**Algorithm:** Level-order traversal using already-established `next` pointers (Dummy-head technique)
**Key Insight:** While traversing a level, use a dummy node to build the `next` chain for the next level, requiring only O(1) extra pointers.

```text
FUNCTION connect(root):
    curr ← root
    WHILE curr IS NOT NULL:
        dummy ← NEW Node(0)   // temporary head for the next level
        tail ← dummy
        // iterate over current level using next pointers
        WHILE curr IS NOT NULL:
            IF curr.left IS NOT NULL:
                tail.next ← curr.left
                tail ← tail.next
            IF curr.right IS NOT NULL:
                tail.next ← curr.right
                tail ← tail.next
            curr ← curr.next
        // move to the first node of the next level
        curr ← dummy.next
    RETURN root
```

## Walkthrough
Consider the tree `[1,2,3,4,5,null,7]`.
| Level | Nodes visited (via `next`) | Connections created for next level |
|-------|----------------------------|------------------------------------|
| 0 | 1 | dummy → 2 → 3 |
| 1 | 2 → 3 | dummy → 4 → 5 → 7 |
| 2 | 4 → 5 → 7 | no further children, traversal ends |
After processing, each node's `next` points to its right neighbor.

## Complexity Analysis
- **Time:** O(n) – each node is visited once.
- **Space:** O(1) extra space (ignoring the recursion stack, which is not used).

## Follow-Up Questions
1. How would you modify the algorithm to return a list of values for each level instead of linking nodes?
2. Can you solve the problem using recursion while still achieving O(1) auxiliary space?
3. How would the solution change if the tree were a perfect binary tree?

## Key Takeaway
By iterating level-by-level using the already-built `next` pointers and a dummy head, we can connect the next level in constant extra space.
