# 1457. Pseudo-Palindromic Paths in a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree](https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree)
**Companies:** Amazon, Bcg

---

## Problem Description
Given the root of a binary tree where each node contains a digit `0‑9`, a path from root to leaf is **pseudo‑palindromic** if the multiset of node values along the path can be rearranged to form a palindrome. Return the number of such root‑to‑leaf paths.

## Examples
**Example 1:**
```
Input: root = [2,3,1,3,1,null,1]
Output: 2
Explanation: The two pseudo‑palindromic paths are 2→3→3 and 2→1→1.
```
**Example 2:**
```
Input: root = [2,1,1,1,3,null,null,null,null,null,1]
Output: 1
```

## Approach
Perform a DFS while maintaining a 10‑bit mask representing the parity (odd/even) of each digit count along the current path. Flipping the bit for a digit updates its parity. At a leaf, the path is pseudo‑palindromic if the mask has at most one bit set (`mask & (mask‑1) == 0`).

```text
FUNCTION dfs(node, mask):
    IF node IS NULL:
        RETURN 0
    SET mask ← mask XOR (1 << node.val) // toggle parity for current digit
    IF node.left IS NULL AND node.right IS NULL:
        // leaf node: check mask condition
        IF mask == 0 OR (mask AND (mask - 1)) == 0:
            RETURN 1
        ELSE:
            RETURN 0
    RETURN dfs(node.left, mask) + dfs(node.right, mask)

FUNCTION pseudoPalindromicPaths(root):
    RETURN dfs(root, 0)
```

## Walkthrough
| Step | Node | Mask (binary) | Action |
|------|------|---------------|--------|
| 1 | root(2) | 00000100 | toggle bit 2 |
| 2 | left(3) | 00001100 | toggle bit 3 |
| 3 | left‑left(3) – leaf | 00001000 | toggle bit 3 → mask 00001000 (single bit) → count++ |
| 4 | backtrack to left, go right(1) – leaf | 00001101 → toggle bit 1 → 00001101 (two bits) → not counted |
| … | explore other branches similarly |

## Complexity Analysis
- **Time:** Each node visited once → O(N) where N is number of nodes.
- **Space:** Recursion stack depth ≤ height of tree → O(H).

## Follow-Up Questions
1. How would you adapt the solution to handle trees with values outside `0‑9`?
2. Can you compute the result iteratively using a stack instead of recursion?
3. How would you modify the algorithm to return the actual pseudo‑palindromic paths, not just the count?

## Key Takeaway
Using a bitmask to track digit parity allows constant‑time palindrome feasibility checks at each leaf, yielding an elegant O(N) solution.
