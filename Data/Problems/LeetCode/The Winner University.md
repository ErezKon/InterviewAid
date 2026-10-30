# 2072. The Winner University

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/the-winner-university](https://leetcode.com/problems/the-winner-university)
**Companies:** Walmart Labs

---

## Problem Description
Table: `NewYork`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| student_id  | int  |
| score       | int  |
+-------------+------+
In SQL, student_id is the primary key for this table.
Each row contains information about the score of one student from New York University in an exam.
```

Table: `California`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| student_id  | int  |
| score       | int  |
+-------------+------+
In SQL, student_id is the primary key for this table.
Each row contains information about the score of one student from California University in an exam.
```

There is a competition between New York University and California University. The competition is held between the same number of students from both universities. The university that has more **excellent students** wins the competition. If the two universities have the same number of **excellent students**, the competition ends in a draw.

An **excellent student** is a student that scored `90%` or more in the exam.

Return:

- **"New York University"** if New York University wins the competition.
- **"California University"** if California University wins the competition.
- **"No Winner"** if the competition ends in a draw.

The result format is in the following example.

## Examples
```
Example 1:
  Input:
  NewYork table:
  +------------+-------+
  | student_id | score |
  +------------+-------+
  | 1          | 90    |
  | 2          | 87    |
  +------------+-------+
  California table:
  +------------+-------+
  | student_id | score |
  +------------+-------+
  | 2          | 89    |
  | 3          | 88    |
  +------------+-------+
  Output:
  +---------------------+
  | winner              |
  +---------------------+
  | New York University |
  +---------------------+
  Explanation:
  New York University has 1 excellent student, and California University has 0 excellent students.
```
```
Example 2:
  Input:
  NewYork table:
  +------------+-------+
  | student_id | score |
  +------------+-------+
  | 1          | 89    |
  | 2          | 88    |
  +------------+-------+
  California table:
  +------------+-------+
  | student_id | score |
  +------------+-------+
  | 2          | 90    |
  | 3          | 87    |
  +------------+-------+
  Output:
  +-----------------------+
  | winner                |
  +-----------------------+
  | California University |
  +-----------------------+
  Explanation:
  New York University has 0 excellent students, and California University has 1 excellent student.
```
```
Example 3:
  Input:
  NewYork table:
  +------------+-------+
  | student_id | score |
  +------------+-------+
  | 1          | 89    |
  | 2          | 90    |
  +------------+-------+
  California table:
  +------------+-------+
  | student_id | score |
  +------------+-------+
  | 2          | 87    |
  | 3          | 99    |
  +------------+-------+
  Output:
  +-----------+
  | winner    |
  +-----------+
  | No Winner |
  +-----------+
  Explanation:
  Both New York University and California University have 1 excellent student.
```

## Approach
Iterate through the `votes` array while tracking the maximum vote count and the corresponding index. Update the result when a strictly larger count is found; if the count is equal, keep the existing smaller index.

```text
FUNCTION winnerUniversity(votes):
    SET bestIdx ← 0
    SET bestVotes ← votes[0]
    FOR i FROM 1 TO LENGTH(votes)-1:
        IF votes[i] > bestVotes:
            SET bestVotes ← votes[i]
            SET bestIdx ← i
        // If equal, keep current bestIdx (smaller index)
    RETURN bestIdx
```
The scan runs in linear time.

## Walkthrough
| i | votes[i] | bestVotes | bestIdx |
|---|----------|-----------|---------|
| 0 | 10 | 10 | 0 |
| 1 | 20 | 20 > 10 → update | 1 |
| 2 | 20 | 20 = bestVotes → keep 1 |
| 3 | 5  | 20 unchanged |

## Complexity Analysis
- **Time:** O(n) where n is the number of universities.
- **Space:** O(1) extra space.

## Follow‑Up Questions
1. How would you modify the solution to return all indices that share the maximum vote count?
2. If the votes are streamed in real time, how can you maintain the winner efficiently?
3. How would you handle ties by preferring the university with the smallest alphabetical name instead of index?

## Key Takeaway
A single linear pass tracking the maximum value and its earliest index yields the winner university.
