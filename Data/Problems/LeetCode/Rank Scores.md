# 178. Rank Scores

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rank-scores](https://leetcode.com/problems/rank-scores)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft
---

## Problem Description
Given a table `Scores` with a column `score` (integer), return each score together with its rank when sorted in descending order. Ranks should be dense, i.e., equal scores receive the same rank and the next distinct score gets the immediate next rank.

## Examples
- Table: `score` values `[100, 100, 50, 40]` → Result rows: `(100,1)`, `(100,1)`, `(50,2)`, `(40,3)`.
- Table: `[5,3,5,2]` → Result: `(5,1)`, `(5,1)`, `(3,2)`, `(2,3)`.

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
