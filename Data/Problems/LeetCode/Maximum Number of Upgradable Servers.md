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

Given `n` data centers with `count[i]` servers, `upgrade[i]` cost per server, `sell[i]` income per sold server, and a `money[i]` budget, return the **maximum number of servers** that can be upgraded in each data center. You can sell servers to fund upgrades.

**Constraints:**
- `1 <= n <= 10^5`

---

## Examples

**Example 1:**
```
Input:  count=[4], upgrade=[3], sell=[1], money=[2]
Output: [2]
Explanation: Sell 2 servers (earn 2), budget=4. Upgrade 2 servers (cost 6)? Actually floor((money+count*sell)/(upgrade+sell)).
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
