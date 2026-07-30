# 145. Binary Tree Postorder Traversal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-tree-postorder-traversal](https://leetcode.com/problems/binary-tree-postorder-traversal)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given the root of a binary tree, return the values of its nodes obtained from a postorder traversal (left subtree, right subtree, then node itself). The number of nodes is in the range `[0, 10^4]` and each node's value is an integer.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[1,null,2,3]` | `[3,2,1]` | The tree is `1 → 2 → 3`. Postorder visits left (none), right subtree `2` (which visits left `3`), then root.
| `[]` | `[]` | Empty tree yields empty list.

## Approach
Use an iterative depth‑first search with a stack. Perform a modified preorder traversal (node → right → left) and reverse the collected order to obtain postorder.

```text
FUNCTION postorderTraversal(root):
    IF root == null: RETURN []
    stack ← [root]
    result ← []
    WHILE stack IS NOT EMPTY:
        node ← POP(stack)
        APPEND node.val TO result
        IF node.left != null: PUSH(node.left) TO stack
        IF node.right != null: PUSH(node.right) TO stack
    REVERSE result
    RETURN result
```

## Walkthrough
Consider the tree `[1,null,2,3]`:
1. Push `1` → stack `[1]`.
2. Pop `1`, add `1` to result, push left (none) then right `2` → stack `[2]`, result `[1]`.
3. Pop `2`, add `2`, push left `3` → stack `[3]`, result `[1,2]`.
4. Pop `3`, add `3` → stack `[]`, result `[1,2,3]`.
5. Reverse result → `[3,2,1]`.

## Complexity Analysis
- Time: O(n) – each node is visited once.
- Space: O(n) – stack and result list store up to n nodes.

## Follow-Up Questions
- How would you implement postorder traversal recursively?
- Can you perform postorder traversal with O(1) extra space using Morris traversal?
- How does the algorithm change for an n‑ary tree?

## Key Takeaway
Iterative postorder can be achieved by a reversed preorder (node → right → left) using a stack, then reversing the collected order.
