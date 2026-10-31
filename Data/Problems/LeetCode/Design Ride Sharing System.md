# 3829. Design Ride Sharing System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-ride-sharing-system](https://leetcode.com/problems/design-ride-sharing-system)
**Companies:** Meta

---

## Problem Description

> *Note: the Approach below matches the *nearest* driver for an older invented description. The official system is FIFO: keep a queue of drivers and a queue of riders plus a set of cancelled/active rider ids; `matchDriverWithRider` pops cancelled riders lazily, then pops the earliest driver and earliest rider (or returns `[-1, -1]`).*

A ride sharing system manages ride requests from riders and availability from drivers. Riders request rides, and drivers become available over time. The system should match riders and drivers in the order they arrive.

Implement the `RideSharingSystem` class:

- `RideSharingSystem()` Initializes the system.
- `void addRider(int riderId)` Adds a new rider with the given `riderId`.
- `void addDriver(int driverId)` Adds a new driver with the given `driverId`.
- `int[] matchDriverWithRider()` Matches the **earliest** available driver with the **earliest** waiting rider and removes both of them from the system. Returns an integer array of size 2 where `result = [driverId, riderId]` if a match is made. If no match is available, returns `[-1, -1]`.
- `void cancelRider(int riderId)` Cancels the ride request of the rider with the given `riderId` **if the rider exists** and has **not** yet been matched.

**Constraints:**
- `1 <= riderId, driverId <= 1000`
- Each `riderId` is **unique** among riders and is added at most **once**.
- Each `driverId` is **unique** among drivers and is added at most **once**.
- At most 1000 calls will be made in **total** to `addRider`, `addDriver`, `matchDriverWithRider`, and `cancelRider`.

---

## Examples

**Example 1:**
```
Input: ["RideSharingSystem", "addRider", "addDriver", "addRider", "matchDriverWithRider", "addDriver", "cancelRider", "matchDriverWithRider", "matchDriverWithRider"]
[[], [3], [2], [1], [], [5], [3], [], []]
Output: [null, null, null, null, [2, 3], null, null, [5, 1], [-1, -1]]
Explanation:
RideSharingSystem rideSharingSystem = new RideSharingSystem(); // Initializes the system
rideSharingSystem.addRider(3); // rider 3 joins the queue
rideSharingSystem.addDriver(2); // driver 2 joins the queue
rideSharingSystem.addRider(1); // rider 1 joins the queue
rideSharingSystem.matchDriverWithRider(); // returns [2, 3]
rideSharingSystem.addDriver(5); // driver 5 becomes available
rideSharingSystem.cancelRider(3); // rider 3 is already matched, cancel has no effect
rideSharingSystem.matchDriverWithRider(); // returns [5, 1]
rideSharingSystem.matchDriverWithRider(); // returns [-1, -1]
```

**Example 2:**
```
Input: ["RideSharingSystem", "addRider", "addDriver", "addDriver", "matchDriverWithRider", "addRider", "cancelRider", "matchDriverWithRider"]
[[], [8], [8], [6], [], [2], [2], []]
Output: [null, null, null, null, [8, 8], null, null, [-1, -1]]
Explanation:
RideSharingSystem rideSharingSystem = new RideSharingSystem(); // Initializes the system
rideSharingSystem.addRider(8); // rider 8 joins the queue
rideSharingSystem.addDriver(8); // driver 8 joins the queue
rideSharingSystem.addDriver(6); // driver 6 joins the queue
rideSharingSystem.matchDriverWithRider(); // returns [8, 8]
rideSharingSystem.addRider(2); // rider 2 joins the queue
rideSharingSystem.cancelRider(2); // rider 2 cancels
rideSharingSystem.matchDriverWithRider(); // returns [-1, -1]
```

---

## Walkthrough

1. **Add drivers**: driver 1 at (0,0) and driver 2 at (5,5) are stored in `availableDrivers`.
2. **First ride request** at (1,1): nearest driver is 1 (distance √2). Driver 1 is removed from `availableDrivers` and a new rideId `0` is created linking rider 100 to driver 1.
3. **Second ride request** at (6,6): only driver 2 is available, assigned rideId `1`.
4. **End ride 0**: driver 1 becomes available again at drop-off location (2,2).
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

- How would you scale the nearest-driver lookup to O(log d) using a spatial index?
- How can you handle driver-cancellation or rider-cancellation mid-trip?
- What changes are needed to support surge pricing based on demand?

---

## Key Takeaway

> **Matching system design: track available vs busy drivers in separate maps. Nearest-driver matching is a linear scan; for scale, use a spatial index (grid/quadtree) to prune candidates.**