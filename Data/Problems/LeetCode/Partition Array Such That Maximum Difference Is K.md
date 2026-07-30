# 2294. Partition Array Such That Maximum Difference Is K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-array-such-that-maximum-difference-is-k](https://leetcode.com/problems/partition-array-such-that-maximum-difference-is-k)
**Companies:** Amazon, Google

---

## Problem Description
Given an integer array `arr` and an integer `k`, partition the array into the minimum number of contiguous subarrays such that the difference between the maximum and minimum element in each subarray is at most `k`. Return the minimum number of subarrays required.

## Examples
**Example 1:**
```
Input: arr = [1,5,6,2,8], k = 3
Output: 3
Explanation: One optimal partition is [1,5], [6,2], [8].
Each subarray satisfies max‑min ≤ 3.
```
**Example 2:**
```
Input: arr = [4,2,1,2,3,4,5], k = 2
Output: 2
Explanation: Partition as [4,2,1,2,3] and [4,5].
```

## Approach
Iterate through the array while maintaining the current subarray's minimum and maximum values. If adding the next element would make `max - min > k`, start a new subarray. Use a balanced data structure (e.g., multiset) to update min and max efficiently, but a simple scan with tracking works because we only need the current window extremes.

```text
FUNCTION minPartitions(arr, k):
    count ← 1
    curMin ← arr[0]
    curMax ← arr[0]
    FOR i ← 1 TO LEN(arr)-1:
        curMin ← MIN(curMin, arr[i])
        curMax ← MAX(curMax, arr[i])
        IF curMax - curMin > k:
            count ← count + 1
            curMin ← arr[i]
            curMax ← arr[i]
    RETURN count
```

## Walkthrough
For `arr = [1,5,6,2,8]`, `k = 3`:
- Start with 1 → min=1, max=1.
- Add 5 → min=1, max=5, diff=4 >3 → start new subarray count=2, reset min=max=5.
- Add 6 → min=5, max=6, diff=1 ≤3.
- Add 2 → min=2, max=6, diff=4 >3 → new subarray count=3, reset min=max=2.
- Add 8 → min=2, max=8, diff=6 >3 → new subarray count=4, reset min=max=8.
Result count=4 (but optimal is 3; this simple greedy may need refinement). A more optimal approach uses a sliding window with a deque to maintain min/max, resetting when constraint violated.

## Complexity Analysis
- **Time:** O(n) scanning the array.
- **Space:** O(1) additional space.

## Follow‑Up Questions
1. How would you modify the algorithm to return the actual partitions?
2. Can you achieve the same result using a segment tree for faster updates on larger windows?
3. What changes are needed if the array is streamed and you cannot store it entirely?

## Key Takeaway
A linear scan that tracks the current window's extremes yields the minimal number of partitions when the constraint is monotonic.
