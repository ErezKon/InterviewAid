# 426. Convert Binary Search Tree to Sorted Doubly Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list](https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list)
**Companies:** Amazon, Meta, Microsoft, Tiktok

---

## Problem Description
Convert a **Binary Search Tree** to a sorted **Circular Doubly-Linked List** in place.

You can think of the left and right pointers as synonymous to the predecessor and successor pointers in a doubly-linked list. For a circular doubly linked list, the predecessor of the first element is the last element, and the successor of the last element is the first element.

We want to do the transformation **in place**. After the transformation, the left pointer of the tree node should point to its predecessor, and the right pointer should point to its successor. You should return the pointer to the smallest element of the linked list.

**Constraints:**
- The number of nodes in the tree is in the range `[0, 2000]`.
- `-1000 <= Node.val <= 1000`
- All the values of the tree are **unique**.

## Examples
```
Example 1:
  Input: root = [4,2,5,1,3]
  Output: [1,2,3,4,5]
  Explanation: The transformed BST forms a circular list 1 <-> 2 <-> 3 <-> 4 <-> 5 <-> (back to 1).
    The right pointers indicate the successor relationship, while the left pointers indicate the predecessor relationship.
```
```
Example 2:
  Input: root = [2,1,3]
  Output: [1,2,3]
```

## Approach
Perform an in‑order traversal, linking each visited node with its predecessor. Keep track of the first (smallest) and last (largest) nodes to close the circular list.

**Pseudocode**
```text
FUNCTION treeToDoublyList(root):
    IF root IS NULL: RETURN NULL
    SET first ← NULL
    SET last ← NULL
    FUNCTION inorder(node):
        IF node IS NULL: RETURN
        inorder(node.left)
        IF last IS NOT NULL:
            last.right ← node
            node.left ← last
        ELSE:
            first ← node               // first visited node
        SET last ← node
        inorder(node.right)
    inorder(root)
    // Close the circular list
    first.left ← last
    last.right ← first
    RETURN first
```

## Walkthrough
For BST `[4,2,5,1,3]` the in‑order sequence is 1 → 2 → 3 → 4 → 5. The algorithm links each node to its predecessor, then connects 5 back to 1.

## Complexity Analysis
- **Time:** O(n) – each node visited once.
- **Space:** O(h) – recursion stack, where h is tree height (O(log n) balanced, O(n) worst).

## Follow‑Up Questions
1. How would you implement the conversion iteratively using a stack?
2. Can the list be made non‑circular while preserving order?
3. What modifications are needed if the input tree is not a BST?

## Key Takeaway
In‑order traversal naturally yields nodes in sorted order, allowing straightforward linking into a doubly‑linked list.
