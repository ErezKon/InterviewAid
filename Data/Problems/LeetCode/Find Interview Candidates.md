# 1811. Find Interview Candidates

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-interview-candidates](https://leetcode.com/problems/find-interview-candidates)
**Companies:** Amazon

---

## Problem Description
Table: `Contests`

```
+--------------+------+
| Column Name  | Type |
+--------------+------+
| contest_id   | int  |
| gold_medal   | int  |
| silver_medal | int  |
| bronze_medal | int  |
+--------------+------+
contest_id is the column with unique values for this table.
This table contains the LeetCode contest ID and the user IDs of the gold, silver, and bronze medalists.
It is guaranteed that any consecutive contests have consecutive IDs and that no ID is skipped.
```

Table: `Users`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| user_id     | int     |
| mail        | varchar |
| name        | varchar |
+-------------+---------+
user_id is the column with unique values for this table.
This table contains information about the users.
```

Write a solution to report the `name` and the `mail` of all **interview candidates**. A user is an **interview candidate** if **at least one** of these two conditions is true:

- The user won **any** medal in **three or more consecutive** contests.
- The user won the **gold** medal in **three or more different** contests (not necessarily consecutive).

Return the result table in **any order**.

The result format is in the following example.

**Follow up:**

- What if the first condition changed to be "any medal in `n` **or more** consecutive contests"? How would you change your solution to get the interview candidates? Imagine that `n` is the parameter of a stored procedure.
- Some users may not participate in every contest but still perform well in the ones they do. How would you change your solution to only consider contests where the user **was a participant**? Suppose the registered users for each contest are given in another table.

## Examples

```
Example 1:
  Input:
  Contests table:
  +------------+------------+--------------+--------------+
  | contest_id | gold_medal | silver_medal | bronze_medal |
  +------------+------------+--------------+--------------+
  | 190        | 1          | 5            | 2            |
  | 191        | 2          | 3            | 5            |
  | 192        | 5          | 2            | 3            |
  | 193        | 1          | 3            | 5            |
  | 194        | 4          | 5            | 2            |
  | 195        | 4          | 2            | 1            |
  | 196        | 1          | 5            | 2            |
  +------------+------------+--------------+--------------+
  Users table:
  +---------+--------------------+-------+
  | user_id | mail               | name  |
  +---------+--------------------+-------+
  | 1       | sarah@leetcode.com | Sarah |
  | 2       | bob@leetcode.com   | Bob   |
  | 3       | alice@leetcode.com | Alice |
  | 4       | hercy@leetcode.com | Hercy |
  | 5       | quarz@leetcode.com | Quarz |
  +---------+--------------------+-------+
  Output:
  +-------+--------------------+
  | name  | mail               |
  +-------+--------------------+
  | Sarah | sarah@leetcode.com |
  | Bob   | bob@leetcode.com   |
  | Alice | alice@leetcode.com |
  | Quarz | quarz@leetcode.com |
  +-------+--------------------+
  Explanation:
  Sarah won 3 gold medals (190, 193, and 196), so we include her in the result table.
  Bob won a medal in 3 consecutive contests (190, 191, and 192), so we include him in the result table.
      - Note that he also won a medal in 3 other consecutive contests (194, 195, and 196).
  Alice won a medal in 3 consecutive contests (191, 192, and 193), so we include her in the result table.
  Quarz won a medal in 5 consecutive contests (190, 191, 192, 193, and 194), so we include them in the result table.
```

## Approach
The problem can be solved by scanning the array from right to left while keeping track of the maximum score seen so far. Any candidate whose score is greater than or equal to this maximum is good.

### Pseudocode
```text
FUNCTION findGoodCandidates(scores):
    SET good ← []
    SET maxScore ← -∞
    FOR i ← LENGTH(scores)-1 DOWNTO 0:
        IF scores[i] ≥ maxScore:
            PREPEND scores[i] TO good
            SET maxScore ← scores[i]
    RETURN good
```

## Walkthrough
| i | scores[i] | maxScore (before) | good (before) | Action |
|---|-----------|-------------------|---------------|--------|
| 4 | 1 | -∞ | [] | 1 ≥ -∞ → prepend 1, maxScore=1 |
| 3 | 2 | 1 | [1] | 2 ≥ 1 → prepend 2, maxScore=2 |
| 2 | 4 | 2 | [2,1] | 4 ≥ 2 → prepend 4, maxScore=4 |
| 1 | 3 | 4 | [4,2,1] | 3 < 4 → skip |
| 0 | 5 | 4 | [4,2,1] | 5 ≥ 4 → prepend 5 |
Result: [5,4,2,1]

## Complexity Analysis
- **Time:** O(n) – single pass from right to left.
- **Space:** O(k) where *k* is the number of good candidates (output list).

## Follow-Up Questions
1. How would you modify the algorithm to return the indices of good candidates instead of their scores?
2. Can the same idea be applied to a stream of scores where you cannot store the entire array?
3. What if the definition of a good candidate required strictly greater scores only?

## Key Takeaway
Scanning from the end while maintaining the maximum seen so far instantly identifies candidates that are not dominated by any later candidate.
