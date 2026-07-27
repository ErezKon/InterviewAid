# 2365. Task Scheduler II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/task-scheduler-ii](https://leetcode.com/problems/task-scheduler-ii)
**Companies:** Amazon, Duolingo, Google, Meta, Nvidia, Rubrik

---

```
FUNCTION taskSchedulerII(tasks, space):
    lastDay = {}
    day = 0

    FOR task IN tasks:
        day += 1
        IF task IN lastDay:
            day = MAX(day, lastDay[task] + space + 1)
        lastDay[task] = day

    RETURN day
```
