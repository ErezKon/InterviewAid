# 585. Investments in 2016

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/investments-in-2016](https://leetcode.com/problems/investments-in-2016)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Twitter

---

## 1. Problem Description

Report the sum of `tiv_2016` (rounded to 2 decimals) for policyholders who:
1. Have the **same** `tiv_2015` as at least one other policyholder, **and**
2. Are in a **unique** location (`lat`, `lon` pair not shared with any other).

---

## 2. Approach: Subquery Filters — SQL ✅

```sql
SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM Insurance
WHERE tiv_2015 IN (
    SELECT tiv_2015 FROM Insurance GROUP BY tiv_2015 HAVING COUNT(*) > 1
)
AND (lat, lon) IN (
    SELECT lat, lon FROM Insurance GROUP BY lat, lon HAVING COUNT(*) = 1
);
```

---

## 3. Key Takeaway

> Two independent filters combined with AND: (1) `tiv_2015` appears more than once (GROUP BY + HAVING > 1), (2) location is unique (GROUP BY + HAVING = 1). Classic SQL pattern of using subqueries with IN for set-based filtering.
