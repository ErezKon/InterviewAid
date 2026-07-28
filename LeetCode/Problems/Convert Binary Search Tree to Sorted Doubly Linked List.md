# 426. Convert Binary Search Tree to Sorted Doubly Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list](https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list)
**Companies:** Amazon, Meta, Microsoft, Tiktok

---

## Problem Description
Given the root of a Binary Search Tree (BST), convert it into a sorted circular doubly‑linked list in-place. The order of the nodes in the list must follow an in‑order traversal of the BST. Return the head of the list.

## Examples
**Example 1:**
```
Input: root = [4,2,5,1,3]
Output: [1,2,3,4,5] (circular, head points to 1)
```
**Example 2:**
```
Input: root = []
Output: []
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
