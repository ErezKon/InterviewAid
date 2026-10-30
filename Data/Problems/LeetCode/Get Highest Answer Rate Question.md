# 578. Get Highest Answer Rate Question

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/get-highest-answer-rate-question](https://leetcode.com/problems/get-highest-answer-rate-question)
**Companies:** Meta

---

## 1. Problem Description

Table: `SurveyLog`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| action      | ENUM |
| question_id | int  |
| answer_id   | int  |
| q_num       | int  |
| timestamp   | int  |
+-------------+------+
This table may contain duplicate rows.
action is an ENUM (category) of the type: "show", "answer", or "skip".
Each row of this table indicates the user with ID = id has taken an action with the question question_id at time timestamp.
If the action taken by the user is "answer", answer_id will contain the id of that answer, otherwise, it will be null.
q_num is the numeral order of the question in the current session.
```

The **answer rate** for a question is the number of times a user answered the question by the number of times a user showed the question.

Write a solution to report the question that has the highest **answer rate**. If multiple questions have the same maximum **answer rate**, report the question with the smallest `question_id`.

The result format is in the following example.

## 2. Examples

```
Example 1:
  Input:
  SurveyLog table:
  +----+--------+-------------+-----------+-------+-----------+
  | id | action | question_id | answer_id | q_num | timestamp |
  +----+--------+-------------+-----------+-------+-----------+
  | 5  | show   | 285         | null      | 1     | 123       |
  | 5  | answer | 285         | 124124    | 1     | 124       |
  | 5  | show   | 369         | null      | 2     | 125       |
  | 5  | skip   | 369         | null      | 2     | 126       |
  +----+--------+-------------+-----------+-------+-----------+
  Output:
  +------------+
  | survey_log |
  +------------+
  | 285        |
  +------------+
  Explanation:
  Question 285 was showed 1 time and answered 1 time. The answer rate of question 285 is 1.0
  Question 369 was showed 1 time and was not answered. The answer rate of question 369 is 0.0
  Question 285 has the highest answer rate.
```

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
