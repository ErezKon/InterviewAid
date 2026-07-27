# 2335. Minimum Amount of Time to Fill Cups

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-amount-of-time-to-fill-cups](https://leetcode.com/problems/minimum-amount-of-time-to-fill-cups)
**Companies:** Google

---

## Key Insight

> Each second you can fill 1 or 2 cups of different types. The answer is `max(maxAmount, ⌈totalAmount / 2⌉)` — bounded by the largest single type and by the total divided among 2-at-a-time fills.

---

## Approach: Math — O(1) ✅

```
FUNCTION fillCups(amount):
    RETURN MAX(MAX(amount), CEIL(SUM(amount) / 2))
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Math formula | **O(1)** | **O(1)** |

---

## Key Takeaway

> **Two bottlenecks** — the answer is the max of: (1) the largest single type, and (2) the ceiling of total/2. Whichever is larger determines the minimum time.

---
