# 2079. Watering Plants

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/watering-plants](https://leetcode.com/problems/watering-plants)
**Companies:** Amadeus, Google, Kla Tencor

---

## Problem Description

> *Note: the river is at `x = -1` (not at plant 0), so a refill before plant `i` costs `2·i` extra steps on top of the normal 1 step to advance — i.e. `steps += 2·i + 1` when refilling, else `steps += 1`.*

You want to water `n` plants in your garden with a watering can. The plants are arranged in a row and are labeled from `0` to `n - 1` from left to right where the `i`th plant is located at `x = i`. There is a river at `x = -1` that you can refill your watering can at.

Each plant needs a specific amount of water. You will water the plants in the following way:

- Water the plants in order from left to right.
- After watering the current plant, if you do not have enough water to **completely** water the next plant, return to the river to fully refill the watering can.
- You **cannot** refill the watering can early.

You are initially at the river (i.e., `x = -1`). It takes **one step** to move **one unit** on the x-axis.

Given a **0-indexed** integer array `plants` of `n` integers, where `plants[i]` is the amount of water the `i`th plant needs, and an integer `capacity` representing the watering can capacity, return *the **number of steps** needed to water all the plants*.

**Constraints:**
- `n == plants.length`
- `1 <= n <= 1000`
- `1 <= plants[i] <= 10^6`
- `max(plants[i]) <= capacity <= 10^9`

## Examples

**Example 1:**
```
Input: plants = [2,2,3,3], capacity = 5
Output: 14
Explanation: Start at the river with a full watering can:
- Walk to plant 0 (1 step) and water it. Watering can has 3 units of water.
- Walk to plant 1 (1 step) and water it. Watering can has 1 unit of water.
- Since you cannot completely water plant 2, walk back to the river to refill (2 steps).
- Walk to plant 2 (3 steps) and water it. Watering can has 2 units of water.
- Since you cannot completely water plant 3, walk back to the river to refill (3 steps).
- Walk to plant 3 (4 steps) and water it.
Steps needed = 1 + 1 + 2 + 3 + 3 + 4 = 14.
```

**Example 2:**
```
Input: plants = [1,1,1,4,2,3], capacity = 4
Output: 30
Explanation: Start at the river with a full watering can:
- Water plants 0, 1, and 2 (3 steps). Return to river (3 steps).
- Water plant 3 (4 steps). Return to river (4 steps).
- Water plant 4 (5 steps). Return to river (5 steps).
- Water plant 5 (6 steps).
Steps needed = 3 + 3 + 4 + 4 + 5 + 5 + 6 = 30.
```

**Example 3:**
```
Input: plants = [7,7,7,7,7,7,7], capacity = 8
Output: 49
Explanation: You have to refill before watering each plant.
Steps needed = 1 + 1 + 2 + 2 + 3 + 3 + 4 + 4 + 5 + 5 + 6 + 6 + 7 = 49.
```

## Approach
Simulate the process left‑to‑right, tracking remaining water. When a plant cannot be watered, add steps for returning to the river and coming back (`2*i`), reset water to `capacity`, then water the plant.

```text
FUNCTION wateringPlants(plants, capacity):
    SET steps ← 0
    SET water ← capacity
    FOR i ← 0 TO LENGTH(plants)-1:
        SET steps ← steps + 1               // move to plant i
        IF water < plants[i]:
            SET steps ← steps + 2 * i       // go back and forth to river
            SET water ← capacity
        SET water ← water - plants[i]
    RETURN steps
```

## Walkthrough
| i | Plant need | Water before | Action | Steps added | Water after |
|---|------------|--------------|--------|-------------|------------|
| 0 | 2 | 6 | water | +1 | 4 |
| 1 | 4 | 4 | water | +1 | 0 |
| 2 | 5 | 0 | refill (+4 steps) then water | +5 | 1 |
| 3 | 1 | 1 | water | +1 | 0 |
| 4 | 2 | 0 | refill (+8 steps) then water | +9 | 4 |
Total steps = 14.

## Complexity Analysis
- Time: O(n) where n is number of plants.
- Space: O(1) extra space.

## Follow-Up Questions
- How would the algorithm change if refilling could only happen at the start?
- What if the river were located at both ends of the row?
- Can you compute the minimum total distance walked instead of step count?

## Key Takeaway
A greedy simulation that adds back‑and‑forth steps whenever water is insufficient yields the total steps efficiently.
