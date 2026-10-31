# 563. Binary Tree Tilt

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-tree-tilt](https://leetcode.com/problems/binary-tree-tilt)
**Companies:** Amazon, Indeed, Meta

---

## Problem Description
Given the `root` of a binary tree, return *the sum of every tree node's **tilt**.*

The **tilt** of a tree node is the **absolute difference** between the sum of all left subtree node **values** and all right subtree node **values**. If a node does not have a left child, then the sum of the left subtree node **values** is treated as `0`. The rule is similar if the node does not have a right child.

**Constraints:**
- The number of nodes in the tree is in the range `[0, 10⁴]`.
- `-1000 ≤ Node.val ≤ 1000`

## Examples
```
Example 1:
  Input: root = [1,2,3]
  Output: 1
  Explanation:
  Tilt of node 2 : |0-0| = 0 (no children)
  Tilt of node 3 : |0-0| = 0 (no children)
  Tilt of node 1 : |2-3| = 1 (left subtree is just left child, so sum is 2; right subtree is just right child, so sum is 3)
  Sum of every tilt : 0 + 0 + 1 = 1

Example 2:
  Input: root = [4,2,9,3,5,null,7]
  Output: 15
  Explanation:
  Tilt of node 3 : |0-0| = 0 (no children)
  Tilt of node 5 : |0-0| = 0 (no children)
  Tilt of node 7 : |0-0| = 0 (no children)
  Tilt of node 2 : |3-5| = 2 (left subtree is just left child, so sum is 3; right subtree is just right child, so sum is 5)
  Tilt of node 9 : |0-7| = 7 (no left child, so sum is 0; right subtree is just right child, so sum is 7)
  Tilt of node 4 : |(3+5+2)-(9+7)| = |10-16| = 6 (left subtree values are 3, 5, and 2, which sums to 10; right subtree values are 9 and 7, which sums to 16)
  Sum of every tilt : 0 + 0 + 0 + 2 + 7 + 6 = 15

Example 3:
  Input: root = [21,7,14,1,1,2,2,3,3]
  Output: 9
```

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
- Space: O(h) – recursion stack height `h` (worst-case O(n)).

## Follow-Up Questions
- How would you implement the solution iteratively using a stack?
- Can you compute the tilt while performing a Morris traversal to achieve O(1) extra space?
- How does the algorithm change if node values can be negative?

## Key Takeaway
A postorder traversal lets you compute subtree sums before evaluating a node’s tilt, enabling a simple O(n) solution.
