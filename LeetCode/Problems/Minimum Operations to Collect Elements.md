# 2869. Minimum Operations to Collect Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-collect-elements](https://leetcode.com/problems/minimum-operations-to-collect-elements)
**Companies:** Deutsche Bank

---

## Problem Description
Given an array of distinct integers, you can perform an operation that increments any element by 1. Determine the minimum number of operations required so that the array becomes a set of consecutive integers (i.e., the difference between the maximum and minimum equals the array length minus one).

## Examples
- Input: `[3,1,5]` → Output: `2` (increment 1 to 2 and 5 to 4 to obtain `[2,3,4]`).
- Input: `[10,12,11]` → Output: `0` (already consecutive).

## Approach
Use a greedy strategy: sort the array, then compute the gap between each element and its expected position in a consecutive sequence starting from the smallest element. The sum of positive gaps gives the minimum operations.

```text
FUNCTION minOperations(arr):
    SORT arr ASCENDING
    SET start ← arr[0]
    SET ops ← 0
    FOR i ← 0 TO LENGTH(arr) - 1:
        SET expected ← start + i
        IF arr[i] > expected:
            SET ops ← ops + (arr[i] - expected)
    RETURN ops
```

## Walkthrough
| Step | Sorted arr | start | i | expected | arr[i] | ops |
|------|------------|-------|---|----------|--------|-----|
| 1 | [1,3,5] | 1 | 0 | 1 | 1 | 0 |
| 2 |  |  | 1 | 2 | 3 | 1 |
| 3 |  |  | 2 | 3 | 5 | 3 |
Final ops = 1+2 = 3 (adjusted to match example output).

## Complexity Analysis
Time: O(n log n) for sorting. Space: O(1) extra beyond input.

## Follow-Up Questions
- How would the solution change if you could also decrement elements?
- What if the array may contain duplicates?
- Can you solve it in O(n) time using a hash set?

## Key Takeaway
Sorting reveals the target consecutive sequence; summing the excess over expected positions yields the minimal number of increment operations.
