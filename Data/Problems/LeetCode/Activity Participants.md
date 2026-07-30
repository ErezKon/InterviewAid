# 1355. Activity Participants

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/activity-participants](https://leetcode.com/problems/activity-participants)
**Companies:** Ibm

---

## 1. Problem Description

**SQL Problem.** Given a `Friends` table with `id`, `name`, `activity`, and an `Activities` table, find activities that have neither the most nor the fewest participants.

---

## 2. Examples

**Example 1**

| id | name   | activity |
|----|--------|----------|
| 1  | Alice  | Hiking   |
| 2  | Bob    | Hiking   |
| 3  | Carol  | Cooking  |
| 4  | Dave   | Cooking  |
| 5  | Eve    | Cooking  |
| 6  | Frank  | Painting |

Activities counts: Hiking = 2, Cooking = 3, Painting = 1. The most participants is Cooking, the fewest is Painting, so the result returns **Hiking**.

---

## 2. Approach: Subquery with Count ✅

```sql
SELECT activity
FROM Friends
GROUP BY activity
HAVING COUNT(*) > (
    SELECT MIN(cnt) FROM (SELECT COUNT(*) cnt FROM Friends GROUP BY activity) t
) AND COUNT(*) < (
    SELECT MAX(cnt) FROM (SELECT COUNT(*) cnt FROM Friends GROUP BY activity) t
);
```

---

## 3. Walkthrough

| Step | Action |
|------|--------|
| 1 | Group `Friends` by `activity` and compute `COUNT(*)` for each activity. |
| 2 | In a subquery, compute the global minimum (`MIN(cnt)`) and maximum (`MAX(cnt)`) of those counts. |
| 3 | Keep only activities where the count is greater than the minimum **and** less than the maximum. |
| 4 | Return the qualifying activity names. |

---

## 4. Complexity Analysis

- **Time:** O(N) – a single scan to aggregate counts, plus constant‑time subqueries over the aggregated result.
- **Space:** O(K) – extra space for the aggregated counts per distinct activity (`K` = number of activities).

---

## 5. Follow-Up Questions

1. How would you modify the query to return activities whose participant count is within the middle 50 % (i.e., between the 25th and 75th percentiles)?
2. How can you include the actual participant count in the result set?
3. Extend the problem to handle ties when multiple activities share the same minimum or maximum count.

---

## Key Takeaway

> Use aggregation to count participants per activity, then filter out the extremes by comparing each count against the global `MIN` and `MAX` values via subqueries.
