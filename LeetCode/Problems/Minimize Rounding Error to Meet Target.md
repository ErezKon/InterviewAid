# 1058. Minimize Rounding Error to Meet Target

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-rounding-error-to-meet-target](https://leetcode.com/problems/minimize-rounding-error-to-meet-target)
**Companies:** Airbnb

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of prices as strings with decimals (e.g., `"0.700"`) and a `target` integer, round each price to floor or ceil such that the sum equals `target`. Minimize the total **rounding error** (sum of `|rounded - original|`). Return `-1` if impossible.

---

## Key Insight

> Compute `floorSum` and `ceilSum`. If `target` isn't in `[floorSum, ceilSum]`, return `-1`. Otherwise, we need exactly `target - floorSum` prices rounded up. Greedily round up the ones with the **smallest ceiling cost** (i.e., largest fractional part).

---

## Approach: Greedy — O(n log n) ✅

```
FUNCTION minimizeError(prices, target):
    floorSum ← 0
    costs ← []   // cost of rounding up vs down for each price
    
    FOR p IN prices DO
        val ← FLOAT(p)
        f ← FLOOR(val)
        floorSum ← floorSum + f
        frac ← val - f
        IF frac > 0 THEN
            // cost to ceil = (1-frac), cost to floor = frac
            // extra cost of ceiling vs floor = (1-frac) - frac = 1 - 2*frac
            costs.ADD(frac)   // fractional part
    
    roundUps ← target - floorSum
    IF roundUps < 0 OR roundUps > LEN(costs) THEN RETURN "-1"
    
    SORT costs DESCENDING   // prefer rounding up large fractions (less error)
    error ← 0
    FOR i ← 0 TO LEN(costs) - 1 DO
        IF i < roundUps THEN
            error ← error + (1 - costs[i])   // ceiling cost
        ELSE
            error ← error + costs[i]         // floor cost
    
    RETURN FORMAT(error, 3 decimals)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + greedy | **O(n log n)** | **O(n)** |

---

## Key Takeaway

> **Greedy rounding** — round up the prices with the largest fractional parts first (least error to ceil). The number of ceil rounds needed is fixed by `target - floorSum`.

---
