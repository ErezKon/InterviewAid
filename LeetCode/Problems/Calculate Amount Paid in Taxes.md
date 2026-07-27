# 2303. Calculate Amount Paid in Taxes

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculate-amount-paid-in-taxes](https://leetcode.com/problems/calculate-amount-paid-in-taxes)
**Companies:** Bloomberg, Interactive Brokers, Meta, Oracle, Snowflake, Stripe

---

```
FUNCTION calculateTax(brackets, income):
    tax = 0.0; prev = 0
    FOR [upper, percent] IN brackets:
        taxable = MIN(income, upper) - prev
        IF taxable <= 0: BREAK
        tax += taxable * percent / 100
        prev = upper
    RETURN tax
```
