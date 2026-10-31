# 2228. Users With Two Purchases Within Seven Days

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/users-with-two-purchases-within-seven-days](https://leetcode.com/problems/users-with-two-purchases-within-seven-days)
**Companies:** Amazon

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Purchases`

```
+---------------+------+
| Column Name   | Type |
+---------------+------+
| purchase_id   | int  |
| user_id       | int  |
| purchase_date | date |
+---------------+------+
purchase_id contains unique values.
This table contains logs of the dates that users purchased from a certain retailer.
```

Write a solution to report the IDs of the users that made any two purchases **at most** `7` days apart.

Return the result table ordered by `user_id`.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Purchases table:
+-------------+---------+---------------+
| purchase_id | user_id | purchase_date |
+-------------+---------+---------------+
| 4           | 2       | 2022-03-13    |
| 1           | 5       | 2022-02-11    |
| 3           | 7       | 2022-06-19    |
| 6           | 2       | 2022-03-20    |
| 5           | 7       | 2022-06-19    |
| 2           | 2       | 2022-06-08    |
+-------------+---------+---------------+
Output:
+---------+
| user_id |
+---------+
| 2       |
| 7       |
+---------+
Explanation:
User 2 had two purchases on 2022-03-13 and 2022-03-20. Since the second purchase is within 7 days of the first purchase, we add their ID.
User 5 had only 1 purchase.
User 7 had two purchases on the same day so we add their ID.
```

## Approach
Use a **hash map** to group timestamps by `userId`. For each user's sorted timestamps, apply a **sliding window** to find any pair where `right - left <= 7`. If found, count the user and move to the next.

## Walkthrough
| Step | User | Sorted Timestamps | Sliding Window (left, right) | Condition Met? |
|------|------|-------------------|------------------------------|----------------|
| 1    | 1    | [1,5,10]          | (1,5) → 5-1 ≤7 ✅            | Yes → count++ |
| 2    | 2    | [2,8]             | (2,8) → 8-2 >7 ❌            | No |

## Complexity Analysis
- **Time:** O(N log N) for sorting timestamps per user (total N records). Sliding window is linear in the number of timestamps.
- **Space:** O(N) for the hash map storing timestamps.

## Follow-Up Questions
1. How would you handle real-time streams of purchases?
2. Extend to find the **maximum number of purchases** any user made within a 7-day window.
3. Generalize to an arbitrary window size `k` days.

## Key Takeaway
Grouping timestamps by user and applying a sliding window efficiently reveals users with multiple purchases in a limited time span.
