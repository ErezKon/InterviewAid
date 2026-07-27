# 1943. Describe the Painting

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/describe-the-painting](https://leetcode.com/problems/describe-the-painting)
**Companies:** Amazon, Google, Spinny

---

## Problem Description

Given overlapping colored segments, split into non-overlapping segments where each has a unique mixed color (sum of overlapping colors).

---

## Approach

```
FUNCTION splitPainting(segments):
    events = defaultdict(int)
    FOR [l, r, c] IN segments:
        events[l] += c; events[r] -= c
    result = []; curr = 0
    points = sorted(events.keys())
    FOR i ← 0 TO len(points) - 2:
        curr += events[points[i]]
        IF curr > 0: result.ADD([points[i], points[i+1], curr])
    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log n) for sorting events |
| **Space** | O(n) |

---

## Key Takeaway

> **Sweep line with difference array: add color at start, subtract at end. Sort event points, accumulate, and emit segments between consecutive points with non-zero color.**
