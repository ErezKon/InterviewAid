# 2870. Minimum Number of Operations to Make Array Empty

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-make-array-empty](https://leetcode.com/problems/minimum-number-of-operations-to-make-array-empty)
**Companies:** Amazon, Meta

---

## Problem Description
Given an integer array `nums`, you may perform the following operation any number of times: choose any **non‑empty** subarray where all elements are equal, remove it, and the array shrinks. The cost of an operation is the length of the chosen subarray. Return the minimum total cost required to make the array empty. If it is impossible, return `-1`.

## Examples
**Example 1:**
```
Input: nums = [2,2,3,3,3,2,2]
Output: 4
Explanation: Remove the three 3's in one operation (cost 3) and the remaining four 2's in another operation (cost 1 because they become adjacent after removal). Total cost = 3 + 1 = 4.
```
**Example 2:**
```
Input: nums = [1,2,3]
Output: -1
Explanation: No two equal elements are adjacent, so the array can never be emptied.
```

## Approach
The problem reduces to repeatedly removing groups of equal numbers. The optimal strategy is to **merge equal elements** whenever possible, which can be modeled with a frequency map and a greedy removal of the largest groups first.

1. Count occurrences of each value.
2. Use a max‑heap (or sorted list) to always pick the value with the highest remaining count.
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

## Follow‑Up Questions
1. How would the solution change if the cost of an operation were the **square** of the subarray length?
2. Can the problem be solved in O(N) time using a stack‑based greedy approach?
3. What if you could only remove subarrays of length at most `k`?

## Key Takeaway
Greedy removal of the largest equal‑value groups, guided by a frequency map, yields the minimum number of operations to empty the array.
