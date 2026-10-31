# 1620. Coordinate With Maximum Network Quality

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/coordinate-with-maximum-network-quality](https://leetcode.com/problems/coordinate-with-maximum-network-quality)
**Companies:** Lyft, Peak6

---

## Problem Description
You are given an array of network towers `towers`, where `towers[i] = [xi, yi, qi]` denotes the `i`-th network tower with location `(xi, yi)` and quality factor `qi`. All the coordinates are **integral coordinates** on the X-Y plane, and the distance between the two coordinates is the **Euclidean distance**.

You are also given an integer `radius` where a tower is **reachable** if the distance is **less than or equal to** `radius`. Outside that distance, the signal becomes garbled, and the tower is **not reachable**.

The signal quality of the `i`-th tower at a coordinate `(x, y)` is calculated with the formula `⌊qi / (1 + d)⌋`, where `d` is the distance between the tower and the coordinate. The **network quality** at a coordinate is the sum of the signal qualities from all the **reachable** towers.

Return *the array* `[cx, cy]` *representing the **integral** coordinate* `(cx, cy)` *where the **network quality** is maximum. If there are multiple coordinates with the same **network quality**, return the lexicographically minimum **non-negative** coordinate.*

**Note:**

- A coordinate `(x1, y1)` is lexicographically smaller than `(x2, y2)` if either:
  - `x1 < x2`, or
  - `x1 == x2` and `y1 < y2`.
- `⌊val⌋` is the greatest integer less than or equal to `val` (the floor function).

**Constraints:**
- `1 <= towers.length <= 50`
- `towers[i].length == 3`
- `0 <= xi, yi, qi <= 50`
- `1 <= radius <= 50`

## Examples
```
Example 1:
  Input: towers = [[1,2,5],[2,1,7],[3,1,9]], radius = 2
  Output: [2,1]
  Explanation: At coordinate (2, 1) the total quality is 13.
    - Quality of 7 from (2, 1) results in ⌊7 / (1 + sqrt(0)⌋ = ⌊7⌋ = 7
    - Quality of 5 from (1, 2) results in ⌊5 / (1 + sqrt(2)⌋ = ⌊2.07⌋ = 2
    - Quality of 9 from (3, 1) results in ⌊9 / (1 + sqrt(1)⌋ = ⌊4.5⌋ = 4
    No other coordinate has a higher network quality.
```
```
Example 2:
  Input: towers = [[23,11,21]], radius = 9
  Output: [23,11]
  Explanation: Since there is only one tower, the network quality is highest right at the tower's location.
```
```
Example 3:
  Input: towers = [[1,2,13],[2,1,7],[0,1,9]], radius = 2
  Output: [1,2]
  Explanation: Coordinate (1, 2) has the highest network quality.
```

## Approach
Brute-force every integer coordinate in the feasible range `[0, 50]` for both `x` and `y`. For each point, sum the quality contributions of towers whose distance is within `radius`. Track the maximum quality and the corresponding coordinate.

```text
FUNCTION BestCoordinate(towers, radius):
    SET maxQuality ← 0
    SET bestX ← 0, bestY ← 0
    FOR x ← 0 TO 50:
        FOR y ← 0 TO 50:
            SET quality ← 0
            FOR EACH [xi, yi, qi] IN towers:
                SET dx ← x - xi
                SET dy ← y - yi
                SET distance ← SQRT(dx*dx + dy*dy)
                IF distance ≤ radius:
                    SET contribution ← FLOOR(qi / (1 + distance))
                    SET quality ← quality + contribution
            IF quality > maxQuality OR (quality == maxQuality AND (x < bestX OR (x == bestX AND y < bestY))):
                SET maxQuality ← quality
                SET bestX ← x
                SET bestY ← y
    RETURN [bestX, bestY]
```

## Walkthrough
Consider `towers = [[1,2,5],[2,1,7]]` and `radius = 2`.
| (x,y) | Dist to (1,2) | Dist to (2,1) | Quality Sum |
|-------|---------------|---------------|-------------|
| (2,1) | 1.0 → ⌊5/(1+1)⌋=2 | 0.0 → ⌊7/(1+0)⌋=7 | **9** (max) |
| (1,2) | 0.0 → 5 | 1.0 → ⌊7/2⌋=3 | 8 |
The algorithm evaluates all points and picks `(2,1)`.

## Complexity Analysis
- **Time:** O(51 × 51 × T) where `T` is the number of towers (worst-case ≈ 2601 × T). Acceptable because constraints limit coordinates to 0-50.
- **Space:** O(1) extra space besides input storage.

## Follow-Up Questions
- How would you handle a larger coordinate range (e.g., up to 10⁴) efficiently?
- Can the solution be adapted to return the top-k coordinates instead of just the best?
- What if the signal quality function changes to a non-linear decay?

## Key Takeaway
When the search space is small and bounded, a straightforward brute-force scan with direct computation of contributions can be both simple and fast enough.
