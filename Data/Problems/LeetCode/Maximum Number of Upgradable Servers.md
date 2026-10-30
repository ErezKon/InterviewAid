# 3155. Maximum Number of Upgradable Servers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-upgradable-servers](https://leetcode.com/problems/maximum-number-of-upgradable-servers)
**Companies:** Snowflake

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You have `n` data centers and need to upgrade their servers.

You are given four arrays `count`, `upgrade`, `sell`, and `money` of length `n`, which show:

- The number of servers
- The cost of upgrading a single server
- The money you get by selling a server
- The money you initially have

for each data center respectively.

Return an array `answer`, where for each data center, the corresponding element in `answer` represents the **maximum** number of servers that can be upgraded.

Note that the money from one data center **cannot** be used for another data center.

**Constraints:**
- `1 <= count.length == upgrade.length == sell.length == money.length <= 10^5`
- `1 <= count[i], upgrade[i], sell[i], money[i] <= 10^5`

---

## Examples

```
Example 1:
  Input: count = [4,3], upgrade = [3,5], sell = [4,2], money = [8,9]
  Output: [3,2]
  Explanation:
    For the first data center, if we sell one server, we'll have 8 + 4 = 12 units of money and we can upgrade the remaining 3 servers.
    For the second data center, if we sell one server, we'll have 9 + 2 = 11 units of money and we can upgrade the remaining 2 servers.
```

```
Example 2:
  Input: count = [1], upgrade = [2], sell = [1], money = [1]
  Output: [0]
```

---

## Key Insight

> For each data center independently: if we upgrade `k` servers and sell `count-k`, we need `k × upgrade ≤ money + (count-k) × sell`. Solving: `k ≤ (money + count × sell) / (upgrade + sell)`. Take `min(count, floor(...))`.

---

## Approach

```
FUNCTION maxUpgradableServers(count, upgrade, sell, money)
    result ← []
    FOR i ← 0 TO n - 1 DO
        maxK ← FLOOR((money[i] + count[i] × sell[i]) / (upgrade[i] + sell[i]))
        result.ADD(MIN(count[i], maxK))
    RETURN result
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — one computation per data center |
| Space  | **O(n)** — result array |

---

## Follow-Up Questions

1. **Why does this formula work?**
   Selling `count-k` servers frees `(count-k)×sell` budget. Total budget for upgrades: `money + (count-k)×sell ≥ k×upgrade`.

2. **What if upgrade cost were variable per server?**
   Would need sorting and greedy — upgrade cheapest first.

---

## Key Takeaway

> **Closed-form per data center** — each center is independent. The max upgradable count follows from a simple inequality: `k = floor((money + count × sell) / (upgrade + sell))`.
