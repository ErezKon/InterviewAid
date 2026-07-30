# 2655. Find Maximal Uncovered Ranges

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-maximal-uncovered-ranges](https://leetcode.com/problems/find-maximal-uncovered-ranges)
**Companies:** Meta

---

## Problem Description
You are given a list of **covered** intervals `covered` (each interval is a pair `[l, r]` with `l ≤ r`) that are sorted and non‑overlapping, and a **global** interval `[L, R]`. Return the list of **maximal uncovered** intervals inside `[L, R]` – i.e., the longest continuous segments that are not covered by any interval in `covered`.

## Examples
**Example 1**
```
Input: L = 0, R = 10, covered = [[2,4],[7,8]]
Output: [[0,1],[5,6],[9,10]]
Explanation: The gaps between the covered intervals are the uncovered ranges.
```
**Example 2**
```
Input: L = 5, R = 5, covered = []
Output: [[5,5]]
Explanation: With no covered intervals, the whole point is uncovered.
```

## Approach
Iterate through the sorted `covered` intervals while keeping track of the start of the next uncovered segment (`prevEnd`). For each interval, if there is a gap between `prevEnd` and the current interval's start, record it. After processing all intervals, handle the trailing gap up to `R`.

### Pseudocode
```text
FUNCTION maximalUncovered(L, R, covered):
    SET result ← []
    SET prevEnd ← L - 1
    FOR each interval IN covered:
        SET start ← interval[0]
        SET end   ← interval[1]
        IF start > prevEnd + 1:
            APPEND [prevEnd + 1, start - 1] TO result
        SET prevEnd ← MAX(prevEnd, end)
    IF prevEnd < R:
        APPEND [prevEnd + 1, R] TO result
    RETURN result
```

## Walkthrough
`L=0, R=10, covered=[[2,4],[7,8]]`
| step | interval | prevEnd (before) | gap added? | result |
|------|----------|------------------|-----------|--------|
| init | – | -1 | – | [] |
| 1 | [2,4] | -1 | gap [0,1] | [[0,1]] |
|    | update prevEnd = 4 |
| 2 | [7,8] | 4 | gap [5,6] | [[0,1],[5,6]] |
|    | update prevEnd = 8 |
| after loop | – | 8 | trailing gap [9,10] | [[0,1],[5,6],[9,10]] |

## Complexity Analysis
- **Time:** O(n) where *n* is the number of covered intervals.
- **Space:** O(k) for the output list, where *k* is the number of uncovered ranges.

## Follow‑Up Questions
1. How would you handle overlapping intervals in the input?
2. Can the algorithm be adapted to work with a stream of intervals?
3. What changes are needed if the intervals are not sorted?

## Key Takeaway
A single linear scan of sorted intervals, tracking the end of the last covered segment, yields all maximal gaps efficiently.
