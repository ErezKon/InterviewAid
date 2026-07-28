# 853. Car Fleet

**Difficulty:** 🟡 Medium
**Acceptance:** 50.0%
**LeetCode:** [https://leetcode.com/problems/car-fleet](https://leetcode.com/problems/car-fleet)
**Companies:** Amazon, Bloomberg, Bny Mellon, Goldman Sachs, Google, Infosys, Meta, Microsoft, Nutanix, Phonepe, Ripple, Waymo

---

## 1. Problem Description

`n` cars at different positions heading toward a target. Each car has a speed. A car can't pass another — it joins a fleet. Return the number of car fleets arriving at target.

---

## 2. Examples

**Example 1:**
```
target = 12
position = [10,8,0,5,3]
speed = [2,4,1,1,3]
Output: 3
```
*Explanation:* The cars at positions 10 and 8 become one fleet, the car at 0 forms its own fleet, and the cars at 5 and 3 merge into a third fleet.

**Example 2:**
```
target = 10
position = [6,8]
speed = [3,2]
Output: 1
```
*Explanation:* The car at 6 catches up to the car at 8 before the target, forming a single fleet.

---

## 2. Approach: Sort + Stack — O(n log n) ✅

Sort by position (descending). Calculate arrival time for each car. If a car arrives later than the one ahead, it forms a new fleet.

```text
FUNCTION carFleet(target, position, speed):
    pairs = SORT by position descending: [(pos, speed), ...]
    fleets = 0
    prevTime = 0

    FOR (pos, spd) IN pairs:
        time = (target - pos) / spd

        IF time > prevTime:
            fleets += 1
            prevTime = time

    RETURN fleets
```

---

## 3. Walkthrough

| Step | Car (pos, speed) | Arrival Time | Action |
|------|------------------|--------------|--------|
| 1 | (10,2) | (12-10)/2 = 1 | New fleet (fleets=1, prevTime=1) |
| 2 | (8,4) | (12-8)/4 = 1 | Time == prevTime → joins fleet 1 |
| 3 | (5,1) | (12-5)/1 = 7 | 7 > 1 → new fleet (fleets=2, prevTime=7) |
| 4 | (3,3) | (12-3)/3 = 3 | 3 < 7 → joins fleet 2 |
| 5 | (0,1) | (12-0)/1 = 12 | 12 > 7 → new fleet (fleets=3, prevTime=12) |

Result: 3 fleets.

---

## 4. Complexity Analysis

- **Time:** Sorting dominates → O(n log n).
- **Space:** Storing sorted pairs and a few variables → O(n).

---

## 5. Follow-Up Questions

- How would the solution change if cars could overtake each other?
- What if the target moves over time?
- Can you compute the exact composition of each fleet?

---

## Key Takeaway

> Sort by position (closest to target first). A car forms a new fleet only if its arrival time exceeds the current fleet's time. Cars that arrive earlier or at the same time merge into the fleet ahead.
