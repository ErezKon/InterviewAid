# 112. Path Sum

**Difficulty:** 🟢 Easy
**Acceptance:** 50.0%
**LeetCode:** [https://leetcode.com/problems/path-sum](https://leetcode.com/problems/path-sum)
**Companies:** Amazon, Apple, Bloomberg, Datadog, Goldman Sachs, Google, Meta, Microsoft, Palo Alto Networks, Tiktok

---

## Problem Description
Given the `root` of a binary tree and an integer `targetSum`, return `true` if the tree has a **root-to-leaf** path such that adding up all the values along the path equals `targetSum`.

A **leaf** is a node with no children.

**Constraints:**

- The number of nodes in the tree is in the range `[0, 5000]`.
- `-1000 <= Node.val <= 1000`
- `-1000 <= targetSum <= 1000`

## Examples

```
Example 1:
  Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
  Output: true
  Explanation: The root-to-leaf path with the target sum is 5 -> 4 -> 11 -> 2.
```

```
Example 2:
  Input: root = [1,2,3], targetSum = 5
  Output: false
  Explanation: There are two root-to-leaf paths in the tree:
  (1 --> 2): The sum is 3.
  (1 --> 3): The sum is 4.
  There is no root-to-leaf path with sum = 5.
```

```
Example 3:
  Input: root = [], targetSum = 0
  Output: false
  Explanation: Since the tree is empty, there are no root-to-leaf paths.
```

## Approach
Perform a depth-first search, subtracting the node value from `targetSum` as you descend. When a leaf is reached, check if the remaining sum equals the leaf's value.

```text
FUNCTION hasPathSum(node, remaining):
    IF node == null: RETURN false
    IF node.left == null AND node.right == null:
        RETURN remaining == node.val
    RETURN hasPathSum(node.left, remaining - node.val) OR
           hasPathSum(node.right, remaining - node.val)
```

## Walkthrough
For the first example, start with `remaining = 22` at the root (5). Recurse left with `remaining = 17`, then left again with `remaining = 13`, and finally left leaf (2) with `remaining = 2` → match, return true.

## Complexity Analysis
- Time: O(N) – each node visited once.
- Space: O(H) – recursion stack depth `H` equals tree height (worst-case O(N)).

## Follow-Up Questions
1. How would you modify the algorithm to return the actual path instead of a boolean?
2. Can you solve it iteratively using a stack or queue?
3. What changes are needed if the path can start and end at any node (not necessarily root-to-leaf)?

## Key Takeaway
Subtracting the node value while traversing turns the target-sum check into a simple leaf-node equality test.
