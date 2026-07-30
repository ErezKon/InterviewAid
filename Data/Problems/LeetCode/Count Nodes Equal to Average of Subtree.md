# 2265. Count Nodes Equal to Average of Subtree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree](https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree)
**Companies:** Amazon, Google, Meta, Microsoft, Snowflake

---

## Problem Description
Given the root of a binary tree, for each node compute the average value of all nodes in its subtree (including itself). The average is defined as the integer division of the sum by the number of nodes. Return the count of nodes whose value equals this average.

## Examples
**Example 1:**
```
Input: root = [4,8,5,0,1,null,6]
Output: 5
Explanation: The nodes with values 4, 5, 0, 1, and 6 each equal the integer average of their respective subtrees.
```
**Example 2:**
```
Input: root = [1]
Output: 1
Explanation: Single node tree, average equals its value.
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
