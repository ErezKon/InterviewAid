# 1672. Richest Customer Wealth

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/richest-customer-wealth](https://leetcode.com/problems/richest-customer-wealth)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given an `m × n` grid `accounts` where `accounts[i][j]` is the money customer `i` has in bank `j`, return the **maximum wealth** (sum of all bank accounts for a single customer).

---

## Examples

**Example 1:**
```
accounts = [[1,2,3],[3,2,1]]
```
**Output:** `6`
*Explanation:* Customer 0 has wealth 1+2+3=6, customer 1 has wealth 3+2+1=6, max is 6.

**Example 2:**
```
accounts = [[1,5],[7,3],[3,5]]
```
**Output:** `10`
*Explanation:* Customer 1 has wealth 7+3=10, which is the maximum.

---

## Walkthrough

| Customer | Accounts | Sum |
|----------|----------|-----|
| 0 | [1,5] | 6 |
| 1 | [7,3] | 10 |
| 2 | [3,5] | 8 |

The algorithm iterates each row, computes the sum, and tracks the maximum. After processing all rows, it returns the highest sum (10).

---

## Approach

```
FUNCTION maximumWealth(accounts):
    maxWealth ← 0
    FOR row IN accounts DO
        wealth ← SUM(row)
        IF wealth > maxWealth: maxWealth ← wealth
    RETURN maxWealth
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(m·n) — visit each cell once |
| Space  | O(1) — only a few scalar variables |

---

## Key Takeaway

> Sum each row, keep the maximum — a simple linear scan solves the problem.
