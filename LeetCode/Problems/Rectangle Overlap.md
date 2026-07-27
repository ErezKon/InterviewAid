# 836. Rectangle Overlap

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/rectangle-overlap](https://leetcode.com/problems/rectangle-overlap)
**Companies:** Amazon, Meta, Microsoft, Qualcomm

---

```
FUNCTION isRectangleOverlap(rec1, rec2):
    RETURN rec1[0] < rec2[2] AND rec2[0] < rec1[2] AND rec1[1] < rec2[3] AND rec2[1] < rec1[3]
```

Two rectangles overlap iff they overlap on both x and y axes.
