# 2034. Stock Price Fluctuation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/stock-price-fluctuation](https://leetcode.com/problems/stock-price-fluctuation)
**Companies:** Amazon, Atlassian, Google, Meta, Mongodb

---

## Problem Description
Design a class `StockPrice` that records stock prices at timestamps and supports queries for the latest price, as well as the historical maximum and minimum prices. The class must handle updates where a timestamp may receive a new price, overwriting the previous one.

Constraints typically include up to `10^5` calls and timestamps/price values within `0` to `10^9`.

## Examples
**Example 1**
```
StockPrice sp = new StockPrice();
sp.update(1, 10); // price at timestamp 1 is 10
sp.update(2, 5);
sp.current();   // returns 5
sp.maximum();   // returns 10
sp.update(1, 3); // timestamp 1 price updated to 3
sp.maximum();   // returns 5
```

**Example 2**
```
sp.update(5, 7);
sp.minimum();   // returns 3 (assuming previous updates)
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
