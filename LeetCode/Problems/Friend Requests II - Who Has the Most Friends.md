# 602. Friend Requests II: Who Has the Most Friends

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends](https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: UNION ALL + Group By ✅](#2-approach-union-all--group-by-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Find the user with the most friends. A friendship is bidirectional: both requester and accepter gain a friend. (SQL problem)

---

## 2. Approach: UNION ALL + Group By ✅

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

## 3. Key Takeaway

> `UNION ALL` both columns to count friendships from both sides. Group by id and pick the max.
