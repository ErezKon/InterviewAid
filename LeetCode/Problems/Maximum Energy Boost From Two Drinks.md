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

Two drink arrays `energyDrinkA` and `energyDrinkB` of length n. At each hour, drink from one. Switching drinks costs one hour (skip that hour). Maximize total energy.

---

## Key Insight

> Two-state DP: `dpA[i]` = max energy ending at hour i using drink A, `dpB[i]` for drink B. Staying in same drink: `dpA[i] = dpA[i-1] + A[i]`. Switching: `dpA[i] = dpB[i-2] + A[i]` (skip one hour).

---

## Approach: DP — O(n) ✅

```
FUNCTION maxEnergyBoost(A, B):
    n = len(A)
    dpA = dpB = [0] * n
    dpA[0] = A[0]; dpB[0] = B[0]
    IF n > 1:
        dpA[1] = dpA[0] + A[1]; dpB[1] = dpB[0] + B[1]

    FOR i ← 2 TO n - 1:
        dpA[i] = MAX(dpA[i-1], dpB[i-2]) + A[i]
        dpB[i] = MAX(dpB[i-1], dpA[i-2]) + B[i]

    RETURN MAX(dpA[n-1], dpB[n-1])
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(n)** | O(n), optimizable to O(1) |

---

## Key Takeaway

> **Two-drink switching DP: stay = prev same drink, switch = prev-2 other drink (skip penalty).** Classic two-state DP with transition cost.
