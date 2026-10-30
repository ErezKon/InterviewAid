# 3462. Maximum Sum With at Most K Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-sum-with-at-most-k-elements](https://leetcode.com/problems/maximum-sum-with-at-most-k-elements)
**Companies:** Amazon, Microsoft

---

## Problem Description

> *Note: the Approach below ignores the grid and the per-row `limits`. Correct idea: from row `i` keep its `limits[i]` largest values, merge these candidates, and sum the `k` largest (sort or heap; values are non-negative).*

You are given a 2D integer matrix `grid` of size `n x m`, an integer array `limits` of length `n`, and an integer `k`. The task is to find the **maximum sum** of **at most** `k` elements from the matrix `grid` such that:

- The number of elements taken from the `i^th` row of `grid` does not exceed `limits[i]`.

Return the **maximum sum**.

**Constraints:**
- `n == grid.length == limits.length`
- `m == grid[i].length`
- `1 <= n, m <= 500`
- `0 <= grid[i][j] <= 10^5`
- `0 <= limits[i] <= m`
- `0 <= k <= min(n * m, sum(limits))`

## Examples

**Example 1:**
```
Input: grid = [[1,2],[3,4]], limits = [1,2], k = 2
Output: 7
Explanation: - From the second row, we can take at most 2 elements. The elements taken are 4 and 3.
- The maximum possible sum of at most 2 selected elements is 4 + 3 = 7.
```

**Example 2:**
```
Input: grid = [[5,3,7],[8,2,6]], limits = [2,2], k = 3
Output: 21
Explanation: - From the first row, we can take at most 2 elements. The element taken is 7.
- From the second row, we can take at most 2 elements. The elements taken are 8 and 6.
- The maximum possible sum of at most 3 selected elements is 7 + 8 + 6 = 21.
```

## Approach
The optimal sum is obtained by taking all **positive** numbers, but we cannot exceed `k` elements. Therefore:
1. Separate positive numbers and sort them in descending order.
2. If the count of positives ≤ k, sum them all.
3. If there are more than `k` positives, sum the largest `k` of them.
4. If there are no positive numbers, the answer is the maximum (least negative) element, because picking fewer than `k` elements is allowed.
An alternative O(n log k) solution uses a **min‑heap** of size `k` to keep the largest positive values while scanning.

### Pseudocode (Sorting version)
```text
FUNCTION maxSumAtMostK(nums, k):
    positives ← FILTER x IN nums WHERE x > 0
    IF positives IS EMPTY:
        RETURN MAX(nums)   // pick the least negative element
    SORT positives DESCENDING
    IF LENGTH(positives) <= k:
        RETURN SUM(positives)
    ELSE:
        RETURN SUM(first k elements of positives)
```

### Pseudocode (Heap version)
```text
FUNCTION maxSumAtMostKHeap(nums, k):
    heap ← MIN-HEAP   // stores up to k largest positive values
    maxNeg ← -∞
    FOR each val IN nums:
        IF val > 0:
            heap.PUSH(val)
            IF heap.SIZE() > k:
                heap.POP()
        ELSE:
            maxNeg ← MAX(maxNeg, val)
    IF heap.SIZE() == 0:
        RETURN maxNeg
    sum ← 0
    WHILE heap IS NOT EMPTY:
        sum ← sum + heap.POP()
    RETURN sum
```

## Walkthrough
For `nums = [4, -1, 2, 1]`, `k = 3`:
- Positives = [4,2,1]; length = 3 ≤ k, sum = 7.
- Heap method would push 4,2,1; heap size stays ≤ 3; sum = 7.

## Complexity Analysis
*Time:* O(n log n) for sorting, or O(n log k) for the heap.
*Space:* O(n) for the positives list, or O(k) for the heap.

## Follow‑Up Questions
1. How would you modify the algorithm to also return the selected indices?
2. Can the solution be adapted for a streaming input where the array is not known in advance?
3. What if the selection must be a contiguous subarray of length ≤ k?

## Key Takeaway
By focusing on the largest positive numbers and respecting the `k` limit (or falling back to the maximum element when all are non‑positive), we obtain the maximum sum with at most `k` selections in linearithmic time.
