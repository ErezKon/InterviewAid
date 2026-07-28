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

## 3. Examples

**Example 1:**
```
Stocks
+------------+----------+-------+
| stock_name | operation| price |
+------------+----------+-------+
| AAPL       | Buy      | 100   |
| AAPL       | Sell     | 150   |
| GOOGL      | Buy      | 200   |
| GOOGL      | Sell     | 180   |
+------------+----------+-------+
```
Result:
```
+------------+-------------------+
| stock_name | capital_gain_loss |
+------------+-------------------+
| AAPL       | 50                |
| GOOGL      | -20               |
+------------+-------------------+
```
Explanation: For each stock, buys are treated as negative cash flow, sells as positive; summing yields net gain/loss.

---

## 4. Walkthrough

1. **Group by `stock_name`.** This creates a bucket for each distinct stock.
2. **Transform each row:** `CASE WHEN operation = 'Sell' THEN price ELSE -price END` converts buys to negative values and sells to positive.
3. **Aggregate:** `SUM` over the transformed values gives the net capital gain (positive) or loss (negative) for that stock.
4. **Return** the `stock_name` and the computed sum.

---

## 5. Complexity Analysis

- **Time:** O(N) – a single pass over the `Stocks` table to compute the aggregation.
- **Space:** O(K) – where K is the number of distinct stocks (for the grouping hash map).

---

## Key Takeaway

> Treat buys as negative and sells as positive, then SUM by stock. Clean conditional aggregation pattern.
