# 2383. Minimum Hours of Training to Win a Competition

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-hours-of-training-to-win-a-competition](https://leetcode.com/problems/minimum-hours-of-training-to-win-a-competition)
**Companies:** Amazon

---

## Problem Description

You start with an initial amount of `energy` and `experience`. There are `n` opponents, each with `energy[i]` and `experience[i]`. To defeat opponent `i`, you must have **strictly more** energy and experience than the opponent. After each victory, your energy decreases by `energy[i]` and your experience increases by `experience[i]`. Each training hour increases either your energy **or** your experience by 1. Return the **minimum number of training hours** required to defeat all opponents.

## Examples

**Example 1:**
```
Input: energy = 5, experience = 3, energy[i] = [1,4,3,2], experience[i] = [2,6,3,1]
Output: 8
Explanation:
- Train 2 hours for experience → exp = 5.
- Fight opponent 0 (energy 1, exp 2). Energy=4, exp=7.
- Train 1 hour for energy → energy=5.
- Fight opponent 1 (energy 4, exp 6). Energy=1, exp=13.
- Train 2 hours for energy → energy=3.
- Fight opponent 2 (energy 3, exp 3). Energy=0, exp=16.
- Train 1 hour for energy → energy=1.
- Fight opponent 3 (energy 2, exp 1). Energy=-1 (but last fight, training not needed).
Total training = 8 hours.
```

**Example 2:**
```
Input: energy = 2, experience = 4, energy[i] = [1], experience[i] = [3]
Output: 0
Explanation: Already have enough energy and experience.
```

## Approach: Greedy Simulation — O(n) ✅

First, ensure total energy is enough to survive all fights by training the required amount upfront. Then, simulate each opponent, training just enough experience before each fight if needed.

```text
FUNCTION minNumberOfHours(energy, experience, en, ex):
    hours ← 0
    totalEnergyNeeded ← SUM(en)
    IF energy <= totalEnergyNeeded:
        hours ← hours + (totalEnergyNeeded - energy + 1)
        energy ← totalEnergyNeeded + 1
    curExp ← experience
    FOR i ← 0 TO LENGTH(en)-1:
        IF curExp <= ex[i]:
            needed ← ex[i] - curExp + 1
            hours ← hours + needed
            curExp ← curExp + needed
        curExp ← curExp + ex[i]
    RETURN hours
```

## Walkthrough

| Opponent | Energy before | Experience before | Training needed | Energy after | Experience after |
|----------|---------------|-------------------|-----------------|--------------|------------------|
| 0        | 5             | 3                 | 2 (exp)         | 4            | 7                |
| 1        | 4             | 7                 | 1 (energy)      | 0            | 13               |
| 2        | 0 (train)     | 13                | 2 (energy)      | 0            | 16               |
| 3        | 0 (train)     | 16                | 1 (energy)      | -1           | 17               |

Total training = 8 hours.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Follow-Up Questions

- How would the solution change if training could increase both energy and experience simultaneously?
- What if opponents could be fought in any order? How would you choose the optimal ordering?
- Can you extend the algorithm to handle very large `n` (e.g., 10⁵) with streaming input?

## Key Takeaway

> Energy needs a one‑time bulk boost (total sum), while experience must be increased just‑in‑time before each fight. Greedy simulation yields the minimal training hours.
