# 2144. Minimum Cost of Buying Candies With Discount

**Difficulty:** 🟢 Easy

**Companies:** Garmin, Meta, Nokia
---

## Key Insight

> Sort descending. Buy the two most expensive, get the third free. Every 3rd candy (0-indexed: positions 2, 5, 8, ...) is free.

---

## Approach: Greedy — O(n log n) ✅

```
FUNCTION minimumCost(cost):
    SORT cost DESCENDING
    RETURN SUM(c FOR i, c IN ENUMERATE(cost) IF i % 3 ≠ 2)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + skip every 3rd | **O(n log n)** | **O(1)** |

---

## Key Takeaway

> **Buy 2, get 1 free** — sort descending so the free candy is always the cheapest in each group of 3.

---
