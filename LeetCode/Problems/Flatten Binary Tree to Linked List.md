# 114. Flatten Binary Tree to Linked List

**Difficulty:** 🟡 Medium
**Acceptance:** 66.0%
**LeetCode:** [https://leetcode.com/problems/flatten-binary-tree-to-linked-list](https://leetcode.com/problems/flatten-binary-tree-to-linked-list)
**Companies:** Amazon, Anduril, Bloomberg, Google, Josh Technology, Meta, Microsoft, Oracle

---

## 1. Problem Description

Given the root of a binary tree, flatten it to a linked list **in-place** following pre-order traversal. Each node's `right` points to the next node, `left` is null.

---

## 2. Approach: Morris-like — O(n), O(1) space ✅

For each node with a left child: find the rightmost node of the left subtree, attach the current right subtree there, then move the left subtree to the right.

```
FUNCTION flatten(root):
    curr = root
    WHILE curr != null:
        IF curr.left != null:
            // Find rightmost of left subtree
            rightmost = curr.left
            WHILE rightmost.right != null:
                rightmost = rightmost.right

            // Rewire
            rightmost.right = curr.right
            curr.right = curr.left
            curr.left = null

        curr = curr.right
```

---

## 3. Alternative: Reverse Post-order

Process right, then left, then current. Maintain a `prev` pointer.

```
FUNCTION flatten(root):
    prev = null

    FUNCTION dfs(node):
        IF node == null: RETURN
        dfs(node.right)
        dfs(node.left)
        node.right = prev
        node.left = null
        prev = node

    dfs(root)
```

| Approach | Time | Space |
|----------|------|-------|
| Iterative | O(n) | O(1) |
| Recursive | O(n) | O(h) |

---

## Examples

**Example 1:**
```
Input: root = [1,2,5,3,4,null,6]
Output: [1,null,2,null,3,null,4,null,5,null,6]
```
Explanation: The tree is flattened to a right‑skewed linked list following preorder.

**Example 2:**
```
Input: root = []
Output: []
```
Explanation: Empty tree remains empty.

---

## Walkthrough

| Step | Current Node | Action |
|------|--------------|--------|
| 1 | 1 | Left child 2 exists → find rightmost (4), attach right subtree (5) to 4, move left subtree to right.
| 2 | 2 | Left child 3 exists → rightmost is 4, attach null, move left to right.
| 3 | 3 | No left child → move to right (4).
| 4 | 4 | No left child → move to right (5).
| 5 | 5 | Left child null, right child 6 → move to 6.
| 6 | 6 | No children → end.

Resulting right‑skewed list: 1→2→3→4→5→6.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) – each node visited once |
| **Space** | O(1) for Morris‑like, O(h) for recursive alternative |

---

## Follow-Up Questions

- How would you modify the algorithm to flatten the tree into a doubly linked list?
- Can you perform the flattening using only recursion without extra pointers?
- What changes are needed if the traversal order should be inorder instead of preorder?

---

## Key Takeaway

> The iterative approach uses no extra space by threading the right subtree onto the leftmost path's rightmost node — similar to Morris traversal.
