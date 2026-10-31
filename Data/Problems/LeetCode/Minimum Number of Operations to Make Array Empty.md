# 2870. Minimum Number of Operations to Make Array Empty

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-make-array-empty](https://leetcode.com/problems/minimum-number-of-operations-to-make-array-empty)
**Companies:** Amazon, Meta

---

## Problem Description

You are given a **0-indexed** array `nums` consisting of positive integers.

There are two types of operations that you can apply on the array **any** number of times:

- Choose **two** elements with **equal** values and **delete** them from the array.
- Choose **three** elements with **equal** values and **delete** them from the array.

Return *the **minimum** number of operations required to make the array empty, or *`-1`* if it is not possible*.

**Constraints:**
- `2 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^6`

## Examples

**Example 1:**
```
Input: nums = [2,3,3,2,2,4,2,3,4]
Output: 4
Explanation: We can apply the following operations to make the array empty:
- Apply the first operation on the elements at indices 0 and 3. The resulting array is nums = [3,3,2,4,2,3,4].
- Apply the first operation on the elements at indices 2 and 4. The resulting array is nums = [3,3,4,3,4].
- Apply the second operation on the elements at indices 0, 1, and 3. The resulting array is nums = [4,4].
- Apply the first operation on the elements at indices 0 and 1. The resulting array is nums = [].
It can be shown that we cannot make the array empty in less than 4 operations.
```

**Example 2:**
```
Input: nums = [2,1,2,2,3,3]
Output: -1
Explanation: It is impossible to empty the array.
```

## Approach
The problem reduces to repeatedly removing groups of equal numbers. The optimal strategy is to **merge equal elements** whenever possible, which can be modeled with a frequency map and a greedy removal of the largest groups first.

1. Count occurrences of each value.
2. Use a max-heap (or sorted list) to always pick the value with the highest remaining count.
3. Remove a group of size `k` (cost 1) and decrease its count by `k`. If the count remains > 0, push it back.
4. If at any point the largest count is 1 while the array is not empty, the task is impossible.

## Walkthrough
| Step | Remaining counts | Action | Cost |
|------|------------------|--------|------|
| 1 | {2:4, 3:3} | Remove three 3's | 1 |
| 2 | {2:4} | Remove four 2's (they become adjacent) | 1 |
| Total | — | — | **2** (minimum cost) |

## Complexity Analysis
- **Time:** O(N log M) where N is the array length and M is the number of distinct values (heap operations).
- **Space:** O(M) for the frequency map and heap.

## Follow-Up Questions
1. How would the solution change if the cost of an operation were the **square** of the subarray length?
2. Can the problem be solved in O(N) time using a stack-based greedy approach?
3. What if you could only remove subarrays of length at most `k`?

## Key Takeaway
Greedy removal of the largest equal-value groups, guided by a frequency map, yields the minimum number of operations to empty the array.
