# 2028. Find Missing Observations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-missing-observations](https://leetcode.com/problems/find-missing-observations)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION missingRolls(rolls, mean, n):
    total = mean * (len(rolls) + n) - SUM(rolls)
    IF total < n OR total > 6 * n: RETURN []
    base, extra = divmod(total, n)
    RETURN [base + 1] * extra + [base] * (n - extra)
```
