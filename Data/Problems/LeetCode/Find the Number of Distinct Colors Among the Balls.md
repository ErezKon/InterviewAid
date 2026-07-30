# 3160. Find the Number of Distinct Colors Among the Balls

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Bloomberg, Google
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Two HashMaps — O(q) ✅](#3-approach-two-hashmaps--oq-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

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

```text
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

## 4. Examples

| Queries | Distinct Colors |
|---------|-----------------|
| `[(1,2), (2,3), (1,3)]` | `[1,2,2]` |
| `[(5,1), (5,2), (5,1)]` | `[1,1,1]` |

*Explanation*: In the first sequence, after the third query ball 1 changes from color 2 to 3, so distinct colors become 2.

---

## 5. Walkthrough

**Example `[(1,2), (2,3), (1,3)]`**

1. Query `(1,2)`: `ballColor={1→2}`, `colorCount={2→1}`, `distinct=1` → output `1`.
2. Query `(2,3)`: add new ball, `colorCount={2→1,3→1}`, `distinct=2` → output `2`.
3. Query `(1,3)`: ball 1 changes from 2 to 3. Decrement `colorCount[2]` to 0 → `distinct` decreases to `1`, then increment `colorCount[3]` to 2 → `distinct` increases back to `2`. Output `2`.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(q) — O(1) per query |
| **Space** | O(q) — maps |

---

## 7. Follow-Up Questions

1. How would you modify the solution to support removal of balls?
2. Can the approach be extended to handle range queries asking for distinct colors in a sub‑range of ball IDs?
3. What if the number of possible colors is extremely large—how would you keep memory usage low?

---

## 8. Key Takeaway

> **Two maps** (ball→color, color→count) enable O(1) per operation. Track distinct colors incrementally as counts change.
