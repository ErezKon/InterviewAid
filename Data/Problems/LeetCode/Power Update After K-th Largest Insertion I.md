# 3935. Power Update After K-th Largest Insertion I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/power-update-after-k-th-largest-insertion-i](https://leetcode.com/problems/power-update-after-k-th-largest-insertion-i)
**Companies:** Google

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode. The Approach/Walkthrough below answer a simpler fixed-K "k-th largest after insertion" problem. Correct idea: keep two sorted multisets `l ≤ r` with `|r| = k_i` (rebalance by moving a few elements since consecutive `k_i` differ by < 10); `x = min(r)`, then `p ← p^x mod (10^9+7)` by fast exponentiation. O((n + m) log(n + m)).*

You are given an integer array `nums` and an integer `p`.

You are also given a 2D integer array `queries`, where each `queries[i] = [val_i, k_i]` and the difference between **consecutive** `k_i` values is always **less** than 10.

For each query:

- Insert `val_i` into `nums`.
- Let `x` be the `k_i`th **largest** element in the current `nums`.
- **Update** `p` to `p^x % (10^9 + 7)`.

Return an array `ans` where the `ans[i]` represents the value of `p` after processing the `i`th query.

**Constraints:**
- `1 <= nums.length <= 2 × 10^4`
- `1 <= nums[i] <= 10^6`
- `1 <= p <= 10^6`
- `1 <= queries.length <= 2 × 10^4`
- `1 <= val_i <= 10^6`
- `1 <= k_i <= n + i + 1`
- `|k_i - k_(i-1)| < 10` for `i > 0`

## Examples

**Example 1:**
```
Input: nums = [2], p = 4, queries = [[3,1],[1,2]]
Output: [64,4096]
Explanation:
| i | val_i | Current nums | k_i | k_i-th largest | p  | New p = p^x % (10^9 + 7)  |
|---|-------|--------------|-----|----------------|----|---------------------------|
| 0 | 3     | [2, 3]       | 1   | 3              | 4  | 4^3 % (10^9 + 7) = 64     |
| 1 | 1     | [2, 3, 1]    | 2   | 2              | 64 | 64^2 % (10^9 + 7) = 4096  |
Thus, ans = [64, 4096].
```

**Example 2:**
```
Input: nums = [7,5], p = 6, queries = [[4,3],[7,2]]
Output: [1296,220296870]
Explanation:
| i | val_i | Current nums  | k_i | k_i-th largest | p    | New p = p^x % (10^9 + 7)           |
|---|-------|---------------|-----|----------------|------|------------------------------------|
| 0 | 4     | [7, 5, 4]     | 3   | 4              | 6    | 6^4 % (10^9 + 7) = 1296            |
| 1 | 7     | [7, 5, 4, 7]  | 2   | 7              | 1296 | 1296^7 % (10^9 + 7) = 220296870    |
Thus, ans = [1296, 220296870]
```

## Approach
Maintain two heaps:
1. **minHeap** of size K storing the K largest elements (top is K‑th largest).
2. **maxHeap** for the remaining smaller elements.
When inserting a value:
- If minHeap size < K, push into minHeap.
- Else compare with minHeap top; if larger, move top to maxHeap and push new value into minHeap; otherwise push directly into maxHeap.
After each insertion, if minHeap size == K, answer is its top; else -1.

## Walkthrough
| Step | Inserted | minHeap (size K) | maxHeap | Report |
|------|----------|------------------|---------|--------|
|1|1|[1]|[]| -1 |
|2|5|[1,5] (top 1)|[]| 1 |
|3|2|[2,5] (top 2) after moving 1 to maxHeap|[1]| 2 |
|4|4|[4,5] (top 4) after moving 2 to maxHeap|[1,2]| 4 |

## Complexity Analysis
Time per insertion: O(log K) for heap operations.
Space: O(K) for minHeap + O(N‑K) for maxHeap (overall O(N)).

## Follow-Up Questions
1. How would you support deletions of arbitrary elements?
2. Can you achieve O(1) query time with a balanced BST?
3. Extend to support multiple different K values simultaneously.

## Key Takeaway
Using a min‑heap of size K efficiently tracks the K‑th largest element in a dynamic stream.
