# Binary Tree In-Place Modification Patterns

Related: #114, #426, #897, #116, #117

---

| Problem | What to Do | Technique |
|---------|-----------|-----------|
| Flatten to LL (#114) | Preorder → right pointers | Reverse postorder |
| BST to Sorted DLL (#426) | Inorder → doubly linked | Inorder with prev pointer |
| Increasing BST (#897) | Inorder → right pointers | Inorder with prev pointer |
| Next Right Pointers (#116) | Level → next pointers | BFS or recursive |

### Flatten Template (Morris-like)

```text
FUNCTION flatten(root):
    curr = root
    WHILE curr:
        IF curr.left:
            // Find rightmost of left subtree
            rightmost = curr.left
            WHILE rightmost.right:
                rightmost = rightmost.right
            // Rewire
            rightmost.right = curr.right
            curr.right = curr.left
            curr.left = null
        curr = curr.right
```

## Problem Description
Given the root of a binary tree, transform the tree into a singly linked list **in‑place** following a preorder traversal. After flattening, each node's right pointer should point to the next node in the preorder sequence and all left pointers must be `null`.

## Examples
**Example 1**
```
Input:  [1,2,5,3,4,null,6]
Output: [1,null,2,null,3,null,4,null,5,null,6]
```
The tree is flattened to a right‑skewed list following preorder.

**Example 2**
```
Input:  [0]
Output: [0]
```
A single node remains unchanged.

## Approach
Use a **Morris‑like traversal** to rewire the tree without extra space.
1. Iterate with a pointer `curr`.
2. If `curr` has a left child, locate the rightmost node of that left subtree.
3. Connect that rightmost node's right pointer to `curr.right`.
4. Move the left subtree to the right side and nullify `curr.left`.
5. Advance `curr` to `curr.right`.
The process repeats until the entire tree is flattened.

```text
FUNCTION flattenInPlace(root):
    SET curr ← root
    WHILE curr IS NOT NULL:
        IF curr.left IS NOT NULL:
            // locate predecessor
            SET predecessor ← curr.left
            WHILE predecessor.right IS NOT NULL:
                SET predecessor ← predecessor.right
            // rewire connections
            SET predecessor.right ← curr.right
            SET curr.right ← curr.left
            SET curr.left ← null
        SET curr ← curr.right
```

## Walkthrough
For the tree `[1,2,5,3,4,null,6]`:
| Step | curr value | Action |
|------|------------|--------|
| 1 | 1 | Left subtree exists → rewire 2's rightmost (4) to 5, move 2 to right |
| 2 | 2 | Left subtree exists → rewire 3's rightmost (4) to null, move 3 to right |
| 3 | 3 | Left subtree exists → rewire 3's left (null) – no change, move to right |
| … | … | Continue until `curr` becomes null |
The final right‑skewed list is `1→2→3→4→5→6`.

## Complexity Analysis
*Time*: Each node is visited a constant number of times → **O(n)**.
*Space*: Only a few pointers are used → **O(1)** auxiliary space.

## Follow‑Up Questions
1. How would you modify the algorithm to produce a doubly linked list?
2. Can you flatten the tree iteratively using a stack and compare the space trade‑offs?
3. How would you restore the original tree structure after flattening?

## Key Takeaway
The Morris‑like in‑place technique rewires left subtrees to the right side, achieving O(n) time and O(1) extra space for flattening a binary tree into a linked list.
