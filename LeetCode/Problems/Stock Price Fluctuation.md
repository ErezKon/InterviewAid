# 2034. Stock Price Fluctuation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/stock-price-fluctuation](https://leetcode.com/problems/stock-price-fluctuation)
**Companies:** Amazon, Atlassian, Google, Meta, Mongodb

---

## Approach: Hash Map + Two Heaps / SortedList — O(log n) ✅

```
CLASS StockPrice:
    CONSTRUCTOR:
        records = {}    // timestamp → price
        maxTimestamp = 0
        prices = SortedList()

    FUNCTION update(timestamp, price):
        IF timestamp IN records:
            prices.REMOVE(records[timestamp])
        records[timestamp] = price
        prices.ADD(price)
        maxTimestamp = MAX(maxTimestamp, timestamp)

    FUNCTION current():
        RETURN records[maxTimestamp]

    FUNCTION maximum():
        RETURN prices[-1]

    FUNCTION minimum():
        RETURN prices[0]
```
