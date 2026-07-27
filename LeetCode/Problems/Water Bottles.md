# 1518. Water Bottles

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/water-bottles](https://leetcode.com/problems/water-bottles)
**Companies:** Accenture, Amazon, Bloomberg, Google, Hilabs, Ibm, Meta, Microsoft, Tcs

---

```
FUNCTION numWaterBottles(numBottles, numExchange):
    total = numBottles
    WHILE numBottles >= numExchange:
        exchanged = numBottles / numExchange
        total += exchanged
        numBottles = exchanged + numBottles % numExchange
    RETURN total
```

Math: `total = numBottles + (numBottles - 1) / (numExchange - 1)`.
