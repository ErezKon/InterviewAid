# Tree Path Problem Collection

**Difficulty:** 🟡 Medium
**LeetCode:** N/A
**Companies:** N/A

---

## Problem Description
This document aggregates several classic binary‑tree path problems, summarizing the goal of each problem and the typical algorithmic approach used to solve it.

## Examples
| Problem | Goal |
|---------|------|
| Path Sum (#112) | Does a root‑to‑leaf path sum to a target? |
| Path Sum II (#113) | List all root‑to‑leaf paths that sum to a target. |
| Max Path Sum (#124) | Find the maximum sum of any path in the tree. |
| Sum Root to Leaf (#129) | Compute the total of numbers formed by root‑to‑leaf paths. |
| Binary Tree Paths (#257) | Return all root‑to‑leaf paths as strings. |
| Path Sum III (#437) | Count any downward path (not necessarily from root) that sums to target. |
| Diameter (#543) | Length of the longest path between any two nodes. |
| Longest Univalue (#687) | Length of the longest path where all nodes share the same value. |

## Approach
The table below captures the core technique for each problem.

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

## Follow‑Up Questions
1. How would you adapt these solutions to handle very large trees (e.g., streaming nodes)?
2. Can you design an iterative version using explicit stacks for each DFS‑based problem?
3. How would you modify the algorithms to return the count of qualifying paths instead of just existence?

## Key Takeaway
Most tree‑path problems reduce to depth‑first traversal combined with either accumulation, backtracking, or prefix‑sum techniques, enabling concise recursive solutions.
