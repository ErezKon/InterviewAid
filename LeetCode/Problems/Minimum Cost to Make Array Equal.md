# 2448. Minimum Cost to Make Array Equal

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-make-array-equal](https://leetcode.com/problems/minimum-cost-to-make-array-equal)
**Companies:** Amazon, Cisco, Google, Hashedin, Microsoft, Oracle

---

## Key Insight

> **Weighted median minimizes weighted absolute deviations.** Sort by value, accumulate costs, and find the value where cumulative cost ≥ half the total. Generalizes the unweighted median (#462).

---

## Approach: Weighted Median — O(n log n) ✅

```
FUNCTION minCost(nums, cost):
    pairs ← SORT(ZIP(nums, cost))
    totalCost ← SUM(cost)
    cumCost ← 0
    target ← NULL

    FOR (val, c) IN pairs DO
        cumCost ← cumCost + c
        IF cumCost ≥ totalCost / 2 THEN
            target ← val
            BREAK

    RETURN SUM(ABS(num - target) * c FOR num, c IN ZIP(nums, cost))
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Weighted median | **O(n log n)** | **O(n)** |

---

## Key Takeaway

> **Weighted median** — the optimal target value minimizing weighted L1 distance. Sort by value, accumulate weights to find it.

---
