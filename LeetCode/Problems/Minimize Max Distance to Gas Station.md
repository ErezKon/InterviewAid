# 774. Minimize Max Distance to Gas Station

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Google
---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given existing gas stations at positions along a highway and `k` new stations to add, minimize the **maximum distance** between any two adjacent stations.

**Constraints:**
- `2 ≤ stations.length ≤ 10⁵`
- `0 ≤ k ≤ 10⁸`

---

## Examples

**Example 1:**
```
stations = [0, 10, 20, 30, 40, 50]
k = 1
```
Placing a new station at position `25` reduces the largest gap from `10` to `5`.

**Example 2:**
```
stations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
k = 9
```
Adding one station in each unit interval yields a maximum distance of `0.5`.

---

## Key Insight

> **Binary search on the answer.** For a candidate max distance `d`, check if we can achieve it with ≤ `k` stations. For each gap, we need `⌊gap/d⌋` new stations to subdivide it to at most `d`.

---

## Approach

```text
FUNCTION minmaxGasDist(stations, k):
    // stations are sorted
    lo ← 0
    hi ← stations[-1] - stations[0]
    WHILE hi - lo > 1e-6 DO
        mid ← (lo + hi) / 2
        count ← 0
        FOR i ← 0 TO LEN(stations) - 2 DO
            gap ← stations[i+1] - stations[i]
            count ← count + FLOOR(gap / mid)
        IF count ≤ k THEN hi ← mid
        ELSE lo ← mid
    RETURN hi
```

---

## Walkthrough

| Step | mid (candidate) | Required stations | Decision |
|------|-----------------|-------------------|----------|
| 1 | 5.0 | 2 (gaps 10/5) | ≤ k → hi = 5 |
| 2 | 2.5 | 4 | ≤ k → hi = 2.5 |
| 3 | 1.25 | 8 | ≤ k → hi = 1.25 |
| … | … | … | … |

The loop continues until the interval width is below `1e-6`, yielding the minimal possible maximum distance.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary search | **O(n · log(range/ε))** | **O(1)** |

---

## Follow-Up Questions

1. How would the algorithm change if stations could be placed only at integer positions?
2. Can we achieve the same precision with a deterministic integer binary search?
3. What if we needed to minimize the **average** distance instead of the maximum?

---

## Key Takeaway

> **Binary search on answer for min‑max problems** — guess the answer, verify feasibility, and narrow the range. Works whenever feasibility is monotonic (smaller answer → need more resources).

---