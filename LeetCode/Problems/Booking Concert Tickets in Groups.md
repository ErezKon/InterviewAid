# 2286. Booking Concert Tickets in Groups

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/booking-concert-tickets-in-groups](https://leetcode.com/problems/booking-concert-tickets-in-groups)
**Companies:** Google

---

## 1. Problem Description

Design a system for booking concert seats arranged in `n` rows of `m` seats each. Support two operations:
- `gather(k, maxRow)`: seat `k` people together in the same row (≤ maxRow), choosing the smallest row with enough seats.
- `scatter(k, maxRow)`: seat `k` people across consecutive rows (≤ maxRow), filling each row as much as possible.

---

## 2. Key Insight

> Use a **segment tree** where each node stores: (1) the maximum remaining seats in any row in its range, and (2) the total remaining seats. `gather` queries for the leftmost row with ≥ k seats. `scatter` checks total availability then greedily fills rows.

---

## 3. Approach: Segment Tree — O(n log n) ✅

```text
CLASS BookMyShow:
    INIT(n, m):
        SET self.n ← n
        SET self.m ← m
        // segment trees for max and sum, initially all rows have m seats
        BUILD tree_max with value m for each leaf
        BUILD tree_sum with value m for each leaf
    
    FUNCTION gather(k, maxRow):
        // find leftmost row in [0..maxRow] with max >= k
        SET row ← query_leftmost(tree_max, 0, maxRow, k)
        IF row == -1:
            RETURN []
        SET seat ← self.m - query_point(tree_sum, row)  // first free seat index
        UPDATE row in both trees: subtract k seats
        RETURN [row, seat]
    
    FUNCTION scatter(k, maxRow):
        SET totalAvail ← query_sum(tree_sum, 0, maxRow)
        IF totalAvail < k:
            RETURN false
        // greedily fill rows from leftmost
        WHILE k > 0:
            SET row ← query_leftmost(tree_sum, 0, maxRow, 1)  // first row with any seat
            SET avail ← query_point(tree_sum, row)
            SET take ← MIN(avail, k)
            UPDATE row in both trees: subtract take seats
            SET k ← k - take
        RETURN true
```

---

## Examples

| Operation | Parameters | Return | Explanation |
|-----------|------------|--------|-------------|
| `gather(3, 2)` | `k=3, maxRow=2` | `[0,0]` | Row 0 has 5 seats (assuming `m=5`), allocate seats 0‑2. |
| `scatter(4, 1)` | `k=4, maxRow=1` | `true` | Seats 3‑4 in row 0 and seats 0‑1 in row 1 are filled. |
| `gather(2, 0)` | `k=2, maxRow=0` | `[]` | Row 0 now has only 2 seats left, but they are not contiguous after previous scatter, so gather fails. |

---

## Walkthrough

Assume `n=3, m=5`.
1. **Initial state**: each row has 5 free seats.
2. **gather(3,2)**: query leftmost row ≤2 with max ≥3 → row 0. Allocate seats 0‑2, update row 0 remaining = 2.
3. **scatter(4,1)**: total seats in rows 0‑1 = 2 (row0) + 5 (row1) = 7 ≥4. Fill row 0 remaining 2 seats, then 2 seats in row 1. Row0 remaining=0, row1 remaining=3.
4. **gather(2,0)**: row 0 max = 0 <2, so return empty.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(log n) per `gather` query, O(k log n) worst‑case for `scatter` (each seat may trigger a log‑n update) | O(n) for the two segment trees |

---

## Follow-Up Questions

* How would you modify the design to support cancelling a reservation?
* Can you achieve `O(log n)` per `scatter` operation using a Fenwick tree with prefix sums?
* What if rows have varying numbers of seats? Discuss how the segment tree would change.

---

## Key Takeaway

> Segment trees with max‑query (for gather) and sum‑query (for scatter) enable efficient seat allocation. The leftmost‑row query uses a descent through the segment tree.
