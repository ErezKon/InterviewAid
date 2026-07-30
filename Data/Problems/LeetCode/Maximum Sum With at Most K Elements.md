# 3462. Maximum Sum With at Most K Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-sum-with-at-most-k-elements](https://leetcode.com/problems/maximum-sum-with-at-most-k-elements)
**Companies:** Amazon, Microsoft

---

## Problem Description
Given an integer array `nums` of length `n` and an integer `k` (1 ≤ k ≤ n), you may select **any number of elements up to `k`** (the selection does not need to be contiguous). Return the maximum possible sum of the chosen elements.

## Examples
**Example 1:**
```
Input: nums = [4, -1, 2, 1], k = 3
Output: 7
Explanation: Choose elements 4, 2, and 1 → sum = 7.
```

**Example 2:**
```
Input: nums = [-5, -2, -3], k = 2
Output: -2
Explanation: The best choice is the single element -2 (choosing fewer than k elements is allowed).
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
