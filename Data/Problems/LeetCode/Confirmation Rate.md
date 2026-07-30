# 1934. Confirmation Rate

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/confirmation-rate](https://leetcode.com/problems/confirmation-rate)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
For each user in the `Signups` table, compute the proportion of their confirmation actions that are `'confirmed'`. Return the user ID and the confirmation rate rounded to two decimal places. If a user has no confirmation records, the rate should be `0.00`.

## Examples
**Example 1:**
```sql
Signups
+----+
|user_id|
+----+
| 1 |
| 2 |
+----+

Confirmations
+----+--------+
|user_id|action|
+----+--------+
| 1 |'confirmed'|
| 1 |'rejected'|
| 2 |'rejected'|
+----+--------+
```
Result:
```
+----+-------------------+
|user_id|confirmation_rate|
+----+-------------------+
| 1 |0.50 |
| 2 |0.00 |
+----+-------------------+
```

## Approach
Aggregate confirmations per user, compute the average of a boolean expression (`action='confirmed'`), and round the result. Use a `LEFT JOIN` to include users without confirmations.

```text
FUNCTION compute_confirmation_rate():
    // SQL logic expressed in pseudocode
    FOR each user IN Signups:
        SET total ← COUNT(Confirmations WHERE user_id = user.id)
        SET confirmed ← COUNT(Confirmations WHERE user_id = user.id AND action = 'confirmed')
        IF total = 0:
            SET rate ← 0.00
        ELSE:
            SET rate ← ROUND(confirmed / total, 2)
        OUTPUT (user.id, rate)
```

## Walkthrough
| User | Confirmations | Confirmed | Total | Rate |
|------|---------------|-----------|-------|------|
| 1 | ['confirmed','rejected'] | 1 | 2 | 0.50 |
| 2 | ['rejected'] | 0 | 1 | 0.00 |
| 3 | [] (no rows) | 0 | 0 | 0.00 |

## Complexity Analysis
- **Time:** `O(U + C)` where `U` is number of users and `C` is number of confirmation rows (handled by the database engine).
- **Space:** `O(U)` for the result set.

## Follow‑Up Questions
1. How would you modify the query to compute the rate for a specific time window?
2. How can you index the tables to improve performance for large datasets?
3. Extend the problem to handle multiple action types with different weights.

## Key Takeaway
A left join combined with conditional aggregation lets you calculate per‑user rates while gracefully handling users with no activity.
