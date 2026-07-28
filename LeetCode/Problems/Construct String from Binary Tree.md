# 606. Construct String from Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-string-from-binary-tree](https://leetcode.com/problems/construct-string-from-binary-tree)
**Companies:** Amazon, Meta, Tiktok

---

## Problem Description
Given the root of a binary tree, generate a string representation of the tree using parentheses. For each node, output its value followed by the string of its left child enclosed in `()` (if it exists) and then the string of its right child enclosed in `()` (if it exists). Omit empty parentheses for missing left children only when a right child exists.

## Examples
**Example 1:**
```
Input: [1,2,3,4]
Tree:
    1
   / \
  2   3
 /
4
Output: "1(2(4))(3)"
```
**Example 2:**
```
Input: [1,2,3,null,4]
Tree:
    1
   / \
  2   3
   \
    4
Output: "1(2()(4))(3)"
```

## Approach
Perform a **preorder traversal**. For each node, append its value, then recursively process left and right subtrees, adding parentheses around each child string. Skip the left parentheses when the left child is null but the right child is present.

```text
FUNCTION tree2str(root):
    IF root IS NULL:
        RETURN ""
    SET s ← STRING(root.val)
    IF root.left IS NOT NULL OR root.right IS NOT NULL:
        SET s ← s + "(" + tree2str(root.left) + ")"
    IF root.right IS NOT NULL:
        SET s ← s + "(" + tree2str(root.right) + ")"
    RETURN s
```

## Walkthrough
| Node | Action | Result string |
|------|--------|---------------|
| 1 | start, add "1" | "1" |
| left child 2 | recurse, add "(2" | "1(2" |
| left child 4 | recurse, add "(4)" | "1(2(4)" |
| back to 2, right null → close " )" | "1(2(4))" |
| right child 3 | recurse, add "(3)" | "1(2(4))(3)" |

## Complexity Analysis
- **Time:** `O(n)` where `n` is number of nodes – each node visited once.
- **Space:** `O(h)` recursion stack, `h` = tree height.

## Follow‑Up Questions
1. How would you modify the algorithm to produce an **iterative** solution using a stack?
2. Can you generate the string in **postorder** while preserving the same format?
3. What changes are needed if node values can be negative or multi‑digit?

## Key Takeaway
A simple preorder recursion with conditional parentheses yields the required string representation while handling missing children correctly.
