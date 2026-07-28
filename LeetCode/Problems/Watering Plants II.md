# 2105. Watering Plants II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/watering-plants-ii](https://leetcode.com/problems/watering-plants-ii)
**Companies:** Google
---

## Problem Description
You are given an array `plants` where `plants[i]` is the amount of water needed for the i‑th plant. You start at plant 0 with a watering can of capacity `capacity`. After watering a plant, the can loses the amount of water used. If the can becomes empty before reaching the next plant, you must refill it at a river (costing a refill). The river is located at the start (index 0) and at the end (after the last plant). Compute the minimum number of refills required to water all plants.

## Examples
- Input: `plants = [2,4,5,1,2]`, `capacity = 6` → Output: `2`
  (Refill at start, water first three plants, refill at river after plant 3, water remaining.)
- Input: `plants = [1,1,1,1]`, `capacity = 4` → Output: `0`
  (Can water all without refilling.)

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
