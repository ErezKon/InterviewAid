# 2230. The Users That Are Eligible for Discount

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/the-users-that-are-eligible-for-discount](https://leetcode.com/problems/the-users-that-are-eligible-for-discount)
**Companies:** Analytics Quotient

---

## Problem Description
Table: `Purchases`

```
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| user_id     | int      |
| time_stamp  | datetime |
| amount      | int      |
+-------------+----------+
(user_id, time_stamp) is the primary key (combination of columns with unique values) for this table.
Each row contains information about the purchase time and the amount paid for the user with ID user_id.
```

A user is eligible for a discount if they had a purchase in the inclusive interval of time `[startDate, endDate]` with at least `minAmount` amount. To convert the dates to times, both dates should be considered as the **start** of the day (i.e., `endDate = 2022-03-05` should be considered as the time `2022-03-05 00:00:00`).

Write a solution to report the IDs of the users that are eligible for a discount.

Return the result table ordered by `user_id`.

The result format is in the following example.

**Important Note:** This problem is basically the same as [The Number of Users That Are Eligible for Discount](https://leetcode.com/problems/the-number-of-users-that-are-eligible-for-discount/).

## Examples
```
Example 1:
  Input:
  Purchases table:
  +---------+---------------------+--------+
  | user_id | time_stamp          | amount |
  +---------+---------------------+--------+
  | 1       | 2022-04-20 09:03:00 | 4416   |
  | 2       | 2022-03-19 19:24:02 | 678    |
  | 3       | 2022-03-18 12:03:09 | 4523   |
  | 3       | 2022-03-30 09:43:42 | 626    |
  +---------+---------------------+--------+
  startDate = 2022-03-08, endDate = 2022-03-20, minAmount = 1000
  Output:
  +---------+
  | user_id |
  +---------+
  | 3       |
  +---------+
  Explanation:
  Out of the three users, only User 3 is eligible for a discount.
   - User 1 had one purchase with at least minAmount amount, but not within the time interval.
   - User 2 had one purchase within the time interval, but with less than minAmount amount.
   - User 3 is the only user who had a purchase that satisfies both conditions.
```

## Approach
Iterate through the array and count elements that satisfy `purchases[i] >= discountThreshold`.

```text
FUNCTION eligibleUsers(purchases, discountThreshold):
    SET count ← 0
    FOR amount IN purchases:
        IF amount ≥ discountThreshold:
            SET count ← count + 1
    RETURN count
```
The algorithm runs in linear time.

## Walkthrough
| Step | amount | condition | count |
|------|--------|-----------|-------|
| 1 | 120 | ≥ 100 → true | 1 |
| 2 | 80  | ≥ 100 → false| 1 |
| 3 | 150 | ≥ 100 → true | 2 |
| 4 | 90  | ≥ 100 → false| 2 |

## Complexity Analysis
- **Time:** O(n) where n is the number of users.
- **Space:** O(1) extra space.

## Follow‑Up Questions
1. How would you handle a stream of purchase amounts arriving in real time?
2. What if each user can have multiple purchases and you need the total per user?
3. How could you extend the solution to return the list of qualifying user IDs?

## Key Takeaway
A simple linear scan counting values that meet the threshold efficiently solves the problem.
