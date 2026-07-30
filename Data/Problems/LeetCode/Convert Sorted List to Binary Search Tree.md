# 109. Convert Sorted List to Binary Search Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree)
**Companies:** Amazon, Apple, Bloomberg, Google, Lyft, Meta, Microsoft, Tcs, Zenefits

---

## Problem Description
Given the head of a singly‑linked list where node values are sorted in ascending order, convert it to a height‑balanced binary search tree (BST). A height‑balanced BST has the depth of the two sub‑trees of every node differ by at most one.

## Examples
**Example 1:**
```
Input: head = [-10, -3, 0, 5, 9]
Output: [0, -3, 9, -10, null, 5]
Explanation: One possible BST is:
        0
       / \
     -3   9
     /   /
   -10  5
```
**Example 2:**
```
Input: head = []
Output: []
Explanation: An empty list yields an empty tree.
```

## Approach
Use the fast/slow pointer technique to find the middle node, which becomes the root. Recursively build left and right sub‑trees from the left and right halves of the list.

```text
FUNCTION sortedListToBST(head):
    IF head IS null:
        RETURN null
    IF head.next IS null:
        RETURN TreeNode(head.val)

    // locate middle node
    SET prev ← null
    SET slow ← head
    SET fast ← head
    WHILE fast IS NOT null AND fast.next IS NOT null:
        prev ← slow
        slow ← slow.next
        fast ← fast.next.next

    // disconnect left half
    IF prev IS NOT null:
        prev.next ← null

    SET root ← TreeNode(slow.val)
    root.left ← sortedListToBST(head)        // left half
    root.right ← sortedListToBST(slow.next)   // right half
    RETURN root
```

## Walkthrough
| Step | fast moves | slow points | split point | subtree built |
|------|------------|-------------|-------------|---------------|
| 1 | 0→2→4 | 0→1→2 | node 2 (value 0) becomes root | left list [-10,-3], right list [5,9] |
| 2 (left) | - | finds -3 as root of left subtree | left list [-10], right [] |
| 3 (right) | - | finds 9 as root of right subtree | left [5], right [] |

## Complexity Analysis
- **Time:** O(n log n) – each recursion scans a sub‑list to find its middle.
- **Space:** O(log n) recursion stack for a balanced tree.

## Follow‑Up Questions
1. How can you achieve O(n) time using an inorder simulation with a global list pointer?
2. How would you modify the algorithm for a doubly‑linked list?
3. Can you build a BST that preserves the original list order without re‑balancing?

## Key Takeaway
Finding the middle element with fast/slow pointers lets you recursively split a sorted list, yielding a height‑balanced BST in O(n log n) time.
