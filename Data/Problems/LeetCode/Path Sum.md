# 112. Path Sum

**Difficulty:** 🟢 Easy
**Acceptance:** 50.0%
**LeetCode:** [https://leetcode.com/problems/path-sum](https://leetcode.com/problems/path-sum)
**Companies:** Amazon, Apple, Bloomberg, Datadog, Goldman Sachs, Google, Meta, Microsoft, Palo Alto Networks, Tiktok

---

## Problem Description
Given the root of a binary tree and an integer `targetSum`, determine whether there exists a root‑to‑leaf path such that the sum of the node values along the path equals `targetSum`.

Constraints: The number of nodes is in the range `[0, 10⁴]`; node values are integers (positive, negative, or zero).

## Examples
| Tree (level order) | targetSum | Output | Explanation |
|--------------------|-----------|--------|-------------|
| [5,4,8,11,null,13,4,7,2,null,null,null,1] | 22 | true | Path 5→4→11→2 sums to 22. |
| [1,2,3] | 5 | false | No root‑to‑leaf path sums to 5. |

## Approach
Perform a depth‑first search, subtracting the node value from `targetSum` as you descend. When a leaf is reached, check if the remaining sum equals the leaf's value.

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
- Space: O(H) – recursion stack depth `H` equals tree height (worst‑case O(N)).

## Follow‑Up Questions
1. How would you modify the algorithm to return the actual path instead of a boolean?
2. Can you solve it iteratively using a stack or queue?
3. What changes are needed if the path can start and end at any node (not necessarily root‑to‑leaf)?

## Key Takeaway
Subtracting the node value while traversing turns the target‑sum check into a simple leaf‑node equality test.
