# 1603. Design Parking System

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/design-parking-system](https://leetcode.com/problems/design-parking-system)
**Companies:** Amazon, Google, Meta, Tesla, Uber, Valve

---

## Problem Description

Design a parking system with fixed slots for big (1), medium (2), and small (3) cars. `addCar(carType)` returns whether parking succeeded.

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

## Key Takeaway

> **1-indexed counter array indexed directly by carType eliminates branching. Simple counter design — no need for actual slot tracking.**
