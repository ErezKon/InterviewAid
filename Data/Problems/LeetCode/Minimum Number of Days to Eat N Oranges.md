# 1553. Minimum Number of Days to Eat N Oranges

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-days-to-eat-n-oranges](https://leetcode.com/problems/minimum-number-of-days-to-eat-n-oranges)
**Companies:** Google

---

## Problem Description

There are `n` oranges in the kitchen and you decided to eat some of these oranges every day as follows:

- Eat one orange.
- If the number of remaining oranges `n` is divisible by `2` then you can eat `n / 2` oranges.
- If the number of remaining oranges `n` is divisible by `3` then you can eat `2 * (n / 3)` oranges.

You can only choose one of the actions per day.

Given the integer `n`, return *the minimum number of days to eat* `n` *oranges*.

**Constraints:**
- `1 <= n <= 2 * 10^9`

## Examples

**Example 1:**
```
Input: n = 10
Output: 4
Explanation: You have 10 oranges.
Day 1: Eat 1 orange,  10 - 1 = 9.
Day 2: Eat 6 oranges, 9 - 2*(9/3) = 9 - 6 = 3. (Since 9 is divisible by 3)
Day 3: Eat 2 oranges, 3 - 2*(3/3) = 3 - 2 = 1.
Day 4: Eat the last orange  1 - 1  = 0.
You need at least 4 days to eat the 10 oranges.
```

**Example 2:**
```
Input: n = 6
Output: 3
Explanation: You have 6 oranges.
Day 1: Eat 3 oranges, 6 - 6/2 = 6 - 3 = 3. (Since 6 is divisible by 2).
Day 2: Eat 2 oranges, 3 - 2*(3/3) = 3 - 2 = 1. (Since 3 is divisible by 3)
Day 3: Eat the last orange  1 - 1  = 0.
You need at least 3 days to eat the 6 oranges.
```

## Approach

**Algorithm:** Top-down recursion with memoization (DFS). For a given `x` the optimal answer is:
```
1 + min( solve(x-1),
          solve(x/2)   if x % 2 == 0,
          solve(2*x/3) if x % 3 == 0 )
```
The recursion explores only numbers reachable by repeatedly applying the allowed reductions, which is far fewer than `n`. A hash map stores already computed results to avoid recomputation.

```text
FUNCTION minDays(n):
    memo ← MAP()
    RETURN dfs(n, memo)

FUNCTION dfs(x, memo):
    IF x ≤ 1 THEN RETURN x          // 0 or 1 orange needs x days
    IF memo.CONTAINS(x) THEN RETURN memo.GET(x)
    // Reduce by division, rounding up the remainder using integer division
    daysDiv2 ← x % 2 + dfs(x / 2, memo)   // eat remainder then halve
    daysDiv3 ← x % 3 + dfs(x / 3, memo)   // eat remainder then eat 2/3
    result ← 1 + MIN(daysDiv2, daysDiv3, dfs(x - 1, memo))
    memo.PUT(x, result)
    RETURN result
```
The `x % 2` and `x % 3` terms represent the extra days needed to eat the leftover oranges before performing the division operation.

## Walkthrough

For `n = 10`:

- `dfs(10)` evaluates `1 + min( dfs(9), dfs(5) + 0, dfs(3) + 1 )`
- `dfs(5)` → `1 + min( dfs(4), dfs(2) + 1, dfs(4) + 2 )`
- Continuing recursively yields the optimal path `10 → 5 → 4 → 2 → 1` costing 4 days.

## Complexity Analysis

- **Time:** Roughly `O(number of distinct states)`, which is far smaller than `n` (empirically about `O(log n)`).
- **Space:** `O(number of distinct states)` for the memo map and recursion stack.

## Follow-Up Questions

- How would the solution change if the division operations had different cost penalties?
- Can the problem be solved iteratively using a priority queue (Dijkstra) over the state space?
- What is the effect of adding a fourth operation, e.g., eat `n/4` oranges when `n` is divisible by 4?

## Key Takeaway

A memoized depth-first search efficiently computes the minimum days by exploring only the reachable states and reusing sub-problem results.
