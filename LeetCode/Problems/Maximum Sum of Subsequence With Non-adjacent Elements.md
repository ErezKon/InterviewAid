# 3165. Maximum Sum of Subsequence With Non-adjacent Elements

**Difficulty:** 🔴 Hard
**Companies:** Google, Infosys, Meta

---

## Problem Description
Given an integer array `nums` of length `n`, select a subsequence (any subset of indices in increasing order) such that no two chosen elements are adjacent in the original array. The goal is to maximize the sum of the selected elements. Return the maximum possible sum.

## Examples
**Example 1:**
```
Input: nums = [3,2,5,10,7]
Output: 15
Explanation: Choose elements 3, 5, and 7 (indices 0,2,4). Sum = 3+5+7 = 15, which is maximal.
```

**Example 2:**
```
Input: nums = [-1, -2, -3]
Output: 0
Explanation: Selecting no elements yields sum 0, which is better than any negative sum.
```

## Approach
The classic solution uses **dynamic programming** where `dp[i]` stores the maximum sum considering the first `i` elements.
- `dp[0] = 0` (no elements).
- `dp[1] = max(0, nums[0])`.
- For each `i` from 2 to `n`:
  `dp[i] = max(dp[i-1], dp[i-2] + max(0, nums[i-1]))`.
The recurrence decides whether to skip the current element (`dp[i-1]`) or take it together with the best sum up to `i-2`.
A more advanced variant uses a **segment tree** to support point updates and range queries, storing four states per node (with/without left/right endpoints). For the static version, the simple DP suffices.

### Pseudocode (DP version)
```text
FUNCTION maxNonAdjacentSum(nums):
    n ← LENGTH(nums)
    IF n == 0:
        RETURN 0
    dpPrevPrev ← 0                     // dp[i-2]
    dpPrev ← MAX(0, nums[0])           // dp[i-1]
    FOR i FROM 2 TO n:
        currentVal ← MAX(0, nums[i-1])
        dpCurr ← MAX(dpPrev, dpPrevPrev + currentVal)
        dpPrevPrev ← dpPrev
        dpPrev ← dpCurr
    RETURN dpPrev
```

### Pseudocode (Segment‑Tree version)
```text
STRUCT Node:
    withLeft  ← 0   // max sum when left endpoint is taken
    withoutLeft ← 0 // max sum when left endpoint is not taken
    withRight ← 0   // max sum when right endpoint is taken
    withoutRight← 0 // max sum when right endpoint is not taken

FUNCTION merge(leftNode, rightNode):
    // combine two child nodes to produce parent node values
    result.withLeft  ← leftNode.withLeft + MAX(rightNode.withLeft, rightNode.withoutLeft)
    result.withoutLeft← MAX(leftNode.withLeft, leftNode.withoutLeft) + MAX(rightNode.withLeft, rightNode.withoutLeft)
    // similar logic for right endpoints (omitted for brevity)
    RETURN result

FUNCTION buildTree(arr, idx, l, r):
    IF l == r:
        node ← Node()
        val ← MAX(0, arr[l])
        node.withLeft ← val
        node.withoutLeft ← 0
        node.withRight ← val
        node.withoutRight← 0
        STORE node AT tree[idx]
        RETURN
    mid ← (l + r) / 2
    buildTree(arr, idx*2, l, mid)
    buildTree(arr, idx*2+1, mid+1, r)
    tree[idx] ← merge(tree[idx*2], tree[idx*2+1])

FUNCTION queryFullRange(tree):
    root ← tree[1]
    RETURN MAX(root.withLeft, root.withoutLeft)
```

## Walkthrough
For `nums = [3,2,5,10,7]` using DP:
| i | nums[i‑1] | dp[i‑2] | dp[i‑1] | take? | dp[i] |
|---|-----------|---------|---------|-------|------|
| 1 | 3         | 0       | 0       | yes   | 3 |
| 2 | 2         | 0       | 3       | no    | 3 |
| 3 | 5         | 3       | 3       | yes   | 8 |
| 4 | 10        | 3       | 8       | yes   | 13 |
| 5 | 7         | 8       | 13      | yes   | 15 |
Result = 15.

## Complexity Analysis
*Time:* O(n) for the DP scan; O(n log n) for building and querying the segment tree.
*Space:* O(1) extra for DP; O(n) for the segment‑tree structure.

## Follow‑Up Questions
1. How would you adapt the solution to handle **range updates** (changing values) and queries for the maximum non‑adjacent sum after each update?
2. Can the problem be extended to a circular array where the first and last elements are considered adjacent?
3. What changes are needed if each selected element incurs a fixed penalty cost?

## Key Takeaway
A simple linear‑time DP that tracks the best sum with and without the current element efficiently solves the maximum‑sum non‑adjacent subsequence problem.
