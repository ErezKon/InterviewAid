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

Given a list of `orders`, each represented as `[price, amount, type]` where `type` is `0` for a buy order and `1` for a sell order, process the orders sequentially. A buy order can be matched with the cheapest sell order whose price is less than or equal to the buy price, and a sell order can be matched with the highest buy order whose price is greater than or equal to the sell price. Unmatched portions remain in a backlog. Return the total number of orders left in the backlog modulo `10^9 + 7`.

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

| # | Input `orders` | Output |
|---|----------------|--------|
| 1 | `[[10,5,0],[15,2,1],[25,1,1],[30,4,0]]` | `6` |
| 2 | `[[7,1000000000,0],[15,3,1],[5,999999995,0],[5,1,1]]` | `999999984` |

*Example 1*: The first buy order matches with the first sell order partially, leaving 3 buy units and 0 sell units, and so on, resulting in 6 remaining orders.
*Example 2*: Large amounts test the modulo operation.

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
