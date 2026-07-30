# 94. Binary Tree Inorder Traversal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-tree-inorder-traversal](https://leetcode.com/problems/binary-tree-inorder-traversal)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## Problem Description
Given the `root` of a binary tree, return the values of its nodes following an **inorder** traversal (left subtree → node → right subtree). The tree may be empty.

## Examples
| Tree (level order) | Output |
|--------------------|--------|
| `[1,null,2,3]` | `[1,3,2]` |
| `[]` | `[]` |
| `[1,2,3,4,5,6,7]` | `[4,2,5,1,6,3,7]` |

## Approach
Perform a depth‑first search in **inorder** order. The recursive version is straightforward; the iterative version uses a stack to simulate the call stack.

### Pseudocode (Recursive)
```text
FUNCTION inorderTraversal(node):
    IF node == null:
        RETURN []
    SET left ← inorderTraversal(node.left)
    SET right ← inorderTraversal(node.right)
    RETURN left + [node.val] + right
```

### Pseudocode (Iterative with Stack)
```text
FUNCTION inorderTraversal(root):
    SET stack ← []
    SET curr ← root
    SET result ← []
    WHILE curr != null OR stack NOT EMPTY:
        WHILE curr != null:
            PUSH curr ONTO stack
            SET curr ← curr.left
        SET curr ← POP(stack)
        APPEND curr.val TO result
        SET curr ← curr.right
    RETURN result
```

## Walkthrough
For the tree `[1,null,2,3]`:
1. Push `1` then go left (null).
2. Pop `1`, add to result → `[1]`, move to right child `2`.
3. Push `2`, go left to `3`.
4. Push `3`, left null, pop `3` → result `[1,3]`.
5. `3` has no right, pop `2` → result `[1,3,2]`.

## Complexity Analysis
- **Time:** `O(n)` – each node visited once.
- **Space:** `O(h)` recursion stack or explicit stack, where `h` is tree height (worst‑case `O(n)`).

## Follow‑Up Questions
1. How would you perform inorder traversal without recursion or a stack (Morris Traversal)?
2. Can you modify the algorithm to output the kth smallest element?
3. How does the approach change for a threaded binary tree?

## Key Takeaway
Inorder traversal can be implemented recursively or iteratively with a stack, both achieving linear time and space proportional to tree height.
