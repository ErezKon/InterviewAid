# 578. Get Highest Answer Rate Question

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/get-highest-answer-rate-question](https://leetcode.com/problems/get-highest-answer-rate-question)
**Companies:** Meta

---

## 1. Problem Description

Find the question with the highest answer rate (answers / shows). (SQL problem)

## 2. Approach: SQL Conditional Aggregation ✅

```sql
SELECT question_id AS survey_log
FROM SurveyLog
GROUP BY question_id
ORDER BY SUM(action = 'answer') / SUM(action = 'show') DESC
LIMIT 1;
```

## Key Takeaway

> Use conditional `SUM` to count answers and shows per question. Order by ratio descending.
