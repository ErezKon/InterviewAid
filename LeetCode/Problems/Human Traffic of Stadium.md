# 601. Human Traffic of Stadium

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/human-traffic-of-stadium](https://leetcode.com/problems/human-traffic-of-stadium)
**Companies:** Amazon, Bloomberg, Google, Meta, Tiktok, Uber

---

## 1. Problem Description

Find rows where people ≥ 100 for at least 3 consecutive days. Return all such rows. (SQL problem)

## 2. Approach: Self-Join on 3 Consecutive IDs ✅

```sql
SELECT DISTINCT s1.*
FROM Stadium s1, Stadium s2, Stadium s3
WHERE s1.people >= 100 AND s2.people >= 100 AND s3.people >= 100
AND (
    (s1.id = s2.id - 1 AND s1.id = s3.id - 2) OR
    (s1.id = s2.id + 1 AND s1.id = s3.id - 1) OR
    (s1.id = s2.id + 1 AND s1.id = s3.id + 2)
)
ORDER BY s1.visit_date;
```

## Key Takeaway

> Self-join 3 copies of the table. Check all 3 positions a row could occupy in a consecutive triple (first, middle, last). All three must have ≥ 100 people.
