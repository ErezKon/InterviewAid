# 624. Maximum Distance in Arrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-distance-in-arrays](https://leetcode.com/problems/maximum-distance-in-arrays)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Yahoo

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Track Global Min/Max — O(m)](#approach-track-global-minmax--om-)
- [Complexity Analysis](#complexity-analysis)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `m` sorted arrays, pick one element from two **different** arrays to maximize `|a - b|`.

---

## Key Insight

> Track the global min and max seen so far. For each new array, the best candidate is `max(currentMax - globalMin, globalMax - currentMin)`. Then update global min/max.

---

## Approach: Track Global Min/Max — O(m) ✅

```text
FUNCTION maxDistance(arrays):
    globalMin ← arrays[0][0]
    globalMax ← arrays[0][LEN(arrays[0]) - 1]
    maxDist ← 0

    FOR i ← 1 TO LEN(arrays) - 1:
        currentMin ← arrays[i][0]
        currentMax ← arrays[i][LEN(arrays[i]) - 1]
        maxDist ← MAX(maxDist,
                       ABS(currentMax - globalMin),
                       ABS(globalMax - currentMin))
        globalMin ← MIN(globalMin, currentMin)
        globalMax ← MAX(globalMax, currentMax)

    RETURN maxDist
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Track global extremes | **O(m)** | O(1) |

---

## Examples

| arrays | Output |
|--------|--------|
| `[[1,2,3],[4,5,6],[7,8,9]]` | `8` |
| `[[5,6],[1,2,3,4]]` | `5` |

*Explanation*: In the first example, pick `1` from the first array and `9` from the third array → distance `8`.

---

## Walkthrough

Consider `arrays = [[1,3,5],[2,4],[7,9]]`.

| Step | globalMin | globalMax | currentMin | currentMax | maxDist |
|------|-----------|-----------|------------|------------|---------|
| Init | 1 | 5 | - | - | 0 |
| i=1 | 1 | 5 | 2 | 4 | max(0, |4-1|=3, |5-2|=3) → 3 |
| Update globals | 1 | 5 |
| i=2 | 1 | 5 | 7 | 9 | max(3, |9-1|=8, |5-7|=2) → 8 |
| Update globals | 1 | 9 |
| End → 8 |

---

## Follow-Up Questions

- How would you adapt the solution if the arrays were not sorted?
- Can you return the actual pair of elements achieving the maximum distance?
- What is the complexity if you need to handle a stream of arrays arriving online?

---

## Key Takeaway

> **"Different arrays" constraint: compare each array's endpoints against the running global min/max from previous arrays.** Update globals after comparison to ensure elements come from different arrays.
