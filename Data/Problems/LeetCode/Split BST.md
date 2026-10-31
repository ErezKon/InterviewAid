# 776. Split BST

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-bst](https://leetcode.com/problems/split-bst)
**Companies:** Amazon, Coupang

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given the `root` of a binary search tree (BST) and an integer `target`, split the tree into two subtrees where the first subtree has nodes that are all smaller or equal to the target value, while the second subtree has all nodes that are greater than the target value. It is not necessarily the case that the tree contains a node with the value `target`.

Additionally, most of the structure of the original tree should remain. Formally, for any child `c` with parent `p` in the original tree, if they are both in the same subtree after the split, then node `c` should still have the parent `p`.

Return *an array of the two roots of the two subtrees in order*.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 50]`.
- `0 <= Node.val, target <= 1000`

## Examples

**Example 1:**
```
Input: root = [4,2,6,1,3,5,7], target = 2
Output: [[2,1],[4,3,6,null,null,5,7]]
```

**Example 2:**
```
Input: root = [1], target = 1
Output: [[1],[]]
```

## Approach
Recursively traverse the BST. If the current node value ≤ target, its left subtree belongs entirely to the left part; recursively split its right subtree and attach the left result as the new right child. Conversely, if the node value > target, split its left subtree and attach the right result as the new left child.

```text
FUNCTION splitBST(root, target):
    IF root IS NULL:
        RETURN [NULL, NULL]
    IF root.val ≤ target:
        // root belongs to left subtree
        SET leftPart, rightPart ← splitBST(root.right, target)
        SET root.right ← leftPart
        RETURN [root, rightPart]
    ELSE:
        // root belongs to right subtree
        SET leftPart, rightPart ← splitBST(root.left, target)
        SET root.left ← rightPart
        RETURN [leftPart, root]
```

## Walkthrough
For `root = 4` (target = 2):
- 4 > 2 → split left child (2). Recursively, 2 ≤ 2, split its right child (3) → returns `[NULL, 3]`. Attach leftPart (`NULL`) to 2.right → 2.right becomes `NULL`. Return `[2, 3]` up.
- Attach left result (`2`) as left subtree of 4, right result (`3`) becomes right subtree of 4.
Resulting trees: left root = 2, right root = 4.

## Complexity Analysis
- **Time:** Each node visited once → `O(n)`.
- **Space:** Recursion stack depth `O(h)` where `h` is tree height.

## Follow-Up Questions
1. How would you modify the algorithm to split the tree into three parts based on two thresholds?
2. Can the split be performed iteratively without recursion?
3. What changes are needed if the tree is not a BST but a generic binary tree?

## Key Takeaway
By recursively partitioning based on the target and re-linking subtrees, a BST can be split into ≤ target and > target parts in linear time.
