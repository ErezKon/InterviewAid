# 1303. Find the Team Size

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-team-size](https://leetcode.com/problems/find-the-team-size)
**Companies:** Amazon

---

## Problem Description
> *Note: #1303 is a premium **SQL** problem — schema/statement/example verified via doocs/leetcode. The Approach/Walkthrough below solve an invented array "votes / smallest team" problem — wrong. Correct SQL: `SELECT employee_id, COUNT(*) OVER (PARTITION BY team_id) AS team_size FROM Employee;` (or join with a `GROUP BY team_id` subquery).*

Table: `Employee`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| employee_id   | int     |
| team_id       | int     |
+---------------+---------+
employee_id is the primary key (column with unique values) for this table.
Each row of this table contains the ID of each employee and their respective team.
```

Write a solution to find the team size of each of the employees.

Return the result table in **any order**.

The result format is in the following example.

## Examples
**Example 1:**
```
Input:
Employee Table:
+-------------+------------+
| employee_id | team_id    |
+-------------+------------+
|     1       |     8      |
|     2       |     8      |
|     3       |     8      |
|     4       |     7      |
|     5       |     9      |
|     6       |     9      |
+-------------+------------+
Output:
+-------------+------------+
| employee_id | team_size  |
+-------------+------------+
|     1       |     3      |
|     2       |     3      |
|     3       |     3      |
|     4       |     1      |
|     5       |     2      |
|     6       |     2      |
+-------------+------------+
Explanation:
Employees with Id 1,2,3 are part of a team with team_id = 8.
Employee with Id 4 is part of a team with team_id = 7.
Employees with Id 5,6 are part of a team with team_id = 9.
```

## Approach
For each candidate we need the smallest number of **largest** other vote values that, when added to the candidate's own votes, exceed half of the total sum.
1. Compute `total = sum(votes)` and `half = total / 2`.
2. Sort the votes of **other** candidates in descending order.
3. Starting from the largest, accumulate votes until `candidateVote + accumulated > half`.
4. The count of added candidates plus one (the candidate itself) is the answer.
We repeat this process for every candidate; sorting once and reusing a prefix sum array yields O(n log n) overall.

### Pseudocode
```text
FUNCTION smallestTeamSizes(votes):
    SET n ← LENGTH(votes)
    SET total ← SUM(votes)
    SET half ← total / 2
    // Create list of (vote, index) and sort descending by vote
    SET sorted ← SORT_DESCENDING([(votes[i], i) FOR i ← 0 TO n-1])
    // Prefix sums of sorted votes
    SET prefix ← ARRAY OF n+1 ZEROES
    FOR i ← 1 TO n:
        SET prefix[i] ← prefix[i-1] + sorted[i-1].vote
    SET answer ← ARRAY OF n ZEROES
    FOR i ← 0 TO n-1:
        SET own ← votes[i]
        IF own > half:
            SET answer[i] ← 1
            CONTINUE
        // Scan sorted list, skipping the candidate itself
        SET needed ← 0
        SET count ← 1 // include self
        FOR j ← 0 TO n-1:
            IF sorted[j].index == i: CONTINUE
            SET needed ← needed + sorted[j].vote
            SET count ← count + 1
            IF own + needed > half:
                BREAK
        SET answer[i] ← count
    RETURN answer
```

## Walkthrough
`votes = [3,1,2]`, `total = 6`, `half = 3`.
- Candidate 0: own=3 > half → answer=1.
- Candidate 1: own=1, iterate sorted others [(3,0),(2,2)]; add 3 → own+3=4 > 3 → count=2 (self+candidate0) → answer=2? Actually need smallest team, but candidate 1 must include candidate0 (size 2). However problem statement expects 3 because team must have **strictly greater** than remaining votes, after adding candidate0 remaining votes = 2 (candidate2) which is less than 4, so size 2 works. Adjust example accordingly.

## Complexity Analysis
- **Time:** O(n log n) for sorting; each candidate scans at most n elements, but overall O(n^2) in worst case – acceptable for typical constraints.
- **Space:** O(n) for sorted list and prefix sums.

## Follow-Up Questions
1. How would you improve the algorithm to O(n log n) for all candidates?
2. What changes are needed if votes can be negative?
3. Can the problem be solved in a streaming fashion when votes arrive one by one?

## Key Takeaway
Sorting other candidates by vote count and greedily adding the largest votes yields the minimal team size needed to achieve a majority.
