# 475. Heaters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/heaters](https://leetcode.com/problems/heaters)
**Companies:** Adobe, Amazon, Anduril, Bloomberg, De Shaw, Google, Ibm, Meta, Microsoft, Phonepe, Tiktok, Zeta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort + Binary Search — O((m+n) log n) ✅](#3-approach-sort--binary-search)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Find the minimum heater radius so that every house is covered by at least one heater.

---

## 2. Key Insight

> For each house, find the nearest heater (binary search). The answer is the max over all houses of their min distance to a heater.

---

## 3. Approach: Sort + Binary Search — O((m+n) log n) ✅

```
FUNCTION findRadius(houses, heaters):
    SORT heaters
    radius = 0

    FOR house IN houses:
        // Binary search for closest heater
        idx = bisect_left(heaters, house)
        dist = infinity
        IF idx < len(heaters):
            dist = MIN(dist, heaters[idx] - house)
        IF idx > 0:
            dist = MIN(dist, house - heaters[idx - 1])
        radius = MAX(radius, dist)

    RETURN radius
```

---

## 4. Key Takeaway

> Sort heaters, binary search for each house's nearest heater. Answer = max of all min-distances.
