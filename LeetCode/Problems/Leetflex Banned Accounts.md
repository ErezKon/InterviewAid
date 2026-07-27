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

## 3. Key Takeaway

> Self-join same account with different IPs where sessions overlap. Check if one login falls within the other's session window.
