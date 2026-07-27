# 1845. Seat Reservation Manager

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/seat-reservation-manager](https://leetcode.com/problems/seat-reservation-manager)
**Companies:** Dropbox, Google, Meta, Microsoft

---

## Problem Description

Design a system managing `n` seats (1-indexed). `reserve()` returns the smallest unreserved seat. `unreserve(seatNumber)` releases that seat.

---

## Approach

```
CLASS SeatManager:
    CONSTRUCTOR(n):
        self.heap = MinHeap(range(1, n + 1))

    FUNCTION reserve(): RETURN heap.POP()
    FUNCTION unreserve(seatNumber): heap.PUSH(seatNumber)
```

| Operation | Time |
|-----------|------|
| reserve   | O(log n) |
| unreserve | O(log n) |

---

## Key Takeaway

> Min-heap naturally gives the smallest available seat. Reserve = pop min, unreserve = push back.
