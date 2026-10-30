# 3165. Maximum Sum of Subsequence With Non-adjacent Elements

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-sum-of-subsequence-with-non-adjacent-elements](https://leetcode.com/problems/maximum-sum-of-subsequence-with-non-adjacent-elements)
**Companies:** Google, Infosys, Meta

---

## Problem Description

You are given an array `nums` consisting of integers. You are also given a 2D array `queries`, where `queries[i] = [pos_i, x_i]`.

For query `i`, we first set `nums[pos_i]` equal to `x_i`, then we calculate the answer to query `i` which is the **maximum** sum of a subsequence of `nums` where **no two adjacent elements are selected**.

Return the *sum* of the answers to all queries.

Since the final answer may be very large, return it **modulo** `10^9 + 7`.

A **subsequence** is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

**Constraints:**
- `1 <= nums.length <= 5 * 10^4`
- `-10^5 <= nums[i] <= 10^5`
- `1 <= queries.length <= 5 * 10^4`
- `queries[i] == [pos_i, x_i]`
- `0 <= pos_i <= nums.length - 1`
- `-10^5 <= x_i <= 10^5`

## Examples

**Example 1:**
```
Input: nums = [3,5,9], queries = [[1,-2],[0,-3]]
Output: 21
Explanation: After the 1^st query, nums = [3,-2,9] and the maximum sum of a subsequence with non-adjacent elements is 3 + 9 = 12.
After the 2^nd query, nums = [-3,-2,9] and the maximum sum of a subsequence with non-adjacent elements is 9.
```

**Example 2:**
```
Input: nums = [0,-1], queries = [[0,-5]]
Output: 0
Explanation: After the 1^st query, nums = [-5,-1] and the maximum sum of a subsequence with non-adjacent elements is 0 (choosing an empty subsequence).
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
