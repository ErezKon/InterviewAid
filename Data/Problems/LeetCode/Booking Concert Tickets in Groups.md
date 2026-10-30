# 2286. Booking Concert Tickets in Groups

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/booking-concert-tickets-in-groups](https://leetcode.com/problems/booking-concert-tickets-in-groups)
**Companies:** Google

---

## 1. Problem Description

A concert hall has `n` rows numbered from `0` to `n - 1`, each with `m` seats, numbered from `0` to `m - 1`. You need to design a ticketing system that can allocate seats in the following cases:

- If a group of `k` spectators can sit **together** in a row.
- If **every** member of a group of `k` spectators can get a seat. They may or **may not** sit together.

Note that the spectators are very picky. Hence:

- They will book seats only if each member of their group can get a seat with row number **less than or equal** to `maxRow`. `maxRow` can **vary** from group to group.
- In case there are multiple rows to choose from, the row with the **smallest** number is chosen. If there are multiple seats to choose in the same row, the seat with the **smallest** number is chosen.

Implement the `BookMyShow` class:

- `BookMyShow(int n, int m)` Initializes the object with `n` as number of rows and `m` as number of seats per row.
- `int[] gather(int k, int maxRow)` Returns an array of length `2` denoting the row and seat number (respectively) of the **first seat** being allocated to the `k` members of the group, who must sit **together**. In other words, it returns the smallest possible `r` and `c` such that all `[c, c + k - 1]` seats are valid and empty in row `r`, and `r ≤ maxRow`. Returns `[]` in case it is **not possible** to allocate seats to the group.
- `boolean scatter(int k, int maxRow)` Returns `true` if all `k` members of the group can be allocated seats in rows `0` to `maxRow`, who may or **may not** sit together. If the seats can be allocated, it allocates `k` seats to the group with the **smallest** row numbers, and the smallest possible seat numbers in each row. Otherwise, returns `false`.

**Constraints:**
- `1 ≤ n ≤ 5 * 10⁴`
- `1 ≤ m, k ≤ 10⁹`
- `0 ≤ maxRow ≤ n - 1`
- At most `5 * 10⁴` calls **in total** will be made to `gather` and `scatter`.

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

```
Example 1:
  Input:
  ["BookMyShow", "gather", "gather", "scatter", "scatter"]
  [[2, 5], [4, 0], [2, 0], [5, 1], [5, 1]]
  Output:
  [null, [0, 0], [], true, false]
  Explanation:
  BookMyShow bms = new BookMyShow(2, 5); // There are 2 rows with 5 seats each
  bms.gather(4, 0); // return [0, 0]
                    // The group books seats [0, 3] of row 0.
  bms.gather(2, 0); // return []
                    // There is only 1 seat left in row 0,
                    // so it is not possible to book 2 consecutive seats.
  bms.scatter(5, 1); // return True
                     // The group books seat 4 of row 0 and seats [0, 3] of row 1.
  bms.scatter(5, 1); // return False
                     // There is only one seat left in the hall.
```

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
