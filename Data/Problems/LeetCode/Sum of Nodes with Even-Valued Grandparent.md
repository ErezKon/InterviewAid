# 1315. Sum of Nodes with Even-Valued Grandparent

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-nodes-with-even-valued-grandparent](https://leetcode.com/problems/sum-of-nodes-with-even-valued-grandparent)
**Companies:** Amazon, Josh Technology, Meta, Salesforce

---

## Problem Description

Given the `root` of a binary tree, return *the sum of values of nodes with an **even-valued grandparent***. If there are no nodes with an **even-valued grandparent**, return `0`.

A **grandparent** of a node is the parent of its parent if it exists.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10^4]`.
- `1 <= Node.val <= 100`

## Examples

**Example 1:**
```
Input: root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
Output: 18
Explanation: The red nodes are the nodes with even-value grandparent while the blue nodes are the even-value grandparents.
```

**Example 2:**
```
Input: root = [1]
Output: 0
```

## Approach
Perform a DFS passing the current node, its parent, and grandparent. When the grandparent exists and is even, add the node's value to the total.

```text
FUNCTION sumEvenGrandparent(root):
    SET total ← 0
    FUNCTION dfs(node, parent, grandparent):
        IF node == null: RETURN
        IF grandparent != null AND grandparent.val MOD 2 == 0:
            SET total ← total + node.val
        dfs(node.left, node, parent)
        dfs(node.right, node, parent)
    dfs(root, null, null)
    RETURN total
```

## Walkthrough
| Step | Node | Grandparent Even? | Action |
|------|------|-------------------|--------|
| 1 | 6 (root) | N/A | Recurse children |
| 2 | 7 (left of 6) | N/A | Recurse |
| 3 | 2 (left of 7) | 6 is even → add 2 |
| 4 | 7 (right of 7) | 6 is even → add 7 |
| 5 | 1 (left of 2) | 7 is odd → skip |
| 6 | 4 (right of 2) | 7 is odd → skip |
| … | continue similarly |
Total sum = 18.

## Complexity Analysis
Time: O(n) where n is number of nodes.
Space: O(h) recursion stack, h = tree height.

## Follow‑Up Questions
- How would you solve it iteratively using a stack?
- Can you modify the solution to sum nodes with odd‑valued grandparents?
- What if the tree is given as a parent array instead of pointers?

## Key Takeaway
Passing parent and grandparent references during DFS lets you easily check ancestor properties without extra storage.
