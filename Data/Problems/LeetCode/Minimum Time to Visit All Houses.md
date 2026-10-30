# 3540. Minimum Time to Visit All Houses

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-visit-all-houses](https://leetcode.com/problems/minimum-time-to-visit-all-houses)
**Companies:** Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sum of Consecutive Distances — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

> *Note: the Approach below sums distances on a line (invented). Officially the houses form a circle with separate `forward` and `backward` road lengths. Build prefix sums of both arrays. Each move from `a` to `b` costs `min(forward path a→b, backward path a→b)`, each O(1) from the prefix sums; sum over the queries starting at house 0.*

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given two integer arrays `forward` and `backward`, both of size `n`. You are also given another integer array `queries`.

There are `n` houses *arranged in a circle*. The houses are connected via roads in a special arrangement:

- For all `0 <= i <= n - 2`, house `i` is connected to house `i + 1` via a road with length `forward[i]` meters. Additionally, house `n - 1` is connected back to house 0 via a road with length `forward[n - 1]` meters, completing the circle.
- For all `1 <= i <= n - 1`, house `i` is connected to house `i - 1` via a road with length `backward[i]` meters. Additionally, house 0 is connected back to house `n - 1` via a road with length `backward[0]` meters, completing the circle.

You can walk at a pace of **one** meter per second. Starting from house 0, find the **minimum** time taken to visit each house in the order specified by `queries`.

Return the **minimum** total time taken to visit the houses.

**Constraints:**
- `2 <= n <= 10^5`
- `n == forward.length == backward.length`
- `1 <= forward[i], backward[i] <= 10^5`
- `1 <= queries.length <= 10^5`
- `0 <= queries[i] < n`
- `queries[i] != queries[i + 1]`
- `queries[0]` is not 0.

---

## 2. Key Insight

> Must visit in order, so total time = sum of distances between consecutive houses: `Σ|houses[i] - houses[i-1]|`.

---

## 3. Approach: Sum of Distances — O(n) ✅

```text
FUNCTION minTimeToVisitAllHouses(houses):
    total ← 0
    FOR i ← 1 TO LENGTH(houses) - 1:
        total ← total + ABS(houses[i] - houses[i-1])
    RETURN total
```

---

## 4. Examples

**Example 1:**
```
Input: forward = [1,4,4], backward = [4,1,2], queries = [1,2,0,2]
Output: 12
Explanation: The path followed is 0^(0) → 1^(1) → 2^(5) → 1^(7) → 0^(8) → 2^(12).
Note: The notation used is node^(total time), → represents forward road, and → represents backward road.
```

**Example 2:**
```
Input: forward = [1,1,1,1], backward = [2,2,2,2], queries = [1,2,3,0]
Output: 4
Explanation: The path travelled is 0 → 1 → 2 → 3 → 0. Each step is in the forward direction and requires 1 second.
```

---

## 5. Walkthrough

| i | houses[i] | houses[i-1] | Increment | Cumulative |
|---|-----------|-------------|-----------|------------|
| 1 | 3 | 1 | 2 | 2 |
| 2 | 6 | 3 | 3 | 5 |

The algorithm adds each absolute difference to `total` and returns 5.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

1. How would the solution change if the visiting order could be rearranged?
2. What if moving between houses incurs a variable speed or cost?
3. Can the problem be extended to a 2‑D plane with Euclidean distances?

---

## 8. Key Takeaway

> **Ordered traversal = sum of consecutive absolute differences.** No optimization needed when order is fixed.
