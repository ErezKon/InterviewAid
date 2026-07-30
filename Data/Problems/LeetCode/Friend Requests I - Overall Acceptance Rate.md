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

Find the overall acceptance rate of friend requests. Acceptance rate = accepted / total requests (counting distinct pairs). (SQL problem)

---

## 2. Examples

| Table `FriendRequest` (sender_id, send_to_id) | Table `RequestAccepted` (requester_id, accepter_id) |
|----------------------------------------------|------------------------------------------------------|
| (1,2), (2,3), (3,1)                         | (1,2), (2,3)                                         |
| **Total distinct requests** = 3             | **Total distinct acceptances** = 2                  |
| **Acceptance rate** = 2 / 3 ≈ 0.67            |

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
