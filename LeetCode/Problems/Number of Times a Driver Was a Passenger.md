# 2238. Number of Times a Driver Was a Passenger

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-times-a-driver-was-a-passenger](https://leetcode.com/problems/number-of-times-a-driver-was-a-passenger)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: SQL Join — O(n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

For each driver, count how many times they were a passenger in another ride.

---

## 2. Examples

**Example 1:**
```
Rides table:
+----+----------+------------+
| id | driver_id| passenger_id|
+----+----------+------------+
| 1  | 101      | 102        |
| 2  | 102      | 103        |
| 3  | 101      | 103        |
| 4  | 104      | 101        |
+----+----------+------------+

Result: driver 101 appears as passenger once (ride 4), driver 102 appears as passenger once (ride 1), driver 103 appears as passenger twice (rides 2 and 3).
```

---

## 3. Approach: SQL Join — O(n) ✅

```text
SELECT r1.driver_id,
       COUNT(r2.ride_id) AS passenger_count
FROM Rides r1
LEFT JOIN Rides r2 ON r1.driver_id = r2.passenger_id
GROUP BY r1.driver_id;
```

---

## 4. Walkthrough

1. **Self‑join** the `Rides` table: match each driver (`r1.driver_id`) with rides where they appear as a passenger (`r2.passenger_id`).
2. Use `LEFT JOIN` to keep drivers who never rode as passengers (count will be 0).
3. `GROUP BY` the driver to aggregate the number of matching rides.
4. The `COUNT(r2.ride_id)` gives the total times the driver was a passenger.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) with proper indexing |
| **Space** | O(n) for the join result |

---

## 6. Follow-Up Questions

- How would you modify the query to find drivers who were passengers more than a given threshold?
- Can you write a version that returns the list of ride IDs where each driver was a passenger?
- How would you handle the case where the same ride appears multiple times due to data duplication?

---

## 7. Key Takeaway

> **Self‑join:** drivers who are also passengers. LEFT JOIN on `driver_id = passenger_id`, then group and count.
