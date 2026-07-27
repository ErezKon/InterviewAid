# 3822. Design Order Management System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-order-management-system](https://leetcode.com/problems/design-order-management-system)
**Companies:** Optiver

---

## Problem Description

Design an order management system supporting placing orders, cancelling orders, and matching buy/sell orders by price priority.

---

## Approach

```
CLASS OrderManagementSystem:
    buyOrders = MaxHeap()       // (-price, timestamp, orderId, qty)
    sellOrders = MinHeap()      // (price, timestamp, orderId, qty)
    orders = {}                 // orderId → order details
    cancelled = SET()

    FUNCTION placeOrder(orderId, side, price, qty):
        orders[orderId] = {side, price, qty}
        IF side == BUY: heappush(buyOrders, (-price, ts, orderId, qty))
        ELSE: heappush(sellOrders, (price, ts, orderId, qty))
        matchOrders()

    FUNCTION cancelOrder(orderId):
        cancelled.ADD(orderId)      // lazy deletion

    FUNCTION matchOrders():
        WHILE buyOrders AND sellOrders:
            skip cancelled entries (lazy cleanup)
            IF bestBuy.price >= bestSell.price:
                execute trade for MIN(qty), update remaining
            ELSE: BREAK
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(log n) place, O(1) cancel, O(k log n) match |
| **Space** | O(n) |

---

## Key Takeaway

> **Order book = two heaps (max-heap for buys, min-heap for sells). Match while best buy ≥ best sell. Use lazy deletion for cancellations to keep cancel O(1).**
