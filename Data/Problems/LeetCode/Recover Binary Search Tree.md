# 99. Recover Binary Search Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/recover-binary-search-tree](https://leetcode.com/problems/recover-binary-search-tree)
**Companies:** Amazon, Bloomberg, Google, Medianet, Meta, Microsoft, Tiktok

---

## Problem Description
You are given the `root` of a binary search tree (BST), where the values of **exactly** two nodes of the tree were swapped by mistake. *Recover the tree without changing its structure*.

**Constraints:**

- The number of nodes in the tree is in the range `[2, 1000]`.
- `-2³¹ <= Node.val <= 2³¹ - 1`

**Follow up:** A solution using `O(n)` space is pretty straight-forward. Could you devise a constant `O(1)` space solution?

## Examples

```
Example 1:
  Input: root = [1,3,null,null,2]
  Output: [3,1,null,null,2]
  Explanation: 3 cannot be a left child of 1 because 3 > 1. Swapping 1 and 3 makes the BST valid.
```

```
Example 2:
  Input: root = [3,1,4,null,null,2]
  Output: [2,1,4,null,null,3]
  Explanation: 2 cannot be in the right subtree of 3 because 2 < 3. Swapping 2 and 3 makes the BST valid.
```

## Approach
Perform an inorder traversal of the BST, which should produce a sorted sequence. The swapped nodes cause exactly two violations where a previous node is greater than the current node. Record the first and second offending nodes during traversal. After the traversal, swap their values. Morris inorder traversal achieves O(1) extra space.

## Pseudocode
```text
FUNCTION recoverTree(root):
    SET first ← null
    SET second ← null
    SET prev ← null
    SET current ← root
    WHILE current IS NOT null:
        IF current.left IS null:
            // Visit node
            IF prev IS NOT null AND prev.val > current.val:
                IF first IS null:
                    SET first ← prev
                SET second ← current
            SET prev ← current
            SET current ← current.right
        ELSE:
            // Find predecessor
            SET pred ← current.left
            WHILE pred.right IS NOT null AND pred.right != current:
                SET pred ← pred.right
            IF pred.right IS null:
                SET pred.right ← current
                SET current ← current.left
            ELSE:
                SET pred.right ← null
                // Visit node
                IF prev IS NOT null AND prev.val > current.val:
                    IF first IS null:
                        SET first ← prev
                    SET second ← current
                SET prev ← current
                SET current ← current.right
    // Swap the values of the two misplaced nodes
    IF first IS NOT null AND second IS NOT null:
        SET temp ← first.val
        SET first.val ← second.val
        SET second.val ← temp
```

## Walkthrough
Consider the tree `[3,1,4,null,null,2]` (inorder should be 1,2,3,4 but we get 1,3,2,4).
1. Inorder visits 1 (prev=1).
2. Visits 3 (prev=1, no violation).
3. Visits 2 (prev=3 > 2) → first=3, second=2.
4. Visits 4 (no further violation).
Swap values of nodes 3 and 2 → corrected BST.

## Complexity Analysis
- **Time:** O(n) where n is the number of nodes.
- **Space:** O(1) auxiliary space using Morris traversal (excluding recursion stack).

## Follow‑Up Questions
1. How would you adapt the solution if you were allowed O(n) space?
2. Can the algorithm be extended to recover a BST where more than two nodes are swapped?
3. What modifications are needed to handle duplicate values in the BST?

## Key Takeaway
Morris inorder traversal lets you detect the two out‑of‑order nodes in a BST using constant extra space and fix the tree by swapping their values.
