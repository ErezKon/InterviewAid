# 1716. Calculate Money in Leetcode Bank

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculate-money-in-leetcode-bank](https://leetcode.com/problems/calculate-money-in-leetcode-bank)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
You are given an integer `n` representing the number of days the LeetCode bank has been operating. The bank starts with $1 on day 1. Each subsequent day, the amount deposited increases by $1 compared to the previous day. Additionally, at the start of each new week (every 7 days), the daily deposit amount resets to the previous week's starting amount plus $1. Compute the total amount of money in the bank after `n` days.

## Examples
- Input: `n = 4`
  Output: `10`
  Explanation: Deposits are [1,2,3,4]; sum = 10.
- Input: `n = 10`
  Output: `37`
  Explanation: Week 1 deposits = [1,2,3,4,5,6,7]; Week 2 starts at 2 → deposits = [2,3]; total = 28 + 9 = 37.

## Approach: Math Formula — O(1) ✅

```text
FUNCTION totalMoney(n):
    weeks ← n DIV 7          // integer division
    days ← n MOD 7           // remaining days after full weeks
    // Sum of complete weeks: each week adds 28 plus an arithmetic increase of 7 per week
    total ← weeks * 28 + 7 * weeks * (weeks - 1) / 2
    // Add the remaining days of the last (partial) week
    total ← total + days * (weeks + 1) + days * (days - 1) / 2
    RETURN total
```

## Walkthrough
| Step | weeks | days | Calculation of `total` |
|------|-------|------|------------------------|
| 1 | `n = 10` → weeks = 1, days = 3 |
| 2 | Full weeks: `1 * 28 + 7 * 1 * 0 / 2 = 28` |
| 3 | Remaining days: `3 * (1+1) + 3 * 2 / 2 = 6 + 3 = 9` |
| 4 | Final total: `28 + 9 = 37` |

## Complexity Analysis
- **Time:** O(1) – only a few arithmetic operations.
- **Space:** O(1) – constant extra space.

## Follow‑Up Questions
1. How would you modify the solution to return the deposit amount for each individual day?
2. Can the formula be extended to handle a different weekly increment pattern?
3. What if the bank started with an arbitrary initial amount `x` instead of 1?

## Key Takeaway
A closed‑form arithmetic series derived from weekly patterns yields a constant‑time solution for cumulative deposits.
