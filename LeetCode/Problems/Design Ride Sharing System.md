# 3829. Design Ride Sharing System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-ride-sharing-system](https://leetcode.com/problems/design-ride-sharing-system)
**Companies:** Meta

---

## Problem Description

Design a ride sharing system: drivers register/go online, riders request rides, and the system matches the nearest available driver.

---

## Approach

```
CLASS RideSharingSystem:
    availableDrivers = {}     // driverId → location
    activeRides = {}          // rideId → {riderId, driverId}

    FUNCTION addDriver(driverId, location):
        availableDrivers[driverId] = location

    FUNCTION requestRide(riderId, location):
        IF NOT availableDrivers: RETURN -1
        // Pick nearest driver by distance (ties by smallest driverId)
        best = MIN(availableDrivers, key=(distance(loc, location), driverId))
        REMOVE best FROM availableDrivers
        activeRides[nextRideId] = {riderId, best}
        RETURN nextRideId++

    FUNCTION endRide(rideId, dropoffLocation):
        driverId = activeRides[rideId].driverId
        availableDrivers[driverId] = dropoffLocation
        REMOVE rideId FROM activeRides
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(d) per request (d = available drivers) |
| **Space** | O(d + r) |

---

## Key Takeaway

> **Matching system design: track available vs busy drivers in separate maps. Nearest-driver matching is a linear scan; for scale, use a spatial index (grid/quadtree) to prune candidates.**
