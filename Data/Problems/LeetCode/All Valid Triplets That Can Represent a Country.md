# 1623. All Valid Triplets That Can Represent a Country

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/all-valid-triplets-that-can-represent-a-country](https://leetcode.com/problems/all-valid-triplets-that-can-represent-a-country)
**Companies:** Amazon

---

## 1. Problem Description

**SQL Problem.**

Table: `SchoolA`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| student_id    | int     |
| student_name  | varchar |
+---------------+---------+
student_id is the column with unique values for this table.
Each row of this table contains the name and the id of a student in school A.
All student_name are distinct.
```

Table: `SchoolB`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| student_id    | int     |
| student_name  | varchar |
+---------------+---------+
student_id is the column with unique values for this table.
Each row of this table contains the name and the id of a student in school B.
All student_name are distinct.
```

Table: `SchoolC`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| student_id    | int     |
| student_name  | varchar |
+---------------+---------+
student_id is the column with unique values for this table.
Each row of this table contains the name and the id of a student in school C.
All student_name are distinct.
```

There is a country with three schools, where each student is enrolled in **exactly one** school. The country is joining a competition and wants to select one student from each school to represent the country such that:

- `member_A` is selected from `SchoolA`,
- `member_B` is selected from `SchoolB`,
- `member_C` is selected from `SchoolC`, and
- The selected students' names and IDs are pairwise distinct (i.e. no two students share the same name, and no two students share the same ID).

Write a solution to find all the possible triplets representing the country under the given constraints.

Return the result table in **any order**.

---

## 2. Examples

```
Example 1:
  Input:
  SchoolA table:
  +------------+--------------+
  | student_id | student_name |
  +------------+--------------+
  | 1          | Alice        |
  | 2          | Bob          |
  +------------+--------------+
  SchoolB table:
  +------------+--------------+
  | student_id | student_name |
  +------------+--------------+
  | 3          | Tom          |
  +------------+--------------+
  SchoolC table:
  +------------+--------------+
  | student_id | student_name |
  +------------+--------------+
  | 3          | Tom          |
  | 2          | Jerry        |
  | 10         | Alice        |
  +------------+--------------+
  Output:
  +----------+----------+----------+
  | member_A | member_B | member_C |
  +----------+----------+----------+
  | Alice    | Tom      | Jerry    |
  | Bob      | Tom      | Alice    |
  +----------+----------+----------+
  Explanation:
  Let us see all the possible triplets.
  - (Alice, Tom, Tom) --> Rejected because member_B and member_C have the same name and the same ID.
  - (Alice, Tom, Jerry) --> Valid triplet.
  - (Alice, Tom, Alice) --> Rejected because member_A and member_C have the same name.
  - (Bob, Tom, Tom) --> Rejected because member_B and member_C have the same name and the same ID.
  - (Bob, Tom, Jerry) --> Rejected because member_A and member_C have the same ID.
  - (Bob, Tom, Alice) --> Valid triplet.
```

---

## 2. Approach: Cross Join with Filter ✅

```sql
SELECT a.student_name AS member_A, b.student_name AS member_B, c.student_name AS member_C
FROM SchoolA a
CROSS JOIN SchoolB b
CROSS JOIN SchoolC c
WHERE a.student_name != b.student_name
  AND b.student_name != c.student_name
  AND a.student_name != c.student_name;
```

---

## 3. Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | Perform `CROSS JOIN` of the three tables | Produces every possible combination of one row from each table |
| 2 | Apply pairwise `WHERE` filters to eliminate rows where any two names match | Only combinations with three distinct names remain |
| 3 | Return the selected columns as the final triplet list | Matches the expected output |

---

## 4. Complexity Analysis

- **Time Complexity**: `O(N_A * N_B * N_C)` where `N_X` is the row count of each table, due to the three‑way cross join.
- **Space Complexity**: `O(K)` for `K` valid triplets returned.

---

## 5. Follow-Up Questions

- How would you modify the query if the tables are very large? (Consider using indexes or limiting the join size.)
- Can you rewrite the solution using `EXISTS` subqueries instead of a cross join?
- How would you handle additional constraints, such as requiring the sum of `student_id`s to be even?

---

## Key Takeaway

> Three‑way cross join with pairwise inequality efficiently enumerates all distinct‑name triplets for modest table sizes.
