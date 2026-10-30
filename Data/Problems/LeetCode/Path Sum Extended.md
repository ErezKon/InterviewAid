# Tree Path Problem Collection

**Difficulty:** 🟡 Medium
**LeetCode:** N/A
**Companies:** N/A

---

## Problem Description
This document aggregates several classic binary‑tree path problems, summarizing the goal of each problem and the typical algorithmic approach used to solve it.

All problems share the same input: the `root` of a binary tree (given in examples as a level-order array where `null` marks a missing child), sometimes together with an integer `targetSum`. A **root-to-leaf path** starts at the root and ends at a node with no children; a **downward path** may start and end at any nodes as long as it only moves from parents to children; a **general path** is any sequence of adjacent nodes where each node appears at most once (it may pass through the root or not).

**Constraints:**

- The number of nodes in the tree is in the range `[0, 3 * 10^4]` (at least `1` node for maximum-path-sum and diameter variants).
- `-1000 <= Node.val <= 1000`
- `-10^9 <= targetSum <= 10^9`
- For Sum Root to Leaf (#129): `0 <= Node.val <= 9` and the tree depth does not exceed `10`.

> *Note: constraints and examples are derived, not from an official LeetCode source.*

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

```
Example 1 (Path Sum II, #113):
  Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
  Output: [[5,4,11,2],[5,8,4,5]]
  Explanation: DFS subtracts each node value from the remaining target and backtracks;
  the two root-to-leaf paths 5+4+11+2 and 5+8+4+5 both sum to 22.
```

```
Example 2 (Path Sum III, #437):
  Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
  Output: 3
  Explanation: Using prefix sums along the current DFS path, three downward paths sum to 8:
  5 -> 3, 5 -> 2 -> 1, and -3 -> 11.
```

```
Example 3 (Binary Tree Maximum Path Sum, #124):
  Input: root = [-10,9,20,null,null,15,7]
  Output: 42
  Explanation: Each DFS call returns the best single-side gain; the best path 15 -> 20 -> 7
  combines both sides at node 20: 15 + 20 + 7 = 42.
```

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
