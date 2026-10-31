# 1264. Page Recommendations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/page-recommendations](https://leetcode.com/problems/page-recommendations)
**Companies:** Meta

---

## Problem Description
Table: `Friendship`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| user1_id      | int     |
| user2_id      | int     |
+---------------+---------+
(user1_id, user2_id) is the primary key (combination of columns with unique values) for this table.
Each row of this table indicates that there is a friendship relation between user1_id and user2_id.
```

Table: `Likes`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| user_id     | int     |
| page_id     | int     |
+-------------+---------+
(user_id, page_id) is the primary key (combination of columns with unique values) for this table.
Each row of this table indicates that user_id likes page_id.
```

Write a solution to recommend pages to the user with `user_id = 1` using the pages that your friends liked. It should not recommend pages you already liked.

Return result table in **any order** without duplicates.

## Examples

```
Example 1:
  Input:
  Friendship table:
  +----------+----------+
  | user1_id | user2_id |
  +----------+----------+
  | 1        | 2        |
  | 1        | 3        |
  | 1        | 4        |
  | 2        | 3        |
  | 2        | 4        |
  | 2        | 5        |
  | 6        | 1        |
  +----------+----------+
  Likes table:
  +---------+---------+
  | user_id | page_id |
  +---------+---------+
  | 1       | 88      |
  | 2       | 23      |
  | 3       | 24      |
  | 4       | 56      |
  | 5       | 11      |
  | 6       | 33      |
  | 2       | 77      |
  | 3       | 77      |
  | 6       | 88      |
  +---------+---------+
  Output:
  +------------------+
  | recommended_page |
  +------------------+
  | 23               |
  | 24               |
  | 56               |
  | 33               |
  | 77               |
  +------------------+
  Explanation:
  User one is friend with users 2, 3, 4 and 6.
  Suggested pages are 23 from user 2, 24 from user 3, 56 from user 3 and 33 from user 6.
  Page 77 is suggested from both user 2 and user 3.
  Page 88 is not suggested because user 1 already likes it.
```

## Approach
For each query page, look up its adjacency list to obtain direct neighbors. Count the frequency of each neighbor (typically 1 unless multiple edges exist). Sort the neighbors by (frequency descending, page ID ascending) and return the first `k`.

## Walkthrough
| Step | Query | Neighbors | Frequency map |
|------|-------|-----------|---------------|
| 1    | 1     | {2,3}     | {2:1, 3:1} |
| 2    | Sort by freq then ID → [2,3] |

## Complexity Analysis
- **Time:** O(q * d log d) where `q` is number of queries and `d` is average out-degree (sorting neighbors).
- **Space:** O(d) for the frequency map per query.

## Follow-Up Questions
1. How would the solution change if edges could have weights representing click probabilities?
2. Can you extend the approach to recommend pages after two clicks (similar to Page Recommendations II)?
3. What if the graph is massive and cannot fit in memory—how would you stream the adjacency lists?

## Key Takeaway
Directly accessing a node's adjacency list and sorting its neighbors by visit frequency yields the required top-k page recommendations efficiently.
