# 1661. Average Time of Process per Machine

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/average-time-of-process-per-machine](https://leetcode.com/problems/average-time-of-process-per-machine)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft, Mindtree

---

## Problem Description
Given a table `Activity(machine_id, process_id, activity_type, timestamp)` where each process on a machine has a `'start'` and `'end'` activity, compute the average processing time for each machine. The processing time for a process is `end.timestamp - start.timestamp`. Return the average (rounded to three decimal places) per `machine_id`.

## Examples
- **Input Table:**
  | machine_id | process_id | activity_type | timestamp |
  |------------|------------|---------------|-----------|
  | 1 | 101 | start | 10 |
  | 1 | 101 | end   | 15 |
  | 1 | 102 | start | 20 |
  | 1 | 102 | end   | 30 |
  **Output:** `machine_id 1 -> 7.500`
  *Explanation:* Process 101 duration 5, 102 duration 10, average = (5+10)/2 = 7.5.

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

## Follow‑Up Questions
1. How would you handle missing `'end'` records?
2. Extend the query to compute median processing time per machine.
3. What indexes would optimise the self‑join?

## Key Takeaway
Self‑joining the activity log on matching start/end rows lets you compute per‑process durations, which can then be averaged per machine.
