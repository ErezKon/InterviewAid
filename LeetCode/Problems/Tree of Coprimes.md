# 1766. Tree of Coprimes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/tree-of-coprimes](https://leetcode.com/problems/tree-of-coprimes)
**Companies:** Google

---

## Problem Description
Given a rooted tree with `n` nodes labeled `0` to `n-1`. Each node `i` has a value `vals[i]`. For every node, find the nearest ancestor whose value is coprime with `vals[i]`. Return an array `ans` where `ans[i]` is the ancestor's index or `-1` if none exists.

## Examples
**Example 1:**
Input: `vals = [2,3,3,2,4]`, `edges = [[0,1],[1,2],[1,3],[2,4]]`
Output: `[-1,0,0,1,1]`
Explanation: Node 1's nearest coprime ancestor is 0 (2 and 3 are coprime). Node 2's nearest coprime ancestor is 0, etc.

**Example 2:**
Input: `vals = [5,6,10,15]`, `edges = [[0,1],[1,2],[2,3]]`
Output: `[-1,0,-1,2]`
Explanation: Node 2 has no coprime ancestor because 5 and 10 share factor 5.

## Approach
Use a depth‑first search while maintaining, for each possible value `v` (1 ≤ v ≤ 50), the most recent node on the current path whose value equals `v`. For the current node `u`, iterate over all values `v` that are coprime with `vals[u]` (pre‑computed list). Among those, pick the node with greatest depth – that is the nearest ancestor.

## Walkthrough
| Step | Node | Current Path Values (value→node) | Coprime candidates checked | Chosen ancestor |
|------|------|----------------------------------|----------------------------|-----------------|
| 1 | 0 | {2→0} | none (root) | -1 |
| 2 | 1 | {2→0, 3→1} | values coprime with 3: {2,4,5,…} → deepest is node 0 | 0 |
| 3 | 2 | {2→0,3→1,3→2} | coprime with 3: {2,4,…} → deepest node 0 | 0 |
| … | … | … | … | … |

## Complexity Analysis
- **Time:** `O(n * C)` where `C` is the number of values (≤ 50) checked per node (pre‑computed coprime list). Effectively `O(n * 50)`.
- **Space:** `O(n + 50)` for adjacency list, depth map, and the value‑to‑node stack.

## Follow‑Up Questions
1. How would you modify the solution if node values could be up to `10^5`?
2. Can the problem be solved iteratively using a stack instead of recursion?
3. What if we needed the *k*‑th nearest coprime ancestor?

## Key Takeaway
Maintain a map of the latest occurrence of each possible value while traversing the tree; this lets you answer nearest‑ancestor queries in constant time per candidate value.
