# 1322. Ads Performance

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/ads-performance](https://leetcode.com/problems/ads-performance)
**Companies:** Meta

---

## 1. Problem Description

**SQL Problem.** Given an `Ads` table with columns `ad_id`, `user_id`, and `action` ('Clicked', 'Viewed', 'Ignored'), find the click-through rate (CTR) for each ad, rounded to 2 decimal places. CTR = clicks / (clicks + views) × 100. If no clicks or views, CTR = 0.

---

## 2. Approach: SQL Aggregation ✅

```sql
SELECT ad_id,
       ROUND(IFNULL(
           SUM(CASE WHEN action = 'Clicked' THEN 1 ELSE 0 END) * 100.0 /
           NULLIF(SUM(CASE WHEN action IN ('Clicked','Viewed') THEN 1 ELSE 0 END), 0),
       0), 2) AS ctr
FROM Ads
GROUP BY ad_id
ORDER BY ctr DESC, ad_id ASC;
```

---

## 3. Examples

| ad_id | user_id | action   |
|-------|---------|----------|
| 1     | 101     | Clicked  |
| 1     | 102     | Viewed   |
| 1     | 103     | Viewed   |
| 2     | 201     | Viewed   |
| 2     | 202     | Ignored  |
| 2     | 203     | Clicked  |

Result:
| ad_id | ctr |
|-------|-----|
| 1     | 33.33 |
| 2     | 50.00 |

*Explanation:* Ad 1 has 1 click and 2 views → 1/(1+2)=33.33%. Ad 2 has 1 click and 1 view → 1/(1+1)=50%.

---

## 4. Walkthrough

1. **Count clicks** per `ad_id` using `SUM(CASE WHEN action = 'Clicked' THEN 1 ELSE 0 END)`.
2. **Count clicks + views** per `ad_id` using `SUM(CASE WHEN action IN ('Clicked','Viewed') THEN 1 ELSE 0 END)`.
3. **Compute CTR** as `clicks * 100.0 / (clicks + views)`. Use `NULLIF` to avoid division by zero.
4. **Round** the result to two decimal places with `ROUND(..., 2)`.
5. **Order** the output as required.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(N) (single table scan) | O(G) where G is number of distinct `ad_id`s |

---

## 6. Follow‑Up Questions

1. How would you modify the query to compute CTR per day?
2. What if you need to exclude `Ignored` actions from the denominator?
3. How can you handle ads with no clicks or views more efficiently?

---

## Key Takeaway

> Standard SQL aggregation with `CASE WHEN` for conditional counting. Use `NULLIF` to avoid division by zero and `IFNULL` to default to 0.