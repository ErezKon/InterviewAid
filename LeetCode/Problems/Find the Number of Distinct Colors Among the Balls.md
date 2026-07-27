# 3160. Find the Number of Distinct Colors Among the Balls

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Bloomberg, Google
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Two HashMaps — O(q) ✅](#3-approach-two-hashmaps--oq-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Process queries that assign colors to numbered balls. After each query, report the number of distinct colors among all colored balls.

**Constraints:**
- `1 <= queries <= 10⁵`

---

## 2. Key Insight

> Maintain a `ballColor` map (ball → color) and a `colorCount` map (color → count of balls with that color). When recoloring a ball, decrement the old color count and increment the new. Track distinct colors as the number of colors with count > 0.

---

## 3. Approach: Two HashMaps — O(q) ✅

```
FUNCTION distinctColors(queries):
    ballColor ← {}; colorCount ← {}; distinct ← 0
    result ← []

    FOR (ball, color) IN queries DO
        IF ball IN ballColor THEN
            oldColor ← ballColor[ball]
            colorCount[oldColor] -= 1
            IF colorCount[oldColor] == 0 THEN distinct -= 1
        ballColor[ball] ← color
        IF color NOT IN colorCount OR colorCount[color] == 0 THEN
            distinct += 1
        colorCount[color] += 1
        result.ADD(distinct)

    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(q) — O(1) per query |
| **Space** | O(q) — maps |

---

## 5. Key Takeaway

> **Two maps** (ball→color, color→count) enable O(1) per operation. Track distinct colors incrementally as counts change.
