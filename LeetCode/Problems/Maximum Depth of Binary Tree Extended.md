# Tree Depth/Height Patterns

Related problems: #104, #111, #110, #543, #124

---

## Pattern Summary

| Problem | Recurrence |
|---------|-----------|
| Max Depth (#104) | `1 + max(left, right)` |
| Min Depth (#111) | `1 + min(left, right)` (leaf-only) |
| Balanced (#110) | `height != -1` sentinel |
| Diameter (#543) | `left + right` at each node |
| Max Path Sum (#124) | `node.val + max(left, 0) + max(right, 0)` |

All use bottom-up DFS returning height/depth info. The global answer is updated during traversal.
