# 1661. Average Time of Process per Machine

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/average-time-of-process-per-machine](https://leetcode.com/problems/average-time-of-process-per-machine)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft, Mindtree

---

## Problem Description
Table: `Activity`

```
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| machine_id     | int     |
| process_id     | int     |
| activity_type  | enum    |
| timestamp      | float   |
+----------------+---------+
The table shows the user activities for a factory website.
(machine_id, process_id, activity_type) is the primary key (combination of columns with unique values) of this table.
machine_id is the ID of a machine.
process_id is the ID of a process running on the machine with ID machine_id.
activity_type is an ENUM (category) of type ('start', 'end').
timestamp is a float representing the current time in seconds.
'start' means the machine starts the process at the given timestamp and 'end' means the machine ends the process at the given timestamp.
The 'start' timestamp will always be less than or equal to the 'end' timestamp for every (machine_id, process_id) pair.
It is guaranteed that each (machine_id, process_id) pair has a 'start' and 'end' timestamp.
```

There is a factory website that has several machines, each running one or more processes. Write a solution to find the **average time** each machine takes to complete a process.

The time to complete a process is the `'end' timestamp` minus the `'start' timestamp`. The average time is calculated by the total time to complete every process on the machine divided by the number of processes that were run on that machine.

The resulting table should have the `machine_id` along with the **average time** as `processing_time`, which should be **rounded to 3 decimal places**.

Return the result table in **any order**.

## Examples
```
Example 1:
  Input:
  Activity table:
  +------------+------------+---------------+-----------+
  | machine_id | process_id | activity_type | timestamp |
  +------------+------------+---------------+-----------+
  | 0          | 0          | start         | 0.712     |
  | 0          | 0          | end           | 1.520     |
  | 0          | 1          | start         | 3.140     |
  | 0          | 1          | end           | 4.120     |
  | 1          | 0          | start         | 0.550     |
  | 1          | 0          | end           | 1.550     |
  | 1          | 1          | start         | 0.430     |
  | 1          | 1          | end           | 1.420     |
  | 2          | 0          | start         | 4.100     |
  | 2          | 0          | end           | 4.512     |
  | 2          | 1          | start         | 2.500     |
  | 2          | 1          | end           | 5.000     |
  +------------+------------+---------------+-----------+
  Output:
  +------------+-----------------+
  | machine_id | processing_time |
  +------------+-----------------+
  | 0          | 0.894           |
  | 1          | 0.995           |
  | 2          | 1.456           |
  +------------+-----------------+
  Explanation:
  There are 3 machines running 2 processes each.
  Machine 0's average time is ((1.520 - 0.712) + (4.120 - 3.140)) / 2 = 0.894
  Machine 1's average time is ((1.550 - 0.550) + (1.420 - 0.430)) / 2 = 0.995
  Machine 2's average time is ((4.512 - 4.100) + (5.000 - 2.500)) / 2 = 1.456
```

## Approach
Join the table to itself on matching `machine_id` and `process_id` where one row is `'start'` and the other `'end'`. Compute the difference of timestamps, then aggregate with `AVG` per machine.

```text
SELECT a1.machine_id,
    ROUND(AVG(a2.timestamp - a1.timestamp), 3) AS processing_time
FROM Activity a1
JOIN Activity a2
    ON a1.machine_id = a2.machine_id
    AND a1.process_id = a2.process_id
    AND a1.activity_type = 'start'
    AND a2.activity_type = 'end'
GROUP BY a1.machine_id;
```

## Walkthrough
| a1 (start) | a2 (end) | diff | machine_id |
|------------|----------|------|------------|
| (1,101,start,10) | (1,101,end,15) | 5 | 1 |
| (1,102,start,20) | (1,102,end,30) | 10 | 1 |
Average for machine 1 = (5+10)/2 = 7.5.

## Complexity Analysis
- **Time:** O(n) for scanning the `Activity` rows; the join is handled by the DB engine.
- **Space:** O(n) for intermediate join results.

## Follow-Up Questions
1. How would you handle missing `'end'` records?
2. Extend the query to compute median processing time per machine.
3. What indexes would optimise the self-join?

## Key Takeaway
Self-joining the activity log on matching start/end rows lets you compute per-process durations, which can then be averaged per machine.
