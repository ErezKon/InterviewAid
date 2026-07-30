# 1104. Path In Zigzag Labelled Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/path-in-zigzag-labelled-binary-tree](https://leetcode.com/problems/path-in-zigzag-labelled-binary-tree)
**Companies:** Bloomberg, Spinny

---

## Problem Description
Given a perfect binary tree where the nodes on each level are labelled from left to right in alternating order (left‑to‑right for odd levels, right‑to‑left for even levels), return the sequence of labels on the path from the root to a given node `label`.

Constraints: `label` is a positive integer that exists in the tree (1 ≤ label ≤ 10⁹).

## Examples
| label | Output | Explanation |
|-------|--------|-------------|
| 14    | [1,3,4,14] | Path goes 1 → 3 → 4 → 14 following the zig‑zag labeling. |
| 26    | [1,2,6,10,26] | Labels on the path after accounting for reversed ordering on even levels. |

## Approach
The key insight is that the parent of a node can be computed by mapping its label to the corresponding label in a normal (left‑to‑right) binary tree, moving up one level, then mapping back.

1. Determine the depth `d` of `label` (root depth = 0).
2. While `label` > 1:
   - Compute the start and end values of the current level: `start = 2^d`, `end = 2^{d+1} - 1`.
   - If the level is reversed, convert `label` to its normal label: `label = start + end - label`.
   - Append the original `label` to the path.
   - Move to parent in a normal tree: `label = label // 2`.
   - Decrease depth `d`.
3. Reverse the collected path to obtain root‑to‑node order.

## Walkthrough
For `label = 14`:
| Step | depth | start | end | reversed? | normalLabel | parent |
|------|-------|-------|-----|-----------|-------------|--------|
| 1 | 3 | 8 | 15 | yes | 8+15‑14 = 9 | 9//2 = 4 |
| 2 | 2 | 4 | 7 | no | 4 | 4//2 = 2 |
| 3 | 1 | 2 | 3 | yes | 2+3‑2 = 3 | 3//2 = 1 |
| 4 | 0 | 1 | 1 | no | 1 | stop |
Collected (bottom‑up): [14,4,3,1] → reversed → [1,3,4,14].

## Complexity Analysis
- Time: O(log label) – we climb at most the height of the tree.
- Space: O(log label) – for storing the path.

## Follow‑Up Questions
1. How would you modify the algorithm to return the path for multiple queries efficiently?
2. Can the same technique be applied to trees with different labeling schemes?
3. What if the tree is not perfect (missing nodes)?

## Key Takeaway
Map a zig‑zag label to its normal binary‑tree counterpart, move up using standard parent computation, and map back—leveraging the symmetry of the labeling.
