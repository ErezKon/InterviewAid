# 501. Find Mode in Binary Search Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-mode-in-binary-search-tree](https://leetcode.com/problems/find-mode-in-binary-search-tree)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description
Given the root of a binary search tree (BST), return all the mode(s) (the most frequently occurring element(s)) in the BST. If multiple values have the same highest frequency, return all of them in any order.

## Examples
| Input (BST) | Output | Explanation |
|-------------|--------|-------------|
| `[1,null,2,2]` | `[2]` | Value `2` appears twice, more than `1`. |
| `[0]` | `[0]` | Single node, it is the mode. |
| `[1,1,2,2]` | `[1,2]` | Both `1` and `2` appear twice, sharing the highest frequency. |

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
