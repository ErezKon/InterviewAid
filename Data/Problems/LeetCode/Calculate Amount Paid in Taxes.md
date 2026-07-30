# 2303. Calculate Amount Paid in Taxes

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculate-amount-paid-in-taxes](https://leetcode.com/problems/calculate-amount-paid-in-taxes)
**Companies:** Bloomberg, Interactive Brokers, Meta, Oracle, Snowflake, Stripe

---

## Problem Description
Given a list of tax brackets `[[upper1, percent1], [upper2, percent2], ...]` where each `upper` is the upper income bound for that bracket and `percent` is the tax rate for income within the bracket, and an integer `income`, compute the total tax paid. Income is taxed progressively: the portion of income that falls within each bracket is taxed at that bracket's rate.

## Examples
**Example 1:**
```
brackets = [[3,5],[7,10],[12,15]], income = 10
Output: 1.05
Explanation: Tax = (3*5%)+(4*10%) = 0.15+0.40 = 0.55
```
**Example 2:**
```
brackets = [[2,10],[5,20]], income = 1
Output: 0.10
Explanation: Only the first bracket applies to the $1 income.
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
