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

```text
FUNCTION minimumHealth(damage, armor):
    total ← SUM(damage)
    maxDamage ← MAX(damage)
    savings ← MIN(armor, maxDamage)
    RETURN total - savings + 1
```

## Examples

| damage | armor | Minimum Health |
|--------|-------|----------------|
| [2,4,6] | 3 | 10 |
| [5,1,3] | 2 | 7 |
| [10,10,10] | 5 | 26 |

*Explanation*: In the first example, total damage = 12, max damage = 6, armor saves 3, so health = 12‑3+1 = 10.

## Walkthrough

1. Compute `total = SUM(damage)`.
2. Find `maxDamage = MAX(damage)`.
3. Compute `savings = MIN(armor, maxDamage)` – armor cannot save more than the highest hit.
4. Return `total - savings + 1` to ensure health stays > 0 throughout.

## Complexity Analysis

- **Time**: O(n) – single pass to compute sum and max.
- **Space**: O(1) – only a few scalar variables.

## Follow-Up Questions

- How would the solution change if armor could be applied to **k** levels instead of one?
- What if each level also provides a health potion that adds health?
- Can you extend the approach to handle damage values that are negative (healing) as well?

## Key Takeaway

> Use the one‑time shield on the highest damage level — simple greedy since the shield's value is maximized on the largest single hit.
