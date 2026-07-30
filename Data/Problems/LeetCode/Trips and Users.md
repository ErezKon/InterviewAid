# 262. Trips and Users

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/trips-and-users](https://leetcode.com/problems/trips-and-users)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Uber

---

## Problem Description
Given two tables `Trips` and `Users`. `Trips` records ride requests with fields `request_at` (date), `client_id`, `driver_id`, and `status`. `Users` records user information with fields `users_id` and `banned` ("Yes"/"No"). For each day between `'2013-10-01'` and `'2013-10-03'`, compute the cancellation rate: the proportion of trips whose `status` is not `'completed'` among all trips where both client and driver are not banned. Return the day and the rate rounded to two decimal places.

## Examples
**Example 1:**
Assume the tables contain the following rows (simplified):
- Trips: `("2013-10-01", 1, 2, 'completed')`, `("2013-10-01", 3, 4, 'cancelled')`
- Users: `(1, 'No')`, `(2, 'No')`, `(3, 'No')`, `(4, 'No')`
The cancellation rate for `2013-10-01` is `1 / 2 = 0.50`.

**Example 2:**
If on `2013-10-02` all trips involve a banned user, the rate is `0.00` because the denominator is zero and the query should return `0.00`.

## Approach
1. Filter `Trips` to keep rows where the client and driver are both non‑banned (join with `Users`).
2. Group the filtered rows by `request_at`.
3. For each group, compute `cancellations = COUNT WHERE status != 'completed'` and `total = COUNT(*)`.
4. The cancellation rate is `cancellations / total`, rounded to two decimal places.

## Walkthrough
| Day | Filtered Trips (client, driver non‑banned) | Cancellations | Total | Rate |
|-----|-------------------------------------------|---------------|-------|------|
| 2013-10-01 | 2 rows (completed, cancelled) | 1 | 2 | 0.50 |
| 2013-10-02 | 0 rows (all involve banned users) | 0 | 0 | 0.00 |
| 2013-10-03 | 3 rows (2 completed, 1 cancelled) | 1 | 3 | 0.33 |

## Complexity Analysis
- **Time:** `O(m + n)` where `m` is the number of `Trips` rows and `n` the number of `Users` rows, due to joins and a single pass grouping.
- **Space:** `O(k)` for storing aggregated results for `k` distinct days (at most 3 in the required range).

## Follow‑Up Questions
1. How would you modify the query to compute the cancellation rate for any arbitrary date range?
2. What indexes on the tables would improve performance for large datasets?
3. How could you extend the analysis to include driver‑specific cancellation rates?

## Key Takeaway
Combine joins to filter based on user status, then aggregate per day to compute a simple ratio; the core insight is filtering before aggregation.
