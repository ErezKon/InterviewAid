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

```text
FUNCTION minimumEffort(tasks):
    // Sort tasks by descending gap between threshold and cost
    SORT tasks BY (minimum - actual) DESCENDING
    SET totalEnergy ← 0
    SET currentEnergy ← 0
    FOR EACH [actual, minimum] IN tasks:
        IF currentEnergy < minimum:
            // Need to boost initial energy
            SET totalEnergy ← totalEnergy + (minimum - currentEnergy)
            SET currentEnergy ← minimum
        END IF
        SET currentEnergy ← currentEnergy - actual
    END FOR
    RETURN totalEnergy
```

## Examples

**Example 1:**
```
Input: tasks = [[4,5],[2,3],[4,7]]
Output: 6
Explanation:
- Order tasks as [[4,7],[4,5],[2,3]] (sorted by gap).
- Start with 6 energy: 6 ≥ 7? No, boost to 7 (increase by 1) → total 7, then spend 4 → 3.
- Next task needs 5, boost by 2 → total 9, spend 4 → 5.
- Last task needs 3, no boost, spend 2 → 3 remaining.
Minimum initial energy required is 6.
```

**Example 2:**
```
Input: tasks = [[1,3],[2,4],[3,5]]
Output: 5
Explanation: Sorted order is [[3,5],[2,4],[1,3]]. Starting with 5 energy suffices.
```

## Walkthrough

Consider Example 1 with tasks `[[4,5],[2,3],[4,7]]`.
1. Compute gaps: (5-4)=1, (3-2)=1, (7-4)=3. Sort descending → `[[4,7],[4,5],[2,3]]`.
2. Initialise `totalEnergy = 0`, `currentEnergy = 0`.
3. First task `[4,7]`: `currentEnergy < 7`, boost by `7-0 = 7`. `totalEnergy = 7`, `currentEnergy = 7`. After spending `actual=4`, `currentEnergy = 3`.
4. Second task `[4,5]`: `currentEnergy < 5`, boost by `5-3 = 2`. `totalEnergy = 9`, `currentEnergy = 5`. After spending `4`, `currentEnergy = 1`.
5. Third task `[2,3]`: `currentEnergy < 3`, boost by `3-1 = 2`. `totalEnergy = 11`, `currentEnergy = 3`. After spending `2`, `currentEnergy = 1`.
6. The extra energy added beyond the initial requirement is 5, so the minimum initial energy is `6`.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n log n) – sorting the tasks | O(1) – in‑place processing |

## Follow-Up Questions

- How would the solution change if tasks could be performed in parallel?
- What if each task also had a deadline by which it must start?
- Can you adapt the greedy strategy for a variant where `minimum[i]` can be negative?

## Key Takeaway

> When tasks have both a cost and a threshold, sort by the **gap** (threshold - cost) descending — this greedy order minimizes the required initial budget.
