# 1602. Find Nearest Right Node in Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-nearest-right-node-in-binary-tree](https://leetcode.com/problems/find-nearest-right-node-in-binary-tree)
**Companies:** Google

---

## Problem Description
Given the `root` of a binary tree and an integer `u` representing the value of a target node, return the value of the node that is the nearest neighbor to the right of the target node on the same depth level. If the target node is the rightmost node on its level, return `-1`.

## Examples
| Input (tree) | u | Output | Explanation |
|---------------|---|--------|-------------|
| `[1,2,3,4,5,null,7]` | `2` | `3` | Nodes `2` and `3` are on the same level; `3` is to the right of `2`. |
| `[1,2,3,4,5,null,7]` | `5` | `7` | `5` and `7` share depth 2; `7` is right of `5`. |
| `[1,2,3]` | `3` | `-1` | `3` is the rightmost node on its level.

## Approach
Perform a breadth‑first search (BFS) level by level. For each level, iterate through its nodes while keeping track of the previous node's value. When the current node’s value equals `u`, the previously visited node (if any) is the left neighbor; the next node in the same level (if it exists) is the right neighbor. Return the right neighbor’s value or `-1` if none.

## Walkthrough
For the tree `[1,2,3,4,5,null,7]` and `u = 5`:
| Level | Nodes (left→right) | Process |
|-------|--------------------|---------|
| 0 | 1 | not target |
| 1 | 2, 3 | not target |
| 2 | 4, 5, 7 | encounter `5`; next node in queue is `7` → answer `7` |

## Complexity Analysis
- **Time:** O(n) – each node visited once during BFS.
- **Space:** O(w) where w is the maximum width of the tree (queue size).

## Follow-Up Questions
- How would you solve the problem using a depth‑first search without extra space?
- Can you modify the algorithm to return the nearest left node instead?
- What changes are needed if the tree is represented as a parent pointer list?

## Key Takeaway
A level‑order traversal naturally exposes the horizontal ordering of nodes, allowing the nearest right neighbor to be identified in a single pass.
