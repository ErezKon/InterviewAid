# 1845. Seat Reservation Manager

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/seat-reservation-manager](https://leetcode.com/problems/seat-reservation-manager)
**Companies:** Dropbox, Google, Meta, Microsoft

---

## Problem Description

Design a system that manages the reservation state of `n` seats that are numbered from `1` to `n`.

Implement the `SeatManager` class:

- `SeatManager(int n)` Initializes a `SeatManager` object that will manage `n` seats numbered from `1` to `n`. All seats are initially available.
- `int reserve()` Fetches the **smallest-numbered** unreserved seat, reserves it, and returns its number.
- `void unreserve(int seatNumber)` Unreserves the seat with the given `seatNumber`.

**Constraints:**

- `1 <= n <= 10^5`
- `1 <= seatNumber <= n`
- For each call to `reserve`, it is guaranteed that there will be at least one unreserved seat.
- For each call to `unreserve`, it is guaranteed that `seatNumber` will be reserved.
- At most `10^5` calls **in total** will be made to `reserve` and `unreserve`.

---

## Examples

```
Example 1:
  Input:
  ["SeatManager", "reserve", "reserve", "unreserve", "reserve", "reserve", "reserve", "reserve", "unreserve"]
  [[5], [], [], [2], [], [], [], [], [5]]
  Output:
  [null, 1, 2, null, 2, 3, 4, 5, null]
  Explanation:
  SeatManager seatManager = new SeatManager(5); // Initializes a SeatManager with 5 seats.
  seatManager.reserve();    // All seats are available, so return the lowest numbered seat, which is 1.
  seatManager.reserve();    // The available seats are [2,3,4,5], so return the lowest of them, which is 2.
  seatManager.unreserve(2); // Unreserve seat 2, so now the available seats are [2,3,4,5].
  seatManager.reserve();    // The available seats are [2,3,4,5], so return the lowest of them, which is 2.
  seatManager.reserve();    // The available seats are [3,4,5], so return the lowest of them, which is 3.
  seatManager.reserve();    // The available seats are [4,5], so return the lowest of them, which is 4.
  seatManager.reserve();    // The only available seat is seat 5, so return 5.
  seatManager.unreserve(5); // Unreserve seat 5, so now the available seats are [5].
```

---

## Approach

```
CLASS SeatManager:
    CONSTRUCTOR(n):
        // Initialize a min-heap with all seat numbers
        self.heap ← MinHeap(1 .. n)

    FUNCTION reserve():
        // Extract the smallest available seat
        RETURN self.heap.POP()

    FUNCTION unreserve(seatNumber):
        // Return the seat to the pool of available seats
        self.heap.PUSH(seatNumber)
```

| Operation | Time |
|-----------|------|
| reserve   | O(log n) |
| unreserve | O(log n) |

---

## Walkthrough

**Example 1:** `SeatManager(5)`
1. Initialize heap with `[1,2,3,4,5]`.
2. `reserve()` → POP returns `1`; heap becomes `[2,3,4,5]`.
3. `reserve()` → POP returns `2`; heap becomes `[3,4,5]`.
4. `unreserve(2)` → PUSH `2`; heap becomes `[2,3,4,5]` (heap re-orders).
5. `reserve()` → POP returns `2`; heap becomes `[3,4,5]`.

---

## Complexity Analysis

- **Time Complexity:** Each `reserve` and `unreserve` operation performs a heap `POP` or `PUSH`, costing `O(log n)`.
- **Space Complexity:** The heap stores at most `n` seat numbers, so `O(n)` auxiliary space.

---

## Follow-Up Questions

1. How would you modify the design to support batch reservations?
2. Can you achieve `O(1)` amortized time for `reserve` using a different data structure?
3. How would you handle seat priorities beyond the smallest index?

---

## Key Takeaway

> Min-heap naturally gives the smallest available seat. Reserve = pop min, unreserve = push back.
