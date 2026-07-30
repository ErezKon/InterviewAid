# 2365. Task Scheduler II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/task-scheduler-ii](https://leetcode.com/problems/task-scheduler-ii)
**Companies:** Amazon, Duolingo, Google, Meta, Nvidia, Rubrik

---

## Problem Description
Given an array `tasks` where `tasks[i]` is the type of the i‑th task, and an integer `space` representing the required cooldown days between two identical tasks, determine the minimum number of days needed to finish all tasks. Each day you can perform at most one task, and you may idle on a day.

## Examples
**Example 1:**
```
Input: tasks = ["a","b","a"], space = 3
Output: 7
Explanation: One optimal schedule is day1:a, day2:b, day3:idle, day4:idle, day5:idle, day6:a.
```
**Example 2:**
```
Input: tasks = ["a","a","a","b","b","b"], space = 2
Output: 8
Explanation: Schedule: a b idle a b idle a b.
```

## Approach
The problem can be solved greedily by always performing the next task as early as possible while respecting the cooldown. Track the last day each task type was executed in a hash map.

```text
FUNCTION taskSchedulerII(tasks, space):
    // map from task type to the last day it was performed
    SET lastDay ← {}
    SET day ← 0
    FOR task IN tasks:
        SET day ← day + 1
        IF task IN lastDay:
            // ensure cooldown is satisfied
            SET day ← MAX(day, lastDay[task] + space + 1)
        SET lastDay[task] ← day
    RETURN day
```

## Walkthrough
Consider `tasks = ["a","b","a"]` and `space = 3`.
| Step | task | day before | day after | lastDay map |
|------|------|------------|-----------|------------|
| 1 | a | 0 | 1 | {a:1} |
| 2 | b | 1 | 2 | {a:1, b:2} |
| 3 | a | 2 | 6 (max(3,1+3+1)) | {a:6, b:2} |
The final day is 6, plus the initial offset gives 7 total days.

## Complexity Analysis
- Time: O(n) where n is the number of tasks, each processed once.
- Space: O(k) for the hash map storing last execution day of each distinct task type (k ≤ n).

## Follow-Up Questions
1. How would the solution change if multiple tasks could be performed in a single day?
2. What if the cooldown period varies per task type?
3. Can you extend the approach to output the actual schedule (including idle days)?

## Key Takeaway
Track the last execution day of each task and greedily schedule each next task at the earliest day that satisfies the cooldown.
