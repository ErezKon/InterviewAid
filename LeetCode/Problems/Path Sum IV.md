# 666. Path Sum IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/path-sum-iv](https://leetcode.com/problems/path-sum-iv)
**Companies:** Alibaba

---

## Problem Description
Given a rooted binary tree where each node contains a value of 0 or 1, return the number of root‑to‑leaf paths such that the sum of the node values along the path equals a given `targetSum`.

Constraints: The tree has at most 10⁴ nodes; node values are only 0 or 1; `targetSum` is a non‑negative integer.

## Examples
| Tree (preorder) | targetSum | Output | Explanation |
|-----------------|-----------|--------|-------------|
| [1,0,1,null,1,null,0] | 2 | 2 | Two root‑to‑leaf paths (1→0→1 and 1→1→0) sum to 2. |
| [0,null,1,1] | 1 | 1 | Only the path 0→1→1 yields sum 1.

## Approach
Use a depth‑first search that carries the cumulative sum from the root to the current node.

1. Start DFS at the root with `currentSum = 0`.
2. At each node, update `currentSum ← currentSum + node.val`.
3. If the node is a leaf, check `currentSum == targetSum`; if true, increment a global counter.
4. Recurse on left and right children.
5. Return the final counter.

## Walkthrough
For the first example, the DFS explores paths:
- 1 → 0 → 1 (sum = 2) → count++
- 1 → 1 → 0 (sum = 2) → count++
All other paths have sums ≠ 2.

## Complexity Analysis
- Time: O(N) – each node visited once.
- Space: O(H) – recursion stack height `H` ≤ tree height (≤ log N for balanced, O(N) worst case).

## Follow‑Up Questions
1. How would you adapt the solution for trees with arbitrary integer values?
2. Can you solve the problem iteratively using an explicit stack?
3. What changes are needed if paths can start at any node, not just the root?

## Key Takeaway
A simple DFS that propagates a running sum efficiently counts qualifying root‑to‑leaf paths in a binary tree.
