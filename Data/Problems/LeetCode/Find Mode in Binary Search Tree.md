# 501. Find Mode in Binary Search Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-mode-in-binary-search-tree](https://leetcode.com/problems/find-mode-in-binary-search-tree)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

Given the `root` of a binary search tree (BST) with duplicates, return *all the mode(s) (i.e., the most frequently occurred element) in it*.

If the tree has more than one mode, return them in **any order**.

Assume a BST is defined as follows:

- The left subtree of a node contains only nodes with keys **less than or equal to** the node's key.
- The right subtree of a node contains only nodes with keys **greater than or equal to** the node's key.
- Both the left and right subtrees must also be binary search trees.

**Follow up:** Could you do that without using any extra space? (Assume that the implicit stack space incurred due to recursion does not count).

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10^4]`.
- `-10^5 <= Node.val <= 10^5`

## Examples

**Example 1:**
```
Input: root = [1,null,2,2]
Output: [2]
```

**Example 2:**
```
Input: root = [0]
Output: [0]
```

## Approach
Perform an in‑order traversal to visit nodes in non‑decreasing order. Keep a running count of the current value and track the maximum frequency seen so far. When the count exceeds the max, reset the result list; when it equals the max, append the value.

## Walkthrough
For BST `[1,null,2,2]` (in‑order sequence `1,2,2`):
| Node value | Current count | Max freq | Result |
|------------|---------------|----------|--------|
| 1 | 1 | 1 | `[1]` |
| 2 (first) | 1 | 1 → reset to 1, result `[2]` |
| 2 (second) | 2 | 2 (greater) → result `[2]` |
Final result `[2]`.

## Complexity Analysis
- **Time:** O(n) – each node visited once.
- **Space:** O(h) recursion stack, where h is the tree height (O(log n) for balanced BST, O(n) worst case).

## Follow-Up Questions
- How would you solve the problem with O(1) extra space (Morris traversal)?
- Can you adapt the algorithm to handle a general binary tree (not BST)?
- What if the tree is extremely large and stored on disk?

## Key Takeaway
An in‑order traversal of a BST yields sorted values, allowing a simple single‑pass frequency count to identify the mode(s).
