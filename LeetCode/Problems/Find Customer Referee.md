# 584. Find Customer Referee

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-customer-referee](https://leetcode.com/problems/find-customer-referee)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meesho, Meta, Microsoft, Tcs

---

## Problem Description

Find customers NOT referred by customer id = 2 (including those with NULL referee).

---

## Approach: SQL Filter with NULL Handling ✅

```sql
SELECT name FROM Customer WHERE referee_id != 2 OR referee_id IS NULL;
```

---

## Key Takeaway

> **NULL != 2 evaluates to NULL (falsy), so must explicitly handle `IS NULL`. Classic SQL NULL pitfall.**
