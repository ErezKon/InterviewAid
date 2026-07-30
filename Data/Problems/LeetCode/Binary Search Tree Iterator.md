# 173. Binary Search Tree Iterator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-search-tree-iterator](https://leetcode.com/problems/binary-search-tree-iterator)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Google, Linkedin, Meta, Microsoft

---

## Problem Description
Design an iterator over a binary search tree (BST) that returns the next smallest element on each call. Implement `next()` and `hasNext()` with average O(1) time and O(h) memory, where h is the tree height.

## Examples
| BST (inorder) | Operations | Output |
|---------------|------------|--------|
| 3 /\\ 1 4 | `next()` → 1, `next()` → 3, `hasNext()` → true, `next()` → 4, `hasNext()` → false | 1,3,true,4,false |
| Single node 5 | `hasNext()` → true, `next()` → 5, `hasNext()` → false | true,5,false |

## Approach
**Controlled Inorder with Stack** – Push all left descendants of the current node onto a stack. `next()` pops the top node, processes its value, then pushes the left chain of its right child. This yields the next in‑order element.

```text
CLASS BSTIterator:
    CONSTRUCTOR(root):
        SET stack ← []
        CALL pushLeft(root)

    FUNCTION next():
        SET node ← POP(stack)
        CALL pushLeft(node.right)
        RETURN node.val

    FUNCTION hasNext():
        RETURN stack IS NOT EMPTY

    FUNCTION pushLeft(node):
        WHILE node IS NOT NULL:
            PUSH(node) TO stack
            SET node ← node.left
```

## Walkthrough
For BST `[3,1,4]`:
1. Constructor pushes 3 then 1 → stack `[3,1]`.
2. `next()` pops 1, pushes left of 1.right (null). Returns 1.
3. `next()` pops 3, pushes left of 3.right → pushes 4. Returns 3.
4. `hasNext()` true, `next()` pops 4, returns 4. Stack empty.

## Complexity Analysis
- **Time:** O(1) average per `next()`/`hasNext()`; each node is pushed/popped once.
- **Space:** O(h) for the stack, where h is tree height.

## Follow-Up Questions
- How would you modify the iterator to support `prev()` for reverse inorder?
- Can you implement the iterator without extra space using Morris traversal?
- How does the design change for a balanced BST vs. a skewed tree?

## Key Takeaway
A stack of left ancestors enables lazy inorder traversal, giving O(1) amortized time per element while using only O(h) auxiliary space.