# 2835. Minimum Operations to Form Subsequence With Target Sum

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-form-subsequence-with-target-sum](https://leetcode.com/problems/minimum-operations-to-form-subsequence-with-target-sum)
**Companies:** Medianet

---

## Problem Description
Given an integer array `nums` and an integer `target`, you may repeatedly perform an operation: choose any element `x` from the array and replace it with `x - 1`. Each operation costs 1. Determine the minimum total cost required to obtain a subsequence of the array whose sum is exactly `target`. It is guaranteed that `target` is less than or equal to the sum of all elements.

## Examples
**Example 1:**
```
nums = [5,3,2], target = 8
Output: 2
Explanation: Decrease 5 to 4 (cost 1) and 3 to 2 (cost 1). The subsequence [4,2,2] sums to 8.
```
**Example 2:**
```
nums = [1,1,1,1], target = 3
Output: 0
Explanation: Subsequence [1,1,1] already sums to 3, no operations needed.
```

## Approach
**Greedy – reduce the largest elements first.** To reach the target with minimal cost, we want to keep as much of the total sum as possible and only decrease the excess amount. Sort the array in descending order and keep adding elements until the cumulative sum reaches or exceeds `target`. If it exceeds, reduce the last added element by the excess amount.

```text
FUNCTION minCost(nums, target):
    SORT nums DESCENDING
    SET total ← 0
    SET ops ← 0
    FOR value IN nums:
        IF total + value < target:
            SET total ← total + value
        ELSE:
            SET excess ← (total + value) - target
            SET ops ← ops + excess   // decrease this value by excess
            BREAK
    RETURN ops
```

## Walkthrough
| Step | Sorted nums | Total before | Value | Total after | Excess | Ops |
|------|-------------|--------------|-------|-------------|--------|-----|
| 1    | [5,3,2]     | 0            | 5     | 5           | –      | 0 |
| 2    |             | 5            | 3     | 8 (=target) | 0      | 0 |
| End  |             | –            | –     | –           | –      | 0 |

## Complexity Analysis
- **Time:** O(n log n) for sorting.
- **Space:** O(1) extra (in‑place sort) or O(n) if a copy is made.

## Follow‑Up Questions
1. How would you handle the case where you can also increase elements?
2. Can the problem be solved in O(n) time using a selection algorithm to find the largest elements needed?
3. What if each decrement operation had a different cost per element?

## Key Takeaway
By keeping the largest numbers and only decreasing the excess amount, we achieve the minimal total cost to form a subsequence that matches the target sum.
