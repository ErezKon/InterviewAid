# 894. All Possible Full Binary Trees

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/all-possible-full-binary-trees](https://leetcode.com/problems/all-possible-full-binary-trees)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Nvidia, Salesforce

---

## Problem Description
Given an odd integer `n`, return all possible full binary trees with `n` nodes. A full binary tree is a binary tree where each node has either 0 or 2 children. Each tree node's value should be `0`.

## Examples
**Example 1**
Input: `n = 7`
Output: A list of 5 distinct full binary trees (shown as root structures).

**Example 2**
Input: `n = 3`
Output: `[TreeNode(0, left=TreeNode(0), right=TreeNode(0))]`

## Approach
**Algorithm:** Recursive construction with memoization.
1. Base case: if `n == 1`, return a list containing a single node tree.
2. For each odd `leftCount` from 1 to `n-2` (step 2):
   - Recursively generate all left subtrees with `leftCount` nodes.
   - Recursively generate all right subtrees with `n-1-leftCount` nodes.
   - Combine each left and right subtree by creating a new root node with value `0` and attaching them.
3. Store the result for each `n` in a memo table to avoid recomputation.

## Walkthrough
| leftCount | #Left Trees | #Right Trees | #Combined Trees |
|-----------|-------------|--------------|-----------------|
| 1 | 1 | 1 | 1 |
| 3 | 1 | 1 | 1 |
| 5 | 2 | 2 | 4 |
| Total for n=7 | – | – | 5 |

## Complexity Analysis
- **Time:** O(Catalan(n/2)) – the number of full binary trees grows as the Catalan sequence.
- **Space:** O(Catalan(n/2)) for storing all trees plus recursion stack O(n).

## Follow‑Up Questions
1. How would you modify the algorithm to return trees with node values equal to their depth?
2. Can you generate the trees iteratively using dynamic programming?
3. What is the impact on memory if `n` is large (e.g., 19)?

## Key Takeaway
Recursive splitting of node counts into left/right subtrees, combined with memoization, efficiently enumerates all full binary trees for a given odd node count.

---

```text
FUNCTION allPossibleFBT(n):
    IF n % 2 = 0: RETURN []
    IF n = 1: RETURN [TreeNode(0)]
    IF memo CONTAINS n: RETURN memo[n]
    result ← []
    FOR leftCount ← 1 TO n-2 STEP 2:
        leftTrees ← allPossibleFBT(leftCount)
        rightTrees ← allPossibleFBT(n-1-leftCount)
        FOR l IN leftTrees:
            FOR r IN rightTrees:
                root ← TreeNode(0, l, r)
                APPEND root TO result
    memo[n] ← result
    RETURN result
```