# 108. Convert Sorted Array to Binary Search Tree

**Difficulty:** 🟢 Easy
**Acceptance:** 74.0%
**LeetCode:** [https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree)
**Companies:** Accenture, Airbnb, Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Tiktok

---

## Problem Description
Given a sorted (in ascending order) integer array `nums`, construct a height‑balanced binary search tree (BST) and return its root. A height‑balanced BST is defined as a binary tree in which the depth of the two sub‑trees of every node never differs by more than one.

## Examples
**Example 1:**
```
Input: nums = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: One possible BST is:
      0
     / \
   -3   9
   /   / 
 -10  5
```
**Example 2:**
```
Input: nums = [1,3]
Output: [3,1]
Explanation: The BST [1,null,3] is also valid, but the returned tree is height‑balanced.
```

## Approach
Use a recursive divide‑and‑conquer strategy: select the middle element of the current sub‑array as the root, recursively build the left subtree from the left half, and the right subtree from the right half. This guarantees minimal height.

**Pseudocode**
```text
FUNCTION sortedArrayToBST(nums):
    RETURN build(nums, 0, LENGTH(nums) - 1)

FUNCTION build(nums, lo, hi):
    IF lo > hi:
        RETURN NULL
    SET mid ← (lo + hi) DIV 2
    CREATE node WITH value nums[mid]
    node.left ← build(nums, lo, mid - 1)
    node.right ← build(nums, mid + 1, hi)
    RETURN node
```

## Walkthrough
For `nums = [-10,-3,0,5,9]`:
| Call | lo | hi | mid | node.val |
|------|----|----|-----|----------|
| build | 0 | 4 | 2 | 0 |
| build (left) | 0 | 1 | 0 | -10 |
| build (right of -10) | 1 | 1 | 1 | -3 |
| build (right) | 3 | 4 | 3 | 5 |
| build (right of 5) | 4 | 4 | 4 | 9 |
The recursion yields a balanced BST.

## Complexity Analysis
- **Time:** O(n) – each element becomes a node once.
- **Space:** O(log n) – recursion stack depth equals tree height.

## Follow‑Up Questions
1. How would you construct a height‑balanced BST from a sorted linked list?
2. Can you modify the algorithm to produce a BST with minimal possible height when the input array size is not a power of two?
3. What changes are needed to build an AVL or Red‑Black tree instead?

## Key Takeaway
Choosing the middle element recursively creates a balanced BST directly from a sorted array.
