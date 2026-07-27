# 3273. Minimum Amount of Damage Dealt to Bob

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-amount-of-damage-dealt-to-bob](https://leetcode.com/problems/minimum-amount-of-damage-dealt-to-bob)
**Companies:** Amazon

---

## Key Insight

> This is a **scheduling problem** — order enemies to minimize total damage taken. Each enemy deals `damage[i]` per turn until killed (takes `⌈health[i] / power⌉` turns). Sort by the ratio `turnsToKill / damage` — kill high-damage-per-turn enemies first (analogous to weighted job scheduling).

---

## Approach: Greedy Sort by damage/time ratio ✅

```
FUNCTION minDamage(power, damage, health):
    n ← LEN(damage)
    turns ← [CEIL(health[i] / power) FOR i IN 0..n-1]
    
    // Sort by turns[i]/damage[i] ascending (kill high damage-rate enemies first)
    order ← SORT indices BY turns[i] / damage[i] ASCENDING
    // Equivalent: sort by turns[i] * damage[j] < turns[j] * damage[i]
    
    totalDamagePerTurn ← SUM(damage)
    result ← 0
    
    FOR i IN order DO
        result ← result + totalDamagePerTurn * turns[i]
        totalDamagePerTurn ← totalDamagePerTurn - damage[i]
    
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy sort | **O(n log n)** | **O(n)** |

---

## Key Takeaway

> **Weighted job scheduling** — sort by `time_to_kill / damage_rate` to minimize total accumulated damage. Classic exchange argument proof.

---
