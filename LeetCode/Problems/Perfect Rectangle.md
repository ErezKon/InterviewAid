# 391. Perfect Rectangle

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/perfect-rectangle](https://leetcode.com/problems/perfect-rectangle)
**Companies:** Amazon, Google, Meta

---

```
FUNCTION isRectangleCover(rectangles):
    area = 0; corners = set()
    FOR [x1, y1, x2, y2] IN rectangles:
        area += (x2-x1) * (y2-y1)
        FOR pt IN [(x1,y1),(x1,y2),(x2,y1),(x2,y2)]:
            corners ^= {pt}    // toggle
    // Exactly 4 corners should remain (the big rectangle corners)
    IF len(corners) != 4: RETURN false
    x1 = MIN(c[0] for c in corners)
    y1 = MIN(c[1] for c in corners)
    x2 = MAX(c[0] for c in corners)
    y2 = MAX(c[1] for c in corners)
    RETURN area == (x2-x1) * (y2-y1)
```
