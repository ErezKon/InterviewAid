# 3822. Design Order Management System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-order-management-system](https://leetcode.com/problems/design-order-management-system)
**Companies:** Optiver

---

## Problem Description

> *Note: the Approach below implements a price-matching engine for an older invented description. The official API only needs bookkeeping: `orders[orderId] = (type, price)` plus `byKey[(type, price)] = set of orderIds`; `addOrder`/`modifyOrder`/`cancelOrder` move ids between sets in O(1), and `getOrdersAtPrice` returns the set for `(type, price)`.*

> *Note: premium problem — statement verified via doocs/leetcode.*

You are asked to design a simple order management system for a trading platform.

Each order is associated with an `orderId`, an `orderType` (`"buy"` or `"sell"`), and a `price`.

An order is considered **active** unless it is canceled.

Implement the `OrderManagementSystem` class:

- `OrderManagementSystem()`: Initializes the order management system.
- `void addOrder(int orderId, string orderType, int price)`: Adds a new **active** order with the given attributes. It is **guaranteed** that `orderId` is unique.
- `void modifyOrder(int orderId, int newPrice)`: Modifies the **price** of an existing order. It is **guaranteed** that the order exists and is *active*.
- `void cancelOrder(int orderId)`: Cancels an existing order. It is **guaranteed** that the order exists and is *active*.
- `vector<int> getOrdersAtPrice(string orderType, int price)`: Returns the `orderId`s of all **active** orders that match the given `orderType` and `price`. If no such orders exist, return an empty list.

**Note:** The order of returned `orderId`s does not matter.

**Constraints:**
- `1 <= orderId <= 2000`
- `orderId` is **unique** across all orders.
- `orderType` is either `"buy"` or `"sell"`.
- `1 <= price <= 10^9`
- The total number of calls to `addOrder`, `modifyOrder`, `cancelOrder`, and `getOrdersAtPrice` does not exceed 2000.
- For `modifyOrder` and `cancelOrder`, the specified `orderId` is **guaranteed** to exist and be *active*.

---

## Examples

**Example 1:**
```
Input: ["OrderManagementSystem", "addOrder", "addOrder", "addOrder", "getOrdersAtPrice", "modifyOrder", "modifyOrder", "getOrdersAtPrice", "cancelOrder", "cancelOrder", "getOrdersAtPrice"]
[[], [1, "buy", 1], [2, "buy", 1], [3, "sell", 2], ["buy", 1], [1, 3], [2, 1], ["buy", 1], [3], [2], ["buy", 1]]
Output: [null, null, null, null, [2, 1], null, null, [2], null, null, []]
Explanation:
OrderManagementSystem orderManagementSystem = new OrderManagementSystem();
orderManagementSystem.addOrder(1, "buy", 1); // A buy order with ID 1 is added at price 1.
orderManagementSystem.addOrder(2, "buy", 1); // A buy order with ID 2 is added at price 1.
orderManagementSystem.addOrder(3, "sell", 2); // A sell order with ID 3 is added at price 2.
orderManagementSystem.getOrdersAtPrice("buy", 1); // Both buy orders (IDs 1 and 2) are active at price 1, so the result is [2, 1].
orderManagementSystem.modifyOrder(1, 3); // Order 1 is updated: its price becomes 3.
orderManagementSystem.modifyOrder(2, 1); // Order 2 is updated, but its price remains 1.
orderManagementSystem.getOrdersAtPrice("buy", 1); // Only order 2 is still an active buy order at price 1, so the result is [2].
orderManagementSystem.cancelOrder(3); // The sell order with ID 3 is canceled and removed from active orders.
orderManagementSystem.cancelOrder(2); // The buy order with ID 2 is canceled and removed from active orders.
orderManagementSystem.getOrdersAtPrice("buy", 1); // There are no active buy orders left at price 1, so the result is [].
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