# 3829. Design Ride Sharing System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-ride-sharing-system](https://leetcode.com/problems/design-ride-sharing-system)
**Companies:** Meta

---

## Problem Description

Design a ride sharing system: drivers register/go online, riders request rides, and the system matches the nearest available driver.

---

## Examples

| Operation | Result |
|-----------|--------|
| `addDriver(1, [0,0])` | — |
| `addDriver(2, [5,5])` | — |
| `requestRide(100, [1,1])` | `0` (rideId) |
| `requestRide(101, [6,6])` | `1` |
| `endRide(0, [2,2])` | — |
| `requestRide(102, [1,1])` | `2` |

---

## Walkthrough

1. **Add drivers**: driver 1 at (0,0) and driver 2 at (5,5) are stored in `availableDrivers`.
2. **First ride request** at (1,1): nearest driver is 1 (distance √2). Driver 1 is removed from `availableDrivers` and a new rideId `0` is created linking rider 100 to driver 1.
3. **Second ride request** at (6,6): only driver 2 is available, assigned rideId `1`.
4. **End ride 0**: driver 1 becomes available again at drop‑off location (2,2).
5. **Third ride request** at (1,1): driver 1 (now at (2,2)) is closer than driver 2, so rideId `2` is assigned to driver 1.

The system maintains two maps: `availableDrivers` for idle drivers and `activeRides` for ongoing trips.

---

## Approach

```
CLASS RideSharingSystem:
    availableDrivers = {}     // driverId → location
    activeRides = {}          // rideId → {riderId, driverId}
    nextRideId = 0

    FUNCTION addDriver(driverId, location):
        availableDrivers[driverId] = location

    FUNCTION requestRide(riderId, location):
        IF NOT availableDrivers: RETURN -1
        best = MIN(availableDrivers, key=(distance(loc, location), driverId))
        driverId = best.key
        REMOVE driverId FROM availableDrivers
        rideId = nextRideId
        nextRideId += 1
        activeRides[rideId] = {riderId, driverId}
        RETURN rideId

    FUNCTION endRide(rideId, dropoffLocation):
        driverId = activeRides[rideId].driverId
        availableDrivers[driverId] = dropoffLocation
        DELETE activeRides[rideId]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(d) per request (d = number of available drivers) |
| **Space** | O(d + r) |

---

## Follow-Up Questions

- How would you scale the nearest‑driver lookup to O(log d) using a spatial index?
- How can you handle driver‑cancellation or rider‑cancellation mid‑trip?
- What changes are needed to support surge pricing based on demand?

---

## Key Takeaway

> **Matching system design: track available vs busy drivers in separate maps. Nearest‑driver matching is a linear scan; for scale, use a spatial index (grid/quadtree) to prune candidates.**