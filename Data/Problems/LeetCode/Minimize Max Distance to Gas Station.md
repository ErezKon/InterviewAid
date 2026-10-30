# 774. Minimize Max Distance to Gas Station

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimize-max-distance-to-gas-station](https://leetcode.com/problems/minimize-max-distance-to-gas-station)
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

You are given an integer array `stations` that represents the positions of the gas stations on the **x-axis**. You are also given an integer `k`.

You should add `k` new gas stations. You can add the stations anywhere on the **x-axis**, and not necessarily on an integer position.

Let `penalty()` be the maximum distance between **adjacent** gas stations after adding the `k` new stations.

Return *the smallest possible value of* `penalty()`. Answers within `10⁻⁶` of the actual answer will be accepted.

**Constraints:**
- `10 ≤ stations.length ≤ 2000`
- `0 ≤ stations[i] ≤ 10⁸`
- `stations` is sorted in a **strictly increasing** order.
- `1 ≤ k ≤ 10⁶`

---

## Examples

```
Example 1:
  Input: stations = [1,2,3,4,5,6,7,8,9,10], k = 9
  Output: 0.50000
  Explanation: Adding one station in the middle of each of the 9 unit gaps yields a maximum distance of 0.5.
```

```
Example 2:
  Input: stations = [23,24,36,39,46,56,57,65,84,98], k = 1
  Output: 14.00000
  Explanation: The largest gap is 84 - 65 = 19; splitting it leaves the gap 98 - 84 = 14 as the maximum.
```

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