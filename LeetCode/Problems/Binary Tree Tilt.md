# 563. Binary Tree Tilt

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-tree-tilt](https://leetcode.com/problems/binary-tree-tilt)
**Companies:** Amazon, Indeed, Meta

---

## Problem Description
Given the root of a binary tree, the tilt of a node is the absolute difference between the sum of values in its left subtree and the sum of values in its right subtree. The tilt of the whole tree is the sum of all node tilts. Return the total tilt. The tree contains up to `10^4` nodes with integer values.

## Examples
| Input Tree | Output | Explanation |
|------------|--------|-------------|
| `[1,2,3]` | `1` | Node `2` tilt `0`, node `3` tilt `0`, root tilt `|2-3| = 1`. Sum = 1. |
| `[4,2,9,3,5,null,7]` | `15` | Compute tilts for each node and sum them. |

## Approach
Perform a postorder DFS. For each node, compute the sum of its left and right subtrees, add the absolute difference to a running total, and return the total sum of the subtree rooted at that node.

```text
FUNCTION findTilt(root):
    totalTilt ← 0
    FUNCTION dfs(node):
        IF node == null: RETURN 0
        leftSum ← dfs(node.left)
        rightSum ← dfs(node.right)
        totalTilt ← totalTilt + ABS(leftSum - rightSum)
        RETURN node.val + leftSum + rightSum
    dfs(root)
    RETURN totalTilt
```

## Walkthrough
For `[1,2,3]`:
1. dfs on left child `2` returns sum `2`, tilt `0` added.
2. dfs on right child `3` returns sum `3`, tilt `0` added.
3. At root `1`, leftSum `2`, rightSum `3`, tilt `|2-3|=1` added. Total tilt = 1.

## Complexity Analysis
- Time: O(n) – each node visited once.
- Space: O(h) – recursion stack height `h` (worst‑case O(n)).

## Follow-Up Questions
- How would you implement the solution iteratively using a stack?
- Can you compute the tilt while performing a Morris traversal to achieve O(1) extra space?
- How does the algorithm change if node values can be negative?

## Key Takeaway
A postorder traversal lets you compute subtree sums before evaluating a node’s tilt, enabling a simple O(n) solution.
