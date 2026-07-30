# 1633. Percentage of Users Attended a Contest

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/percentage-of-users-attended-a-contest](https://leetcode.com/problems/percentage-of-users-attended-a-contest)
**Companies:** Amazon, Bloomberg, Fortinet, Google, Meta, Microsoft, Oracle

---

## Problem Description
Given two tables `Users(user_id)` and `Register(user_id, contest_id)`, compute for each `contest_id` the percentage of distinct users who have registered for that contest out of the total number of users. Return the result ordered by descending percentage and then by `contest_id`.

## Examples
| Users | Register | Output |
|-------|----------|--------|
| `[[1],[2],[3],[4]]` | `[[1,100],[2,100],[3,200],[4,200]]` | `[[100,50.00],[200,50.00]]` |
| `[[1],[2]]` | `[[1,10],[2,10],[1,20]]` | `[[10,100.00],[20,50.00]]` |

## Approach
Use SQL aggregation to count distinct users per contest and divide by total user count.

```text
FUNCTION ComputePercentage():
    // total distinct users
    SET totalUsers ← SELECT COUNT(*) FROM Users
    // percentage per contest
    SELECT contest_id,
           ROUND(100.0 * COUNT(DISTINCT user_id) / totalUsers, 2) AS percentage
    FROM Register
    GROUP BY contest_id
    ORDER BY percentage DESC, contest_id;
```

## Walkthrough
| Step | Action | Result |
|------|--------|--------|
| 1 | Count rows in `Users` | `totalUsers = 4` |
| 2 | Group `Register` by `contest_id` and count distinct `user_id` | `100 → 2`, `200 → 2` |
| 3 | Compute `percentage = 100 * count / totalUsers` | `100 → 50.00`, `200 → 50.00` |
| 4 | Order by percentage desc, then `contest_id` | `[[100,50.00],[200,50.00]]` |

## Complexity Analysis
The query scans each table once. Time complexity is **O(N + M)** where *N* is number of users and *M* is number of registrations. Space complexity is **O(K)** for *K* distinct contests.

## Follow-Up Questions
1. How would you modify the query to include contests with zero registrations?
2. How to compute the percentage of users who attended **all** contests?
3. How to return results for a specific subset of contests efficiently?

## Key Takeaway
Aggregating distinct counts and normalizing by a total can be expressed concisely with `COUNT(DISTINCT ...)` and arithmetic in SQL.
