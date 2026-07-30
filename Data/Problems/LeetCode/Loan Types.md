# 2990. Loan Types

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/loan-types](https://leetcode.com/problems/loan-types)
**Companies:** Google

---

## 1. Problem Description

(SQL) Find users who have both a "Refinance" and a "Mortgage" loan type.

---

## 2. Examples

**Example 1:**
```
Loans table:
+---------+-----------+
| user_id | loan_type |
+---------+-----------+
| 1       | Refinance |
| 1       | Mortgage  |
| 2       | Mortgage  |
| 3       | Refinance |
+---------+-----------+
```
**Output:** `[1]`

**Explanation:** Only user 1 has both loan types.

**Example 2:**
```
Loans table:
+---------+-----------+
| user_id | loan_type |
+---------+-----------+
| 4       | Mortgage  |
| 5       | Refinance |
+---------+-----------+
```
**Output:** `[]`

---

## 3. Approach: GROUP BY + HAVING with conditional aggregation

```sql
SELECT user_id
FROM Loans
WHERE loan_type IN ('Refinance', 'Mortgage')
GROUP BY user_id
HAVING COUNT(DISTINCT loan_type) = 2
ORDER BY user_id;
```

---

## 4. Walkthrough

1. Filter rows to keep only `Refinance` and `Mortgage` loan types.
2. Group the filtered rows by `user_id`.
3. For each group, count distinct loan types present.
4. Keep groups where the count equals 2 (both types exist).
5. Return the `user_id`s sorted ascending.

---

## 5. Complexity Analysis

- **Time:** O(N) – each row is examined once.
- **Space:** O(K) – storage for the set of users, where K is the number of distinct users.

---

## 6. Follow-Up Questions

- How would you modify the query to handle more than two loan types?
- Can you write a solution without using `HAVING`?
- How would you return the count of users instead of the list?

---

## 7. Key Takeaway

> Filter to relevant loan types, group by user, and use `HAVING COUNT(DISTINCT) = 2` to ensure both types exist.
