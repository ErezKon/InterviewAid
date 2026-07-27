# 1801. Number of Orders in the Backlog

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-orders-in-the-backlog](https://leetcode.com/problems/number-of-orders-in-the-backlog)
**Companies:** Citadel, Google, Jane Street, Robinhood

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Two Heaps — O(n log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Process buy and sell orders. A buy order matches the cheapest sell ≤ its price. A sell order matches the highest buy ≥ its price. Return total remaining orders in backlog.

---

## 2. Key Insight

> Use a max-heap for buy orders and a min-heap for sell orders. Match greedily when a new order arrives.

---

## 3. Approach: Two Heaps — O(n log n) ✅

```
FUNCTION getNumberOfBacklogOrders(orders):
    MOD = 10^9 + 7
    buyHeap = MaxHeap()    // (-price, amount)
    sellHeap = MinHeap()   // (price, amount)

    FOR [price, amount, type] IN orders:
        IF type == 0:    // buy
            WHILE amount > 0 AND sellHeap AND sellHeap[0][0] <= price:
                // Match with cheapest sell
                ...
            IF amount > 0: buyHeap.PUSH((-price, amount))
        ELSE:    // sell
            WHILE amount > 0 AND buyHeap AND -buyHeap[0][0] >= price:
                // Match with highest buy
                ...
            IF amount > 0: sellHeap.PUSH((price, amount))

    RETURN SUM(all remaining amounts) % MOD
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Order book simulation with two heaps.** Max-heap for buys, min-heap for sells. Match greedily on arrival. Classic exchange matching engine pattern.
