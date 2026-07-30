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

Find the user with the most friends. A friendship is bidirectional: both requester and accepter gain a friend. (SQL problem)

---

## 2. Examples

**Example 1**
```
RequestAccepted
+----+--------------+--------------+
| id | requester_id | accepter_id |
+----+--------------+--------------+
| 1  | 1            | 2            |
| 2  | 2            | 3            |
| 3  | 1            | 3            |
+----+--------------+--------------+
```
*User 1 and 2 each have 2 friends, user 3 also has 2. Any of them can be returned.*

**Example 2**
```
RequestAccepted
+----+--------------+--------------+
| id | requester_id | accepter_id |
+----+--------------+--------------+
| 1  | 4            | 5            |
| 2  | 5            | 6            |
+----+--------------+--------------+
```
*User 5 has the most friends (2).* 

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
