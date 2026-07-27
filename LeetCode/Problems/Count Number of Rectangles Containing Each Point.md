# 2250. Count Number of Rectangles Containing Each Point

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-number-of-rectangles-containing-each-point](https://leetcode.com/problems/count-number-of-rectangles-containing-each-point)
**Companies:** Amazon, Meta

---

## 1. Problem Description

Given rectangles with bottom-left at origin `(0, 0)` and top-right at `(li, hi)`, and a list of points, for each point return how many rectangles contain it (point on boundary counts).

---

## 2. Key Insight

> Heights are small (≤ 100). Group rectangle lengths by height. For each point `(xj, yj)`, iterate over all heights `h ≥ yj` and binary search for how many rectangle lengths at that height are `≥ xj`.

---

## 3. Approach: Group by Height + Binary Search — O((n + q) × 100 × log n) ✅

```
FUNCTION countRectangles(rectangles, points):
    // Group lengths by height (height ≤ 100)
    byHeight = defaultdict(list)  // height → sorted list of lengths
    FOR l, h IN rectangles:
        byHeight[h].ADD(l)
    FOR h IN byHeight:
        byHeight[h].SORT()
    
    result = []
    FOR xj, yj IN points:
        count = 0
        FOR h FROM yj TO 100:
            IF h IN byHeight:
                // binary search: count lengths >= xj
                idx = bisect_left(byHeight[h], xj)
                count += len(byHeight[h]) - idx
        result.ADD(count)
    RETURN result
```

| Time | Space |
|------|-------|
| O(n log n + q × 100 × log n) | O(n) |

---

## Key Takeaway

> When one dimension is small (height ≤ 100), group by that dimension and binary search on the other. This avoids expensive 2D range queries.
