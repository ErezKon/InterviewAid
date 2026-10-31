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
Because we partition into **subsequences**, element order does not matter - only which values share a group. So sort the array and greedily group:
- Start a group at the smallest unassigned value `start`.
- Keep adding values while `value - start <= k`.
- The first value with `value - start > k` must open a new group (it cannot join the previous one, and extending the previous group as far as possible never hurts).

```text
FUNCTION partitionArray(nums, k):
    SORT nums
    count ← 1
    start ← nums[0]
    FOR i ← 1 TO LEN(nums)-1:
        IF nums[i] - start > k:
            count ← count + 1
            start ← nums[i]
    RETURN count
```

## Walkthrough
Example 1: `nums = [3,6,1,2,5]`, `k = 2`. Sorted: `[1,2,3,5,6]`.
- Start group at 1, count = 1.
- 2: `2 - 1 = 1 <= 2`, same group.
- 3: `3 - 1 = 2 <= 2`, same group -> `{1,2,3}`.
- 5: `5 - 1 = 4 > 2` -> new group, count = 2, start = 5.
- 6: `6 - 5 = 1 <= 2`, same group -> `{5,6}`.
Result: `2`.

## Complexity Analysis
- **Time:** O(n log n) for sorting; the scan is O(n).
- **Space:** O(1) extra (or O(n) depending on the sort implementation).

## Follow-Up Questions
1. How would you modify the algorithm to return the actual partitions?
2. Since values are at most 10^5, how would counting sort make the whole solution O(n + maxValue)?
3. What changes are needed if the array is streamed and you cannot store it entirely?

## Key Takeaway
Subsequences ignore order, so sort first; then a greedy scan that opens a new group only when `value - groupStart > k` yields the minimal number of groups.
