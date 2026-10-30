# 1665. Minimum Initial Energy to Finish Tasks

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-initial-energy-to-finish-tasks](https://leetcode.com/problems/minimum-initial-energy-to-finish-tasks)
**Companies:** Akuna Capital, Amazon, Goldman Sachs, Google, Microsoft

---

## Problem Description

You are given an array `tasks` where `tasks[i] = [actual_i, minimum_i]`:

- `actual_i` is the actual amount of energy you **spend to finish** the `i^th` task.
- `minimum_i` is the **minimum** amount of energy you **require to begin** the `i^th` task.

For example, if the task is `[10, 12]` and your current energy is 11, you cannot start this task. However, if your current energy is 13, you can complete this task, and your energy will be 3 after finishing it.

You can finish the tasks in **any order** you like.

Return the **minimum** initial amount of energy you will need to finish all the tasks.

**Constraints:**
- `1 <= tasks.length <= 10^5`
- `1 <= actual_i <= minimum_i <= 10^4`

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
Input: tasks = [[1,2],[2,4],[4,8]]
Output: 8
Explanation: Starting with 8 energy, we finish the tasks in the following order:
    - 3rd task. Now energy = 8 - 4 = 4.
    - 2nd task. Now energy = 4 - 2 = 2.
    - 1st task. Now energy = 2 - 1 = 1.
Notice that even though we have leftover energy, starting with 7 energy does not work because we cannot do the 3rd task.
```

**Example 2:**
```
Input: tasks = [[1,3],[2,4],[10,11],[10,12],[8,9]]
Output: 32
Explanation: Starting with 32 energy, we finish the tasks in the following order:
    - 1st task. Now energy = 32 - 1 = 31.
    - 2nd task. Now energy = 31 - 2 = 29.
    - 3rd task. Now energy = 29 - 10 = 19.
    - 4th task. Now energy = 19 - 10 = 9.
    - 5th task. Now energy = 9 - 8 = 1.
```

**Example 3:**
```
Input: tasks = [[1,7],[2,8],[3,9],[4,10],[5,11],[6,12]]
Output: 27
Explanation: Starting with 27 energy, we finish the tasks in the following order:
    - 5th task. Now energy = 27 - 5 = 22.
    - 2nd task. Now energy = 22 - 2 = 20.
    - 3rd task. Now energy = 20 - 3 = 17.
    - 1st task. Now energy = 17 - 1 = 16.
    - 4th task. Now energy = 16 - 4 = 12.
    - 6th task. Now energy = 12 - 6 = 6.
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
