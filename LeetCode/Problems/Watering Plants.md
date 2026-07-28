# 2079. Watering Plants

**Difficulty:** 🟡 Medium
**Companies:** Amadeus, Google, Kla Tencor
---

## Problem Description
You are given an array `plants` where `plants[i]` is the amount of water needed for the i‑th plant. You start at plant 0 with a watering can of capacity `capacity`. After watering a plant, the can loses that amount of water. If the can does not have enough water for the next plant, you must return to the river (position 0) to refill, then walk back to the current plant. Compute the total number of steps taken to water all plants.

## Examples
- Input: `plants = [2,4,5,1,2]`, `capacity = 6` → Output: `14`
  (Walk to plant 0, water, refill as needed, total steps counted.)
- Input: `plants = [1,1,1,1]`, `capacity = 4` → Output: `4`
  (No refill needed; one step per plant.)

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
