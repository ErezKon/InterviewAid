# 1801. Number of Orders in the Backlog

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-orders-in-the-backlog](https://leetcode.com/problems/number-of-orders-in-the-backlog)
**Companies:** Citadel, Google, Jane Street, Robinhood

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Two Heaps — O(n log n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given a 2D integer array `orders`, where each `orders[i] = [price_i, amount_i, orderType_i]` denotes that `amount_i`_ orders have been placed of type `orderType_i` at the price `price_i`. The `orderType_i` is:

- `0` if it is a batch of `buy` orders, or
- `1` if it is a batch of `sell` orders.

Note that `orders[i]` represents a batch of `amount_i` independent orders with the same price and order type. All orders represented by `orders[i]` will be placed before all orders represented by `orders[i+1]` for all valid `i`.

There is a **backlog** that consists of orders that have not been executed. The backlog is initially empty. When an order is placed, the following happens:

- If the order is a `buy` order, you look at the `sell` order with the **smallest** price in the backlog. If that `sell` order's price is **smaller than or equal to** the current `buy` order's price, they will match and be executed, and that `sell` order will be removed from the backlog. Else, the `buy` order is added to the backlog.
- Vice versa, if the order is a `sell` order, you look at the `buy` order with the **largest** price in the backlog. If that `buy` order's price is **larger than or equal to** the current `sell` order's price, they will match and be executed, and that `buy` order will be removed from the backlog. Else, the `sell` order is added to the backlog.

Return *the total **amount** of orders in the backlog after placing all the orders from the input*. Since this number can be large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= orders.length <= 10^5`
- `orders[i].length == 3`
- `1 <= price_i, amount_i <= 10^9`
- `orderType_i` is either `0` or `1`.

---

## 2. Key Insight

> Maintain two priority queues: a max‑heap for buy orders (by price) and a min‑heap for sell orders. When a new order arrives, greedily match it against the opposite heap while possible.

---

## 3. Approach: Two Heaps — O(n log n) ✅

```text
FUNCTION getNumberOfBacklogOrders(orders):
    MOD ← 1_000_000_007
    buyHeap ← MaxHeap()    // stores (-price, amount)
    sellHeap ← MinHeap()   // stores (price, amount)

    FOR [price, amount, type] IN orders:
        IF type = 0:    // buy order
            WHILE amount > 0 AND sellHeap NOT EMPTY AND sellHeap.PEEK().price ≤ price:
                sellPrice, sellAmt ← sellHeap.POP()
                IF sellAmt > amount:
                    sellHeap.PUSH((sellPrice, sellAmt - amount))
                    amount ← 0
                ELSE:
                    amount ← amount - sellAmt
            IF amount > 0:
                buyHeap.PUSH((-price, amount))
        ELSE:    // sell order
            WHILE amount > 0 AND buyHeap NOT EMPTY AND -buyHeap.PEEK().price ≥ price:
                buyPriceNeg, buyAmt ← buyHeap.POP()
                IF buyAmt > amount:
                    buyHeap.PUSH((buyPriceNeg, buyAmt - amount))
                    amount ← 0
                ELSE:
                    amount ← amount - buyAmt
            IF amount > 0:
                sellHeap.PUSH((price, amount))

    total ← 0
    FOR (_, amt) IN buyHeap:
        total ← (total + amt) % MOD
    FOR (_, amt) IN sellHeap:
        total ← (total + amt) % MOD
    RETURN total
```

---

## 4. Examples

**Example 1:**
```
Input: orders = [[10,5,0],[15,2,1],[25,1,1],[30,4,0]]
Output: 6
Explanation: Here is what happens with the orders:
- 5 orders of type buy with price 10 are placed. There are no sell orders, so the 5 orders are added to the backlog.
- 2 orders of type sell with price 15 are placed. There are no buy orders with prices larger than or equal to 15, so the 2 orders are added to the backlog.
- 1 order of type sell with price 25 is placed. There are no buy orders with prices larger than or equal to 25 in the backlog, so this order is added to the backlog.
- 4 orders of type buy with price 30 are placed. The first 2 orders are matched with the 2 sell orders of the least price, which is 15 and these 2 sell orders are removed from the backlog. The 3^rd order is matched with the sell order of the least price, which is 25 and this sell order is removed from the backlog. Then, there are no more sell orders in the backlog, so the 4^th order is added to the backlog.
Finally, the backlog has 5 buy orders with price 10, and 1 buy order with price 30. So the total number of orders in the backlog is 6.
```

**Example 2:**
```
Input: orders = [[7,1000000000,1],[15,3,0],[5,999999995,0],[5,1,1]]
Output: 999999984
Explanation: Here is what happens with the orders:
- 10^9 orders of type sell with price 7 are placed. There are no buy orders, so the 10^9 orders are added to the backlog.
- 3 orders of type buy with price 15 are placed. They are matched with the 3 sell orders with the least price which is 7, and those 3 sell orders are removed from the backlog.
- 999999995 orders of type buy with price 5 are placed. The least price of a sell order is 7, so the 999999995 orders are added to the backlog.
- 1 order of type sell with price 5 is placed. It is matched with the buy order of the highest price, which is 5, and that buy order is removed from the backlog.
Finally, the backlog has (1000000000-3) sell orders with price 7, and (999999995-1) buy orders with price 5. So the total number of orders = 1999999991, which is equal to 999999984 % (10^9 + 7).
```

---

## 5. Walkthrough

**Example 1** (`orders = [[10,5,0],[15,2,1],[25,1,1],[30,4,0]]`)

1. Insert buy `(10,5)` into `buyHeap` → `{-10,5}`.
2. Process sell `(15,2)`: top buy price `10` < `15`, no match → push sell `(15,2)`.
3. Process sell `(25,1)`: still no matching buy → push sell `(25,1)`.
4. Process buy `(30,4)`: matches with cheapest sell `(15,2)` → remaining buy `2`.
   - Next cheapest sell `(25,1)` matches → remaining buy `1`.
   - No more sells ≤ `30`, push remaining buy `(30,1)`.
5. Backlog contains: buy `{(-30,1)}` and sells `{(15,0),(25,0)}` → total amount `1 + 0 + 0 = 1`? Actually after matches, sells are empty, only buy of 1 remains plus earlier buy of 5? Wait earlier buy of 5 was partially matched? Actually first buy remained untouched because no sell ≤10. So final backlog: buy `(10,5)` and buy `(30,1)` → total `6`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) |
| **Space** | O(n) |

---

## 7. Follow-Up Questions

1. How would the algorithm change if orders could be cancelled?
2. Can you solve the problem using balanced BSTs instead of heaps?
3. What if the matching rule prioritized earliest orders (FIFO) rather than price?

---

## 8. Key Takeaway

> **Two‑heap order‑book simulation** efficiently matches buy and sell orders greedily, yielding an O(n log n) solution.
