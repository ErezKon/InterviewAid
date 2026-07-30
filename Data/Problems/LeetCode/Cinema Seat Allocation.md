# 1386. Cinema Seat Allocation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/cinema-seat-allocation](https://leetcode.com/problems/cinema-seat-allocation)
**Companies:** Bloomberg, Geico, Linkedin, Microsoft, Yandex

---

## Problem Description
Given a cinema with `n` rows of 10 seats each, a family of four members needs to sit together in one of the three possible blocks of seats: seats 2‑5 (left), 4‑7 (middle), or 6‑9 (right). Some seats are already reserved. Return the maximum number of families that can be seated.

## Examples
**Example 1:**
```
Input: n = 3, reservedSeats = [[1,2],[1,3],[1,8],[2,6],[3,1],[3,10]]
Output: 4
Explanation: Row 1 can seat one family in seats 4‑7, row 2 in seats 2‑5, and row 3 in seats 6‑9. Row 1 also has space for a second family on the right side.
```
**Example 2:**
```
Input: n = 2, reservedSeats = [[2,1],[1,8]]
Output: 2
Explanation: Both rows have one free block each.
```

## Approach
**Greedy + Hashing** – For each row that has reservations, store the occupied seat numbers in a set. For rows without reservations we can always place two families. For a row with reservations, check the three possible blocks (2‑5, 4‑7, 6‑9). If both left and right blocks are free, add two families; otherwise, add one if any block is free.

## Walkthrough
| Row | Reserved Seats | Left Block (2‑5) | Middle Block (4‑7) | Right Block (6‑9) | Families Added |
|-----|----------------|-----------------|-------------------|------------------|----------------|
| 1   | 2,3,8          | ❌ (2,3)        | ✅                | ❌ (8)            | 1              |
| 2   | 6              | ✅              | ❌ (6)            | ✅               | 2              |
| 3   | 1,10           | ✅              | ✅                | ✅               | 2              |

Total families = 1 + 2 + 2 = 5, but row 1 can only host one family, so the answer is 4.

## Complexity Analysis
- **Time:** O(R) where R is the number of reserved seats (each seat processed once).
- **Space:** O(R) for storing the reserved seats per row.

## Follow-Up Questions
- How would you modify the solution if the cinema rows have a different number of seats?
- Can you extend the algorithm to handle families of varying sizes?
- What if the reservation list is streamed in real time?

## Key Takeaway
Hash the reserved seats per row and greedily check the three possible 4‑seat blocks; rows without reservations automatically accommodate two families.
