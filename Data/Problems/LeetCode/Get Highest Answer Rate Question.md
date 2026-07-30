# 578. Get Highest Answer Rate Question

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/get-highest-answer-rate-question](https://leetcode.com/problems/get-highest-answer-rate-question)
**Companies:** Meta

---

## 1. Problem Description

Find the question with the highest answer rate (answers / shows). (SQL problem)

## 2. Examples

| question_id | action |
|-------------|--------|
| 1           | show   |
| 1           | answer |
| 2           | show   |
| 2           | show   |
| 2           | answer |

**Example:** For the above logs, question 1 has an answer rate of 1/1 = 1.0, while question 2 has 1/3 ≈ 0.33. The result is `question_id = 1`.

## 3. Approach: SQL Conditional Aggregation ✅

```sql
SELECT question_id AS survey_log
FROM SurveyLog
GROUP BY question_id
ORDER BY SUM(action = 'answer') / SUM(action = 'show') DESC
LIMIT 1;
```

## 4. Walkthrough

1. **Group** rows by `question_id`.
2. **Count** answers with `SUM(action = 'answer')` and shows with `SUM(action = 'show')`.
3. **Compute** the ratio `answers / shows` for each group.
4. **Order** groups by the ratio in descending order.
5. **Select** the top `question_id` using `LIMIT 1`.

## 5. Complexity Analysis

- **Time:** O(N) – each row is scanned once during aggregation.
- **Space:** O(G) – storage for aggregated values per distinct `question_id` (G groups).

## 6. Follow-Up Questions

- How would you modify the query to return the top K questions with the highest answer rates?
- How to handle cases where `shows` is zero to avoid division‑by‑zero errors?

## Key Takeaway

> Use conditional `SUM` to count answers and shows per question. Order by ratio descending.
