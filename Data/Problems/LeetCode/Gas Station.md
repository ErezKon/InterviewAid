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

There are `n` gas stations along a circular route, where the amount of gas at the `i^th` station is `gas[i]`.

You have a car with an unlimited gas tank and it costs `cost[i]` of gas to travel from the `i^th` station to its next `(i + 1)^th` station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays `gas` and `cost`, return *the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return* `-1`. If there exists a solution, it is **guaranteed** to be **unique**.

**Constraints:**
- `n == gas.length == cost.length`
- `1 <= n <= 10^5`
- `0 <= gas[i], cost[i] <= 10^4`
- The input is generated such that the answer is unique.

---

## 2. Examples

**Example 1:**
```
Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
Output: 3
Explanation: Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 4. Your tank = 4 - 1 + 5 = 8
Travel to station 0. Your tank = 8 - 2 + 1 = 7
Travel to station 1. Your tank = 7 - 3 + 2 = 6
Travel to station 2. Your tank = 6 - 4 + 3 = 5
Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
Therefore, return 3 as the starting index.
```

**Example 2:**
```
Input: gas = [2,3,4], cost = [3,4,3]
Output: -1
Explanation: You can't start at station 0 or 1, as there is not enough gas to travel to the next station.
Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 0. Your tank = 4 - 3 + 2 = 3
Travel to station 1. Your tank = 3 - 3 + 3 = 3
You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
Therefore, you can't travel around the circuit once no matter where you start.
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
