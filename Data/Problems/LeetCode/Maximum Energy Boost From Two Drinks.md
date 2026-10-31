# 3259. Maximum Energy Boost From Two Drinks

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-energy-boost-from-two-drinks](https://leetcode.com/problems/maximum-energy-boost-from-two-drinks)
**Companies:** Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: DP — O(n)](#approach-dp--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given two integer arrays `energyDrinkA` and `energyDrinkB` of the same length `n` by a futuristic sports scientist. These arrays represent the energy boosts per hour provided by two different energy drinks, A and B, respectively.

You want to *maximize* your total energy boost by drinking one energy drink *per hour*. However, if you want to switch from consuming one energy drink to the other, you need to wait for *one hour* to cleanse your system (meaning you won't get any energy boost in that hour).

Return the **maximum** total energy boost you can gain in the next `n` hours.

**Note** that you can start consuming *either* of the two energy drinks.

**Constraints:**
- `n == energyDrinkA.length == energyDrinkB.length`
- `3 <= n <= 10^5`
- `1 <= energyDrinkA[i], energyDrinkB[i] <= 10^5`

---

## Key Insight

> Two-state DP: `dpA[i]` = max energy ending at hour i using drink A, `dpB[i]` for drink B. Staying in same drink: `dpA[i] = dpA[i-1] + A[i]`. Switching: `dpA[i] = dpB[i-2] + A[i]` (skip one hour).

---

## Approach: DP — O(n) ✅

```text
FUNCTION maxEnergyBoost(A, B):
    SET n ← LENGTH(A)
    SET dpA ← ARRAY of zeros size n
    SET dpB ← ARRAY of zeros size n
    SET dpA[0] ← A[0]
    SET dpB[0] ← B[0]
    IF n > 1:
        SET dpA[1] ← dpA[0] + A[1]
        SET dpB[1] ← dpB[0] + B[1]
    FOR i ← 2 TO n-1:
        SET stayA ← dpA[i-1] + A[i]
        SET switchA ← dpB[i-2] + A[i]
        SET dpA[i] ← MAX(stayA, switchA)
        SET stayB ← dpB[i-1] + B[i]
        SET switchB ← dpA[i-2] + B[i]
        SET dpB[i] ← MAX(stayB, switchB)
    RETURN MAX(dpA[n-1], dpB[n-1])
```

---

## Examples

**Example 1:**
```
Input: energyDrinkA = [1,3,1], energyDrinkB = [3,1,1]
Output: 5
Explanation: To gain an energy boost of 5, drink only the energy drink A (or only B).
```

**Example 2:**
```
Input: energyDrinkA = [4,1,1], energyDrinkB = [1,1,3]
Output: 7
Explanation: To gain an energy boost of 7:
- Drink the energy drink A for the first hour.
- Switch to the energy drink B and we lose the energy boost of the second hour.
- Gain the energy boost of the drink B in the third hour.
```

---

## Walkthrough

Consider `A = [1,2,3]`, `B = [2,1,4]`.
| i | A[i] | B[i] | dpA[i] | dpB[i] |
|---|------|------|--------|--------|
| 0 | 1    | 2    | 1      | 2      |
| 1 | 2    | 1    | 3 (=1+2) | 3 (=2+1) |
| 2 | 3    | 4    | 7 (=max(3+3, 2+3)) | 8 (=max(3+4, 1+4)) |

The best final energy is `max(dpA[2], dpB[2]) = 8`.

---

## Follow-Up Questions
- How would the solution change if switching drinks incurred a variable penalty instead of a fixed one-hour skip?
- Can the DP be optimized to O(1) space?
- What if there were three drink options instead of two?

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(n)** | O(n) (optimizable to O(1)) |

---

## Key Takeaway

> **Two-drink switching DP:** stay = previous same drink, switch = previous-2 other drink (skip penalty). Classic two-state DP with transition cost.
