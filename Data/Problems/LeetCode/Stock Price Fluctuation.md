# 2034. Stock Price Fluctuation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/stock-price-fluctuation](https://leetcode.com/problems/stock-price-fluctuation)
**Companies:** Amazon, Atlassian, Google, Meta, Mongodb

---

## Problem Description

You are given a stream of **records** about a particular stock. Each record contains a **timestamp** and the corresponding **price** of the stock at that timestamp.

Unfortunately due to the volatile nature of the stock market, the records do not come in order. Even worse, some records may be incorrect. Another record with the same timestamp may appear later in the stream **correcting** the price of the previous wrong record.

Design an algorithm that:

- **Updates** the price of the stock at a particular timestamp, **correcting** the price from any previous records at the timestamp.
- Finds the **latest price** of the stock based on the current records. The **latest price** is the price at the latest timestamp recorded.
- Finds the **maximum price** the stock has been based on the current records.
- Finds the **minimum price** the stock has been based on the current records.

Implement the `StockPrice` class:

- `StockPrice()` Initializes the object with no price records.
- `void update(int timestamp, int price)` Updates the `price` of the stock at the given `timestamp`.
- `int current()` Returns the **latest price** of the stock.
- `int maximum()` Returns the **maximum price** of the stock.
- `int minimum()` Returns the **minimum price** of the stock.

**Constraints:**
- `1 <= timestamp, price <= 10^9`
- At most `10^5` calls will be made **in total** to `update`, `current`, `maximum`, and `minimum`.
- `current`, `maximum`, and `minimum` will be called **only after** `update` has been called **at least once**.

## Examples

**Example 1:**
```
Input
["StockPrice", "update", "update", "current", "maximum", "update", "maximum", "update", "minimum"]
[[], [1, 10], [2, 5], [], [], [1, 3], [], [4, 2], []]
Output:
[null, null, null, 5, 10, null, 5, null, 2]
Explanation:
StockPrice stockPrice = new StockPrice();
stockPrice.update(1, 10); // Timestamps are [1] with corresponding prices [10].
stockPrice.update(2, 5);  // Timestamps are [1,2] with corresponding prices [10,5].
stockPrice.current();     // return 5, the latest timestamp is 2 with the price being 5.
stockPrice.maximum();     // return 10, the maximum price is 10 at timestamp 1.
stockPrice.update(1, 3);  // The previous timestamp 1 had the wrong price, so it is updated to 3.
                          // Timestamps are [1,2] with corresponding prices [3,5].
stockPrice.maximum();     // return 5, the maximum price is 5 after the correction.
stockPrice.update(4, 2);  // Timestamps are [1,2,4] with corresponding prices [3,5,2].
stockPrice.minimum();     // return 2, the minimum price is 2 at timestamp 4.
```

## Approach
Maintain three data structures:
1. A hash map `records` mapping timestamp → price for O(1) updates.
2. A variable `maxTimestamp` tracking the most recent timestamp for `current()`.
3. A balanced multiset (or two heaps with lazy deletion) `prices` to retrieve global max/min in O(log n).
When updating, if the timestamp existed, remove the old price from `prices` before inserting the new one.

### Pseudocode
```text
CLASS StockPrice:
    CONSTRUCTOR:
        SET records ← empty map
        SET maxTimestamp ← 0
        SET prices ← empty multiset   // supports add, remove, getMin, getMax in O(log n)

    FUNCTION update(timestamp, price):
        IF timestamp IN records:
            SET oldPrice ← records[timestamp]
            CALL prices.REMOVE(oldPrice)
        SET records[timestamp] ← price
        CALL prices.ADD(price)
        SET maxTimestamp ← MAX(maxTimestamp, timestamp)

    FUNCTION current():
        RETURN records[maxTimestamp]

    FUNCTION maximum():
        RETURN prices.GET_MAX()

    FUNCTION minimum():
        RETURN prices.GET_MIN()
```

## Walkthrough
| Step | Action | records (ts→price) | prices (sorted) | maxTimestamp |
|------|--------|--------------------|-----------------|--------------|
| 1 | update(1,10) | {1:10} | [10] | 1 |
| 2 | update(2,5)  | {1:10,2:5} | [5,10] | 2 |
| 3 | current() → 5 | – | – | – |
| 4 | maximum() → 10 | – | – | – |
| 5 | update(1,3) (replace) | {1:3,2:5} | [3,5] | 2 |
| 6 | maximum() → 5 | – | – | – |
```

## Complexity Analysis
- **Time:** O(log n) per `update`, O(1) for `current`, O(log n) for `maximum`/`minimum` (multiset operations).
- **Space:** O(n) to store all timestamps and prices.

## Follow‑Up Questions
1. How would you implement `prices` using two heaps with lazy deletion instead of a multiset?
2. Can you support `average()` price queries over a time window efficiently?
3. How would the design change if timestamps arrived out of order and you needed to query the price at any given timestamp?

## Key Takeaway
Combining a hash map for direct timestamp updates with a balanced multiset (or two heaps) enables O(log n) retrieval of global max/min while handling overwrites gracefully.
