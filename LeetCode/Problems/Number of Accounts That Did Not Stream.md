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

Find accounts that bought a subscription in a given year but did not stream any content that year.

---

## 2. Examples

**Example 1:**
```
Subscriptions table:
+----+----------+------------+------------+
| id | account  | start_date | end_date   |
+----+----------+------------+------------+
| 1  | 101      | 2021-01-10 | 2021-12-31 |
| 2  | 102      | 2021-03-05 | 2022-03-04 |
+----+----------+------------+------------+

Streams table:
+----+----------+------------+
| id | account  | stream_date|
+----+----------+------------+
| 1  | 101      | 2021-02-15 |
+----+----------+------------+
```
Only account **102** subscribed in 2021 and never streamed that year, so the answer is `1`.

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
