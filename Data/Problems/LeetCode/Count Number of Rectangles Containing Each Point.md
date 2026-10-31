# 2250. Count Number of Rectangles Containing Each Point

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-number-of-rectangles-containing-each-point](https://leetcode.com/problems/count-number-of-rectangles-containing-each-point)
**Companies:** Amazon, Meta

---

## 1. Problem Description

You are given a 2D integer array `rectangles` where `rectangles[i] = [l_i, h_i]` indicates that `i^th` rectangle has a length of `l_i` and a height of `h_i`. You are also given a 2D integer array `points` where `points[j] = [x_j, y_j]` is a point with coordinates `(x_j, y_j)`.

The `i^th` rectangle has its **bottom-left corner** point at the coordinates `(0, 0)` and its **top-right corner** point at `(l_i, h_i)`.

Return* an integer array *`count`* of length *`points.length`* where *`count[j]`* is the number of rectangles that **contain** the *`j^th`* point.*

The `i^th` rectangle **contains** the `j^th` point if `0 <= x_j <= l_i` and `0 <= y_j <= h_i`. Note that points that lie on the **edges** of a rectangle are also considered to be contained by that rectangle.

**Constraints:**
- `1 <= rectangles.length, points.length <= 5 * 10^4`
- `rectangles[i].length == points[j].length == 2`
- `1 <= l_i, x_j <= 10^9`
- `1 <= h_i, y_j <= 100`
- All the `rectangles` are **unique**.
- All the `points` are **unique**.

---

## 2. Key Insight

> Heights are small (≤ 100). Group rectangle lengths by height. For each point `(xj, yj)`, iterate over all heights `h ≥ yj` and binary search for how many rectangle lengths at that height are `≥ xj`.

---

## 3. Approach: Group by Height + Binary Search — O((n + q) × 100 × log n) ✅

```text
FUNCTION countRectangles(rectangles, points):
    // Group lengths by height (height ≤ 100)
    byHeight ← MAP from height TO LIST of lengths
    FOR each (l, h) IN rectangles DO:
        byHeight[h].APPEND(l)
    FOR each height IN byHeight DO:
        byHeight[height].SORT()
    
    result ← []
    FOR each (x, y) IN points DO:
        count ← 0
        FOR h FROM y TO 100 DO:
            IF h IN byHeight THEN:
                // binary search: first length >= x
                idx ← LOWER_BOUND(byHeight[h], x)
                count ← count + (LENGTH(byHeight[h]) - idx)
        result.APPEND(count)
    RETURN result
```

| Time | Space |
|------|-------|
| O(n log n + q × 100 × log n) | O(n) |

---

## 4. Examples

**Example 1:**
```
Input: rectangles = [[1,2],[2,3],[2,5]], points = [[2,1],[1,4]]
Output: [2,1]
Explanation: The first rectangle contains no points.
The second rectangle contains only the point (2, 1).
The third rectangle contains the points (2, 1) and (1, 4).
The number of rectangles that contain the point (2, 1) is 2.
The number of rectangles that contain the point (1, 4) is 1.
Therefore, we return [2, 1].
```

**Example 2:**
```
Input: rectangles = [[1,1],[2,2],[3,3]], points = [[1,3],[1,1]]
Output: [1,3]
Explanation: The first rectangle contains only the point (1, 1).
The second rectangle contains only the point (1, 1).
The third rectangle contains the points (1, 3) and (1, 1).
The number of rectangles that contain the point (1, 3) is 1.
The number of rectangles that contain the point (1, 1) is 3.
Therefore, we return [1, 3].
```

---

## 5. Walkthrough

Take rectangles `[(2,3), (3,4)]` and points `[(1,1), (2,2)]`.

1. Group lengths: height 3 → `[2]`, height 4 → `[3]`.
2. For point `(1,1)`: iterate heights 1-100. Relevant heights are 3 and 4.
   - Height 3 list `[2]`: binary search for `≥1` gives index 0 → add `1`.
   - Height 4 list `[3]`: index 0 → add `1`. Total `2`.
3. For point `(2,2)`: heights ≥2 → 3 and 4.
   - Height 3: search `≥2` → index 0 → add `1`.
   - Height 4: search `≥2` → index 0 → add `1`. Total `2`? Actually rectangle height 3 length 2 includes point `(2,2)` on boundary, height 4 length 3 also includes → count `2`. (Adjust example accordingly.)

---

## 6. Complexity Analysis

- **Time:** O(n log n + q × 100 × log n) – sorting rectangles once, then binary searches per point.
- **Space:** O(n) – storing grouped lengths.

---

## 7. Follow-Up Questions

- How would you adapt the solution if rectangle heights were not bounded?
- Can you answer queries online as points arrive, using a Fenwick tree or segment tree?

---

## Key Takeaway

> When one dimension is small, group by that dimension and binary-search the other. This reduces a 2-D range count to many 1-D searches.
