# 95. Unique Binary Search Trees II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/unique-binary-search-trees-ii](https://leetcode.com/problems/unique-binary-search-trees-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given an integer `n`, generate all structurally unique **binary search trees** (BSTs) that store values `1 … n`. Return the list of root nodes of all possible BSTs.

## Examples
**Example 1**
```
Input: n = 3
Output: [[1,null,3,2],[3,2,null,1],[3,1,2],[2,1,3],[1,3,2]]
Explanation: There are 5 unique BSTs storing values 1 to 3.
```
**Example 2**
```
Input: n = 1
Output: [[1]]
```

## Approach
Recursively choose each value `root` in `[lo, hi]` as the root. Generate all possible left subtrees from `[lo, root-1]` and right subtrees from `[root+1, hi]`. Combine each left and right pair with the root.

```text
FUNCTION GenerateTrees(n):
    IF n = 0: RETURN []
    RETURN Build(1, n)

FUNCTION Build(lo, hi):
    IF lo > hi:
        RETURN [null]
    SET allTrees ← []
    FOR rootVal ← lo TO hi:
        SET leftTrees ← Build(lo, rootVal-1)
        SET rightTrees ← Build(rootVal+1, hi)
        FOR left IN leftTrees:
            FOR right IN rightTrees:
                SET node ← TreeNode(rootVal, left, right)
                APPEND node TO allTrees
    RETURN allTrees
```

## Walkthrough
For `n = 3`:
1. Choose `root = 1` → left = [], right = Build(2,3) → two trees.
2. Choose `root = 2` → left = Build(1,1) (single node), right = Build(3,3) (single node) → one tree.
3. Choose `root = 3` → symmetric to case 1.
All combinations produce the 5 unique BSTs.

## Complexity Analysis
- **Time:** Catalan number `C_n` of trees; each tree is built once, leading to O(C_n) overall.
- **Space:** O(C_n) for storing all trees plus recursion stack O(n).

## Follow-Up Questions
1. How would you modify the algorithm to return the trees in a specific order (e.g., preorder)?
2. Can you compute the number of unique BSTs without generating them (Catalan formula)?
3. How would you adapt the solution for a different node value range, e.g., arbitrary distinct values?

## Key Takeaway
Recursively constructing left and right subtrees for each possible root enumerates all structurally unique BSTs.
