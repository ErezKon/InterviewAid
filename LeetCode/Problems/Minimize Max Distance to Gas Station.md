# 774. Minimize Max Distance to Gas Station

**Difficulty:** 🔴 Hard

**Companies:** Amazon, Google
---

## Table of Contents

- [Problem Description](#problem-description)
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

## Key Insight

> **Binary search on the answer.** For a candidate max distance `d`, check if we can achieve it with ≤ `k` stations. For each gap, we need `⌊gap/d⌋` new stations to subdivide it to at most `d`.

---

## Approach: Binary Search on Answer — O(n log(range/ε)) ✅

```
FUNCTION minmaxGasDist(stations, k):
    lo ← 0
    hi ← stations[-1] - stations[0]
    WHILE hi - lo > 1e-6 DO
        mid ← (lo + hi) / 2
        count ← SUM(INT((stations[i+1] - stations[i]) / mid) FOR i)
        IF count ≤ k THEN hi ← mid
        ELSE lo ← mid
    RETURN lo
```

---

## Walkthrough

```
stations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k = 9
Gaps are all 1.0. Already minimal → answer ≈ 0.5 with 9 extra stations.

Binary search narrows: mid=5 → need 1 station per gap → 9 ≤ 9 ✓ → hi=5
Continue narrowing until precision met.
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary search | **O(n · log(range/ε))** | **O(1)** |

---

## Follow-Up Questions

1. **Why binary search on real numbers?** The answer is a continuous value. We use a precision bound (1e-6) instead of integer convergence.
2. **Why ⌊gap/mid⌋ stations per gap?** Dividing a gap of size `g` into segments of at most `d` requires `⌊g/d⌋` new dividers.
3. **Can we use a heap instead?** Yes — greedily split the largest gap. O(k log n), but k can be huge (10⁸).

---

## Key Takeaway

> **Binary search on answer for min-max problems** — guess the answer, verify feasibility, narrow the range. Works whenever feasibility is monotonic (smaller answer → need more resources).

---
