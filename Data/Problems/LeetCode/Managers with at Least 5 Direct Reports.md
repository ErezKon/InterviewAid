# 570. Managers with at Least 5 Direct Reports

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/managers-with-at-least-5-direct-reports](https://leetcode.com/problems/managers-with-at-least-5-direct-reports)
**Companies:** Amazon, Bloomberg, Deloitte, Google, Meta, Microsoft, Tcs, Zs Associates

---

## 1. Problem Description (SQL)

Find managers who have at least 5 employees reporting directly to them.

---

## 2. Approach: SQL — Self-Join + GROUP BY ✅

```sql
SELECT e.name
FROM Employee e
JOIN (
    SELECT managerId
    FROM Employee
    WHERE managerId IS NOT NULL
    GROUP BY managerId
    HAVING COUNT(*) >= 5
) m ON e.id = m.managerId;
```

---

## 3. Examples

| Employees Table | Result |
|-----------------|--------|
| id | name | managerId |
| 1 | Alice | 3 |
| 2 | Bob   | 3 |
| 3 | Carol | NULL |
| 4 | Dave  | 3 |
| 5 | Eve   | 3 |
| 6 | Frank | 3 |
| 7 | Grace | 8 |
| 8 | Heidi | NULL |
| 9 | Ivan  | 8 |
|10 | Judy  | 8 |
|...|...|...|
| **Result:** Carol, Heidi |

---

## 4. Walkthrough

1. Group employees by `managerId` and count direct reports.
2. Filter groups with `COUNT(*) >= 5`.
3. Join the filtered manager IDs back to the `Employee` table to retrieve manager names.

---

## 5. Complexity Analysis

- **Time:** O(N) – single scan of the `Employee` table for grouping and joining.
- **Space:** O(M) – space for grouping by distinct manager IDs (M ≤ N).

---

## 6. Follow-Up Questions

- How would you modify the query to return managers with at least *k* direct reports, where *k* is a parameter?
- How to include managers who have exactly *k* reports and also list the names of those reports?

---

## 3. Key Takeaway

> Group by managerId, filter with HAVING ≥ 5, then join back to get the manager's name.
