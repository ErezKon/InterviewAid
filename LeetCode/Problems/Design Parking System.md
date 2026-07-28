# 1603. Design Parking System

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/design-parking-system](https://leetcode.com/problems/design-parking-system)
**Companies:** Amazon, Google, Meta, Tesla, Uber, Valve

---

## Problem Description

Design a parking system with fixed slots for big (1), medium (2), and small (3) cars. `addCar(carType)` returns whether parking succeeded.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `ParkingSystem(1, 1, 0)`<br>`addCar(1)`<br>`addCar(2)`<br>`addCar(3)` | `true, true, false` | The system has 1 big, 1 medium, 0 small slots. Adding a big and a medium car succeeds, adding a small car fails.
| `ParkingSystem(0, 1, 1)`<br>`addCar(2)`<br>`addCar(2)` | `true, false` | Only one medium slot is available; the second attempt fails.

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