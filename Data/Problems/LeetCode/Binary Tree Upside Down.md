# 156. Binary Tree Upside Down

**Difficulty:** 🟡 Medium
**Companies:** Google, Linkedin

---

## Problem Description
Given the root of a binary tree, transform the tree so that the original leftmost leaf becomes the new root. For each node, its original left child becomes the new parent, its original right child becomes the new left child, and the node itself becomes the new right child. Return the new root of the transformed tree. The tree contains up to `10^4` nodes.

## Examples
| Input Tree | Output Tree | Explanation |
|------------|-------------|-------------|
| `[[1,2,3],[4,5,null],[6,null,null]]` | `[[4,5,1],[6,null,2],[null,null,3]]` | The original leftmost leaf `4` becomes the root. Each node is re‑wired according to the rule. |
| `[]` | `[]` | Empty tree remains empty. |

## Approach
Use recursion (postorder). Recurse to the leftmost node, which becomes the new root. While unwinding, rewire the current node: set its left child's left to its right child, and its left child's right to the node itself, then nullify the node's left and right pointers.

```text
FUNCTION upsideDownBinaryTree(root):
    IF root == null OR root.left == null: RETURN root
    newRoot ← upsideDownBinaryTree(root.left)
    root.left.left ← root.right
    root.left.right ← root
    root.left ← null
    root.right ← null
    RETURN newRoot
```

## Walkthrough
For the tree `[[1,2,3],[4,5,null],[6,null,null]]`:
1. Recurse to leftmost node `4` → returns `4` as newRoot.
2. Unwind to node `2`: set `2.left.left = 2.right (5)`, `2.left.right = 2`, nullify `2`'s children.
3. Unwind to node `1`: set `1.left.left = 1.right (3)`, `1.left.right = 1`, nullify `1`'s children.
4. Final structure has root `4` with left child `5` and right child `2`, etc.

## Complexity Analysis
- Time: O(n) – each node visited once.
- Space: O(h) – recursion stack depth `h` (worst‑case O(n)).

## Follow-Up Questions
- How would you implement the transformation iteratively using a stack?
- Can you perform the operation in O(1) extra space by modifying pointers in place?
- How does the algorithm change for a tree that is not a full binary tree?

## Key Takeaway
A postorder recursion lets you rewire each node after processing its left subtree, enabling an elegant upside‑down transformation of a binary tree.
