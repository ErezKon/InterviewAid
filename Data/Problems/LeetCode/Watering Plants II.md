# 2105. Watering Plants II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/watering-plants-ii](https://leetcode.com/problems/watering-plants-ii)
**Companies:** Google

---

## Problem Description

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
Simulate both people with two pointers: `i` for Alice moving right with `a` units left, `j` for Bob moving left with `b` units left. Since they work simultaneously at the same speed, at each time step Alice handles `plants[i]` and Bob handles `plants[j]` independently: if the current water is insufficient, refill (count it) and then water. When the pointers meet (`i == j`, odd `n`), the person with more water (Alice on ties) waters the middle plant; a refill is needed only if even that larger amount is insufficient, i.e. `max(a, b) < plants[i]`.

```text
FUNCTION minimumRefill(plants, capacityA, capacityB):
    SET i ← 0;  SET j ← n - 1
    SET a ← capacityA;  SET b ← capacityB
    SET refills ← 0
    WHILE i < j:
        IF a < plants[i]:                 // Alice refills
            SET refills ← refills + 1
            SET a ← capacityA
        SET a ← a - plants[i]
        IF b < plants[j]:                 // Bob refills
            SET refills ← refills + 1
            SET b ← capacityB
        SET b ← b - plants[j]
        SET i ← i + 1;  SET j ← j - 1
    IF i = j AND MAX(a, b) < plants[i]:   // shared middle plant
        SET refills ← refills + 1
    RETURN refills
```

## Walkthrough
Example 2: `plants = [2,2,3,3]`, `capacityA = 3`, `capacityB = 4`.

| Step | i | j | Alice: a before → action → a after | Bob: b before → action → b after | Refills |
|------|---|---|------------------------------------|----------------------------------|---------|
| 1 | 0 | 3 | 3 ≥ 2 → water → 1 | 4 ≥ 3 → water → 1 | 0 |
| 2 | 1 | 2 | 1 < 2 → refill to 3 → 1 | 1 < 3 → refill to 4 → 1 | 2 |
| end | 2 | 1 | pointers crossed, no middle plant | | 2 |

Output: `2`.

## Complexity Analysis
- Time: O(n) — each plant is visited once.
- Space: O(1) extra space.

## Follow-Up Questions
- How would the answer change if more than two people started from different positions?
- What if refilling took time, so the two people no longer stay synchronized? (Then the meeting point depends on timing and must be simulated with event times.)
- What if each person could choose to refill early (before running out)? Would refilling earlier ever reduce the count?

## Key Takeaway
Two simultaneous greedy walkers map naturally to two pointers moving inward; the only subtlety is the shared middle plant, which needs a refill only when the fuller can is still insufficient.
