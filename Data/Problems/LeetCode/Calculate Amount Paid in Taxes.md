# 2303. Calculate Amount Paid in Taxes

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculate-amount-paid-in-taxes](https://leetcode.com/problems/calculate-amount-paid-in-taxes)
**Companies:** Bloomberg, Interactive Brokers, Meta, Oracle, Snowflake, Stripe

---

## Problem Description
You are given a **0-indexed** 2D integer array `brackets` where `brackets[i] = [upper_i, percent_i]` means that the `i`-th tax bracket has an upper bound of `upper_i` and is taxed at a rate of `percent_i`. The brackets are **sorted** by upper bound (i.e. `upper_{i-1} < upper_i` for `0 < i < brackets.length`).

Tax is calculated as follows:

- The first `upper_0` dollars earned are taxed at a rate of `percent_0`.
- The next `upper_1 - upper_0` dollars earned are taxed at a rate of `percent_1`.
- The next `upper_2 - upper_1` dollars earned are taxed at a rate of `percent_2`.
- And so on.

You are given an integer `income` representing the amount of money you earned. Return *the amount of money that you have to pay in taxes.* Answers within `10^-5` of the actual answer will be accepted.

**Constraints:**
- `1 <= brackets.length <= 100`
- `1 <= upper_i <= 1000`
- `0 <= percent_i <= 100`
- `0 <= income <= 1000`
- `upper_i` is sorted in ascending order.
- All the values of `upper_i` are **unique**.
- The upper bound of the last tax bracket is greater than or equal to `income`.

## Examples
```
Example 1:
  Input: brackets = [[3,50],[7,10],[12,25]], income = 10
  Output: 2.65000
  Explanation: Based on your income, you have 3 dollars in the 1st tax bracket, 4 dollars in the 2nd tax bracket, and 3 dollars in the 3rd tax bracket.
  The tax rate for the three tax brackets is 50%, 10%, and 25%, respectively.
  In total, you pay $3 * 50% + $4 * 10% + $3 * 25% = $2.65 in taxes.
```

```
Example 2:
  Input: brackets = [[1,0],[4,25],[5,50]], income = 2
  Output: 0.25000
  Explanation: Based on your income, you have 1 dollar in the 1st tax bracket and 1 dollar in the 2nd tax bracket.
  The tax rate for the two tax brackets is 0% and 25%, respectively.
  In total, you pay $1 * 0% + $1 * 25% = $0.25 in taxes.
```

```
Example 3:
  Input: brackets = [[2,50]], income = 0
  Output: 0.00000
  Explanation: You have no income to tax, so you have to pay a total of $0 in taxes.
```

## Approach
The tax can be computed by iterating through the brackets in order, keeping track of the previous upper bound. For each bracket, the taxable amount is the lesser of the remaining income and the bracket's range. Multiply this amount by the bracket's percentage and accumulate.

```text
FUNCTION calculateTax(brackets, income):
    SET tax ← 0.0
    SET prevUpper ← 0
    FOR [upper, percent] IN brackets:
        SET taxable ← MIN(income, upper) - prevUpper
        IF taxable <= 0:
            BREAK
        SET tax ← tax + taxable * percent / 100
        SET prevUpper ← upper
    RETURN tax
```

## Walkthrough
| Step | income left | prevUpper | current bracket | taxable | tax accumulated |
|------|-------------|-----------|----------------|---------|-----------------|
| 1    | 10          | 0         | [3,5]          | 3       | 0.15            |
| 2    | 10          | 3         | [7,10]         | 4       | 0.55            |
| 3    | 10          | 7         | [12,15]        | 0       | 0.55 (break)    |

## Complexity Analysis
- **Time:** O(n) where n is the number of tax brackets.
- **Space:** O(1) extra space.

## Follow-Up Questions
1. How would you handle fractional income values?
2. How to extend the solution for tax deductions that apply after a certain income threshold?
3. Can the brackets be unsorted? How would you preprocess them?

## Key Takeaway
Progressive tax calculation is a simple linear scan where each bracket contributes only the portion of income that falls within its range.
