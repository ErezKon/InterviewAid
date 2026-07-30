# 1747. Leetflex Banned Accounts

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/leetflex-banned-accounts](https://leetcode.com/problems/leetflex-banned-accounts)
**Companies:** Audible

---

## 1. Problem Description

(SQL) Find accounts that logged in from two different IPs on the same day (overlapping sessions).

---

## 2. Approach: Self-Join on Overlapping Sessions

```sql
SELECT DISTINCT a.account_id
FROM LogInfo a JOIN LogInfo b
ON a.account_id = b.account_id
   AND a.ip_address != b.ip_address
   AND a.login BETWEEN b.login AND b.logout;
```

---

## 3. Examples

**Example 1:**
```
LogInfo table:
account_id | ip_address | login | logout
1          | 1.1.1.1    | 10:00 | 10:30
1          | 2.2.2.2    | 10:15 | 10:45
```
Both sessions overlap on the same day with different IPs, so account 1 is returned.

---

## 4. Walkthrough

| Step | Action |
|------|--------|
| 1 | Join the table with itself on the same `account_id`. |
| 2 | Filter rows where `ip_address` differs. |
| 3 | Keep pairs where `login` of one row falls between `login` and `logout` of the other. |
| 4 | Select distinct `account_id` values. |

---

## 5. Complexity Analysis

- **Time:** O(N²) in the worst case due to self‑join, where N is the number of log records.
- **Space:** O(N) for the join result and intermediate tables.

---

## 6. Follow-Up Questions

- How would you handle millions of log entries efficiently?
- Can you modify the query to return the exact overlapping time intervals?
- How would you adapt the solution for a streaming data source?

---

## Key Takeaway

> Use a self‑join to compare each session with others of the same account, filtering by different IPs and overlapping time windows.
