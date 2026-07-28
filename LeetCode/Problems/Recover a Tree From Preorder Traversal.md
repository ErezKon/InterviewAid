# 1028. Recover a Tree From Preorder Traversal

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/recover-a-tree-from-preorder-traversal](https://leetcode.com/problems/recover-a-tree-from-preorder-traversal)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given a string `traversal` that encodes a binary tree in a preorder traversal where each node's depth is represented by a series of `'-'` characters followed by its integer value, reconstruct the original binary tree and return its root.

## Examples
**Example 1:**
```
Input: traversal = "1-2--3--4-5--6--7"
Output: [1,2,5,3,4,6,7]
Explanation: The tree is:
    1
   / \
  2   5
 / \ / \
3  4 6 7
```
**Example 2:**
```
Input: traversal = "1-2--3---4-5--6---7"
Output: [1,2,5,3,null,6,null,4,null,7]
Explanation: The tree is:
    1
   / \
  2   5
 /   / \
3   6   null
 \   \
  4   7
```

## Approach
Parse the string sequentially, extracting each node's depth (count of `'-'`) and value. Maintain a stack of nodes representing the current path from the root. For each new node, pop from the stack until its depth matches the stack size, then attach it as the left child if the parent has no left child, otherwise as the right child. Push the new node onto the stack.

## Pseudocode
```text
FUNCTION recoverFromPreorder(traversal):
    CREATE empty stack
    SET i ← 0
    WHILE i < LENGTH(traversal):
        // Determine depth
        SET depth ← 0
        WHILE i < LENGTH(traversal) AND traversal[i] == '-':
            SET depth ← depth + 1
            SET i ← i + 1
        // Determine node value
        SET value ← 0
        WHILE i < LENGTH(traversal) AND IS_DIGIT(traversal[i]):
            SET value ← value * 10 + DIGIT_TO_INT(traversal[i])
            SET i ← i + 1
        // Create node
        SET node ← TreeNode(value)
        // Adjust stack to correct parent depth
        WHILE LENGTH(stack) > depth:
            POP stack
        // Attach node to parent if exists
        IF NOT EMPTY(stack):
            SET parent ← TOP(stack)
            IF parent.left IS null:
                SET parent.left ← node
            ELSE:
                SET parent.right ← node
        // Push current node onto stack
        PUSH node ONTO stack
    // Root is first element left in stack
    RETURN stack[0]
```

## Walkthrough
For `traversal = "1-2--3--4-5--6--7"`:
1. Parse `1` (depth 0) → root node 1, push.
2. Parse `-2` (depth 1) → attach as left child of 1, push.
3. Parse `--3` (depth 2) → attach as left child of 2, push.
4. Parse `--4` (depth 2) → pop to depth 1, attach as right child of 2, push.
5. Continue similarly for remaining nodes, building the tree shown in the example.

## Complexity Analysis
- **Time:** O(n) where n is the length of the input string, each character processed once.
- **Space:** O(h) for the stack, where h is the height of the tree (≤ number of nodes).

## Follow‑Up Questions
1. How would you modify the algorithm to handle trees with more than two children (e.g., N‑ary trees)?
2. Can the reconstruction be performed without an explicit stack, using recursion instead?
3. What changes are needed if the depth encoding uses a different delimiter or base‑64 encoding for values?

## Key Takeaway
Parsing depth/value pairs and using a stack to maintain the current path enables linear‑time reconstruction of a binary tree from its preorder string representation.
