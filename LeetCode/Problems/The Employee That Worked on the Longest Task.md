# 2432. The Employee That Worked on the Longest Task

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/the-employee-that-worked-on-the-longest-task](https://leetcode.com/problems/the-employee-that-worked-on-the-longest-task)
**Companies:** Ibm, Morgan Stanley

---

## Problem Description
Given a list of logs where each log is a tuple `[employee_id, start_time, end_time]`, compute the total working time for each employee and return the ID of the employee who worked the longest total time. If multiple employees tie, return the smallest ID.

## Examples
**Example 1:**
```
logs = [[0,1,3],[1,2,5],[0,6,9]]
Output: 0
Explanation: Employee 0 worked 5 units (2+3), employee 1 worked 3 units.
```
**Example 2:**
```
logs = [[1,0,10],[2,5,15],[1,20,30]]
Output: 1
Explanation: Employee 1 total = 20, employee 2 total = 10.
```

## Approach
Use a hash map to accumulate total time per employee, then iterate to find the maximum total (and smallest ID on tie).

## Walkthrough
| Step | employee_id | start | end | duration | map after step |
|------|-------------|-------|-----|----------|----------------|
| 1 | 0 | 1 | 3 | 2 | {0:2} |
| 2 | 1 | 2 | 5 | 3 | {0:2, 1:3} |
| 3 | 0 | 6 | 9 | 3 | {0:5, 1:3} |
Result: employee 0 has max total 5.

## Complexity Analysis
- Time: O(n) where n is number of logs.
- Space: O(m) for m distinct employees.

## Follow-Up Questions
1. How would you handle streaming logs where data cannot be stored entirely?
2. Extend to find top‑k employees with longest work time.
3. What if logs can overlap and you need total active time per employee?

## Key Takeaway
Accumulate per‑key aggregates with a hash map and then select the maximum efficiently.
