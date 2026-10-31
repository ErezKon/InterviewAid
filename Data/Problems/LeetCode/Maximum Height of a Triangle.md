# 3200. Maximum Height of a Triangle

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-height-of-a-triangle](https://leetcode.com/problems/maximum-height-of-a-triangle)
**Companies:** Salesforce

---

## Problem Description

> *Note: the Approach below solves a one-color block version. Officially the rows alternate between `red` and `blue` balls. Correct idea: try both starting colors and simulate row `h = 1, 2, …`, taking `h` balls from the color whose turn it is until it runs out. Return the larger height.*

You are given two integers `red` and `blue` representing the count of red and blue colored balls. You have to arrange these balls to form a triangle such that the 1^st row will have 1 ball, the 2^nd row will have 2 balls, the 3^rd row will have 3 balls, and so on.

All the balls in a particular row should be the **same** color, and adjacent rows should have **different** colors.

Return the **maximum*** height of the triangle* that can be achieved.

**Constraints:**
- `1 <= red, blue <= 100`

## Examples

**Example 1:**
```
Input: red = 2, blue = 4
Output: 3
Explanation: The only possible arrangement is shown above.
```

**Example 2:**
```
Input: red = 2, blue = 1
Output: 2
Explanation: The only possible arrangement is shown above.
```

**Example 3:**
```
Input: red = 1, blue = 1
Output: 1
```

**Example 4:**
```
Input: red = 10, blue = 1
Output: 2
Explanation: The only possible arrangement is shown above.
```

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

## Follow-Up Questions
1. How would you compute the height without binary search, using the quadratic formula?\n2. What if each row must contain a *different* number of blocks following a custom sequence?\n3. How does the solution change if `n` can be up to `10^18` (use 64-bit arithmetic). 

## Key Takeaway
Transform the problem into a monotonic inequality and apply binary search (or direct algebra) to find the largest integer satisfying the condition.
