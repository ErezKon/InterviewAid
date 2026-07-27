# 3347. Maximum Frequency of an Element After Performing Operations II

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Bloomberg, Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sweep Line / Difference Array — O(n log n)](#approach-sweep-line--difference-array--on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Same as Operations I but with harder constraints. Each element can be changed by at most ±k. Maximize the frequency of any value. Additionally, at most `numOperations` elements can be changed.

---

## Key Insight

> Each element `x` contributes a range `[x-k, x+k]` of reachable values. Use a **sweep line / difference array** over these ranges. At any target value, the number of elements that can reach it = the sweep line height at that point. Cap by `numOperations` + elements already equal to target.

---

## Approach: Sweep Line / Difference Array — O(n log n) ✅

```
FUNCTION maxFrequency(nums, k, numOperations):
    // Create events: for each num, +1 at num-k, -1 at num+k+1
    events = []
    FOR num IN nums:
        events.ADD((num - k, +1))
        events.ADD((num + k + 1, -1))
    SORT events

    // Also need count of each exact value
    count = Counter(nums)

    // Sweep through events, at each unique target:
    //   reachable = sweep height
    //   already = count[target]
    //   answer candidate = already + min(reachable - already, numOperations)
    // Process at each unique event point and each existing value

    RETURN max candidate
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sweep line | **O(n log n)** | O(n) |

---

## Key Takeaway

> **"Limited operations + ±k range" = sweep line over reachable ranges, capped by operation budget.** The sweep line counts how many elements can reach each target value.
