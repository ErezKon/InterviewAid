# 3665. Twisted Mirror Path Count

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/twisted-mirror-path-count](https://leetcode.com/problems/twisted-mirror-path-count)
**Companies:** Google, Microsoft

---

## Problem Description
Given an `n x n` grid of characters, a *twisted mirror* operation reflects the grid over its main diagonal and then swaps each character with its counterpart according to a predefined mirror mapping (e.g., `{'\': '/', '/': '\', '(': ')', ')': '('}`). Count the number of distinct paths from the top‑left to the bottom‑right corner that remain unchanged after applying the twisted mirror operation. Moves are only allowed to the right or down.

## Examples
**Example 1:**
Input grid:
```
[['\','/'],
 ['/','\']]
```
The only path `\ -> / -> \` is symmetric under the twisted mirror, so the answer is `1`.

**Example 2:**
Input grid:
```
[['(','('],
 [')',')']]
```
No path stays the same after the transformation, answer `0`.

## Approach
1. Pre‑compute the mirror of each cell.
2. Use dynamic programming where `dp[i][j]` stores the number of symmetric paths to cell `(i,j)`.
3. Transition: a path to `(i,j)` can come from `(i-1,j)` (down) or `(i,j-1)` (right) **only if** the character at `(i,j)` equals the mirror of the character at the symmetric counterpart `(j,i)`.
4. The answer is `dp[n-1][n-1]`.

## Walkthrough
| Cell (i,j) | Char | Mirror of counterpart (j,i) | Condition | dp[i][j] |
|------------|------|----------------------------|-----------|----------|
| (0,0) | `\` | mirror(`\`) = `/` (at (0,0) itself) → not equal → dp=0 (base case set to 1 if self‑mirror) |
| ... | ... | ... | ... | ... |
(Full table omitted for brevity.)

## Complexity Analysis
- **Time:** `O(n^2)` to fill the DP table.
- **Space:** `O(n^2)` or `O(n)` if we keep only the previous row.

## Follow‑Up Questions
1. How would the solution change if moves could also go left/up?
2. Can the algorithm be adapted for larger alphabets with custom mirror maps?
3. What is the impact on complexity if we need to list all such paths instead of counting them?

## Key Takeaway
By enforcing that each visited cell matches the mirror of its transposed counterpart, a simple DP over the grid counts only those paths invariant under the twisted mirror operation.
