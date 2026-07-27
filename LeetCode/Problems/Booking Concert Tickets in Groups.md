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

```
CLASS BookMyShow:
    INIT(n, m):
        self.m = m
        self.n = n
        self.tree_max = segment tree for max remaining per row (init all m)
        self.tree_sum = segment tree for sum of remaining (init all m)
    
    FUNCTION gather(k, maxRow):
        // find leftmost row in [0..maxRow] with max >= k
        row = query_leftmost(tree_max, 0, maxRow, k)
        IF row == -1: RETURN []
        seat = m - remaining[row]  // first available seat
        update row: remaining -= k
        RETURN [row, seat]
    
    FUNCTION scatter(k, maxRow):
        totalAvail = query_sum(tree_sum, 0, maxRow)
        IF totalAvail < k: RETURN false
        // greedily fill rows from leftmost
        WHILE k > 0:
            row = leftmost row with remaining > 0
            take = MIN(remaining[row], k)
            update row: remaining -= take
            k -= take
        RETURN true
```

| Time | Space |
|------|-------|
| O(n log n) per scatter worst case, O(log n) per gather | O(n) |

---

## Key Takeaway

> Segment trees with max-query (for gather) and sum-query (for scatter) enable efficient seat allocation. The leftmost-row query uses a descent through the segment tree.
