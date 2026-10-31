# 1272. Remove Interval

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-interval](https://leetcode.com/problems/remove-interval)
**Companies:** Google

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

A set of real numbers can be represented as the union of several disjoint intervals, where each interval is in the form `[a, b)`. A real number `x` is in the set if one of its intervals `[a, b)` contains `x` (i.e. `a <= x < b`).

You are given a **sorted** list of disjoint intervals `intervals` representing a set of real numbers as described above, where `intervals[i] = [a_i, b_i]` represents the interval `[a_i, b_i)`. You are also given another interval `toBeRemoved`.

Return *the set of real numbers with the interval *`toBeRemoved`* **removed** from** *`intervals`*. In other words, return the set of real numbers such that every *`x`* in the set is in *`intervals`* but **not** in *`toBeRemoved`*. Your answer should be a **sorted** list of disjoint intervals as described above.*

**Constraints:**
- `1 <= intervals.length <= 10^4`
- `-10^9 <= a_i < b_i <= 10^9`

## Examples

**Example 1:**
```
Input: intervals = [[0,2],[3,4],[5,7]], toBeRemoved = [1,6]
Output: [[0,1],[6,7]]
```

**Example 2:**
```
Input: intervals = [[0,5]], toBeRemoved = [2,3]
Output: [[0,2],[3,5]]
```

**Example 3:**
```
Input: intervals = [[-5,-4],[-3,-2],[1,2],[3,5],[8,9]], toBeRemoved = [-1,4]
Output: [[-5,-4],[-3,-2],[4,5],[8,9]]
```

## Approach
Iterate through `intervals` and handle each case based on its relation to `toBeRemoved`:
1. If the current interval ends before `toBeRemoved` starts, keep it unchanged.
2. If the current interval starts after `toBeRemoved` ends, keep it unchanged.
3. Otherwise, there is overlap; possibly add the left non-overlapping part (`[start, toBeRemoved[0]]`) and/or the right non-overlapping part (`[toBeRemoved[1], end]`).

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
- **Space:** O(M) for the output list (in-place modification possible but not required).

## Follow-Up Questions
1. How would you modify the algorithm if `intervals` could overlap initially?
2. Can the solution be performed in-place without extra storage?
3. How would you handle open intervals (exclusive endpoints) instead of closed intervals?

## Key Takeaway
By classifying each interval relative to the removal range, you can trim or split intervals in a single linear pass.
