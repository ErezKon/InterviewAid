# 1272. Remove Interval

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-interval](https://leetcode.com/problems/remove-interval)
**Companies:** Google

---

## Problem Description
Given a closed interval `toBeRemoved` and a sorted list of non‑overlapping closed intervals `intervals`, remove the portion of each interval that overlaps with `toBeRemoved`. Return the resulting list of intervals after removal, preserving the original order.

## Examples
**Example 1:**
```
intervals = [[0,2],[3,4],[5,7]]
toBeRemoved = [1,6]
output = [[0,1],[6,7]]
```
**Explanation:** The first interval is trimmed to `[0,1]`; the second interval is completely removed; the third interval is trimmed to `[6,7]`.

**Example 2:**
```
intervals = [[0,5]]
toBeRemoved = [2,3]
output = [[0,2],[3,5]]
```
**Explanation:** The original interval is split into two parts around the removed segment.

## Approach
Iterate through `intervals` and handle each case based on its relation to `toBeRemoved`:
1. If the current interval ends before `toBeRemoved` starts, keep it unchanged.
2. If the current interval starts after `toBeRemoved` ends, keep it unchanged.
3. Otherwise, there is overlap; possibly add the left non‑overlapping part (`[start, toBeRemoved[0]]`) and/or the right non‑overlapping part (`[toBeRemoved[1], end]`).

```text
FUNCTION removeInterval(intervals, toBeRemoved):
    SET result ← []
    SET removeStart ← toBeRemoved[0]
    SET removeEnd ← toBeRemoved[1]
    FOR each interval IN intervals:
        SET start ← interval[0]
        SET end ← interval[1]
        // No overlap, interval completely left of removal
        IF end <= removeStart:
            APPEND interval TO result
        // No overlap, interval completely right of removal
        ELSE IF start >= removeEnd:
            APPEND interval TO result
        // Overlap exists
        ELSE:
            // Left part remains
            IF start < removeStart:
                APPEND [start, removeStart] TO result
            // Right part remains
            IF end > removeEnd:
                APPEND [removeEnd, end] TO result
    RETURN result
```

## Walkthrough
| Step | interval | start | end | Action | Result added |
|------|----------|-------|-----|--------|--------------|
| 1 | [0,2] | 0 | 2 | overlap, left part kept | [0,1] |
| 2 | [3,4] | 3 | 4 | fully inside removal → none |
| 3 | [5,7] | 5 | 7 | overlap, right part kept | [6,7] |

## Complexity Analysis
- **Time:** O(M) where M is the number of intervals.
- **Space:** O(M) for the output list (in‑place modification possible but not required).

## Follow-Up Questions
1. How would you modify the algorithm if `intervals` could overlap initially?
2. Can the solution be performed in‑place without extra storage?
3. How would you handle open intervals (exclusive endpoints) instead of closed intervals?

## Key Takeaway
By classifying each interval relative to the removal range, you can trim or split intervals in a single linear pass.
