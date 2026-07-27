# 1393. Capital Gain/Loss

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/capital-gainloss](https://leetcode.com/problems/capital-gainloss)
**Companies:** Meta, Robinhood

---

## 1. Problem Description

**SQL Problem.** Given a `Stocks` table (stock_name, operation ['Buy'/'Sell'], price), compute the capital gain/loss for each stock.

---

## 2. Approach: Conditional Aggregation ✅

```sql
SELECT stock_name,
       SUM(CASE WHEN operation = 'Sell' THEN price ELSE -price END) AS capital_gain_loss
FROM Stocks
GROUP BY stock_name;
```

---

## Key Takeaway

> Treat buys as negative and sells as positive, then SUM by stock. Clean conditional aggregation pattern.
