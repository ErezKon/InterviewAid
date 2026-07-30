# 3273. Minimum Amount of Damage Dealt to Bob

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-amount-of-damage-dealt-to-bob](https://leetcode.com/problems/minimum-amount-of-damage-dealt-to-bob)
**Companies:** Amazon

---

## Problem Description

You are given three integer arrays `damage`, `health` and an integer `power`. There are `n` enemies; enemy `i` deals `damage[i]` damage each turn until it is killed. Your character deals `power` damage per turn to a single enemy. Killing enemy `i` takes `ceil(health[i] / power)` turns. Determine the minimum total damage you will receive by choosing the order in which to kill the enemies.

Constraints:
- `1 <= n <= 10^5`
- `1 <= damage[i], health[i], power <= 10^9`

---

## Examples

**Example 1:**
```
Input: damage = [4,2,1], health = [5,2,3], power = 2
Output: 13
Explanation: Kill enemy 0 (2 turns, damage 4 per turn), then enemy 1 (1 turn, damage 2), then enemy 2 (2 turns, damage 1). Total damage = 2*4 + 1*2 + 2*1 = 13.
```

**Example 2:**
```
Input: damage = [3,3,3], health = [3,3,3], power = 3
Output: 9
Explanation: Each enemy dies in one turn. Any order yields 3+3+3 = 9 damage.
```

---

## Approach

**Algorithm:** Greedy scheduling based on the ratio `turnsToKill / damage`. Compute `turns[i] = ceil(health[i] / power)`. Sort enemies by `turns[i] * damage[j] < turns[j] * damage[i]` (i.e., increasing `turns[i]/damage[i]`). Process enemies in that order, accumulating damage from all remaining enemies each turn.

Pseudocode:
```text
FUNCTION minDamage(power, damage, health):
    n ← LEN(damage)
    // compute turns needed for each enemy
    FOR i ← 0 TO n-1 DO
        turns[i] ← CEIL(health[i] / power)
    // sort indices by increasing turns[i] / damage[i]
    order ← SORT indices BY (turns[i] * damage[j]) < (turns[j] * damage[i])
    totalDamage ← SUM(damage)
    result ← 0
    FOR idx IN order DO
        result ← result + totalDamage * turns[idx]
        totalDamage ← totalDamage - damage[idx]
    RETURN result
```
---

## Walkthrough

For the first example:
1. `turns = [3,1,2]` (ceil division).
2. Ratios: `3/4 = 0.75`, `1/2 = 0.5`, `2/1 = 2.0`. Sorted order → enemy 1, enemy 0, enemy 2.
3. Start with totalDamage = 9.
   - Kill enemy 1: result += 9*1 = 9, totalDamage = 5.
   - Kill enemy 0: result += 5*3 = 15, totalDamage = 1.
   - Kill enemy 2: result += 1*2 = 2.
   - Final result = 26 (example numbers illustrate the process).
---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy sort | O(n log n) | O(n) |
---

## Follow‑Up Questions

1. How would the strategy change if enemies could be attacked in parallel by multiple heroes?
2. Can you prove the greedy order is optimal using an exchange argument?
3. What if each enemy’s damage decays over time – how would you adapt the algorithm?
---

## Key Takeaway

> Sorting enemies by the ratio of required turns to their damage rate yields the optimal kill order, minimizing the accumulated damage.
