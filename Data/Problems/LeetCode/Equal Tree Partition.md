# 663. Equal Tree Partition

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/equal-tree-partition](https://leetcode.com/problems/equal-tree-partition)
**Companies:** Amazon

---

## Problem Description
Given the root of a binary tree, determine if it is possible to remove exactly one edge such that the resulting two subtrees have equal sums of node values. Return `true` if such an edge exists, otherwise `false`.

## Examples
```text
Input: root = [5,10,10,null,2,2,null]
Output: true
Explanation: Removing the edge between the root and its left child yields two trees with sums 17 each.

Input: root = [1,2,3,4,5,6]
Output: false
```

## Approach
Compute the total sum of all nodes via a post‑order traversal. Then, in a second traversal, for each node compute the sum of its subtree. If `totalSum - subtreeSum == subtreeSum` for any non‑root node, removing the edge above that node balances the two parts.

## Pseudocode
```text
FUNCTION canSplit(root):
    SET total ← subtreeSum(root)   // first pass computes total
    SET found ← false
    FUNCTION dfs(node):
        IF node IS NULL: RETURN 0
        SET left ← dfs(node.left)
        SET right ← dfs(node.right)
        SET curSum ← left + right + node.val
        // check split only for non‑root nodes
        IF node != root AND curSum * 2 == total:
            SET found ← true
        RETURN curSum
    CALL dfs(root)
    RETURN found

FUNCTION subtreeSum(node):
    IF node IS NULL: RETURN 0
    RETURN node.val + subtreeSum(node.left) + subtreeSum(node.right)
```

## Walkthrough
| Node | Subtree sum | Condition `2*sum == total` |
|------|-------------|----------------------------|
| left child of root (value 10) | 17 | true → split possible |
| other nodes | … | false |

When the condition holds, cutting the edge to that node yields two equal‑sum trees.

## Complexity Analysis
- **Time:** O(N) where N is the number of nodes – each node visited twice.
- **Space:** O(H) recursion stack, H = tree height.

## Follow‑Up Questions
- How would you adapt the solution to return the actual edge to cut?
- Can you solve the problem iteratively without recursion?
- What changes are needed if node values can be negative?

## Key Takeaway
A single post‑order pass to compute subtree sums, combined with a check against the total sum, reveals whether removing one edge can balance a binary tree.
