# 2105. Watering Plants II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/watering-plants-ii](https://leetcode.com/problems/watering-plants-ii)
**Companies:** Google

---

## Problem Description

> *Note: the Approach/Walkthrough below solve a single-person refill count. Correct idea: two pointers — Alice from the left with `a = capacityA`, Bob from the right with `b = capacityB`; at each step, if the current person's water is insufficient, refill (count++) then water. When `i == j`, the one with more water (Alice on ties) waters it, refilling only if that amount is insufficient. O(n).*

Alice and Bob want to water `n` plants in their garden. The plants are arranged in a row and are labeled from `0` to `n - 1` from left to right where the `i`th plant is located at `x = i`.

Each plant needs a specific amount of water. Alice and Bob each have a watering can, **initially full**. They water the plants in the following way:

- Alice waters the plants in order from **left to right**, starting from the `0`th plant. Bob waters the plants in order from **right to left**, starting from the `(n - 1)`th plant. They begin watering the plants **simultaneously**.
- It takes the same amount of time to water each plant regardless of how much water it needs.
- Alice/Bob **must** water the plant if they have enough in their can to **fully** water it. Otherwise, they **first** refill their can (instantaneously) then water the plant.
- In case both Alice and Bob reach the same plant, the one with **more** water currently in his/her watering can should water this plant. If they have the same amount of water, then Alice should water this plant.

Given a **0-indexed** integer array `plants` of `n` integers, where `plants[i]` is the amount of water the `i`th plant needs, and two integers `capacityA` and `capacityB` representing the capacities of Alice's and Bob's watering cans respectively, return *the **number of times** they have to refill to water all the plants*.

**Constraints:**
- `n == plants.length`
- `1 <= n <= 10^5`
- `1 <= plants[i] <= 10^6`
- `max(plants[i]) <= capacityA, capacityB <= 10^9`

## Examples

**Example 1:**
```
Input: plants = [2,2,3,3], capacityA = 5, capacityB = 5
Output: 1
Explanation:
- Initially, Alice and Bob have 5 units of water each in their watering cans.
- Alice waters plant 0, Bob waters plant 3.
- Alice and Bob now have 3 units and 2 units of water respectively.
- Alice has enough water for plant 1, so she waters it. Bob does not have enough water for plant 2, so he refills his can then waters it.
So, the total number of times they have to refill to water all the plants is 0 + 0 + 1 + 0 = 1.
```

**Example 2:**
```
Input: plants = [2,2,3,3], capacityA = 3, capacityB = 4
Output: 2
Explanation:
- Initially, Alice and Bob have 3 units and 4 units of water in their watering cans respectively.
- Alice waters plant 0, Bob waters plant 3.
- Alice and Bob now have 1 unit of water each, and need to water plants 1 and 2 respectively.
- Since neither of them have enough water for their current plants, they refill their cans and then water the plants.
So, the total number of times they have to refill to water all the plants is 0 + 1 + 1 + 0 = 2.
```

**Example 3:**
```
Input: plants = [5], capacityA = 10, capacityB = 8
Output: 0
Explanation:
- There is only one plant.
- Alice's watering can has 10 units of water, whereas Bob's can has 8 units. Since Alice has more water in her can, she waters this plant.
So, the total number of times they have to refill is 0.
```

## Approach
Simulate watering from left to right, tracking remaining water. When the next plant’s requirement exceeds the remaining water, increment refill count and reset remaining water to `capacity` before watering that plant.

```text
FUNCTION minRefills(plants, capacity):
    SET refills ← 0
    SET water ← capacity
    FOR need IN plants:
        IF need > water:
            SET refills ← refills + 1
            SET water ← capacity
        SET water ← water - need
    RETURN refills
```

## Walkthrough
| Plant index | Need | Water before | Action | Water after |
|-------------|------|--------------|--------|------------|
| 0 | 2 | 6 | - | 4 |
| 1 | 4 | 4 | - | 0 |
| 2 | 5 | 0 | Refill (refills=1) → 6 | 1 |
| 3 | 1 | 1 | - | 0 |
| 4 | 2 | 0 | Refill (refills=2) → 6 | 4 |
Result: 2 refills.

## Complexity Analysis
- Time: O(n) where n is number of plants.
- Space: O(1) extra space.

## Follow-Up Questions
- How would the solution change if refilling could only be done at the start?
- What if the watering can leaks a fixed amount after each plant?
- Can you compute the minimum total distance walked to refill?

## Key Takeaway
A greedy left‑to‑right simulation with a simple refill check yields the optimal number of refills.
