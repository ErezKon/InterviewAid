# 776. Split BST

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Coupang

---

## Problem Description
Given the root of a binary search tree (BST) and an integer `target`, split the tree into two subtrees: one containing all nodes with values ≤ `target` and the other containing all nodes with values > `target`. Return the roots of the two resulting subtrees.

## Examples
- **Input:** `root = [4,2,6,1,3,5,7]`, `target = 2`
  **Output:** `[ [2,1,3], [4,5,6,7] ]`
  *Explanation:* Nodes ≤ 2 form the left subtree rooted at 2; the rest form the right subtree rooted at 4.
- **Input:** `root = [1,null,2,null,3]`, `target = 2`
  **Output:** `[ [2,1], [3] ]`

## Approach
Recursively traverse the BST. If the current node value ≤ target, its left subtree belongs entirely to the left part; recursively split its right subtree and attach the left result as the new right child. Conversely, if the node value > target, split its left subtree and attach the right result as the new left child.

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
For `root = 4` (target = 2):
- 4 > 2 → split left child (2). Recursively, 2 ≤ 2, split its right child (3) → returns `[NULL, 3]`. Attach leftPart (`NULL`) to 2.right → 2.right becomes `NULL`. Return `[2, 3]` up.
- Attach left result (`2`) as left subtree of 4, right result (`3`) becomes right subtree of 4.
Resulting trees: left root = 2, right root = 4.

## Complexity Analysis
- **Time:** Each node visited once → `O(n)`.
- **Space:** Recursion stack depth `O(h)` where `h` is tree height.

## Follow‑Up Questions
1. How would you modify the algorithm to split the tree into three parts based on two thresholds?
2. Can the split be performed iteratively without recursion?
3. What changes are needed if the tree is not a BST but a generic binary tree?

## Key Takeaway
By recursively partitioning based on the target and re‑linking subtrees, a BST can be split into ≤ target and > target parts in linear time.
