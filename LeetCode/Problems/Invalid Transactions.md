# 1169. Invalid Transactions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/invalid-transactions](https://leetcode.com/problems/invalid-transactions)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Oracle, Stripe, Wix

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Group by Name + Pairwise Check — O(n²) ✅](#4-approach-group-by-name--pairwise-check--on²-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

A transaction is invalid if:
- The amount exceeds $1000, **or**
- It occurs within 60 minutes of another transaction with the **same name** but a **different city**.

Given a list of transaction strings `"name,time,amount,city"`, return all invalid transactions.

**Constraints:**
- `transactions.length <= 1000`
- Each transaction: `name,time,amount,city`
- `0 <= time <= 1000`, `0 <= amount <= 2000`

---

## 2. Examples

```
Input: ["alice,20,800,mtv","alice,50,100,beijing"]
Output: ["alice,20,800,mtv","alice,50,100,beijing"]
Explanation: Both invalid — same name, |20-50|=30 ≤ 60, different cities.

Input: ["alice,20,800,mtv","alice,50,1200,mtv"]
Output: ["alice,50,1200,mtv"]
Explanation: Second one invalid due to amount > 1000.
```

---

## 3. Key Insight

Two independent invalidation rules. For the city conflict rule, group transactions by name and check all pairs within each group. The constraints are small enough (n ≤ 1000) that O(n²) is acceptable.

---

## 4. Approach: Group by Name + Pairwise Check — O(n²) ✅

```
FUNCTION invalidTransactions(transactions):
    parsed = [(name, time, amount, city, i) for each transaction]
    invalid = set()

    FOR each transaction:
        IF amount > 1000: invalid.ADD(i)
        FOR each other transaction with same name:
            IF ABS(time1 - time2) <= 60 AND city1 != city2:
                invalid.ADD(i1); invalid.ADD(i2)

    RETURN [transactions[i] for i in invalid]
```

---

## 5. Walkthrough

```
transactions = ["alice,20,800,mtv","alice,50,100,beijing"]
```

| Check | Transaction | Condition | Invalid? |
|-------|-------------|-----------|----------|
| Amount | alice,20,800 | 800 ≤ 1000 | No |
| Amount | alice,50,100 | 100 ≤ 1000 | No |
| Pair | (alice,20,mtv) vs (alice,50,beijing) | |20-50|=30 ≤ 60, mtv≠beijing | **Both invalid** |

**Result:** Both transactions returned ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n²) | Pairwise comparison within name groups |
| Space | O(n) | Parsed storage + invalid set |

---

## 7. Follow-Up Questions

### 7.1 Can we optimize to O(n log n)?

Sort by time within each name group, then use a sliding window for the 60-minute check. But n ≤ 1000 makes O(n²) sufficient.

### 7.2 What if transactions are streaming?

Maintain a sliding window per name. New transactions check against the window of recent transactions.

---

## 8. Key Takeaway

> Parse, group by name, then brute-force check pairs. The problem is more about careful implementation (handling both invalidation rules, marking both transactions in a pair) than algorithmic complexity.
