# 597. Friend Requests I: Overall Acceptance Rate

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/friend-requests-i-overall-acceptance-rate](https://leetcode.com/problems/friend-requests-i-overall-acceptance-rate)
**Companies:** Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: SQL Count Distinct ✅](#2-approach-sql-count-distinct-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Find the overall acceptance rate of friend requests. Acceptance rate = accepted / total requests (counting distinct pairs). (SQL problem)

---

## 2. Approach: SQL Count Distinct ✅

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

## 3. Key Takeaway

> Count distinct pairs for both requests and acceptances. Use `IFNULL` for the edge case of zero requests.
