# 2383. Minimum Hours of Training to Win a Competition

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-hours-of-training-to-win-a-competition](https://leetcode.com/problems/minimum-hours-of-training-to-win-a-competition)
**Companies:** Amazon

---

## Problem Description

You have initial `energy` and `experience`. For each opponent `i`, you must have **strictly more** energy and experience. After winning, you lose `energy[i]` and gain `experience[i]`. Return the **minimum training hours** needed (each hour adds 1 to either energy or experience).

## Approach: Greedy Simulation — O(n) ✅

```
FUNCTION minNumberOfHours(energy, experience, en, ex):
    hours ← 0
    // Energy: need enough to survive all fights
    totalEnergy ← SUM(en)
    IF energy <= totalEnergy:
        hours += totalEnergy - energy + 1

    // Experience: greedily train before each fight if needed
    curExp ← experience
    FOR i ← 0 TO n-1:
        IF curExp <= ex[i]:
            hours += ex[i] - curExp + 1
            curExp ← ex[i] + 1
        curExp += ex[i]    // gain from winning

    RETURN hours
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Key Takeaway

> Energy is a bulk requirement (total needed). Experience requires per-opponent checks since it grows from wins — simulate greedily.
