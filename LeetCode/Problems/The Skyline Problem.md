# 218. The Skyline Problem

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/the-skyline-problem](https://leetcode.com/problems/the-skyline-problem)
**Companies:** Amazon, Apple, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Nvidia, Siemens, Tiktok, Twitter, Uber, Yelp, Zomato

---

## Approach: Line Sweep + Max-Heap — O(n log n) ✅

```
FUNCTION getSkyline(buildings):
    events = []
    FOR [left, right, height] IN buildings:
        events.ADD((left, -height, right))    // start: negative height
        events.ADD((right, 0, 0))             // end

    SORT events by (x, height)
    result = []
    heap = [(0, infinity)]    // (negHeight, endX) — max-heap via neg

    FOR (x, negH, endX) IN events:
        IF negH < 0:    // building start
            heap.PUSH((negH, endX))
        // Remove expired buildings
        WHILE heap.TOP().endX <= x:
            heap.POP()

        maxH = -heap.TOP().negH
        IF NOT result OR result.LAST().height != maxH:
            result.ADD((x, maxH))

    RETURN result
```

Sweep left to right. At each event, update the active building set and check if the max height changed.
