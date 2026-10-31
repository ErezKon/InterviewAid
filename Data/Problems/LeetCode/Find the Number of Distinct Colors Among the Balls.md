# 3160. Find the Number of Distinct Colors Among the Balls

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-number-of-distinct-colors-among-the-balls](https://leetcode.com/problems/find-the-number-of-distinct-colors-among-the-balls)

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

You are given an integer `limit` and a 2D array `queries` of size `n x 2`.

There are `limit + 1` balls with **distinct** labels in the range `[0, limit]`. Initially, all balls are uncolored. For every query in `queries` that is of the form `[x, y]`, you mark ball `x` with the color `y`. After each query, you need to find the number of colors among the balls.

Return an array `result` of length `n`, where `result[i]` denotes the number of colors *after* the `i`-th query.

**Note** that when answering a query, lack of a color *will not* be considered as a color.

**Constraints:**
- `1 <= limit <= 10⁹`
- `1 <= n == queries.length <= 10⁵`
- `queries[i].length == 2`
- `0 <= queries[i][0] <= limit`
- `1 <= queries[i][1] <= 10⁹`

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

```
Example 1:
  Input: limit = 4, queries = [[1,4],[2,5],[1,3],[3,4]]
  Output: [1,2,2,3]
  Explanation:
    - After query 0, ball 1 has color 4.
    - After query 1, ball 1 has color 4, and ball 2 has color 5.
    - After query 2, ball 1 has color 3, and ball 2 has color 5.
    - After query 3, ball 1 has color 3, ball 2 has color 5, and ball 3 has color 4.

Example 2:
  Input: limit = 4, queries = [[0,1],[1,2],[2,2],[3,4],[4,5]]
  Output: [1,2,2,3,4]
  Explanation:
    - After query 0, ball 0 has color 1.
    - After query 1, ball 0 has color 1, and ball 1 has color 2.
    - After query 2, ball 0 has color 1, and balls 1 and 2 have color 2.
    - After query 3, ball 0 has color 1, balls 1 and 2 have color 2, and ball 3 has color 4.
    - After query 4, ball 0 has color 1, balls 1 and 2 have color 2, ball 3 has color 4, and
      ball 4 has color 5.
```

---

## 5. Walkthrough

**Example `[(1,2), (2,3), (1,3)]`**

1. Query `(1,2)`: `ballColor={1→2}`, `colorCount={2→1}`, `distinct=1` → output `1`.
2. Query `(2,3)`: add new ball, `colorCount={2→1,3→1}`, `distinct=2` → output `2`.
3. Query `(1,3)`: ball 1 changes from 2 to 3. Decrement `colorCount[2]` to 0 → `distinct` decreases to `1`, then increment `colorCount[3]` to 2 → `distinct` increases back to `2`. Output `2`.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(q) — O(1) per query |
| **Space** | O(q) — maps |

---

## 7. Follow-Up Questions

1. How would you modify the solution to support removal of balls?
2. Can the approach be extended to handle range queries asking for distinct colors in a sub-range of ball IDs?
3. What if the number of possible colors is extremely large—how would you keep memory usage low?

---

## 8. Key Takeaway

> **Two maps** (ball→color, color→count) enable O(1) per operation. Track distinct colors incrementally as counts change.
