# 145. Binary Tree Postorder Traversal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-tree-postorder-traversal](https://leetcode.com/problems/binary-tree-postorder-traversal)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given the `root` of a binary tree, return *the postorder traversal of its nodes' values*.

**Constraints:**
- The number of the nodes in the tree is in the range `[0, 100]`.
- `-100 ≤ Node.val ≤ 100`

**Follow up:** Recursive solution is trivial, could you do it iteratively?

## Examples
```
Example 1:
  Input: root = [1,null,2,3]
  Output: [3,2,1]

Example 2:
  Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
  Output: [4,6,7,5,2,9,8,3,1]

Example 3:
  Input: root = []
  Output: []

Example 4:
  Input: root = [1]
  Output: [1]
```

## Approach
Use an iterative depth-first search with a stack. Perform a modified preorder traversal (node → right → left) and reverse the collected order to obtain postorder.

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
- How does the algorithm change for an n-ary tree?

## Key Takeaway
Iterative postorder can be achieved by a reversed preorder (node → right → left) using a stack, then reversing the collected order.
