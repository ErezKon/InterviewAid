# 1741. Find Total Time Spent by Each Employee

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-total-time-spent-by-each-employee](https://leetcode.com/problems/find-total-time-spent-by-each-employee)
**Companies:** Amazon, Google

---

## Problem Description
You are given a list of log entries `logs`, where each entry is `[employeeID, startTime, endTime]`. For every employee, compute the total time they spent working, i.e., the sum of `(endTime - startTime)` across all their logs. Return an array of `[employeeID, totalTime]` sorted by `employeeID`.

## Examples
| logs | Output |
|------|--------|
| [[1,1,3],[2,2,5],[1,4,6]] | [[1,4],[2,3]] |
| [[3,10,15],[3,20,25]] | [[3,10]] |
*Explanation*: Employee 1 works 2 + 2 = 4 units, employee 2 works 3 units, employee 3 works 5 + 5 = 10 units.

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
A simple hash‑map aggregation efficiently groups and sums durations per employee, turning a list of logs into total work times.
