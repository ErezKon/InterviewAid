# 1515. Best Position for a Service Centre

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/best-position-for-a-service-centre](https://leetcode.com/problems/best-position-for-a-service-centre)
**Companies:** Citadel

---

## 1. Problem Description

Given positions of houses, find the point that minimizes the **sum of Euclidean distances** to all houses (the geometric median). Return the minimum total distance.

**Constraints:**
- `1 ≤ positions.length ≤ 50`

---

## 2. Key Insight

> The geometric median has no closed-form solution (unlike the centroid which minimizes squared distances). Use **Weiszfeld's algorithm** (iterative reweighted least squares) or **gradient descent** to converge.

---

## 3. Approach: Weiszfeld's Algorithm — O(n × iterations) ✅

```
FUNCTION getMinDistSum(positions):
    x, y = centroid(positions)    // start at centroid
    FOR iter ← 0 TO 1000:
        wx, wy, wsum = 0, 0, 0
        FOR px, py IN positions:
            d = distance((x, y), (px, py))
            IF d < 1e-7: CONTINUE
            w = 1.0 / d
            wx += w * px; wy += w * py; wsum += w
        nx, ny = wx / wsum, wy / wsum
        IF distance((x,y), (nx,ny)) < 1e-7: BREAK
        x, y = nx, ny
    RETURN sum(distance((x,y), p) for p in positions)
```

| Time | Space |
|------|-------|
| O(n × iterations) | O(1) |

---

## Key Takeaway

> Geometric median minimization uses Weiszfeld's iterative algorithm. Start at centroid, iteratively move toward the weighted average (weight = 1/distance). Converges quickly for typical inputs.
