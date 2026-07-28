# 1845. Seat Reservation Manager

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/seat-reservation-manager](https://leetcode.com/problems/seat-reservation-manager)
**Companies:** Dropbox, Google, Meta, Microsoft

---

## Problem Description

Design a system managing `n` seats (1-indexed). `reserve()` returns the smallest unreserved seat. `unreserve(seatNumber)` releases that seat.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `SeatManager(5)`<br>`reserve()`<br>`reserve()`<br>`unreserve(2)`<br>`reserve()` | `1, 2, 2` | Seats 1‑5 are initially free. First two `reserve` calls give seats 1 and 2. `unreserve(2)` makes seat 2 available again. The next `reserve` returns the smallest free seat, which is 2. |
| `SeatManager(2)`<br>`reserve()`<br>`reserve()`<br>`reserve()` | `1, 2, -1` | After reserving both seats, no seats are free; a subsequent `reserve` could return an error indicator (implementation‑specific). |

---

## Approach

```
CLASS SeatManager:
    CONSTRUCTOR(n):
        // Initialize a min‑heap with all seat numbers
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
4. `unreserve(2)` → PUSH `2`; heap becomes `[2,3,4,5]` (heap re‑orders).
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

> Min‑heap naturally gives the smallest available seat. Reserve = pop min, unreserve = push back.
