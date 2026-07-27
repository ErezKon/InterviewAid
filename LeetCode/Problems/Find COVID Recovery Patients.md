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

## Key Takeaway

> **Self-join on tests table: find a positive result followed by a negative result (recovery). Filter by date ordering.**
