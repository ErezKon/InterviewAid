# 1388. Pizza With 3n Slices

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/pizza-with-3n-slices](https://leetcode.com/problems/pizza-with-3n-slices)
**Companies:** Amazon, Google

---

## Problem Description

There is a pizza with `3n` slices of varying size, you and your friends will take slices of pizza as follows:

- You will pick **any** pizza slice.
- Your friend Alice will pick the next slice in the anti-clockwise direction of your pick.
- Your friend Bob will pick the next slice in the clockwise direction of your pick.
- Repeat until there are no more slices of pizzas.

Given an integer array `slices` that represent the sizes of the pizza slices in a clockwise direction, return *the maximum possible sum of slice sizes that you can pick*.

**Constraints:**
- `3 * n == slices.length`
- `1 <= slices.length <= 500`
- `1 <= slices[i] <= 1000`

## Examples

**Example 1:**
```
Input: slices = [1,2,3,4,5,6]
Output: 10
Explanation: Pick pizza slice of size 4, Alice and Bob will pick slices with size 3 and 5 respectively. Then Pick slices with size 6, finally Alice and Bob will pick slice of size 2 and 1 respectively. Total = 4 + 6.
```

**Example 2:**
```
Input: slices = [8,9,8,6,1,1]
Output: 16
Explanation: Pick pizza slice of size 8 in each turn. If you pick slice with size 9 your partners will pick slices of size 8.
```

## Approach
Use dynamic programming on a linearized array of length `2·3n` to simulate picking `n` slices while respecting the circular constraint.

```text
FUNCTION MaxPizzaSize(slices):
    SET n ← LENGTH(slices) / 3
    // helper for linear case: pick exactly n slices from subarray [l, r]
    FUNCTION Solve(arr, n):
        SET m ← LENGTH(arr)
        CREATE dp[0..m][0..n] INITIALIZED TO 0
        FOR i ← 1 TO m:
            FOR j ← 1 TO MIN(n, (i+1)/2):
                // either skip i-th slice or take it (then skip previous)
                SET dp[i][j] ← MAX(dp[i-1][j], arr[i-1] + dp[i-2][j-1])
        RETURN dp[m][n]
    // case1: exclude first slice
    SET case1 ← Solve(slices[1:], n)
    // case2: exclude last slice
    SET case2 ← Solve(slices[:-1], n)
    RETURN MAX(case1, case2)
```

## Walkthrough (case1 example)
| i | arr[i] | dp[i][j] (choose j slices) |
|---|--------|---------------------------|
| ... | ... | ... |
*(omitted for brevity; illustrates DP table filling)*

## Complexity Analysis
Time **O(m·n)** where *m = 3n*, space **O(m·n)** (can be reduced to O(m) with rolling arrays).

## Follow-Up Questions
1. How to adapt the solution for a circular array with a different pick pattern?
2. Can the problem be solved with a greedy strategy for special cases?
3. What is the space-optimized DP version using only two rows?

## Key Takeaway
Transforming the circular selection into two linear sub-problems and applying DP on "pick-or-skip" yields the optimal maximum sum.
