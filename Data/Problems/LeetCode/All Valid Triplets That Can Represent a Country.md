# 1623. All Valid Triplets That Can Represent a Country

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/all-valid-triplets-that-can-represent-a-country](https://leetcode.com/problems/all-valid-triplets-that-can-represent-a-country)
**Companies:** Amazon

---

## 1. Problem Description

**SQL Problem.** Given three tables `SchoolA`, `SchoolB`, `SchoolC` each with `student_name` and `student_id`, find all triplets (one from each school) where all three names are different.

---

## 2. Examples

**Example 1**
```
SchoolA: [("Alice", 1), ("Bob", 2)]
SchoolB: [("Charlie", 3), ("Alice", 4)]
SchoolC: [("David", 5), ("Bob", 6)]
```
**Output**
```
[("Alice", "Charlie", "David"), ("Bob", "Charlie", "David"), ("Bob", "Alice", "David")]
```
*Explanation*: All three names in each triplet are distinct.

**Example 2**
```
SchoolA: [("Eve", 7)]
SchoolB: [("Eve", 8)]
SchoolC: [("Eve", 9)]
```
**Output**
```
[]
```
*Explanation*: No valid triplet because every name repeats.

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
