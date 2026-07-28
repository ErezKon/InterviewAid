# 3200. Maximum Height of a Triangle

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-height-of-a-triangle](https://leetcode.com/problems/maximum-height-of-a-triangle)
**Companies:** Salesforce

---

## Problem Description
Given a positive integer `n` representing the total number of blocks, you build a triangle by placing `1` block in the first row, `2` blocks in the second row, `3` blocks in the third row, and so on. Return the maximum possible height `h` of the triangle such that the total number of used blocks does not exceed `n`.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `5` | `2` | Rows `1 + 2 = 3` fit, adding a third row would need `6` blocks > `5`. |
| `10` | `4` | `1+2+3+4 = 10` exactly fits. |

## Approach
The sum of the first `h` natural numbers is `h·(h+1)/2`. We need the largest `h` with `h·(h+1)/2 ≤ n`. This can be solved by a simple **binary search** on `h` (or by solving the quadratic inequality directly). The binary search checks the mid value, computes the required blocks, and narrows the range.

```text
FUNCTION maxHeight(n):
    left ← 0
    right ← n               // height cannot exceed n
    WHILE left ≤ right:
        mid ← (left + right) // 2
        required ← mid * (mid + 1) // 2
        IF required ≤ n:
            left ← mid + 1          // try larger height
        ELSE:
            right ← mid - 1         // too tall
    RETURN right                     // largest feasible height
```
The loop runs `O(log n)` iterations.

## Walkthrough
For `n = 5`:
1. left=0, right=5 → mid=2, required=3 ≤5 → left=3.
2. left=3, right=5 → mid=4, required=10 >5 → right=3.
3. left=3, right=3 → mid=3, required=6 >5 → right=2.
Loop ends, return `right = 2`.

## Complexity Analysis
*Time*: **O(log n)** – binary search iterations.
*Space*: **O(1)** – only a few variables.

## Follow‑Up Questions
1. How would you compute the height without binary search, using the quadratic formula?\n2. What if each row must contain a *different* number of blocks following a custom sequence?\n3. How does the solution change if `n` can be up to `10^18` (use 64‑bit arithmetic). 

## Key Takeaway
Transform the problem into a monotonic inequality and apply binary search (or direct algebra) to find the largest integer satisfying the condition.
