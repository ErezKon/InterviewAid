# 3051. Find Candidates for Data Scientist Position

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-candidates-for-data-scientist-position](https://leetcode.com/problems/find-candidates-for-data-scientist-position)
**Companies:** Hashedin

---

## Problem Description

Find candidates who are proficient in all three skills: Python, Tableau, and PostgreSQL.

---

## Approach: SQL GROUP BY + HAVING ✅

```sql
SELECT candidate_id
FROM Candidates
WHERE skill IN ('Python', 'Tableau', 'PostgreSQL')
GROUP BY candidate_id
HAVING COUNT(DISTINCT skill) = 3
ORDER BY candidate_id;
```

---

## Examples

**Example 1:**
```
Candidates Table:
+----+----------+
| id | skill    |
+----+----------+
| 1  | Python   |
| 1  | Tableau  |
| 1  | PostgreSQL |
| 2  | Python   |
| 2  | Tableau  |
| 3  | PostgreSQL |
+----+----------+
```
**Output:**
```
+----+
| id |
+----+
| 1  |
+----+
```
Candidate 1 possesses all three required skills; candidates 2 and 3 are missing at least one.

---

## Walkthrough

| Step | Action | Reason |
|------|--------|--------|
| 1 | Filter rows where `skill` is one of the three required | Reduce to relevant skills |
| 2 | Group rows by `candidate_id` | Aggregate skills per candidate |
| 3 | Apply `HAVING COUNT(DISTINCT skill) = 3` | Keep only candidates with all three skills |
| 4 | Order results by `candidate_id` | Produce deterministic output |

---

## Complexity Analysis

- **Time:** O(N) where N is the number of rows in the `Candidates` table (single scan with grouping).
- **Space:** O(K) for storing groups, where K is the number of distinct candidates.

---

## Follow-Up Questions

1. How would you modify the query to also return the candidate names?
2. How can you handle a scenario where a candidate may have duplicate skill entries?
3. Extend the solution to find candidates who have at least two of the three skills.

---

## Key Takeaway

> **Group by candidate and use HAVING with a count of distinct required skills to ensure all three are present.**