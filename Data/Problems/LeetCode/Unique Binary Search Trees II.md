# 95. Unique Binary Search Trees II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/unique-binary-search-trees-ii](https://leetcode.com/problems/unique-binary-search-trees-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given an integer `n`, return *all the structurally unique **BST'**s (binary search trees), which has exactly* `n` *nodes of unique values from* `1` *to* `n`. Return the answer in **any order**.

**Constraints:**
- `1 <= n <= 8`

## Examples

**Example 1:**
```
Input: n = 3
Output: [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
```

**Example 2:**
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
Example 1: `n = 3`, call `Build(1,3)`:

| rootVal | leftTrees | rightTrees | trees produced |
|---------|-----------|------------|----------------|
| 1 | Build(1,0) = [null] | Build(2,3) = [2→right 3, 3→left 2] | `[1,null,2,null,3]`, `[1,null,3,2]` |
| 2 | Build(1,1) = [1] | Build(3,3) = [3] | `[2,1,3]` |
| 3 | Build(1,2) = [1→right 2, 2→left 1] | Build(4,3) = [null] | `[3,1,null,null,2]`, `[3,2,null,1]` |

Collected trees: **`[[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]`** (5 = Catalan C₃). For Example 2, `Build(1,1)` returns the single tree `[[1]]`.

## Complexity Analysis
- **Time:** Catalan number `C_n` of trees; each tree is built once, leading to O(C_n) overall.
- **Space:** O(C_n) for storing all trees plus recursion stack O(n).

## Follow-Up Questions
1. How would you modify the algorithm to return the trees in a specific order (e.g., preorder)?
2. Can you compute the number of unique BSTs without generating them (Catalan formula)?
3. How would you adapt the solution for a different node value range, e.g., arbitrary distinct values?

## Key Takeaway
Recursively constructing left and right subtrees for each possible root enumerates all structurally unique BSTs.
