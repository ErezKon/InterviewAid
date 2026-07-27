# Tree Path Problem Collection

Related: #112, #113, #124, #129, #257, #437, #543, #687

---

| Problem | What to Find | Approach |
|---------|-------------|----------|
| Path Sum (#112) | Root-to-leaf = target? | DFS, subtract |
| Path Sum II (#113) | All root-to-leaf paths = target | DFS + backtrack |
| Max Path Sum (#124) | Any path, max sum | DFS, return single-side |
| Sum Root to Leaf (#129) | Sum of all root-to-leaf numbers | DFS, accumulate |
| Binary Tree Paths (#257) | All root-to-leaf paths | DFS + string build |
| Path Sum III (#437) | Any downward path = target | Prefix sum DFS |
| Diameter (#543) | Longest path (edges) | DFS, track left+right |
| Longest Univalue (#687) | Longest same-value path | DFS with value match |

### Key Pattern: Return vs Accumulate

- **Return** single-side max to parent (for #124, #543, #687)
- **Accumulate** at node: left + right gives the path through this node
