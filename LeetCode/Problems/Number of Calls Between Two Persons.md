# 1699. Number of Calls Between Two Persons

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-calls-between-two-persons](https://leetcode.com/problems/number-of-calls-between-two-persons)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Solution: SQL](#2-solution-sql)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Report the number of calls and total duration between each pair of persons. Normalize pairs so `person1 < person2`.

---

## 2. Solution: SQL ✅

```sql
SELECT
    LEAST(from_id, to_id) AS person1,
    GREATEST(from_id, to_id) AS person2,
    COUNT(*) AS call_count,
    SUM(duration) AS total_duration
FROM Calls
GROUP BY person1, person2;
```

---

## 3. Key Takeaway

> **LEAST/GREATEST to normalize bidirectional pairs.** Group by the canonical `(smaller, larger)` pair to combine both directions.
