# 1602. Find Nearest Right Node in Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-nearest-right-node-in-binary-tree](https://leetcode.com/problems/find-nearest-right-node-in-binary-tree)
**Companies:** Google

---

## Problem Description
> *Note: statement verified against the official problem text (premium; via doocs/leetcode). Official returns the node (or `null`), not `-1` as the Approach below says.*

Given the `root` of a binary tree and a node `u` in the tree, return *the **nearest** node on the **same level** that is to the **right** of* `u`*, or return* `null` *if* `u` *is the rightmost node in its level*.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10^5]`.
- `1 <= Node.val <= 10^5`
- All values in the tree are **distinct**.
- `u` is a node in the binary tree rooted at `root`.

## Examples
```
Example 1:
  Input: root = [1,2,3,null,4,5,6], u = 4
  Output: 5
  Explanation: The nearest node on the same level to the right of node 4 is node 5.
```

```
Example 2:
  Input: root = [3,null,4,2], u = 2
  Output: null
  Explanation: There are no nodes to the right of 2.
```

## Approach
Perform a breadth-first search (BFS) level by level. For each level, iterate through its nodes while keeping track of the previous node's value. When the current node’s value equals `u`, the previously visited node (if any) is the left neighbor; the next node in the same level (if it exists) is the right neighbor. Return the right neighbor’s value or `-1` if none.

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
- How would you solve the problem using a depth-first search without extra space?
- Can you modify the algorithm to return the nearest left node instead?
- What changes are needed if the tree is represented as a parent pointer list?

## Key Takeaway
A level-order traversal naturally exposes the horizontal ordering of nodes, allowing the nearest right neighbor to be identified in a single pass.
