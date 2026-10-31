# 2655. Find Maximal Uncovered Ranges

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-maximal-uncovered-ranges](https://leetcode.com/problems/find-maximal-uncovered-ranges)
**Companies:** Meta

---

## Problem Description
> *Note: statement verified against the official problem text (premium; via doocs/leetcode). Old description assumed sorted, non-overlapping ranges — official ranges may overlap and are unsorted (sort first).*

You are given an integer `n` which is the length of a **0-indexed** array `nums`, and a **0-indexed** 2D-array `ranges`, which is a list of sub-ranges of `nums` (sub-ranges may **overlap**).

Each row `ranges[i]` has exactly 2 cells:

- `ranges[i][0]`, which shows the start of the `i`-th range (inclusive)
- `ranges[i][1]`, which shows the end of the `i`-th range (inclusive)

These ranges cover some cells of `nums` and leave some cells uncovered. Your task is to find all of the **uncovered** ranges with **maximal** length.

Return *a 2D-array* `answer` *of the uncovered ranges, **sorted** by the starting point in **ascending order***.

By all of the **uncovered** ranges with **maximal** length, we mean satisfying two conditions:

- Each uncovered cell should belong to **exactly** one sub-range
- There should **not exist** two ranges `(l1, r1)` and `(l2, r2)` such that `r1 + 1 = l2`

**Constraints:**
- `1 <= n <= 10^9`
- `0 <= ranges.length <= 10^6`
- `ranges[i].length = 2`
- `0 <= ranges[i][j] <= n - 1`
- `ranges[i][0] <= ranges[i][1]`

## Examples
```
Example 1:
  Input: n = 10, ranges = [[3,5],[7,8]]
  Output: [[0,2],[6,6],[9,9]]
  Explanation: The ranges (3, 5) and (7, 8) are covered, so if we simplify the array nums to a binary array where 0 shows an uncovered cell and 1 shows a covered cell, the array becomes [0,0,0,1,1,1,0,1,1,0] in which we can observe that the ranges (0, 2), (6, 6) and (9, 9) aren't covered.
```

```
Example 2:
  Input: n = 3, ranges = [[0,2]]
  Output: []
  Explanation: In this example, the whole of the array nums is covered and there are no uncovered cells so the output is an empty array.
```

```
Example 3:
  Input: n = 7, ranges = [[2,4],[0,3]]
  Output: [[5,6]]
  Explanation: The ranges (0, 3) and (2, 4) are covered, so the binary array becomes [1,1,1,1,1,0,0] in which we can observe that the range (5, 6) is uncovered.
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

## Follow-Up Questions
1. How would you handle overlapping intervals in the input?
2. Can the algorithm be adapted to work with a stream of intervals?
3. What changes are needed if the intervals are not sorted?

## Key Takeaway
A single linear scan of sorted intervals, tracking the end of the last covered segment, yields all maximal gaps efficiently.
