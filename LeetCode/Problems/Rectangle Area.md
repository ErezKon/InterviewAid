# 223. Rectangle Area

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rectangle-area](https://leetcode.com/problems/rectangle-area)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Nvidia, Tesla

---

```
FUNCTION computeArea(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2):
    area1 = (ax2 - ax1) * (ay2 - ay1)
    area2 = (bx2 - bx1) * (by2 - by1)

    overlapX = MAX(0, MIN(ax2, bx2) - MAX(ax1, bx1))
    overlapY = MAX(0, MIN(ay2, by2) - MAX(ay1, by1))

    RETURN area1 + area2 - overlapX * overlapY
```
