# 3822. Design Order Management System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-order-management-system](https://leetcode.com/problems/design-order-management-system)
**Companies:** Optiver

---

## Problem Description

Design an order management system that supports placing new orders, cancelling existing orders, and automatically matching buy and sell orders based on price priority. Each order includes an identifier, side (buy or sell), price, and quantity. Matching should prioritize higher buy prices against lower sell prices, respecting FIFO order for equal prices.

---

## Examples

**Example 1:**
```
Input:
  placeOrder(1, BUY, 100, 10)
  placeOrder(2, SELL, 95, 5)
  placeOrder(3, SELL, 98, 7)
  cancelOrder(2)
  placeOrder(4, BUY, 97, 3)
Output:
  Trades executed:
    - Order 1 buys 5 from Order 2 at price 95 (Order 2 fully filled, removed)
    - Order 1 buys 3 from Order 3 at price 98 (partial fill, Order 1 fully filled)
    - Remaining Order 3 has 4 units at price 98
    - Order 4 is added to the buy book (no matching sell)
```

**Example 2:**
```
Input:
  placeOrder(10, SELL, 120, 8)
  placeOrder(11, BUY, 125, 10)
Output:
  Trades executed:
    - Order 11 buys 8 from Order 10 at price 120 (Order 10 fully filled, removed)
    - Order 11 has 2 units remaining in the buy book
```

---

## Approach

```text
CLASS OrderManagementSystem:
    CONSTRUCTOR():
        buyOrders = MaxHeap()   // stores (-price, timestamp, orderId, qty)
        sellOrders = MinHeap()  // stores (price, timestamp, orderId, qty)
        orders = {}             // orderId → {side, price, qty, timestamp}
        cancelled = SET()       // lazy deletion of cancelled orderIds
        timestamp = 0

    FUNCTION placeOrder(orderId, side, price, qty):
        timestamp += 1
        orders[orderId] = {side, price, qty, timestamp}
        IF side == BUY:
            heappush(buyOrders, (-price, timestamp, orderId, qty))
        ELSE:
            heappush(sellOrders, (price, timestamp, orderId, qty))
        matchOrders()

    FUNCTION cancelOrder(orderId):
        cancelled.ADD(orderId)   // actual removal deferred to matchOrders

    FUNCTION matchOrders():
        WHILE buyOrders NOT EMPTY AND sellOrders NOT EMPTY:
            // Clean up any cancelled top entries
            WHILE buyOrders NOT EMPTY AND buyOrders.TOP().orderId IN cancelled:
                heappop(buyOrders)
            WHILE sellOrders NOT EMPTY AND sellOrders.TOP().orderId IN cancelled:
                heappop(sellOrders)
            IF buyOrders EMPTY OR sellOrders EMPTY: BREAK
            bestBuy ← buyOrders.TOP()   // (-price, ts, id, qty)
            bestSell ← sellOrders.TOP() // (price, ts, id, qty)
            IF -bestBuy.price >= bestSell.price:
                tradeQty ← MIN(bestBuy.qty, bestSell.qty)
                // execute trade (record if needed)
                bestBuy.qty -= tradeQty
                bestSell.qty -= tradeQty
                IF bestBuy.qty == 0: heappop(buyOrders)
                IF bestSell.qty == 0: heappop(sellOrders)
            ELSE:
                BREAK
```

---

## Walkthrough

Consider Example 1 step‑by‑step:
1. **placeOrder(1, BUY, 100, 10)** – added to `buyOrders` as `(-100, t1, 1, 10)`.
2. **placeOrder(2, SELL, 95, 5)** – added to `sellOrders` as `(95, t2, 2, 5)`. `matchOrders` sees `100 ≥ 95`, trades 5 units, removes order 2, reduces order 1 quantity to 5.
3. **placeOrder(3, SELL, 98, 7)** – inserted as `(98, t3, 3, 7)`. `matchOrders` matches remaining 5 units of order 1 with 5 of order 3, leaving order 3 with 2 units.
4. **cancelOrder(2)** – order 2 already filled; adding to `cancelled` has no effect.
5. **placeOrder(4, BUY, 97, 3)** – inserted as `(-97, t5, 4, 3)`. No sell order price ≤ 97, so it stays in the buy book.
The heap structures guarantee the highest‑price buy and lowest‑price sell are always examined first, and lazy deletion keeps cancellations O(1).

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(log n) per `placeOrder`/`cancelOrder`; matching each trade costs O(log n) per heap operation |
| **Space** | O(n) for storing all active and cancelled orders |

---

## Follow-Up Questions

1. How would you modify the design to support order types such as market orders or iceberg orders?
2. What changes are needed to provide real‑time market depth (top‑k buy/sell prices) efficiently?
3. How can you persist the order book to survive server restarts while maintaining the same matching semantics?

---

## Key Takeaway

> **Two priority queues (max‑heap for buys, min‑heap for sells) together with lazy deletion enable O(log n) order insertion, cancellation, and price‑priority matching.**