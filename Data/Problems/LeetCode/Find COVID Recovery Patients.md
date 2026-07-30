# 3586. Find COVID Recovery Patients

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-covid-recovery-patients](https://leetcode.com/problems/find-covid-recovery-patients)
**Companies:** Google

---

## Problem Description

Find patients who tested positive for COVID and later tested negative (recovered). Return patient details.

---

## Approach: SQL Self-Join ✅

```sql
SELECT DISTINCT p.patient_id, p.patient_name, p.recovery_date
FROM patients p
JOIN tests t1 ON p.patient_id = t1.patient_id AND t1.result = 'Positive'
JOIN tests t2 ON p.patient_id = t2.patient_id AND t2.result = 'Negative'
WHERE t2.test_date > t1.test_date
ORDER BY p.patient_id;
```

---

## Examples

**Example 1:**
```
Patients Table:
+----+--------------+
| id | name         |
+----+--------------+
| 1  | Alice        |
| 2  | Bob          |
+----+--------------+

Tests Table:
+----+----------+----------+------------+
| id | patient  | result   | test_date  |
+----+----------+----------+------------+
| 1  | 1        | Positive | 2020-01-01 |
| 2  | 1        | Negative | 2020-02-01 |
| 3  | 2        | Positive | 2020-01-15 |
+----+----------+----------+------------+
```
**Output:**
```
+----+-------+--------------+
| id | name  | recovery_date |
+----+-------+--------------+
| 1  | Alice | 2020-02-01   |
+----+-------+--------------+
```
Alice recovered after a positive test; Bob never has a negative test, so he is excluded.

---

## Walkthrough

| Step | Action | Reason |
|------|--------|--------|
| 1 | Join `tests` as `t1` on `result='Positive'` | Identify all positive tests per patient |
| 2 | Join `tests` as `t2` on `result='Negative'` and `t2.test_date > t1.test_date` | Ensure a later negative test exists |
| 3 | Select distinct patient info from `patients` | Return each recovered patient once |
| 4 | Order by `patient_id` | Provide deterministic output |

---

## Complexity Analysis

- **Time:** O(P + T) where `P` is number of patients and `T` number of test records (single pass joins).
- **Space:** O(P) for the result set.

---

## Follow-Up Questions

1. How would you modify the query to return the *first* recovery date for each patient?
2. How can you handle cases where a patient tests positive multiple times before recovery?
3. Extend the solution to compute the average recovery time across all patients.

---

## Key Takeaway

> **Self‑join on the tests table: find a positive result followed by a later negative result to identify recovered patients.**