# 1386. Cinema Seat Allocation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/cinema-seat-allocation](https://leetcode.com/problems/cinema-seat-allocation)
**Companies:** Bloomberg, Geico, Linkedin, Microsoft, Yandex

---

## Problem Description

![img](https://assets.leetcode.com/uploads/2020/02/14/cinema_seats_1.png)

A cinema has `n` rows of seats, numbered from 1 to `n`. Each row has 10 seats, numbered from 1 to 10.

You are given a 2D integer array reservedSeats`, where reservedSeats[i] = [row_i, seat_i]` means that seat seat_i` in row row_i` is already reserved.

A four-person group must be assigned to four seats in the **same** row. The group can be seated in one of the following seat blocks:

- seats 2, 3, 4, 5`
- seats 4, 5, 6, 7`
- seats 6, 7, 8, 9`

A block can be used only if **none** of its seats are reserved. Each seat can be assigned to **at most **one group.

Return an integer denoting the **maximum** number of four-person groups that can be assigned.

**Constraints:**
- `1 <= n <= 10^9`
- `1 <= reservedSeats.length <= min(10 * n, 10^4)`
- `reservedSeats[i] == [row_i, seat_i]`
- `1 <= row_i <= n`
- `1 <= seat_i <= 10`
- All `reservedSeats[i]` are distinct.

## Examples

**Example 1:**
```
Input: n = 3, reservedSeats = [[1,2],[1,3],[1,8],[2,6],[3,1],[3,10]]
Output: 4
Explanation: The figure above shows an optimal allocation of four groups. Seats marked in blue are already reserved, and each set of four contiguous seats marked in orange is assigned to one group.
```

**Example 2:**
```
Input: n = 2, reservedSeats = [[2,1],[1,8],[2,6]]
Output: 2
```

**Example 3:**
```
Input: n = 4, reservedSeats = [[4,3],[1,4],[4,6],[1,7]]
Output: 4
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
