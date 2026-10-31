# 2365. Task Scheduler II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/task-scheduler-ii](https://leetcode.com/problems/task-scheduler-ii)
**Companies:** Amazon, Duolingo, Google, Meta, Nvidia, Rubrik

---

## Problem Description
You are given a **0-indexed** array of positive integers `tasks`, representing tasks that need to be completed **in order**, where `tasks[i]` represents the **type** of the `i`-th task.

You are also given a positive integer `space`, which represents the **minimum** number of days that must pass **after** the completion of a task before another task of the **same** type can be performed.

Each day, until all tasks have been completed, you must either:

- Complete the next task from `tasks`, or
- Take a break.

Return *the **minimum** number of days needed to complete all tasks*.

**Constraints:**
- `1 <= tasks.length <= 10^5`
- `1 <= tasks[i] <= 10^9`
- `1 <= space <= tasks.length`

## Examples
```
Example 1:
  Input: tasks = [1,2,1,2,3,1], space = 3
  Output: 9
  Explanation: One way to complete all tasks in 9 days is as follows:
  Day 1: Complete the 0th task.
  Day 2: Complete the 1st task.
  Day 3: Take a break.
  Day 4: Take a break.
  Day 5: Complete the 2nd task.
  Day 6: Complete the 3rd task.
  Day 7: Take a break.
  Day 8: Complete the 4th task.
  Day 9: Complete the 5th task.
  It can be shown that the tasks cannot be completed in less than 9 days.
```
```
Example 2:
  Input: tasks = [5,8,8,5], space = 2
  Output: 6
  Explanation: One way to complete all tasks in 6 days is as follows:
  Day 1: Complete the 0th task.
  Day 2: Complete the 1st task.
  Day 3: Take a break.
  Day 4: Take a break.
  Day 5: Complete the 2nd task.
  Day 6: Complete the 3rd task.
  It can be shown that the tasks cannot be completed in less than 6 days.
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
Example 1: `tasks = [1,2,1,2,3,1]`, `space = 3`.

| Step | task | day + 1 | cooldown bound | day after | lastDay map |
|------|------|---------|----------------|-----------|-------------|
| 1 | 1 | 1 | - | 1 | {1:1} |
| 2 | 2 | 2 | - | 2 | {1:1, 2:2} |
| 3 | 1 | 3 | 1+3+1 = 5 | 5 | {1:5, 2:2} |
| 4 | 2 | 6 | 2+3+1 = 6 | 6 | {1:5, 2:6} |
| 5 | 3 | 7 | - | 7 | {1:5, 2:6, 3:7} |
| 6 | 1 | 8 | 5+3+1 = 9 | 9 | {1:9, 2:6, 3:7} |

**Output: 9.** Example 2 (`[5,8,8,5]`, `space = 2`) gives days 1, 2, 5, 6 -> **6**.

## Complexity Analysis
- Time: O(n) where n is the number of tasks, each processed once.
- Space: O(k) for the hash map storing last execution day of each distinct task type (k ≤ n).

## Follow-Up Questions
1. How would the solution change if multiple tasks could be performed in a single day?
2. What if the cooldown period varies per task type?
3. Can you extend the approach to output the actual schedule (including idle days)?

## Key Takeaway
Track the last execution day of each task and greedily schedule each next task at the earliest day that satisfies the cooldown.
