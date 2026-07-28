# 1809. Ad-Free Sessions

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/ad-free-sessions](https://leetcode.com/problems/ad-free-sessions)
**Companies:** Amazon

---

## 1. Problem Description

**SQL Problem.** Given `Playback` (session_id, customer_id, start_time, end_time) and `Ads` (ad_id, customer_id, timestamp) tables, find sessions where **no** ad was shown during playback.

---

## 2. Examples

| Playback rows | Ads rows | Output |
|---|---|---|
| (1, 101, 10, 20) | (10, 101, 15) |  | No ad during session 1, so `session_id` 1 is returned |
| (2, 102, 30, 40) | (11, 102, 35) | 2 | Ad shown, session excluded |

---

## 3. Approach: LEFT JOIN + IS NULL ✅

```sql
SELECT p.session_id
FROM Playback p
LEFT JOIN Ads a ON p.customer_id = a.customer_id
    AND a.timestamp BETWEEN p.start_time AND p.end_time
WHERE a.ad_id IS NULL;
```

---

## 4. Walkthrough

1. Perform a LEFT JOIN between `Playback` and `Ads` on matching `customer_id` and ad timestamps within the session interval.
2. For sessions with no matching ad, the joined `Ads` columns become `NULL`.
3. Filter rows where `a.ad_id IS NULL` to keep only ad‑free sessions.
4. Return the `session_id` of those rows.

---

## 5. Complexity Analysis

- **Time:** O(N + M) where N is the number of playback rows and M is the number of ad rows (join operation).
- **Space:** O(N) for the result set and temporary join structures.

---

## 6. Follow‑Up Questions

- How would you modify the query to find sessions with **exactly one** ad?
- How to handle overlapping sessions for the same customer?
- Can you write an equivalent query using `NOT EXISTS`?

---

## Key Takeaway

> Anti‑join pattern: LEFT JOIN + `WHERE … IS NULL` efficiently finds rows with no matching record, a classic technique for “not exists” queries in SQL.
