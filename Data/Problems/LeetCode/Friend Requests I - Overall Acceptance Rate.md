# 597. Friend Requests I: Overall Acceptance Rate

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/friend-requests-i-overall-acceptance-rate](https://leetcode.com/problems/friend-requests-i-overall-acceptance-rate)
**Companies:** Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: SQL Count Distinct ✅](#3-approach-sql-count-distinct-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

> *Note: premium SQL problem — schema/statement/example verified via doocs/leetcode.*

Table: `FriendRequest`

```
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| sender_id      | int     |
| send_to_id     | int     |
| request_date   | date    |
+----------------+---------+
This table may contain duplicates (In other words, there is no primary key for this table in SQL).
Each row of this table contains the ID of the user who sent the request, the ID of the user who received the request, and the date of the request.
```

Table: `RequestAccepted`

```
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| requester_id   | int     |
| accepter_id    | int     |
| accept_date    | date    |
+----------------+---------+
This table may contain duplicates (In other words, there is no primary key for this table in SQL).
Each row of this table contains the ID of the user who sent the request, the ID of the user who received the request, and the date when the request was accepted.
```

Find the overall acceptance rate of requests, which is the number of acceptance divided by the number of requests. Return the answer rounded to 2 decimals places.

**Note that:**

- The accepted requests are not necessarily from the table `friend_request`. In this case, Count the total accepted requests (no matter whether they are in the original requests), and divide it by the number of requests to get the acceptance rate.
- It is possible that a sender sends multiple requests to the same receiver, and a request could be accepted more than once. In this case, the 'duplicated' requests or acceptances are only counted once.
- If there are no requests at all, you should return `0.00` as the `accept_rate`.

**Follow up:**
- Could you find the acceptance rate for every month?
- Could you find the cumulative acceptance rate for every day?

---

## 2. Examples

**Example 1:**
```
Input:
FriendRequest table:
+-----------+------------+--------------+
| sender_id | send_to_id | request_date |
+-----------+------------+--------------+
| 1         | 2          | 2016/06/01   |
| 1         | 3          | 2016/06/01   |
| 1         | 4          | 2016/06/01   |
| 2         | 3          | 2016/06/02   |
| 3         | 4          | 2016/06/09   |
+-----------+------------+--------------+
RequestAccepted table:
+--------------+-------------+-------------+
| requester_id | accepter_id | accept_date |
+--------------+-------------+-------------+
| 1            | 2           | 2016/06/03  |
| 1            | 3           | 2016/06/08  |
| 2            | 3           | 2016/06/08  |
| 3            | 4           | 2016/06/09  |
| 3            | 4           | 2016/06/10  |
+--------------+-------------+-------------+
Output:
+-------------+
| accept_rate |
+-------------+
| 0.8         |
+-------------+
Explanation:
There are 4 unique accepted requests, and there are 5 requests in total. So the rate is 0.80.
```

---

## 3. Approach: SQL Count Distinct ✅

```sql
SELECT ROUND(
    IFNULL(
        (SELECT COUNT(DISTINCT requester_id, accepter_id) FROM RequestAccepted) /
        (SELECT COUNT(DISTINCT sender_id, send_to_id) FROM FriendRequest),
        0
    ), 2
) AS accept_rate;
```

---

## 4. Walkthrough

1. **Count distinct requests** – `SELECT COUNT(DISTINCT sender_id, send_to_id) FROM FriendRequest` gives total unique friend‑request pairs.
2. **Count distinct acceptances** – `SELECT COUNT(DISTINCT requester_id, accepter_id) FROM RequestAccepted` counts unique accepted pairs.
3. **Compute rate** – Divide acceptances by requests; `IFNULL` handles the case of zero requests.
4. **Round** – `ROUND(..., 2)` formats the result to two decimal places.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) – single‑pass aggregations performed by the DB engine |
| **Space** | O(1) – only constant‑size aggregates stored |

---

## 6. Follow-Up Questions

- How would you modify the query to compute acceptance rate per user?
- What if you need the acceptance rate for each month instead of overall?
- How can you handle cases where a request is sent multiple times but accepted only once?

---

## 7. Key Takeaway

> Use `COUNT(DISTINCT ...)` to count unique request and acceptance pairs, then divide and round for the overall acceptance rate.
