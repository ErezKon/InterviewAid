# 1603. Design Parking System

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/design-parking-system](https://leetcode.com/problems/design-parking-system)
**Companies:** Amazon, Google, Meta, Tesla, Uber, Valve

---

## Problem Description

Design a parking system for a parking lot. The parking lot has three kinds of parking spaces: big, medium, and small, with a fixed number of slots for each size.

Implement the `ParkingSystem` class:

- `ParkingSystem(int big, int medium, int small)` Initializes object of the `ParkingSystem` class. The number of slots for each parking space are given as part of the constructor.
- `bool addCar(int carType)` Checks whether there is a parking space of `carType` for the car that wants to get into the parking lot. `carType` can be of three kinds: big, medium, or small, which are represented by `1`, `2`, and `3` respectively. **A car can only park in a parking space of its** `carType`. If there is no space available, return `false`, else park the car in that size space and return `true`.

**Constraints:**
- `0 <= big, medium, small <= 1000`
- `carType` is `1`, `2`, or `3`
- At most `1000` calls will be made to `addCar`

---

## Examples

```
Example 1:
  Input:
  ["ParkingSystem", "addCar", "addCar", "addCar", "addCar"]
  [[1, 1, 0], [1], [2], [3], [1]]
  Output:
  [null, true, true, false, false]
  Explanation:
  ParkingSystem parkingSystem = new ParkingSystem(1, 1, 0);
  parkingSystem.addCar(1); // return true because there is 1 available slot for a big car
  parkingSystem.addCar(2); // return true because there is 1 available slot for a medium car
  parkingSystem.addCar(3); // return false because there is no available slot for a small car
  parkingSystem.addCar(1); // return false because there is no available slot for a big car. It is already occupied.
```

---

## Walkthrough

Consider the first example:

1. Initialize `ParkingSystem(1,1,0)` → counters: big=1, medium=1, small=0.
2. `addCar(1)` (big): counter[1] > 0, decrement to 0, return `true`.
3. `addCar(2)` (medium): counter[2] > 0, decrement to 0, return `true`.
4. `addCar(3)` (small): counter[3] == 0, cannot park, return `false`.

The counters directly track remaining slots, making each operation O(1).

---

## Approach

```
CLASS ParkingSystem:
    CONSTRUCTOR(big, medium, small):
        spaces = [0, big, medium, small]

    FUNCTION addCar(carType):
        IF spaces[carType] > 0:
            spaces[carType] -= 1
            RETURN true
        RETURN false
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) |
| **Space** | O(1) |

---

## Follow-Up Questions

- How would you extend the design to support removing a car?
- How could you handle dynamic resizing of parking slots?
- What changes are needed for a multi-level parking garage?

---

## Key Takeaway

> **1-indexed counter array indexed directly by carType eliminates branching. Simple counter design — no need for actual slot tracking.**