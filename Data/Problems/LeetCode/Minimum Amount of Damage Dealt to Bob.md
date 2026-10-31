# 3273. Minimum Amount of Damage Dealt to Bob

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-amount-of-damage-dealt-to-bob](https://leetcode.com/problems/minimum-amount-of-damage-dealt-to-bob)
**Companies:** Amazon

---

## Problem Description

You are given an integer `power` and two integer arrays `damage` and `health`, both having length `n`.

Bob has `n` enemies, where enemy `i` will deal Bob `damage[i]` **points** of damage per second while they are *alive* (i.e. `health[i] > 0`).

Every second, **after** the enemies deal damage to Bob, he chooses **one** of the enemies that is still *alive* and deals `power` points of damage to them.

Determine the **minimum** total amount of damage points that will be dealt to Bob before **all** `n` enemies are *dead*.

**Constraints:**
- `1 <= power <= 10^4`
- `1 <= n == damage.length == health.length <= 10^5`
- `1 <= damage[i], health[i] <= 10^4`

---

## Examples

```
Example 1:
  Input: power = 4, damage = [1,2,3,4], health = [4,5,6,8]
  Output: 39
  Explanation:
  - Attack enemy 3 in the first two seconds, after which enemy 3 will go down, the number of damage points dealt to Bob is 10 + 10 = 20 points.
  - Attack enemy 2 in the next two seconds, after which enemy 2 will go down, the number of damage points dealt to Bob is 6 + 6 = 12 points.
  - Attack enemy 0 in the next second, after which enemy 0 will go down, the number of damage points dealt to Bob is 3 points.
  - Attack enemy 1 in the next two seconds, after which enemy 1 will go down, the number of damage points dealt to Bob is 2 + 2 = 4 points.
```

```
Example 2:
  Input: power = 1, damage = [1,1,1,1], health = [1,2,3,4]
  Output: 20
  Explanation:
  - Attack enemy 0 in the first second, after which enemy 0 will go down, the number of damage points dealt to Bob is 4 points.
  - Attack enemy 1 in the next two seconds, after which enemy 1 will go down, the number of damage points dealt to Bob is 3 + 3 = 6 points.
  - Attack enemy 2 in the next three seconds, after which enemy 2 will go down, the number of damage points dealt to Bob is 2 + 2 + 2 = 6 points.
  - Attack enemy 3 in the next four seconds, after which enemy 3 will go down, the number of damage points dealt to Bob is 1 + 1 + 1 + 1 = 4 points.
```

```
Example 3:
  Input: power = 8, damage = [40], health = [59]
  Output: 320
  Explanation: The single enemy needs ceil(59 / 8) = 8 seconds to kill, dealing 40 damage each second: 8 * 40 = 320.
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
2. Ratios: `3/4 = 0.75`, `1/2 = 0.5`, `2/1 = 2.0`. Sorted order → enemy 1, enemy 0, enemy 2.
3. Start with totalDamage = 9.
   - Kill enemy 1: result += 9*1 = 9, totalDamage = 5.
   - Kill enemy 0: result += 5*3 = 15, totalDamage = 1.
   - Kill enemy 2: result += 1*2 = 2.
   - Final result = 26 (example numbers illustrate the process).
---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy sort | O(n log n) | O(n) |
---

## Follow-Up Questions

1. How would the strategy change if enemies could be attacked in parallel by multiple heroes?
2. Can you prove the greedy order is optimal using an exchange argument?
3. What if each enemy’s damage decays over time – how would you adapt the algorithm?
---

## Key Takeaway

> Sorting enemies by the ratio of required turns to their damage rate yields the optimal kill order, minimizing the accumulated damage.
