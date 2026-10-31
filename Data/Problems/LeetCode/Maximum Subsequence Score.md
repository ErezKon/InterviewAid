# 2542. Maximum Subsequence Score

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-subsequence-score](https://leetcode.com/problems/maximum-subsequence-score)
**Companies:** Amazon, Bloomberg, De Shaw, Google, Microsoft

---

## Problem Description

You are given two **0-indexed** integer arrays `nums1` and `nums2` of equal length `n` and a positive integer `k`. You must choose a **subsequence** of indices from `nums1` of length `k`.

For chosen indices `i_0`, `i_1`, ..., `i_k - 1`, your **score** is defined as:

- The sum of the selected elements from `nums1` multiplied with the **minimum** of the selected elements from `nums2`.
- It can defined simply as: `(nums1[i_0] + nums1[i_1] +...+ nums1[i_k - 1]) * min(nums2[i_0] , nums2[i_1], ... ,nums2[i_k - 1])`.

Return *the **maximum** possible score.*

A **subsequence** of indices of an array is a set that can be derived from the set `{0, 1, ..., n-1}` by deleting some or no elements.

**Constraints:**
- `n == nums1.length == nums2.length`
- `1 <= n <= 10^5`
- `0 <= nums1[i], nums2[j] <= 10^5`
- `1 <= k <= n`

## Examples

**Example 1:**
```
Input: nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3
Output: 12
Explanation: The four possible subsequence scores are:
- We choose the indices 0, 1, and 2 with score = (1+3+3) * min(2,1,3) = 7.
- We choose the indices 0, 1, and 3 with score = (1+3+2) * min(2,1,4) = 6.
- We choose the indices 0, 2, and 3 with score = (1+3+2) * min(2,3,4) = 12.
- We choose the indices 1, 2, and 3 with score = (3+3+2) * min(1,3,4) = 8.
Therefore, we return the max score, which is 12.
```

**Example 2:**
```
Input: nums1 = [4,2,3,1,1], nums2 = [7,5,10,9,6], k = 1
Output: 30
Explanation: Choosing index 2 is optimal: nums1[2] * nums2[2] = 3 * 10 = 30 is the maximum possible score.
```

## Approach
The key insight is to process elements in **decreasing order of `nums2`**. When iterating, the current `nums2` value becomes the minimum (`min2`) for any subset that includes the current element and any previously processed elements. We maintain the **k largest `nums1` values** seen so far using a **min-heap**. For each element:
1. Insert its `nums1` into the heap and add to a running sum.
2. If the heap size exceeds `k`, remove the smallest `nums1` (pop from heap) and adjust the sum.
3. When the heap size equals `k`, compute `score = sum1 × current nums2` and update the answer.
This yields an O(n log n) solution.

### Pseudocode
```text
FUNCTION maxSubsequenceScore(nums1, nums2, k):
    // Pair each element and sort by nums2 descending
    pairs ← LIST of (nums1[i], nums2[i]) for i FROM 0 TO n-1
    SORT pairs BY second element DESCENDING
    heap ← MIN-HEAP   // stores selected nums1 values
    sum1 ← 0
    best ← 0
    FOR each (val1, val2) IN pairs:
        heap.PUSH(val1)
        sum1 ← sum1 + val1
        IF heap.SIZE() > k:
            removed ← heap.POP()
            sum1 ← sum1 - removed
        IF heap.SIZE() == k:
            best ← MAX(best, sum1 * val2)
    RETURN best
```

## Walkthrough
Take `nums1 = [1,3,3,2]`, `nums2 = [2,1,3,4]`, `k = 3`.
1. Pair & sort by `nums2` descending → `[(2,4), (3,3), (1,2), (3,1)]`.
2. Iterate:
   - Insert 2 → heap=[2], sum=2 (size<3).
   - Insert 3 → heap=[2,3], sum=5 (size<3).
   - Insert 1 → heap=[1,3,2], sum=6 (size=3) → score = 6×2 = 12 → best=12.
   - Insert 3 → heap=[1,3,2,3], sum=9 → pop smallest (1) → heap=[2,3,3], sum=8 → score = 8×1 = 8 (no update).
Result = 12.

## Complexity Analysis
*Time:* O(n log n) for sorting and heap operations.
*Space:* O(k) for the heap plus O(n) for the paired list.

## Follow-Up Questions
1. How would the algorithm adapt if `k` could vary for each query?
2. Can we achieve O(n) time using a selection algorithm instead of full sorting?
3. What changes are needed if the score definition used `max(nums2)` instead of `min(nums2)`?

## Key Takeaway
Sorting by the potential minimum (`nums2`) and keeping the top-k `nums1` values with a min-heap lets us evaluate every possible `min2` efficiently, yielding a linearithmic solution.
