# 1527. Patients With a Condition

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/patients-with-a-condition](https://leetcode.com/problems/patients-with-a-condition)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description
Table: `Patients`

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| patient_id   | int     |
| patient_name | varchar |
| conditions   | varchar |
+--------------+---------+
patient_id is the primary key (column with unique values) for this table.
'conditions' contains 0 or more code separated by spaces.
This table contains information of the patients in the hospital.
```

Write a solution to find the `patient_id`, `patient_name`, and `conditions` of the patients who have Type I Diabetes. Type I Diabetes always starts with `DIAB1` prefix.

Return the result table in **any order**.

## Examples

```
Example 1:
  Input:
  Patients table:
  +------------+--------------+--------------+
  | patient_id | patient_name | conditions   |
  +------------+--------------+--------------+
  | 1          | Daniel       | YFEV COUGH   |
  | 2          | Alice        |              |
  | 3          | Bob          | DIAB100 MYOP |
  | 4          | George       | ACNE DIAB100 |
  | 5          | Alain        | DIAB201      |
  +------------+--------------+--------------+
  Output:
  +------------+--------------+--------------+
  | patient_id | patient_name | conditions   |
  +------------+--------------+--------------+
  | 3          | Bob          | DIAB100 MYOP |
  | 4          | George       | ACNE DIAB100 |
  +------------+--------------+--------------+
  Explanation: Bob and George both have a condition that starts with DIAB1.
```

## Approach
Use SQL `LIKE` patterns to match the prefix at the start or after a space.

```text
SELECT *
FROM Patients
WHERE conditions LIKE 'DIAB1%'
   OR conditions LIKE '% DIAB1%';
```
The first pattern captures rows where the prefix is the first token; the second captures rows where it appears later.

## Walkthrough
For a row with `conditions = 'HYPER DIAB1A'`:
- The expression `conditions LIKE 'DIAB1%'` is false because the string does not start with the prefix.
- The expression `conditions LIKE '% DIAB1%'` matches because the substring `' DIAB1'` appears, so the row is selected.

## Complexity Analysis
- Time: O(N) where N is the number of rows, as each row is evaluated against two simple pattern matches.
- Space: O(1) additional space beyond the result set.

## Follow‑Up Questions
1. How would you handle case‑insensitive matching?
2. What if the condition codes are stored in a separate normalized table with a many‑to‑many relationship?
3. Can you write a query to return only the matching condition codes instead of the whole row?

## Key Takeaway
Combining two `LIKE` patterns—one for the start of the string and one for a space‑prefixed occurrence—efficiently finds rows containing a specific condition prefix.
