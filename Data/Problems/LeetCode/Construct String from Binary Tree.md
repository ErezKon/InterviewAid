# 606. Construct String from Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-string-from-binary-tree](https://leetcode.com/problems/construct-string-from-binary-tree)
**Companies:** Amazon, Meta, Tiktok

---

## Problem Description
Given the `root` node of a binary tree, your task is to create a string representation of the tree following a specific set of formatting rules. The representation should be based on a preorder traversal of the binary tree and must adhere to the following guidelines:

- **Node Representation**: Each node in the tree should be represented by its integer value.
- **Parentheses for Children**: If a node has at least one child (either left or right), its children should be represented inside parentheses. Specifically:
  - If a node has a left child, the value of the left child should be enclosed in parentheses immediately following the node's value.
  - If a node has a right child, the value of the right child should also be enclosed in parentheses. The parentheses for the right child should follow those of the left child.
- **Omitting Empty Parentheses**: Any empty parentheses pairs (i.e., `()`) should be omitted from the final string representation of the tree, with one specific exception: when a node has a right child but no left child. In such cases, you must include an empty pair of parentheses to indicate the absence of the left child. This ensures that the one-to-one mapping between the string representation and the original binary tree structure is maintained.

  In summary, empty parentheses pairs should be omitted when a node has only a left child or no children. However, when a node has a right child but no left child, an empty pair of parentheses must precede the representation of the right child to reflect the tree's structure accurately.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10^4]`.
- `-1000 <= Node.val <= 1000`

## Examples
```
Example 1:
  Input: root = [1,2,3,4]
  Output: "1(2(4))(3)"
  Explanation: Originally, it needs to be "1(2(4)())(3()())", but you need to omit all the empty parenthesis pairs. And it will be "1(2(4))(3)".

      1
     / \
    2   3
   /
  4
```
```
Example 2:
  Input: root = [1,2,3,null,4]
  Output: "1(2()(4))(3)"
  Explanation: Almost the same as the first example, except the () after 2 is necessary to indicate the absence of a left child for 2 and the presence of a right child.

      1
     / \
    2   3
     \
      4
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

## Follow-Up Questions
1. How would you modify the algorithm to produce an **iterative** solution using a stack?
2. Can you generate the string in **postorder** while preserving the same format?
3. What changes are needed if node values can be negative or multi-digit?

## Key Takeaway
A simple preorder recursion with conditional parentheses yields the required string representation while handling missing children correctly.
