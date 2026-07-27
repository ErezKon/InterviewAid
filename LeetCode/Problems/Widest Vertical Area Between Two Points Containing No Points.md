# 1637. Widest Vertical Area Between Two Points Containing No Points

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/widest-vertical-area-between-two-points-containing-no-points](https://leetcode.com/problems/widest-vertical-area-between-two-points-containing-no-points)
**Companies:** Amazon, General Motors, Google, Microsoft

---

```
FUNCTION maxWidthOfVerticalArea(points):
    xs = sorted(set(p[0] for p in points))
    RETURN MAX(xs[i+1] - xs[i] for i in range(len(xs) - 1))
```
