# 2968. Apply Operations to Maximize Frequency Score

**Difficulty:** 🔴 Hard
**Companies:** Deutsche Bank, Google, Phonepe
---

## Problem Description
Given an integer array `nums` and an integer `k`, you may perform at most `k` increment operations where each operation adds `1` to any element of the array. After applying the operations, the **frequency score** is defined as the maximum number of equal elements in the array. Return the largest possible frequency score achievable.

## Examples
**Example 1:**
```
Input: nums = [1,2,4], k = 5
Output: 3
Explanation: Increment 1→4 (3 ops) and 2→4 (2 ops), array becomes [4,4,4].
```
**Example 2:**
```
Input: nums = [1,4,8,13], k = 5
Output: 2
Explanation: Best we can do is make two numbers equal, e.g., 8→13 using 5 ops.
```

## Approach
Sort the array. Use a sliding window where the right end expands. For each window, compute the total operations needed to raise all elements to the value at the right end (the median for maximizing frequency). Using prefix sums, the cost is `windowSize * nums[right] - (prefixSum[right+1] - prefixSum[left])`. If the cost exceeds `k`, shrink the window from the left. Track the maximum window size.

```text
FUNCTION maxFrequency(nums, k):
    SORT nums
    n ← LEN(nums)
    CREATE prefix[0..n] WITH 0
    FOR i ← 0 TO n-1:
        SET prefix[i+1] ← prefix[i] + nums[i]
    SET left ← 0
    SET result ← 1
    FOR right ← 0 TO n-1:
        WHILE (right - left + 1) * nums[right] - (prefix[right+1] - prefix[left]) > k:
            SET left ← left + 1
        SET result ← MAX(result, right - left + 1)
    RETURN result
```

## Walkthrough
Array `[1,2,4]`, `k=5` after sorting stays `[1,2,4]`.
- right=0: window size 1, cost 0 → result=1.
- right=1: cost = 2*2 - (1+2) = 1 ≤5 → result=2.
- right=2: cost = 3*4 - (1+2+4) = 5 ≤5 → result=3.
Thus maximum frequency = 3.

## Complexity Analysis
- **Time:** O(n log n) for sorting plus O(n) sliding window.
- **Space:** O(n) for prefix sums (can be O(1) with running sum).

## Follow‑Up Questions
1. How would the solution change if decrement operations were also allowed?
2. Can you adapt the algorithm to return the actual target value achieving the max frequency?
3. What is the complexity if `k` is extremely large (e.g., 10⁹)?

## Key Takeaway
A sorted array with a sliding window and prefix sums lets you efficiently compute the cheapest way to equalize a subarray within a limited operation budget.
