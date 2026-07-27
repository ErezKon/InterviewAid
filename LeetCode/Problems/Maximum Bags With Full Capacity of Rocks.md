# 2279. Maximum Bags With Full Capacity of Rocks

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-bags-with-full-capacity-of-rocks](https://leetcode.com/problems/maximum-bags-with-full-capacity-of-rocks)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Greedy Sort — O(n log n)](#approach-greedy-sort--on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given arrays `capacity` and `rocks` (current rocks in each bag) and `additionalRocks` to distribute, maximize the number of bags that reach full capacity.

---

## Key Insight

> Compute `remaining[i] = capacity[i] - rocks[i]` for each bag. Sort by remaining capacity. Greedily fill bags with the **smallest remaining** first to maximize the count of full bags.

---

## Approach: Greedy Sort — O(n log n) ✅

```
FUNCTION maximumBags(capacity, rocks, additionalRocks):
    remaining = [capacity[i] - rocks[i] FOR i IN 0..n-1]
    SORT remaining
    count = 0
    FOR r IN remaining:
        IF additionalRocks >= r:
            additionalRocks -= r
            count += 1
        ELSE: BREAK
    RETURN count
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + Greedy | **O(n log n)** | O(n) |

---

## Key Takeaway

> **Fill the easiest-to-complete bags first.** Sort by remaining capacity ascending and greedily allocate rocks.
