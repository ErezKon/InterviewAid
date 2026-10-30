# 2990. Loan Types

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/loan-types](https://leetcode.com/problems/loan-types)
**Companies:** Google

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Loans`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| loan_id     | int     |
| user_id     | int     |
| loan_type   | varchar |
+-------------+---------+
loan_id is column of unique values for this table.
This table contains loan_id, user_id, and loan_type.
```

Write a solution to find all **distinct** `user_id`'s that have **at least one** **Refinance** loan type and at least one **Mortgage** loan type.

Return *the result table ordered by *`user_id`* in **ascending** order**.*

The result format is in the following example.

---

## 2. Examples

**Example 1:**
```
Input:
Loans table:
+---------+---------+-----------+
| loan_id | user_id | loan_type |
+---------+---------+-----------+
| 683     | 101     | Mortgage  |
| 218     | 101     | AutoLoan  |
| 802     | 101     | Inschool  |
| 593     | 102     | Mortgage  |
| 138     | 102     | Refinance |
| 294     | 102     | Inschool  |
| 308     | 103     | Refinance |
| 389     | 104     | Mortgage  |
+---------+---------+-----------+
Output:
+---------+
| user_id |
+---------+
| 102     |
+---------+
Explanation:
- User_id 101 has three loan types, one of which is a Mortgage. However, this user does not have any loan type categorized as Refinance, so user_id 101 won't be considered.
- User_id 102 possesses three loan types: one for Mortgage and one for Refinance. Hence, user_id 102 will be included in the result.
- User_id 103 has a loan type of Refinance but lacks a Mortgage loan type, so user_id 103 won't be considered.
- User_id 104 has a Mortgage loan type but doesn't have a Refinance loan type, thus, user_id 104 won't be considered.
Output table is ordered by user_id in ascending order.
```

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
