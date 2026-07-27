# 626. Exchange Seats

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/exchange-seats](https://leetcode.com/problems/exchange-seats)
**Companies:** Amazon, Bloomberg, Capgemini, Coindcx, Google, Meesho, Meta, Microsoft, Zomato

---

## Problem Description

Given a `Seat` table (id, student), swap every two consecutive students' seats. If the last student is odd-numbered, they stay in place.

---

## Key Insight

> Odd id → swap with next (id+1). Even id → swap with previous (id-1). Special case: last student with odd id stays put. Use `CASE WHEN` to reassign ids.

---

## Approach: CASE Expression

```sql
SELECT
    CASE
        WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM Seat) THEN id
        WHEN id % 2 = 1 THEN id + 1
        ELSE id - 1
    END AS id,
    student
FROM Seat
ORDER BY id;
```

---

## Key Takeaway

> **Swap adjacent pairs with `CASE`: odd→id+1, even→id-1, last odd→stays. Re-order by new id for correct output.**
