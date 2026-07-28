# 601. Human Traffic of Stadium

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/human-traffic-of-stadium](https://leetcode.com/problems/human-traffic-of-stadium)
**Companies:** Amazon, Bloomberg, Google, Meta, Tiktok, Uber

---

## 1. Problem Description

Find rows where people ≥ 100 for at least 3 consecutive days. Return all such rows. (SQL problem)

## 2. Examples

**Example 1:**
```
Input:
visit_date | people
2021-01-01 | 120
2021-01-02 | 130
2021-01-03 | 115
2021-01-04 | 90

Output: rows for 2021-01-01, 2021-01-02, 2021-01-03
Explanation: These three consecutive days all have people ≥ 100.
```

**Example 2:**
```
Input:
visit_date | people
2021-02-01 | 80
2021-02-02 | 150
2021-02-03 | 160
2021-02-04 | 170

Output: rows for 2021-02-02, 2021-02-03, 2021-02-04
Explanation: The last three days meet the condition.
```

## 3. Walkthrough

1. Self‑join the table three times (s1, s2, s3).
2. Ensure each join pair represents consecutive days by checking `id` differences (‑1, +1, etc.).
3. Filter each alias to have `people >= 100`.
4. Select distinct rows from the first alias to avoid duplicates.

## 4. Complexity Analysis

- **Time:** The self‑join scans the table three times, yielding O(n) where n is the number of rows.
- **Space:** Only a few extra references for the joined tables, O(1) auxiliary space.

## 5. Approach: Self-Join on 3 Consecutive IDs ✅

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
