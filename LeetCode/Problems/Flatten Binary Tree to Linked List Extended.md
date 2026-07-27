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

```
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
