# 1285. Find the Start and End Number of Continuous Ranges

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-start-and-end-number-of-continuous-ranges](https://leetcode.com/problems/find-the-start-and-end-number-of-continuous-ranges)
**Companies:** Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: SQL Gap-and-Island ✅](#2-approach-sql-gap-and-island-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given a `Logs` table with sequential IDs (some missing), find the start and end of each continuous range of IDs. (SQL problem)

---

## 2. Approach: SQL Gap-and-Island ✅

```sql
SELECT MIN(log_id) AS start_id, MAX(log_id) AS end_id
FROM (
    SELECT log_id,
           log_id - ROW_NUMBER() OVER (ORDER BY log_id) AS grp
    FROM Logs
) t
GROUP BY grp
ORDER BY start_id;
```

---

## 3. Key Takeaway

> Classic **gap-and-island** technique: `id - ROW_NUMBER()` produces the same value for consecutive IDs, creating natural groups.
