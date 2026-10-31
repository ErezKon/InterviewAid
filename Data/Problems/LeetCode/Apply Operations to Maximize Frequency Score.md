# 2968. Apply Operations to Maximize Frequency Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/apply-operations-to-maximize-frequency-score](https://leetcode.com/problems/apply-operations-to-maximize-frequency-score)
**Companies:** Deutsche Bank, Google, Phonepe
---

## Problem Description
You are given a **0-indexed** integer array `nums` and an integer `k`.

You can perform the following operation on the array **at most** `k` times:

- Choose any index `i` from the array and **increase** or **decrease** `nums[i]` by `1`.

The score of the final array is the **frequency** of the most frequent element in the array.

Return *the **maximum** score you can achieve*.

The frequency of an element is the number of occurences of that element in the array.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `0 <= k <= 10^14`

## Examples
```
Example 1:
  Input: nums = [1,2,6,4], k = 3
  Output: 3
  Explanation: We can do the following operations on the array:
  - Choose i = 0, and increase the value of nums[0] by 1. The resulting array is [2,2,6,4].
  - Choose i = 3, and decrease the value of nums[3] by 1. The resulting array is [2,2,6,3].
  - Choose i = 3, and decrease the value of nums[3] by 1. The resulting array is [2,2,6,2].
  The element 2 is the most frequent in the final array so our score is 3.
  It can be shown that we cannot achieve a better score.
```
```
Example 2:
  Input: nums = [1,4,4,2,4], k = 0
  Output: 3
  Explanation: We cannot apply any operations so our score will be the frequency of the most frequent element in the original array, which is 3.
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

## Follow-Up Questions
1. How would the solution change if decrement operations were also allowed?
2. Can you adapt the algorithm to return the actual target value achieving the max frequency?
3. What is the complexity if `k` is extremely large (e.g., 10⁹)?

## Key Takeaway
A sorted array with a sliding window and prefix sums lets you efficiently compute the cheapest way to equalize a subarray within a limited operation budget.
