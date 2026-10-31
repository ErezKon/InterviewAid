# 666. Path Sum IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/path-sum-iv](https://leetcode.com/problems/path-sum-iv)
**Companies:** Alibaba

---

## Problem Description
If the depth of a tree is smaller than `5`, then this tree can be represented by an array of three-digit integers. You are given an **ascending** array `nums` consisting of three-digit integers representing a binary tree with a depth smaller than `5`, where for each integer:

- The hundreds digit represents the depth `d` of this node, where `1 <= d <= 4`.
- The tens digit represents the position `p` of this node within its level, where `1 <= p <= 8`, corresponding to its position in a **full binary tree**.
- The units digit represents the value `v` of this node, where `0 <= v <= 9`.

Return *the **sum** of **all paths** from the **root** towards the **leaves***.

It is **guaranteed** that the given array represents a valid connected binary tree.

**Constraints:**

- `1 <= nums.length <= 15`
- `110 <= nums[i] <= 489`
- `nums` represents a valid binary tree with depth less than `5`.
- `nums` is sorted in ascending order.

## Examples

```
Example 1:
  Input: nums = [113,215,221]
  Output: 12
  Explanation: The tree that the list represents is:
        3
       / \
      5   1
  The path sum is (3 + 5) + (3 + 1) = 12.
```

```
Example 2:
  Input: nums = [113,221]
  Output: 4
  Explanation: The tree that the list represents is:
        3
         \
          1
  The path sum is (3 + 1) = 4.
```

## Approach
Use a depth-first search that carries the cumulative sum from the root to the current node.

1. Start DFS at the root with `currentSum = 0`.
2. At each node, update `currentSum ← currentSum + node.val`.
3. If the node is a leaf, check `currentSum == targetSum`; if true, increment a global counter.
4. Recurse on left and right children.
5. Return the final counter.

## Walkthrough
For the first example, the DFS explores paths:
- 1 → 0 → 1 (sum = 2) → count++
- 1 → 1 → 0 (sum = 2) → count++
All other paths have sums ≠ 2.

## Complexity Analysis
- Time: O(N) – each node visited once.
- Space: O(H) – recursion stack height `H` ≤ tree height (≤ log N for balanced, O(N) worst case).

## Follow-Up Questions
1. How would you adapt the solution for trees with arbitrary integer values?
2. Can you solve the problem iteratively using an explicit stack?
3. What changes are needed if paths can start at any node, not just the root?

## Key Takeaway
A simple DFS that propagates a running sum efficiently counts qualifying root-to-leaf paths in a binary tree.
