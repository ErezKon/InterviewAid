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

## Examples

**Example 1:**

Input: `segments = [[1,4,5],[4,7,7],[1,7,9]]`

Output: `[[1,4,14],[4,7,16]]`

*Explanation:* The first two segments overlap on `[1,4]` producing color `5+9=14`; on `[4,7]` the overlapping colors sum to `7+9=16`.

**Example 2:**

Input: `segments = [[0,2,3],[2,5,4]]`

Output: `[[0,2,3],[2,5,4]]`

*Explanation:* No overlap, so each segment retains its original color.

---

## Walkthrough

1. **Collect Events** – For each segment `[l, r, c]`, add `c` at `l` and subtract `c` at `r` in a map.
2. **Sort Points** – Sort all unique event positions.
3. **Sweep** – Iterate through sorted points, maintaining a running `curr` color sum.
4. **Emit Segments** – Between consecutive points, if `curr > 0`, output `[point[i], point[i+1], curr]`.
5. **Result** – The emitted list is the non‑overlapping painting description.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log n) for sorting events |
| **Space** | O(n) |

---

## Key Takeaway

> **Sweep line with difference array: add color at start, subtract at end. Sort event points, accumulate, and emit segments between consecutive points with non-zero color.**