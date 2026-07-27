# 2020. Number of Accounts That Did Not Stream

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-accounts-that-did-not-stream](https://leetcode.com/problems/number-of-accounts-that-did-not-stream)
**Companies:** Warnermedia

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Solution: SQL](#2-solution-sql)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Find accounts that bought a subscription in a given year but did not stream any content that year.

---

## 2. Solution: SQL ✅

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

## 3. Key Takeaway

> **NOT IN subquery to exclude active streamers.** Filter subscriptions overlapping the target year, then exclude accounts that had any streaming activity.
