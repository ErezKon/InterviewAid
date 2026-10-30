# 1515. Best Position for a Service Centre

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/best-position-for-a-service-centre](https://leetcode.com/problems/best-position-for-a-service-centre)
**Companies:** Citadel

---

## Problem Description

A delivery company wants to build a new service center in a new city. The company knows the positions of all the customers in this city on a 2D-Map and wants to build the new center in a position such that **the sum of the euclidean distances to all customers is minimum**.

Given an array `positions` where `positions[i] = [x_i, y_i]` is the position of the `ith` customer on the map, return *the minimum sum of the euclidean distances* to all customers.

In other words, you need to choose the position of the service center `[x_centre, y_centre]` such that the following formula is minimized:
![img](https://assets.leetcode.com/uploads/2020/06/25/q4_edited.jpg)
Answers within `10^-5` of the actual value will be accepted.

**Constraints:**
- `1 <= positions.length <= 50`
- `positions[i].length == 2`
- `0 <= x_i, y_i <= 100`

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

**Example 1:**
```
Input: positions = [[0,1],[1,0],[1,2],[2,1]]
Output: 4.00000
Explanation: As shown, you can see that choosing [x_centre, y_centre] = [1, 1] will make the distance to each customer = 1, the sum of all distances is 4 which is the minimum possible we can achieve.
```

**Example 2:**
```
Input: positions = [[1,1],[3,3]]
Output: 2.82843
Explanation: The minimum possible sum of distances = sqrt(2) + sqrt(2) = 2.82843
```

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
