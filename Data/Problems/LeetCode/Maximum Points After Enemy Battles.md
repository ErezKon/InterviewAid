# 3207. Maximum Points After Enemy Battles

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-points-after-enemy-battles](https://leetcode.com/problems/maximum-points-after-enemy-battles)
**Companies:** Rubrik

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `enemyEnergies` and an integer `currentEnergy`, you can:
- **Attack** an enemy if `currentEnergy ≥ enemyEnergies[i]`: gain 1 point, lose `enemyEnergies[i]` energy.
- **Absorb** an enemy (unmarked): gain `enemyEnergies[i]` energy, mark the enemy (can't absorb again), no point gained.

Return the **maximum points**.

**Constraints:**
- `1 <= enemyEnergies.length <= 10^5`
- `1 <= enemyEnergies[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input:  enemyEnergies = [3,2,2], currentEnergy = 2
Output: 3
Explanation: Attack enemy 1 (cost 2, +1 point), absorb enemies 0 and 2 (+5 energy), attack enemy 1 twice more.
```

---

## Key Insight

> **Greedy**: always attack the **weakest** enemy (costs least energy). Absorb all others to maximize energy. You can only start gaining points if `currentEnergy ≥ min(enemyEnergies)`. Points = `(currentEnergy + sum_of_absorbed) / min_enemy`.

---

## Approach

```
FUNCTION maximumPoints(enemyEnergies, currentEnergy)
    minEnemy ← MIN(enemyEnergies)
    IF currentEnergy < minEnemy THEN RETURN 0

    totalEnergy ← currentEnergy + SUM(enemyEnergies) - minEnemy
    // Absorb all except the weakest, then repeatedly attack the weakest
    RETURN totalEnergy / minEnemy
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — find min and sum |
| Space  | **O(1)** — constant |

---

## Key Takeaway

> **Greedy: attack weakest, absorb rest** — minimize attack cost to maximize points. All absorbed energy funds more attacks on the cheapest enemy.
