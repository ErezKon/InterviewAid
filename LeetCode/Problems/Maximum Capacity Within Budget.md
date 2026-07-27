# 3814. Maximum Capacity Within Budget

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-capacity-within-budget](https://leetcode.com/problems/maximum-capacity-within-budget)
**Companies:** Amazon, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Binary Search or Sliding Window — O(n log n)](#approach-binary-search-or-sliding-window--on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Maximize the capacity (or number of items) you can handle within a given budget. Each item has a cost and capacity contribution.

---

## Key Insight

> If the problem asks "max capacity given budget", binary search on the capacity or use a sliding window / knapsack depending on constraints. Greedy selection by cost-efficiency often works.

---

## Approach: Binary Search or Sliding Window — O(n log n) ✅

```
FUNCTION maxCapacity(items, budget):
    SORT items by cost
    total = 0; capacity = 0
    FOR (cost, cap) IN items:
        IF total + cost <= budget:
            total += cost
            capacity += cap
        ELSE: BREAK
    RETURN capacity
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + Greedy | **O(n log n)** | O(1) |

---

## Key Takeaway

> **Budget-constrained capacity problems: sort by cost, greedily pick cheapest items until budget exhausted.**
