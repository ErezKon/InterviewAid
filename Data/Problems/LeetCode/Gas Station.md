# 134. Gas Station

**Difficulty:** 🟡 Medium
**Acceptance:** 46.0%
**LeetCode:** [https://leetcode.com/problems/gas-station](https://leetcode.com/problems/gas-station)
**Companies:** Accolite, Adobe, Amazon, Apple, Bitgo, Bloomberg, C3 Ai, Chubb, Cme Group, Dream11, Flipkart, Freecharge, Goldman Sachs, Google, Infosys, Juspay, Mastercard, Meta, Microsoft, Oracle, Phonepe, Salesforce, Scale Ai, Servicenow, Tiktok, Visa, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Greedy — O(n) ✅](#3-approach-greedy--on-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

There are `n` gas stations along a circular route. Station `i` has `gas[i]` fuel and costs `cost[i]` to travel to station `i+1`.

You start with an empty tank. Return the starting station's index if you can travel around the circuit once clockwise, otherwise return `-1`. If a solution exists, it is **unique**.

---

## 2. Examples

```
Example 1:
  Input:  gas = [1,2,3,4,5], cost = [3,4,5,1,2]
  Output: 3
  Reason: Start at station 3. Tank: 0→4→9→10→7→4→4 ≥ 0 throughout.

Example 2:
  Input:  gas = [2,3,4], cost = [3,4,3]
  Output: -1
  Reason: Total gas (9) < total cost (10).
```

---

## 3. Approach: Greedy — O(n) ✅

### Key Insights

1. If `sum(gas) < sum(cost)`, no solution exists.
2. If total gas ≥ total cost, a solution exists. The starting station is where we reset after the tank goes negative.

```
FUNCTION canCompleteCircuit(gas, cost):
    totalTank = 0
    currentTank = 0
    startStation = 0

    FOR i ← 0 TO n - 1:
        diff = gas[i] - cost[i]
        totalTank += diff
        currentTank += diff

        IF currentTank < 0:
            // Can't start from startStation or any station before i
            startStation = i + 1
            currentTank = 0

    RETURN startStation IF totalTank >= 0 ELSE -1
```

### Why This Works

If we can't reach station `i+1` starting from `start`, then no station between `start` and `i` works either (because the tank at any midpoint would be even lower). So we skip to `i+1`.

---

## 4. Walkthrough

```
gas  = [1, 2, 3, 4, 5]
cost = [3, 4, 5, 1, 2]
diff = [-2,-2,-2, 3, 3]

i=0: currentTank=-2 < 0 → startStation=1, reset
i=1: currentTank=-2 < 0 → startStation=2, reset
i=2: currentTank=-2 < 0 → startStation=3, reset
i=3: currentTank=3
i=4: currentTank=6

totalTank = 0 ≥ 0 → RETURN 3 ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

### 6.1 What if multiple solutions exist?

The problem guarantees uniqueness. But if it didn't, the greedy approach finds the first valid start going left to right.

### 6.2 What if the route is not circular?

Then it's a prefix sum problem. Find the start that maximizes the minimum prefix sum.

### 6.3 What about bidirectional travel?

Much harder — becomes a graph problem. Check if any starting point allows completing the circuit in either direction.

---

## Key Takeaway

> The greedy insight — "if we can't reach station i+1 from start, no station between them works either" — reduces O(n²) brute force to O(n). Combined with the total gas ≥ total cost check, this is a clean one-pass solution.
