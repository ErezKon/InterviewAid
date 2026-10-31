# 1716. Calculate Money in Leetcode Bank

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculate-money-in-leetcode-bank](https://leetcode.com/problems/calculate-money-in-leetcode-bank)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
Hercy wants to save money for his first car. He puts money in the Leetcode bank **every day**.

He starts by putting in `$1` on Monday, the first day. Every day from Tuesday to Sunday, he will put in `$1` more than the day before. On every subsequent Monday, he will put in `$1` more than the **previous Monday**.

Given `n`, return *the total amount of money he will have in the Leetcode bank at the end of the `n`-th day.*

**Constraints:**
- `1 <= n <= 1000`

## Examples
```
Example 1:
  Input: n = 4
  Output: 10
  Explanation: After the 4th day, the total is 1 + 2 + 3 + 4 = 10.
```

```
Example 2:
  Input: n = 10
  Output: 37
  Explanation: After the 10th day, the total is (1 + 2 + 3 + 4 + 5 + 6 + 7) + (2 + 3 + 4) = 37. Notice that on the 2nd Monday, Hercy only puts in $2.
```

```
Example 3:
  Input: n = 20
  Output: 96
  Explanation: After the 20th day, the total is (1 + 2 + 3 + 4 + 5 + 6 + 7) + (2 + 3 + 4 + 5 + 6 + 7 + 8) + (3 + 4 + 5 + 6 + 7 + 8) = 96.
```

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

## Follow-Up Questions
1. How would you modify the solution to return the deposit amount for each individual day?
2. Can the formula be extended to handle a different weekly increment pattern?
3. What if the bank started with an arbitrary initial amount `x` instead of 1?

## Key Takeaway
A closed-form arithmetic series derived from weekly patterns yields a constant-time solution for cumulative deposits.
