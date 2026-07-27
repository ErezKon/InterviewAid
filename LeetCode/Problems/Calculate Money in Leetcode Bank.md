# 1716. Calculate Money in Leetcode Bank

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculate-money-in-leetcode-bank](https://leetcode.com/problems/calculate-money-in-leetcode-bank)
**Companies:** Amazon, Google, Meta, Microsoft

---

```
FUNCTION totalMoney(n):
    weeks = n / 7; days = n % 7
    // Each full week: 28 + 7*(week-1)
    total = weeks * 28 + 7 * weeks * (weeks - 1) / 2
    // Remaining days
    total += days * (weeks + 1) + days * (days - 1) / 2
    RETURN total
```
