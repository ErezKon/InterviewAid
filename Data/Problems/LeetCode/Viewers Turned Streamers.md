# 2995. Viewers Turned Streamers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/viewers-turned-streamers](https://leetcode.com/problems/viewers-turned-streamers)
**Companies:** Google, Phonepe

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Sessions`

```
+---------------+----------+
| Column Name   | Type     |
+---------------+----------+
| user_id       | int      |
| session_start | datetime |
| session_end   | datetime |
| session_id    | int      |
| session_type  | enum     |
+---------------+----------+
session_id is column of unique values for this table.
session_type is an ENUM (category) type of (Viewer, Streamer).
This table contains user id, session start, session end, session id and session type.
```

Write a solution to find the number of **streaming** sessions for users whose **first session **was as a **viewer**.

Return *the result table ordered by count of streaming sessions, * `user_id`* in **descending** order.*

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Sessions table:
+---------+---------------------+---------------------+------------+--------------+
| user_id | session_start       | session_end         | session_id | session_type |
+---------+---------------------+---------------------+------------+--------------+
| 101     | 2023-11-06 13:53:42 | 2023-11-06 14:05:42 | 375        | Viewer       |
| 101     | 2023-11-22 16:45:21 | 2023-11-22 20:39:21 | 594        | Streamer     |
| 102     | 2023-11-16 13:23:09 | 2023-11-16 16:10:09 | 777        | Streamer     |
| 102     | 2023-11-17 13:23:09 | 2023-11-17 16:10:09 | 778        | Streamer     |
| 101     | 2023-11-20 07:16:06 | 2023-11-20 08:33:06 | 315        | Streamer     |
| 104     | 2023-11-27 03:10:49 | 2023-11-27 03:30:49 | 797        | Viewer       |
| 103     | 2023-11-27 03:10:49 | 2023-11-27 03:30:49 | 798        | Streamer     |
+---------+---------------------+---------------------+------------+--------------+
Output:
+---------+----------------+
| user_id | sessions_count |
+---------+----------------+
| 101     | 2              |
+---------+----------------+
Explanation:
- user_id 101, initiated their initial session as a viewer on 2023-11-06 at 13:53:42, followed by two subsequent sessions as a Streamer, the count will be 2.
- user_id 102, although there are two sessions, the initial session was as a Streamer, so this user will be excluded.
- user_id 103 participated in only one session, which was as a Streamer, hence, it won't be considered.
- User_id 104 commenced their first session as a viewer but didn't have any subsequent sessions, therefore, they won't be included in the final count.
Output table is ordered by sessions count and user_id in descending order.
```

## Approach
Treat the graph as a set of connected components. Count the number of users with zero incoming edges (pure viewers). Each such user must either become a streamer or follow an existing streamer. The minimum operations equal the number of pure viewers minus one (if there is at least one existing streamer), otherwise it equals the number of users minus one.

```text
FUNCTION minOperations(n, follows):
    indegree ← ARRAY of size n initialized to 0
    FOR each [u, v] IN follows:
        indegree[v-1] ← indegree[v-1] + 1
    viewerCount ← COUNT of i where indegree[i] = 0
    streamerExists ← ANY indegree[i] > 0
    IF streamerExists:
        RETURN viewerCount - 1
    ELSE:
        RETURN n - 1
```

## Walkthrough
For the first example:
- indegree: [1,0,1,0] → viewers = {2,4}, streamers exist.
- Operations = 2 - 1 = 1.

## Complexity Analysis
- **Time:** O(m + n) where m is number of follow edges.
- **Space:** O(n) for the indegree array.

## Follow‑Up Questions
1. How would the solution change if each user could follow multiple streamers simultaneously?
2. Can we minimize the total number of added edges while also minimizing the maximum indegree of any streamer?
3. What if the graph must remain acyclic after adding edges?

## Key Takeaway
Counting users with zero indegree reveals the minimal number of edge additions needed to convert pure viewers into streamers.
