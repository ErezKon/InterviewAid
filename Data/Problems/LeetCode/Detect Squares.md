# 2013. Detect Squares

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/detect-squares](https://leetcode.com/problems/detect-squares)
**Companies:** Amazon, Google, Meta, Pure Storage

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Hash Map — O(n) per count](#approach-hash-map--on-per-count)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Design a data structure that supports:
- **`add(point)`** — Adds a new point `[x, y]` to the data structure. Duplicate points are allowed.
- **`count(point)`** — Given a query point `[px, py]`, count the number of **axis-aligned squares** that can be formed using this query point as one corner, with the other three corners coming from previously added points.

A square must have sides parallel to the x-axis and y-axis, and have **positive area** (side length > 0).

**Constraints:**
- `point.length == 2`
- `0 <= x, y <= 1000`
- At most `3000` calls to `add` and `count`.

---

## Examples

```
add([3, 10])
add([11, 2])
add([3, 2])
count([11, 10]) → 1
  Explanation: Square corners: (3,2), (3,10), (11,2), (11,10). Side = 8.

count([14, 8]) → 0
  Explanation: No square can be formed with (14,8) as a corner.

add([11, 2])  // duplicate
count([11, 10]) → 2
  Explanation: Two squares now (because (11,2) has count=2, giving 2 ways).
```

---

## Key Insight

> For an axis-aligned square, if you fix one corner `(px, py)` and pick any other point `(x, y)` as the **diagonal** corner, the side length must be `|x - px| == |y - py|`. The other two corners are determined: `(px, y)` and `(x, py)`. Multiply their counts for the number of squares through that diagonal pair.

```
(px, y) ---- (x, y)          ← diagonal corner
  |            |
  |            |
(px, py) --- (x, py)
  ↑ query point
```

---

## Approach: Hash Map — O(n) per count ✅

For each stored point as a diagonal corner, check if the other two corners exist.

```
CLASS DetectSquares:
    CONSTRUCTOR:
        points = Counter()    // (x, y) → count

    FUNCTION add(point):
        points[tuple(point)] += 1

    FUNCTION count(point):
        [px, py] = point
        total = 0

        FOR (x, y), cnt IN points.items():
            IF x == px OR ABS(x - px) != ABS(y - py):
                CONTINUE
            // (px, py) and (x, y) are diagonal corners
            total += cnt * points.get((px, y), 0) * points.get((x, py), 0)

        RETURN total
```

---

## Walkthrough

```
Points added: (3,10), (11,2), (3,2)
Query: count([11, 10])
```

Iterate all stored points as potential diagonal corners of `(11, 10)`:

| Diagonal (x,y) | x≠px? | \|x-px\|=\|y-py\|? | Other corners | Squares |
|-----------------|-------|---------------------|---------------|---------|
| (3, 10)         | ✅ 3≠11 | \|3-11\|=8, \|10-10\|=0 → ✗ | — | skip |
| (11, 2)         | ✗ 11=11 | — | — | skip (same x) |
| (3, 2)          | ✅ 3≠11 | \|3-11\|=8, \|2-10\|=8 → ✅ | (11,2)=1, (3,10)=1 | 1×1×1 = **1** |

Total = **1** ✅

---

## Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| **add** | O(1) | O(n) total for hash map |
| **count** | O(n) | O(1) extra |

Where `n` = number of unique points added.

---

## Follow-Up Questions

**Q1: Why check diagonal corners instead of iterating side lengths?**
> Iterating all stored points as diagonal candidates is O(n) per query. Iterating possible side lengths would also work but requires careful handling of which points exist at each corner.

**Q2: How do duplicates affect the count?**
> Each point has a count. The number of squares using a specific set of 4 corner positions equals the **product** of the counts at each of the 3 non-query corners.

**Q3: Could you optimize `count` to be faster than O(n)?**
> Yes — group points by x-coordinate. For query `(px, py)`, only iterate points with `x != px`. Then for each candidate y-value, check if `|y - py|` matches `|x - px|`. This can reduce the constant factor but worst case is still O(n).

**Q4: What about non-axis-aligned (rotated) squares?**
> Much harder. You'd need to consider all pairs of points as one side and compute the other two corners using rotation. Complexity jumps to O(n²) per query.

---

## Key Takeaway

> **For axis-aligned square detection, fix one corner and enumerate diagonal corners — the other two corners are uniquely determined, making it a hash map lookup problem.**
