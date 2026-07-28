# 2580. Count Ways to Group Overlapping Ranges

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-ways-to-group-overlapping-ranges](https://leetcode.com/problems/count-ways-to-group-overlapping-ranges)
**Companies:** Ibm, Oracle

---

## Problem Description

Given a list of integer intervals `ranges`, split them into two groups such that no two overlapping intervals end up in different groups. Return the number of valid groupings modulo `10^9 + 7`.

---

## Examples

| ranges | Output |
|---|---|
| `[[1,3],[2,4],[5,6]]` | `4` |
| `[[1,2],[3,4],[5,6]]` | `8` |

*Explanation*: In the first example, intervals `[1,3]` and `[2,4]` overlap and must stay together, forming one merged segment. The third interval is separate, giving two merged segments → `2^2 = 4` possible groupings.

---

## Approach

```
text
FUNCTION countWays(ranges):
    MOD ← 1_000_000_007
    SORT ranges BY start ASC
    mergedSegments ← 0
    maxEnd ← -∞
    FOR each [start, end] IN ranges:
        IF start > maxEnd:
            mergedSegments ← mergedSegments + 1   // start a new merged segment
        maxEnd ← MAX(maxEnd, end)
    RETURN pow(2, mergedSegments) MOD MOD
```

---

## Walkthrough

Consider `ranges = [[1,3],[2,4],[5,6]]`.
1. After sorting: `[[1,3],[2,4],[5,6]]`.
2. Initialize `mergedSegments = 0`, `maxEnd = -∞`.
3. First interval `[1,3]`: `1 > -∞` → new segment (`mergedSegments = 1`). `maxEnd = 3`.
4. Second interval `[2,4]`: `2 ≤ maxEnd (3)` → overlaps, no new segment. Update `maxEnd = 4`.
5. Third interval `[5,6]`: `5 > maxEnd (4)` → new segment (`mergedSegments = 2`). `maxEnd = 6`.
6. Two merged segments → answer `2^2 = 4`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log n) — sorting the intervals |
| **Space** | O(1) additional space |

---

## Follow-Up Questions

1. How would the solution change if more than two groups were allowed?
2. Can the algorithm be adapted to count groupings when intervals have weights?

---

## Key Takeaway

> **Merge overlapping intervals first; each merged segment can independently choose one of the two groups, yielding `2^(number_of_merged_segments)` possible groupings.**