# 1515. Best Position for a Service Centre

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/best-position-for-a-service-centre](https://leetcode.com/problems/best-position-for-a-service-centre)
**Companies:** Citadel

---

## Problem Description

Given positions of houses, find the point that minimizes the **sum of Euclidean distances** to all houses (the geometric median). Return the minimum total distance.

**Constraints:**
- `1 ≤ positions.length ≤ 50`

---

## Key Insight

> The geometric median has no closed-form solution (unlike the centroid which minimizes squared distances). Use **Weiszfeld's algorithm** (iterative reweighted least squares) or **gradient descent** to converge.

---

## Approach: Weiszfeld's Algorithm — O(n × iterations) ✅

```text
FUNCTION getMinDistSum(positions):
    // Start at centroid as initial guess
    SET x, y ← centroid(positions)
    FOR iter ← 0 TO 1000:
        SET wx, wy, wsum ← 0, 0, 0
        FOR each (px, py) IN positions:
            SET d ← distance((x, y), (px, py))
            IF d < 1e-7: CONTINUE
            SET w ← 1.0 / d
            SET wx ← wx + w * px
            SET wy ← wy + w * py
            SET wsum ← wsum + w
        SET nx, ny ← wx / wsum, wy / wsum
        IF distance((x, y), (nx, ny)) < 1e-7:
            BREAK
        SET x, y ← nx, ny
    RETURN sum(distance((x, y), p) for p in positions)
```

---

## Examples

| houses (x, y) | Minimum total distance |
|---------------|------------------------|
| `[(0,0), (2,0), (1,√3)]` | `≈ 3.464` |
| `[(1,1), (4,5), (9,6)]` | `≈ 11.18` |

---

## Walkthrough

Consider positions `[(0,0), (2,0), (1,√3)]`.

| Step | x, y (current) | Computation | New x, y |
|------|----------------|-------------|----------|
| 1 | centroid `(1, √3/3)` | compute weighted averages → `(1, √3/3)` | converged |
| 2 | sum distances from `(1, √3/3)` to each point → `≈ 3.464` |

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n × iterations) – typically < 100 iterations | O(1) |

---

## Follow-Up Questions

1. How would you handle points with duplicate coordinates?
2. Can you achieve higher precision with Newton's method?
3. What changes for Manhattan distance (L1 norm)?

---

## Key Takeaway

> Geometric median minimization uses Weiszfeld's iterative algorithm. Start at centroid, iteratively move toward the weighted average (weight = 1/distance). Converges quickly for typical inputs.
