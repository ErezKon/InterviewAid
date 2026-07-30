# 218. The Skyline Problem

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/the-skyline-problem](https://leetcode.com/problems/the-skyline-problem)
**Companies:** Amazon, Apple, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Nvidia, Siemens, Tiktok, Twitter, Uber, Yelp, Zomato

---

## Problem Description
Given a list of buildings represented as `[left, right, height]`, where `left` and `right` are the x‑coordinates of the building's base and `height` is its vertical size, return the skyline formed by these buildings. The skyline is a list of key points `(x, height)` that uniquely defines the outer contour when viewing the buildings from a distance. Buildings may overlap.

## Examples
**Example 1**
```
Input: buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
Output: [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
```
*Explanation:* The skyline rises to 10 at x=2, peaks at 15 from x=3 to 7, drops to 12 until x=12, then returns to ground before the next building.

**Example 2**
```
Input: buildings = [[0,2,3],[2,5,3]]
Output: [[0,3],[5,0]]
```
*Explanation:* Adjacent buildings of equal height merge into a single segment.

## Approach
We use a **Line Sweep** combined with a **Max‑Heap** to keep track of active building heights.

```text
FUNCTION getSkyline(buildings):
    events = []
    FOR each [left, right, height] IN buildings:
        events.ADD((left, -height, right))   // start event with negative height
        events.ADD((right, 0, 0))            // end event

    SORT events BY (x, height)               // ensures starts before ends at same x
    result = []
    heap = [(0, INF)]                         // (negHeight, endX) – max‑heap via negative height

    FOR each (x, negH, endX) IN events:
        IF negH < 0:                         // building start
            heap.PUSH((negH, endX))
        WHILE heap.TOP().endX <= x:          // remove buildings that ended
            heap.POP()
        currentHeight = -heap.TOP().negH
        IF result IS EMPTY OR result.LAST().height != currentHeight:
            result.ADD((x, currentHeight))

    RETURN result
```
The sweep processes events in order, updating the heap of active heights and emitting a key point whenever the maximum height changes.

## Walkthrough
| Step | x | Event | Heap (negHeight, endX) | Max Height | Skyline so far |
|------|---|-------|-----------------------|------------|----------------|
| 1 | 2 | start (‑10, 9) | [(0,∞), (‑10,9)] | 10 | (2,10) |
| 2 | 3 | start (‑15,7) | [(0,∞), (‑15,7), (‑10,9)] | 15 | (2,10),(3,15) |
| 3 | 7 | end of height 15 | [(0,∞), (‑10,9)] | 10 | (2,10),(3,15),(7,10) |
| … | … | … | … | … | … |

## Complexity Analysis
- **Time:** O(n log n) – sorting events and heap operations for each of the 2n events.
- **Space:** O(n) – heap stores at most n active buildings and the result list.

## Follow‑Up Questions
1. How would you modify the algorithm to return the skyline as a list of line segments instead of key points?
2. Can the solution be adapted to handle buildings with non‑integer coordinates?
3. What if we need to support dynamic insertion and removal of buildings after the initial skyline is computed?

## Key Takeaway
A line sweep with a max‑heap efficiently tracks the highest active building, allowing the skyline to be built in O(n log n) time.
