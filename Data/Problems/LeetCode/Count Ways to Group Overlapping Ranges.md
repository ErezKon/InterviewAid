# 2580. Count Ways to Group Overlapping Ranges

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-ways-to-group-overlapping-ranges](https://leetcode.com/problems/count-ways-to-group-overlapping-ranges)
**Companies:** Ibm, Oracle

---

## Problem Description

You are given a 2D integer array `ranges` where `ranges[i] = [start_i, end_i]` denotes that all integers between `start_i` and `end_i` (both **inclusive**) are contained in the `i`-th range.

You are to split `ranges` into **two** (possibly empty) groups such that:

- Each range belongs to exactly one group.
- Any two **overlapping** ranges must belong to the **same** group.

Two ranges are said to be **overlapping** if there exists at least **one** integer that is present in both ranges.

- For example, `[1, 3]` and `[2, 5]` are overlapping because `2` and `3` occur in both ranges.

Return *the **total number** of ways to split* `ranges` *into two groups*. Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= ranges.length <= 10^5`
- `ranges[i].length == 2`
- `0 <= start_i <= end_i <= 10^9`

---

## Examples

```
Example 1:
  Input: ranges = [[6,10],[5,15]]
  Output: 2
  Explanation: The two ranges are overlapping, so they must be in the same group.
  Thus, there are two possible ways:
  - Put both the ranges together in group 1.
  - Put both the ranges together in group 2.
```

```
Example 2:
  Input: ranges = [[1,3],[10,20],[2,5],[4,8]]
  Output: 4
  Explanation: Ranges [1,3], and [2,5] are overlapping. So, they must be in the same group.
  Again, ranges [2,5] and [4,8] are also overlapping. So, they must also be in the same group.
  Thus, there are four possible ways to group them:
  - All the ranges in group 1.
  - All the ranges in group 2.
  - Ranges [1,3], [2,5], and [4,8] in group 1 and [10,20] in group 2.
  - Ranges [1,3], [2,5], and [4,8] in group 2 and [10,20] in group 1.
```

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