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

```text
FUNCTION findRadius(houses, heaters):
    SORT heaters
    radius ← 0
    FOR house IN houses:
        idx ← bisect_left(heaters, house)
        dist ← INF
        IF idx < LENGTH(heaters):
            dist ← MIN(dist, heaters[idx] - house)
        IF idx > 0:
            dist ← MIN(dist, house - heaters[idx - 1])
        radius ← MAX(radius, dist)
    RETURN radius
```

## Examples

| houses | heaters | radius |
|--------|---------|--------|
| [1,2,3] | [2] | 1 |
| [1,5,2,6] | [1,4,8] | 2 |

*Explanation*: For each house, compute distance to nearest heater; the maximum of these distances is the required radius.

## Walkthrough

Take `houses = [1,5,2,6]`, `heaters = [1,4,8]`:
1. Sort heaters → [1,4,8]
2. House 1: nearest heater at 1 → distance 0, radius=0
3. House 5: nearest heater at 4 → distance 1, radius=1
4. House 2: nearest heater at 1 → distance 1, radius stays 1
5. House 6: nearest heater at 8 → distance 2, radius updates to 2
Result radius = 2.

## Complexity Analysis

- **Time:** O((m+n) log n) – sorting heaters and binary searching for each house.
- **Space:** O(1) extra space besides input arrays.

## Follow-Up Questions

- How would you solve this without sorting the heaters?
- Can you extend the solution to 2D coordinates?
- What if heaters have different radii?

---

## Key Takeaway

> Sort heaters and binary search for each house's nearest heater; answer is the maximum of these minimum distances.
