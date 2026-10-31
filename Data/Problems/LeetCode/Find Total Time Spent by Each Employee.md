# 1741. Find Total Time Spent by Each Employee

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-total-time-spent-by-each-employee](https://leetcode.com/problems/find-total-time-spent-by-each-employee)
**Companies:** Amazon, Google

---

## Problem Description

Table: `Employees`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| emp_id      | int  |
| event_day   | date |
| in_time     | int  |
| out_time    | int  |
+-------------+------+
(emp_id, event_day, in_time) is the primary key (combinations of columns with unique values) of this table.
The table shows the employees' entries and exits in an office.
event_day is the day at which this event happened, in_time is the minute at which the employee entered the office, and out_time is the minute at which they left the office.
in_time and out_time are between 1 and 1440.
It is guaranteed that no two events on the same day intersect in time, and in_time < out_time.
```

Write a solution to calculate the total time **in minutes** spent by each employee on each day at the office. Note that within one day, an employee can enter and leave more than once. The time spent in the office for a single entry is `out_time - in_time`.

Return the result table in **any order**.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Employees table:
+--------+------------+---------+----------+
| emp_id | event_day  | in_time | out_time |
+--------+------------+---------+----------+
| 1      | 2020-11-28 | 4       | 32       |
| 1      | 2020-11-28 | 55      | 200      |
| 1      | 2020-12-03 | 1       | 42       |
| 2      | 2020-11-28 | 3       | 33       |
| 2      | 2020-12-09 | 47      | 74       |
+--------+------------+---------+----------+
Output:
+------------+--------+------------+
| day        | emp_id | total_time |
+------------+--------+------------+
| 2020-11-28 | 1      | 173        |
| 2020-11-28 | 2      | 30         |
| 2020-12-03 | 1      | 41         |
| 2020-12-09 | 2      | 27         |
+------------+--------+------------+
Explanation:
Employee 1 has three events: two on day 2020-11-28 with a total of (32 - 4) + (200 - 55) = 173, and one on day 2020-12-03 with a total of (42 - 1) = 41.
Employee 2 has two events: one on day 2020-11-28 with a total of (33 - 3) = 30, and one on day 2020-12-09 with a total of (74 - 47) = 27.
```

## Approach
**Algorithm**: Hash Map aggregation.
1. Initialise an empty map `timeMap`.
2. Iterate over each log entry:
   - Compute `duration ← endTime - startTime`.
   - Add `duration` to `timeMap[employeeID]` (create entry if absent).
3. Convert the map to a list of `[employeeID, totalTime]` and sort by `employeeID`.

```text
FUNCTION TotalTime(logs):
    SET timeMap ← EMPTY MAP
    FOR EACH log IN logs:
        SET id ← log[0]
        SET start ← log[1]
        SET end ← log[2]
        SET duration ← end - start
        IF id NOT IN timeMap:
            SET timeMap[id] ← 0
        SET timeMap[id] ← timeMap[id] + duration
    SET result ← EMPTY LIST
    FOR EACH id, total IN timeMap:
        APPEND [id, total] TO result
    SORT result BY first element (id) ASCENDING
    RETURN result
```

## Walkthrough
For `logs = [[1,1,3],[2,2,5],[1,4,6]]`:
| Step | Log processed | timeMap after step |
|------|---------------|--------------------|
| 1    | [1,1,3]       | {1:2} |
| 2    | [2,2,5]       | {1:2, 2:3} |
| 3    | [1,4,6]       | {1:4, 2:3} |
After conversion and sorting → `[[1,4],[2,3]]`.

## Complexity Analysis
- **Time**: O(N log M) where N is number of logs and M is number of distinct employees (due to final sort). Without sorting, O(N).
- **Space**: O(M) for the hash map.

## Follow-Up Questions
1. How would you handle overlapping intervals for the same employee?
2. Can you compute the result in a single pass without an explicit sort?
3. How would you adapt the solution for a streaming input of logs?

## Key Takeaway
A simple hash-map aggregation efficiently groups and sums durations per employee, turning a list of logs into total work times.
