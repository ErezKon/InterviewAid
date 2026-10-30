# 1214. Two Sum BSTs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/two-sum-bsts](https://leetcode.com/problems/two-sum-bsts)
**Companies:** Amazon

---

## Problem Description

> *Note: premium problem (statement checked against the official text with verify.py). The Approach/Walkthrough below handle a single BST (that is #653 Two Sum IV). Correct idea: in-order traverse both trees into sorted lists `a` (tree 1) and `b` (tree 2); two pointers `i` at the start of `a` and `j` at the end of `b` — if `a[i] + b[j] == target` return true, if smaller `i++`, else `j--`. O(m + n).*

Given the roots of two binary search trees, `root1` and `root2`, return `true` if and only if there is a node in the first tree and a node in the second tree whose values sum up to a given integer `target`.

**Constraints:**
- The number of nodes in each tree is in the range `[1, 5000]`.
- `-10^9 <= Node.val, target <= 10^9`

## Examples

**Example 1:**
```
Input: root1 = [2,1,4], root2 = [1,0,3], target = 5
Output: true
Explanation: 2 and 3 sum up to 5.
```

**Example 2:**
```
Input: root1 = [0,-10,10], root2 = [5,1,7,0,2], target = 18
Output: false
```

## Approach
Perform an in‑order traversal to obtain the sorted list of node values. Then apply the two‑pointer technique on this sorted list to find a pair that sums to `k`.

## Walkthrough
| Step | Action | In‑order list | Pointers (l,r) | Sum |
|------|--------|---------------|----------------|-----|
| 1 | Traverse BST in order | `[2,3,4,5,6,7]` | l=0 (2), r=5 (7) | 9 → match → return true |

## Complexity Analysis
- **Time:** `O(n)` where `n` is the number of nodes (traversal + two‑pointer scan).
- **Space:** `O(n)` for the list of values (or `O(h)` if using an iterative BST iterator with a stack).

## Follow‑Up Questions
1. How would you solve the problem using only `O(h)` extra space without storing all values?
2. Can the solution be adapted for a general binary tree (not a BST)?
3. What if the BST is immutable and you cannot modify it – does the approach change?

## Key Takeaway
An in‑order traversal of a BST yields a sorted sequence, enabling the classic two‑pointer method to detect a target sum in linear time.
