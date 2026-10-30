# 218. The Skyline Problem

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/the-skyline-problem](https://leetcode.com/problems/the-skyline-problem)
**Companies:** Amazon, Apple, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Nvidia, Siemens, Tiktok, Twitter, Uber, Yelp, Zomato

---

## Problem Description
A city's **skyline** is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Given the locations and heights of all the buildings, return *the **skyline** formed by these buildings collectively*.

The geometric information of each building is given in the array `buildings` where `buildings[i] = [left_i, right_i, height_i]`:

- `left_i` is the x coordinate of the left edge of the `i`-th building.
- `right_i` is the x coordinate of the right edge of the `i`-th building.
- `height_i` is the height of the `i`-th building.

You may assume all buildings are perfect rectangles grounded on an absolutely flat surface at height `0`.

The **skyline** should be represented as a list of "key points" **sorted by their x-coordinate** in the form `[[x1,y1],[x2,y2],...]`. Each key point is the left endpoint of some horizontal segment in the skyline except the last point in the list, which always has a y-coordinate `0` and is used to mark the skyline's termination where the rightmost building ends. Any ground between the leftmost and rightmost buildings should be part of the skyline's contour.

**Note:** There must be no consecutive horizontal lines of equal height in the output skyline. For instance, `[...,[2 3],[4 5],[7 5],[11 5],[12 7],...]` is not acceptable; the three lines of height 5 should be merged into one in the final output as such: `[...,[2 3],[4 5],[12 7],...]`

**Constraints:**
- `1 <= buildings.length <= 10^4`
- `0 <= left_i < right_i <= 2^31 - 1`
- `1 <= height_i <= 2^31 - 1`
- `buildings` is sorted by `left_i` in non-decreasing order.

## Examples
```
Example 1:
  Input: buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
  Output: [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
  Explanation:
  Figure A shows the buildings of the input.
  Figure B shows the skyline formed by those buildings. The red points in figure B represent the key
  points in the output list.
```
```
Example 2:
  Input: buildings = [[0,2,3],[2,5,3]]
  Output: [[0,3],[5,0]]
```

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
