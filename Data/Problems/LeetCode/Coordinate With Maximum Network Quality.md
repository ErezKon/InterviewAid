# 1620. Coordinate With Maximum Network Quality

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/coordinate-with-maximum-network-quality](https://leetcode.com/problems/coordinate-with-maximum-network-quality)
**Companies:** Lyft, Peak6

---

## Problem Description
Given a list of network towers `towers`, where each tower is represented as `[xi, yi, qi]` (its coordinates and signal quality), and an integer `radius`, return the integer coordinate `[x, y]` that yields the maximum total network quality. The quality contributed by a tower to a coordinate is `⌊ qi / (1 + d) ⌋` where `d` is the Euclidean distance between the tower and the coordinate, and only towers with `d ≤ radius` contribute. If multiple coordinates have the same quality, return the lexicographically smallest one.

## Examples
- Input: `towers = [[1,2,5],[2,1,7]], radius = 2` → Output: `[2,1]`
- Input: `towers = [[0,0,1]], radius = 0` → Output: `[0,0]`
These illustrate evaluating every integer point within the bounded grid and selecting the best.

## Approach
Brute‑force every integer coordinate in the feasible range `[0, 50]` for both `x` and `y`. For each point, sum the quality contributions of towers whose distance is within `radius`. Track the maximum quality and the corresponding coordinate.

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
- **Time:** O(51 × 51 × T) where `T` is the number of towers (worst‑case ≈ 2601 × T). Acceptable because constraints limit coordinates to 0‑50.
- **Space:** O(1) extra space besides input storage.

## Follow-Up Questions
- How would you handle a larger coordinate range (e.g., up to 10⁴) efficiently?
- Can the solution be adapted to return the top‑k coordinates instead of just the best?
- What if the signal quality function changes to a non‑linear decay?

## Key Takeaway
When the search space is small and bounded, a straightforward brute‑force scan with direct computation of contributions can be both simple and fast enough.
