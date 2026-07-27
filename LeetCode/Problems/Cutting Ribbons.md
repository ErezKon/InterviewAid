# 1891. Cutting Ribbons

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/cutting-ribbons](https://leetcode.com/problems/cutting-ribbons)
**Companies:** Google, Meta

---

## Problem Description

Given ribbon lengths, find the maximum length `L` such that you can cut at least `k` ribbons of length `L`.

---

## Key Insight

Binary search on the answer `L`. For each candidate length, count how many ribbons can be obtained: `sum(ribbon // L)`. Feasible if count ≥ k.

---

## Approach

```
FUNCTION maxLength(ribbons, k):
    lo, hi = 1, MAX(ribbons)
    result = 0

    WHILE lo <= hi:
        mid = (lo + hi) / 2
        count = SUM(r // mid FOR r IN ribbons)
        IF count >= k:
            result = mid
            lo = mid + 1
        ELSE:
            hi = mid - 1

    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log(max_ribbon)) |
| **Space** | O(1) |

---

## Key Takeaway

> **"Maximize the minimum" or "maximize a feasible value" → binary search on the answer. Check feasibility in O(n) by counting pieces.**
