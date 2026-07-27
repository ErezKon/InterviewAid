# 2238. Number of Times a Driver Was a Passenger

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-times-a-driver-was-a-passenger](https://leetcode.com/problems/number-of-times-a-driver-was-a-passenger)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: SQL Join — O(n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

For each driver, count how many times they were a passenger in another ride.

---

## 2. Approach: SQL Join ✅

```
SELECT DISTINCT r1.driver_id,
       COUNT(r2.ride_id) AS cnt
FROM Rides r1
LEFT JOIN Rides r2 ON r1.driver_id = r2.passenger_id
GROUP BY r1.driver_id
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) with index |
| **Space** | O(n) |

---

## 4. Key Takeaway

> **Self-join: drivers who are also passengers.** LEFT JOIN on driver_id = passenger_id, group and count.
