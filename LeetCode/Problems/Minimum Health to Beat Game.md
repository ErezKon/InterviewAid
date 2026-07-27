# 2214. Minimum Health to Beat Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-health-to-beat-game](https://leetcode.com/problems/minimum-health-to-beat-game)
**Companies:** Amazon

---

## Problem Description

Given an array `damage` where `damage[i]` is the damage taken at level `i`, and an integer `armor` that can block damage from **one** level (reducing it to `max(0, damage[i] - armor)`), return the **minimum starting health** to survive all levels. Health must always stay > 0.

## Key Insight

> Total damage = `sum(damage)`. The armor is best used on the level with the **maximum damage**. Savings = `min(armor, max(damage))`. Minimum health = `sum - savings + 1`.

## Approach: Greedy — O(n) ✅

```
FUNCTION minimumHealth(damage, armor):
    total ← SUM(damage)
    savings ← MIN(armor, MAX(damage))
    RETURN total - savings + 1
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Key Takeaway

> Use the one-time shield on the highest damage level — simple greedy since the shield's value is maximized on the largest single hit.
