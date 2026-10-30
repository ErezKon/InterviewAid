# 178. Rank Scores

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rank-scores](https://leetcode.com/problems/rank-scores)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft
---

## Problem Description
Table: `Scores`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| score       | decimal |
+-------------+---------+
id is the primary key (column with unique values) for this table.
Each row of this table contains the score of a game. Score is a floating point value with two decimal places.
```

Write a solution to find the rank of the scores. The ranking should be calculated according to the following rules:

- The scores should be ranked from the highest to the lowest.
- If there is a tie between two scores, both should have the same ranking.
- After a tie, the next ranking number should be the next consecutive integer value. In other words, there should be no holes between ranks.

Return the result table ordered by `score` in descending order.

The result format is in the following example.

## Examples

```
Example 1:
  Input:
    Scores table:
    +----+-------+
    | id | score |
    +----+-------+
    | 1  | 3.50  |
    | 2  | 3.65  |
    | 3  | 4.00  |
    | 4  | 3.85  |
    | 5  | 4.00  |
    | 6  | 3.65  |
    +----+-------+
  Output:
    +-------+------+
    | score | rank |
    +-------+------+
    | 4.00  | 1    |
    | 4.00  | 1    |
    | 3.85  | 2    |
    | 3.65  | 3    |
    | 3.65  | 3    |
    | 3.50  | 4    |
    +-------+------+
```

## Approach
Use a window function `DENSE_RANK()` ordered by `score DESC`. The query selects `score` and computes the rank, then orders the output by `score` descending.

```text
SELECT score,
       DENSE_RANK() OVER (ORDER BY score DESC) AS rank
FROM Scores
ORDER BY score DESC;
```

## Walkthrough
| Step | Action | Result |
|------|--------|--------|
|1|Read all rows from `Scores`|`[100,100,50,40]`|
|2|Apply `DENSE_RANK` over `ORDER BY score DESC`|Ranks assigned: 1,1,2,3|
|3|Order final output by `score DESC`|Rows `(100,1)`, `(100,1)`, `(50,2)`, `(40,3)`|

## Complexity Analysis
- Time: O(N log N) for sorting the result set (handled by the database engine).
- Space: O(N) to store the intermediate result.

## Follow‑Up Questions
1. How would you modify the query for `RANK()` (non‑dense ranking) instead?
2. Can you compute the rank in a single pass without window functions?
3. How would you handle ties when ranking by multiple columns (e.g., score then timestamp)?

## Key Takeaway
`DENSE_RANK()` provides a concise way to assign dense ranks to rows based on a sorting criterion, eliminating the need for manual counting logic.
