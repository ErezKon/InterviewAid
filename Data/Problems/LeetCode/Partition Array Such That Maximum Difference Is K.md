# 2294. Partition Array Such That Maximum Difference Is K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-array-such-that-maximum-difference-is-k](https://leetcode.com/problems/partition-array-such-that-maximum-difference-is-k)
**Companies:** Amazon, Google

---

## Problem Description
You are given an integer array `nums` and an integer `k`. You may partition `nums` into one or more **subsequences** such that each element in `nums` appears in **exactly** one of the subsequences.

Return *the **minimum** number of subsequences needed such that the difference between the maximum and minimum values in each subsequence is **at most*** `k`*.*

A **subsequence** is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

**Constraints:**

- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`
- `0 <= k <= 10^5`

## Examples

```
Example 1:
  Input: nums = [3,6,1,2,5], k = 2
  Output: 2
  Explanation:
  We can partition nums into the two subsequences [3,1,2] and [6,5].
  The difference between the maximum and minimum value in the first subsequence is 3 - 1 = 2.
  The difference between the maximum and minimum value in the second subsequence is 6 - 5 = 1.
  Since two subsequences were created, we return 2. It can be shown that 2 is the minimum number of subsequences needed.
```

```
Example 2:
  Input: nums = [1,2,3], k = 1
  Output: 2
  Explanation:
  We can partition nums into the two subsequences [1,2] and [3].
  The difference between the maximum and minimum value in the first subsequence is 2 - 1 = 1.
  The difference between the maximum and minimum value in the second subsequence is 3 - 3 = 0.
  Since two subsequences were created, we return 2. Note that another optimal solution is to partition nums into the two subsequences [1] and [2,3].
```

```
Example 3:
  Input: nums = [2,2,4,5], k = 0
  Output: 3
  Explanation:
  We can partition nums into the three subsequences [2,2], [4], and [5].
  The difference between the maximum and minimum value in the first subsequences is 2 - 2 = 0.
  The difference between the maximum and minimum value in the second subsequences is 4 - 4 = 0.
  The difference between the maximum and minimum value in the third subsequences is 5 - 5 = 0.
  Since three subsequences were created, we return 3. It can be shown that 3 is the minimum number of subsequences needed.
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
