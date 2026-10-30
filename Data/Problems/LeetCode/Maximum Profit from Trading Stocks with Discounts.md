# 3562. Maximum Profit from Trading Stocks with Discounts

**Difficulty:** 🔴 Hard
**LeetCode:** https://leetcode.com/problems/maximum-profit-from-trading-stocks-with-discounts
**Companies:** Google, Meta

---

## Problem Description

You are given an integer `n`, representing the number of employees in a company. Each employee is assigned a unique ID from 1 to `n`, and employee 1 is the CEO, is the direct or indirect boss of every employee. You are given two **1-based **integer arrays, `present` and `future`, each of length `n`, where:

- `present[i]` represents the **current** price at which the `i^th` employee can buy a stock today.
- `future[i]` represents the **expected** price at which the `i^th` employee can sell the stock tomorrow.

The company's hierarchy is represented by a 2D integer array `hierarchy`, where `hierarchy[i] = [u_i, v_i]` means that employee `u_i` is the direct boss of employee `v_i`.

Additionally, you have an integer `budget` representing the total funds available for investment.

However, the company has a discount policy: if an employee's direct boss purchases their own stock, then the employee can buy their stock at **half** the original price (`floor(present[v] / 2)`).

Return the **maximum** profit that can be achieved without exceeding the given budget.

**Note:**

- You may buy each stock at most **once**.
- You **cannot** use any profit earned from future stock prices to fund additional investments and must buy only from `budget`.

**Constraints:**
- `1 <= n <= 160`
- `present.length, future.length == n`
- `1 <= present[i], future[i] <= 50`
- `hierarchy.length == n - 1`
- `hierarchy[i] == [u_i, v_i]`
- `1 <= u_i, v_i <= n`
- `u_i != v_i`
- `1 <= budget <= 160`
- There are no duplicate edges.
- Employee 1 is the direct or indirect boss of every employee.
- The input graph `hierarchy `is **guaranteed** to have no cycles.

## Examples

**Example 1:**
```
Input: n = 2, present = [1,2], future = [4,3], hierarchy = [[1,2]], budget = 3
Output: 5
Explanation: - Employee 1 buys the stock at price 1 and earns a profit of 4 - 1 = 3.
- Since Employee 1 is the direct boss of Employee 2, Employee 2 gets a discounted price of floor(2 / 2) = 1.
- Employee 2 buys the stock at price 1 and earns a profit of 3 - 1 = 2.
- The total buying cost is 1 + 1 = 2 <= budget. Thus, the maximum total profit achieved is 3 + 2 = 5.
```

**Example 2:**
```
Input: n = 2, present = [3,4], future = [5,8], hierarchy = [[1,2]], budget = 4
Output: 4
Explanation: - Employee 2 buys the stock at price 4 and earns a profit of 8 - 4 = 4.
- Since both employees cannot buy together, the maximum profit is 4.
```

**Example 3:**
```
Input: n = 3, present = [4,6,8], future = [7,9,11], hierarchy = [[1,2],[1,3]], budget = 10
Output: 10
Explanation: - Employee 1 buys the stock at price 4 and earns a profit of 7 - 4 = 3.
- Employee 3 would get a discounted price of floor(8 / 2) = 4 and earns a profit of 11 - 4 = 7.
- Employee 1 and Employee 3 buy their stocks at a total cost of 4 + 4 = 8 <= budget. Thus, the maximum total profit achieved is 3 + 7 = 10.
```

**Example 4:**
```
Input: n = 3, present = [5,2,3], future = [8,5,6], hierarchy = [[1,2],[2,3]], budget = 7
Output: 12
Explanation: - Employee 1 buys the stock at price 5 and earns a profit of 8 - 5 = 3.
- Employee 2 would get a discounted price of floor(2 / 2) = 1 and earns a profit of 5 - 1 = 4.
- Employee 3 would get a discounted price of floor(3 / 2) = 1 and earns a profit of 6 - 1 = 5.
- The total cost becomes 5 + 1 + 1 = 7 <= budget. Thus, the maximum total profit achieved is 3 + 4 + 5 = 12.
```

## Approach
**Dynamic Programming with State Machine — O(n)**

```text
FUNCTION maxProfit(prices, d):
    // dp0: max profit ending with no stock in hand
    // dp1: max profit ending with a stock in hand
    dp0 ← 0
    dp1 ← -prices[0]
    FOR i ← 1 TO LENGTH(prices)-1:
        // If we sell today, we must pay discount before next buy
        newDp0 ← MAX(dp0, dp1 + prices[i] - d)
        // If we buy today, we must have been in state dp0 (no discount needed now)
        newDp1 ← MAX(dp1, dp0 - prices[i])
        dp0 ← newDp0
        dp1 ← newDp1
    RETURN dp0
```
The two states capture whether we currently hold a stock. When selling, we subtract the discount `d` immediately.

## Walkthrough
| Day | price | dp0 (no stock) | dp1 (holding) | Action |
|-----|-------|----------------|---------------|--------|
| 0   | 1     | 0              | -1            | buy
| 1   | 3     | MAX(0, -1+3‑2)=0 | MAX(-1, 0‑3)=-1 | sell (pay discount) → profit 0
| 2   | 2     | 0              | MAX(-1, 0‑2)=-2 | buy
| 3   | 8     | MAX(0, -2+8‑2)=4 | MAX(-2, 0‑8)=-2 | sell → profit 4
| 4   | 4     | 4              | MAX(-2, 4‑4)=0  | buy
| 5   | 9     | MAX(4, 0+9‑2)=7 | MAX(0, 4‑9)=-5 | sell → profit 7 (total 8 overall)

## Complexity Analysis
- **Time:** O(n) – single pass through `prices`.
- **Space:** O(1) – only constant‑size DP variables.

## Follow‑Up Questions
1. How would the solution change if the discount `d` varied per transaction?
2. Can you extend the DP to handle a cooldown period (no buying on the next day after a sell) in addition to the discount?
3. What is the impact on the algorithm if there is a limit on the number of transactions?

## Key Takeaway
Model the problem with two DP states (holding vs not holding) and incorporate the discount directly into the sell transition to achieve an O(n) solution.
