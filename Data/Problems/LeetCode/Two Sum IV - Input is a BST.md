# 653. Two Sum IV - Input is a BST

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/two-sum-iv-input-is-a-bst](https://leetcode.com/problems/two-sum-iv-input-is-a-bst)
**Companies:** Amazon, Bloomberg, Cisco, Goldman Sachs, Google, Meta, Microsoft, Samsung

---

## Problem Description
Given the root of a Binary Search Tree (BST) and an integer `k`, determine whether there exist two distinct nodes in the BST such that the sum of their values equals `k`. Return `true` if such a pair exists, otherwise `false`.

## Examples
**Example 1:**
Input: `root = [5,3,6,2,4,null,7]`, `k = 9`
Output: `true`
Explanation: Nodes with values `2` and `7` sum to `9`.

**Example 2:**
Input: `root = [5,3,6,2,4,null,7]`, `k = 28`
Output: `false`
Explanation: No pair of nodes sums to `28`.

## Approach
Perform an in‑order traversal of the BST to obtain a sorted list of node values. Then apply the two‑pointer technique on this sorted list to find a pair that sums to `k`.

## Walkthrough
| Step | Action | In‑order list | Pointers (l,r) | Sum |
|------|--------|---------------|----------------|-----|
| 1 | Traverse BST in order | `[2,3,4,5,6,7]` | l=0 (2), r=5 (7) | 9 → match → return true |

## Complexity Analysis
- **Time:** `O(n)` where `n` is the number of nodes (traversal + two‑pointer scan).
- **Space:** `O(n)` for the list of values (or `O(h)` if using an iterator with a stack).

## Follow‑Up Questions
1. How would you solve the problem using only `O(h)` extra space without storing all values?
2. Can the solution be adapted for a general binary tree (not a BST)?
3. What if the BST is immutable – does the approach change?

## Key Takeaway
An in‑order traversal of a BST yields a sorted sequence, enabling the classic two‑pointer method to detect a target sum in linear time.
