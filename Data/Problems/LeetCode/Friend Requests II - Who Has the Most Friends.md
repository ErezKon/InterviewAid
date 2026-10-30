# 602. Friend Requests II: Who Has the Most Friends

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends](https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: UNION ALL + Group By ✅](#3-approach-union-all--group-by-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Table: `RequestAccepted`

```
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| requester_id   | int     |
| accepter_id    | int     |
| accept_date    | date    |
+----------------+---------+
(requester_id, accepter_id) is the primary key (combination of columns with unique values) for this table.
This table contains the ID of the user who sent the request, the ID of the user who received the request, and the date when the request was accepted.
```

Write a solution to find the people who have the most friends and the most friends number.

The test cases are generated so that only one person has the most friends.

The result format is in the following example.

---

## 2. Examples

**Example 1:**
```
Input:
RequestAccepted table:
+--------------+-------------+-------------+
| requester_id | accepter_id | accept_date |
+--------------+-------------+-------------+
| 1            | 2           | 2016/06/03  |
| 1            | 3           | 2016/06/08  |
| 2            | 3           | 2016/06/08  |
| 3            | 4           | 2016/06/09  |
+--------------+-------------+-------------+
Output:
+----+-----+
| id | num |
+----+-----+
| 3  | 3   |
+----+-----+
Explanation:
The person with id 3 is a friend of people 1, 2, and 4, so he has three friends in total, which is the most number than any others.
Follow up: In the real world, multiple people could have the same most number of friends. Could you find all these people in this case?
```

---

## 3. Approach: UNION ALL + Group By ✅

```sql
SELECT id, COUNT(*) AS num
FROM (
    SELECT requester_id AS id FROM RequestAccepted
    UNION ALL
    SELECT accepter_id AS id FROM RequestAccepted
) t
GROUP BY id
ORDER BY num DESC
LIMIT 1;
```

---

## 4. Walkthrough

1. **Combine both sides** – `UNION ALL` stacks `requester_id` and `accepter_id` so each friendship contributes two rows.
2. **Group** – `GROUP BY id` aggregates the total count of appearances per user.
3. **Order & limit** – Sorting descending by `num` and taking the first row yields the user with the most friends.

---

## 5. Complexity Analysis

*Time*: O(N) where N is the number of rows in `RequestAccepted` (single scan). 
*Space*: O(U) for the temporary table of unique user ids, where U ≤ 2N.

---

## 6. Follow-Up Questions

- How would you modify the query to return **all** users tied for the maximum number of friends?
- Extend the problem to filter friendships by a date range.
- Compute the average number of friends per user.

---

## 7. Key Takeaway

> `UNION ALL` both columns to count friendships from both sides. Group by id and pick the max.
