# 2383. Minimum Hours of Training to Win a Competition

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-hours-of-training-to-win-a-competition](https://leetcode.com/problems/minimum-hours-of-training-to-win-a-competition)
**Companies:** Amazon

---

## Problem Description

You are entering a competition, and are given two **positive** integers `initialEnergy` and `initialExperience` denoting your initial energy and initial experience respectively.

You are also given two **0-indexed** integer arrays `energy` and `experience`, both of length `n`.

You will face `n` opponents **in order**. The energy and experience of the `i^th` opponent is denoted by `energy[i]` and `experience[i]` respectively. When you face an opponent, you need to have both **strictly** greater experience and energy to defeat them and move to the next opponent if available.

Defeating the `i^th` opponent **increases** your experience by `experience[i]`, but **decreases** your energy by `energy[i]`.

Before starting the competition, you can train for some number of hours. After each hour of training, you can **either** choose to increase your initial experience by one, or increase your initial energy by one.

Return *the **minimum** number of training hours required to defeat all *`n`* opponents*.

**Constraints:**
- `n == energy.length == experience.length`
- `1 <= n <= 100`
- `1 <= initialEnergy, initialExperience, energy[i], experience[i] <= 100`

## Examples

**Example 1:**
```
Input: initialEnergy = 5, initialExperience = 3, energy = [1,4,3,2], experience = [2,6,3,1]
Output: 8
Explanation: You can increase your energy to 11 after 6 hours of training, and your experience to 5 after 2 hours of training.
You face the opponents in the following order:
- You have more energy and experience than the 0^th opponent so you win.
  Your energy becomes 11 - 1 = 10, and your experience becomes 5 + 2 = 7.
- You have more energy and experience than the 1^st opponent so you win.
  Your energy becomes 10 - 4 = 6, and your experience becomes 7 + 6 = 13.
- You have more energy and experience than the 2^nd opponent so you win.
  Your energy becomes 6 - 3 = 3, and your experience becomes 13 + 3 = 16.
- You have more energy and experience than the 3^rd opponent so you win.
  Your energy becomes 3 - 2 = 1, and your experience becomes 16 + 1 = 17.
You did a total of 6 + 2 = 8 hours of training before the competition, so we return 8.
It can be proven that no smaller answer exists.
```

**Example 2:**
```
Input: initialEnergy = 2, initialExperience = 4, energy = [1], experience = [3]
Output: 0
Explanation: You do not need any additional energy or experience to win the competition, so we return 0.
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
