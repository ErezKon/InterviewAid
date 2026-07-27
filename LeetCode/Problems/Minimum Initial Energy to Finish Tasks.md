# 1665. Minimum Initial Energy to Finish Tasks

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-initial-energy-to-finish-tasks](https://leetcode.com/problems/minimum-initial-energy-to-finish-tasks)
**Companies:** Akuna Capital, Amazon, Goldman Sachs, Google, Microsoft

---

## Problem Description

Each task requires `minimum[i]` energy to start but only costs `actual[i]` energy. You choose the order. Return the **minimum initial energy** to complete all tasks.

## Key Insight

> Sort by `(minimum - actual)` descending — tasks with the biggest gap between threshold and cost should be done first, when energy is highest.

## Approach: Greedy Sort — O(n log n) ✅

```
FUNCTION minimumEffort(tasks):
    SORT tasks by (minimum[i] - actual[i]) descending
    energy = 0; currEnergy = 0
    FOR [actual, minimum] IN tasks:
        IF currEnergy < minimum:
            energy += minimum - currEnergy
            currEnergy = minimum
        currEnergy -= actual
    RETURN energy
```

| Time | Space |
|------|-------|
| O(n log n) | O(1) |

## Key Takeaway

> When tasks have both a cost and a threshold, sort by the **gap** (threshold - cost) descending — this greedy order minimizes the required initial budget.
