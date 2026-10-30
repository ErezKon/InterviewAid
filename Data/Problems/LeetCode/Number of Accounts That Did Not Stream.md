# 2020. Number of Accounts That Did Not Stream

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-accounts-that-did-not-stream](https://leetcode.com/problems/number-of-accounts-that-did-not-stream)
**Companies:** Warnermedia

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Solution: SQL](#6-solution-sql)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Table: `Subscriptions`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| account_id  | int  |
| start_date  | date |
| end_date    | date |
+-------------+------+
account_id is the primary key column for this table.
Each row of this table indicates the start and end dates of an account's subscription.
Note that always start_date < end_date.
```

Table: `Streams`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| session_id  | int  |
| account_id  | int  |
| stream_date | date |
+-------------+------+
session_id is the primary key column for this table.
account_id is a foreign key from the Subscriptions table.
Each row of this table contains information about the account and the date associated with a stream session.
```

Write an SQL query to report the number of accounts that bought a subscription in `2021` but did not have any stream session.

The query result format is in the following example.

---

## 2. Examples

```
Example 1:
  Input:
  Subscriptions table:
  +------------+------------+------------+
  | account_id | start_date | end_date   |
  +------------+------------+------------+
  | 9          | 2020-02-18 | 2021-10-30 |
  | 3          | 2021-09-21 | 2021-11-13 |
  | 11         | 2020-02-28 | 2020-08-18 |
  | 13         | 2021-04-20 | 2021-09-22 |
  | 4          | 2020-10-26 | 2021-05-08 |
  | 5          | 2020-09-11 | 2021-01-17 |
  +------------+------------+------------+
  Streams table:
  +------------+------------+-------------+
  | session_id | account_id | stream_date |
  +------------+------------+-------------+
  | 14         | 9          | 2020-05-16  |
  | 16         | 3          | 2021-10-27  |
  | 18         | 11         | 2020-04-29  |
  | 17         | 13         | 2021-08-08  |
  | 19         | 4          | 2020-12-31  |
  | 13         | 5          | 2021-01-05  |
  +------------+------------+-------------+
  Output:
  +----------------+
  | accounts_count |
  +----------------+
  | 2              |
  +----------------+
  Explanation: Users 4 and 9 did not stream in 2021.
  User 11 did not subscribe in 2021.
```

---

## 3. Approach

Use a **SQL NOT IN** sub‑query to exclude accounts that have any streaming record within the target year.

```text
FUNCTION CountAccountsWithoutStreams(year):
    SET start ← CONCAT(year, '-01-01')
    SET end   ← CONCAT(year, '-12-31')
    RETURN SELECT COUNT(*) FROM Subscriptions s
           WHERE s.start_date ≤ end AND s.end_date ≥ start
             AND s.account_id NOT IN (
                 SELECT account_id FROM Streams
                 WHERE stream_date BETWEEN start AND end
             );
```

---

## 4. Walkthrough

| Step | Action |
|------|--------|
| 1 | Determine the date range for the given year (e.g., `2021-01-01` to `2021-12-31`). |
| 2 | Select all subscriptions that overlap this range. |
| 3 | From those accounts, filter out any that appear in the `Streams` table within the same range using `NOT IN`. |
| 4 | Count the remaining accounts – these are the accounts that never streamed during the year. |

---

## 5. Complexity Analysis

The query runs in **O(N + M)** where *N* is the number of subscription rows and *M* is the number of stream rows examined for the year. Indexes on `account_id` and `stream_date` make the sub‑query efficient.

---

## 6. Solution: SQL ✅

```sql
SELECT COUNT(*) AS accounts_count
FROM Subscriptions s
WHERE s.start_date <= '2021-12-31' AND s.end_date >= '2021-01-01'
  AND s.account_id NOT IN (
      SELECT account_id FROM Streams
      WHERE stream_date BETWEEN '2021-01-01' AND '2021-12-31'
  );
```

---

## 7. Key Takeaway

> **NOT IN subquery to exclude active streamers.** Filter subscriptions overlapping the target year, then exclude accounts that had any streaming activity.
