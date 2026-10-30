# 3051. Find Candidates for Data Scientist Position

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-candidates-for-data-scientist-position](https://leetcode.com/problems/find-candidates-for-data-scientist-position)
**Companies:** Hashedin

---

## Problem Description

Table: `Candidates`

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| candidate_id | int     |
| skill        | varchar |
+--------------+---------+
(candidate_id, skill) is the primary key (columns with unique values) for this table.
Each row includes candidate_id and skill.
```

Write a query to find the **candidates** best suited for a Data Scientist position. The candidate must be proficient in **Python**, **Tableau**, and **PostgreSQL**.

Return *the result table ordered by* `candidate_id` *in **ascending order***.

The result format is in the following example.

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

```
Example 1:
  Input:
  Candidates table:
  +---------------+--------------+
  | candidate_id  | skill        |
  +---------------+--------------+
  | 123           | Python       |
  | 234           | R            |
  | 123           | Tableau      |
  | 123           | PostgreSQL   |
  | 234           | PowerBI      |
  | 234           | SQL Server   |
  | 147           | Python       |
  | 147           | Tableau      |
  | 147           | Java         |
  | 147           | PostgreSQL   |
  | 256           | Tableau      |
  | 102           | DataAnalysis |
  +---------------+--------------+
  Output:
  +--------------+
  | candidate_id |
  +--------------+
  | 123          |
  | 147          |
  +--------------+
  Explanation:
  - Candidates 123 and 147 possess the necessary skills in Python, Tableau, and PostgreSQL for the data scientist position.
  - Candidates 234 and 102 do not possess any of the required skills for this position.
  - Candidate 256 has proficiency in Tableau but is missing skills in Python and PostgreSQL.
  The output table is sorted by candidate_id in ascending order.
```

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