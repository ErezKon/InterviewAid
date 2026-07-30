# 2656. Maximum Sum With Exactly K Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-sum-with-exactly-k-elements](https://leetcode.com/problems/maximum-sum-with-exactly-k-elements)
**Companies:** Amazon

---

## Problem Description
Given an integer array `nums` of length `n` and an integer `k` (1 ≤ k ≤ n), select exactly `k` elements (not necessarily contiguous) such that their sum is maximized. Return the maximum possible sum.

## Examples
**Example 1:**
```
Input: nums = [5,2,9,1,5,6], k = 3
Output: 20
Explanation: Choose the three largest numbers 9, 6, and 5 → sum = 20.
```

**Example 2:**
```
Input: nums = [-1,-2,-3], k = 2
Output: -3
Explanation: The least negative numbers are -1 and -2; their sum is -3.
```

## Approach
The optimal selection is simply the `k` largest elements of the array. We can obtain them by:
1. Sorting `nums` in descending order and summing the first `k` values, **or**
2. Using a **min‑heap** of size `k` to keep the largest elements while scanning the array once (useful when `n` is large and `k` is small).
Both methods run in O(n log n) or O(n log k) time respectively.

### Pseudocode (Sorting version)
```text
FUNCTION maxSumExactlyK(nums, k):
    SORT nums DESCENDING
    sum ← 0
    FOR i FROM 0 TO k-1:
        sum ← sum + nums[i]
    RETURN sum
```

### Pseudocode (Heap version)
```text
FUNCTION maxSumExactlyKHeap(nums, k):
    heap ← MIN-HEAP   // stores up to k largest values
    FOR each val IN nums:
        heap.PUSH(val)
        IF heap.SIZE() > k:
            heap.POP()   // discard smallest among stored values
    sum ← 0
    WHILE heap IS NOT EMPTY:
        sum ← sum + heap.POP()
    RETURN sum
```

## Walkthrough
For `nums = [5,2,9,1,5,6]`, `k = 3`:
- Sorting yields `[9,6,5,5,2,1]`; sum of first three = 9+6+5 = 20.
- Heap method: push each value, maintaining size ≤ 3. After processing all, heap contains `[5,6,9]`; sum = 20.

## Complexity Analysis
*Time:* O(n log n) for sorting, or O(n log k) for the heap approach.
*Space:* O(1) extra for sorting in‑place, or O(k) for the heap.

## Follow‑Up Questions
1. How would you adapt the solution to return the indices of the selected elements?
2. Can the problem be solved in O(n) time using a selection algorithm (quickselect) to find the k‑th largest element?
3. What changes are needed if the array is streamed and you must maintain the maximum sum of exactly k elements at any point?

## Key Takeaway
Selecting the `k` largest numbers—via sorting or a bounded min‑heap—directly yields the maximum possible sum for exactly `k` elements.
