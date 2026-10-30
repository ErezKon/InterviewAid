# 2265. Count Nodes Equal to Average of Subtree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree](https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree)
**Companies:** Amazon, Google, Meta, Microsoft, Snowflake

---

## Problem Description
Given the `root` of a binary tree, return *the number of nodes where the value of the node is equal to the **average** of the values in its **subtree***.

**Note:**
- The **average** of `n` elements is the **sum** of the `n` elements divided by `n` and **rounded down** to the nearest integer.
- A **subtree** of `root` is a tree consisting of `root` and all of its descendants.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 1000]`.
- `0 <= Node.val <= 1000`

## Examples
```
Example 1:
  Input: root = [4,8,5,0,1,null,6]
  Output: 5
  Explanation:
  For the node with value 4: The average of its subtree is (4 + 8 + 5 + 0 + 1 + 6) / 6 = 24 / 6 = 4.
  For the node with value 5: The average of its subtree is (5 + 6) / 2 = 11 / 2 = 5.
  For the node with value 0: The average of its subtree is 0 / 1 = 0.
  For the node with value 1: The average of its subtree is 1 / 1 = 1.
  For the node with value 6: The average of its subtree is 6 / 1 = 6.
```

```
Example 2:
  Input: root = [1]
  Output: 1
  Explanation: For the node with value 1: The average of its subtree is 1 / 1 = 1.
```

## Approach
Perform a post‑order DFS. For each node, obtain `(subSum, subCount)` from its left and right children, compute the total sum and count for the current subtree, and check if `totalSum // totalCount == node.val`. Increment a global counter when the condition holds.

## Walkthrough
| Node | Left (sum,count) | Right (sum,count) | totalSum | totalCount | avg = totalSum // totalCount | matches? |
|------|------------------|-------------------|----------|------------|----------------------------|----------|
| 0    | (0,1)            | (1,1)             | 1        | 2          | 0                          | yes (value 0) |
| 1    | (0,1)            | (0,0)             | 1        | 2          | 0                          | no |
| ...  | ...              | ...               | ...      | ...        | ...                        | ... |
(Continue up to the root, counting matches.)

## Complexity Analysis
- **Time:** O(N) – each node visited once.
- **Space:** O(H) recursion stack, where H is tree height (≤ N).

## Follow‑Up Questions
1. How would you adapt the solution for a tree given as parent‑pointer array instead of node objects?
2. Can the problem be solved iteratively using an explicit stack?
3. What changes are needed if the average should be computed using floating‑point division instead of integer division?

## Key Takeaway
A post‑order traversal provides subtree sums and sizes in one pass, enabling direct comparison of a node’s value to its subtree’s integer average.
