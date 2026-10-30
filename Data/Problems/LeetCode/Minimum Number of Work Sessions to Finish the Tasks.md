# 1986. Minimum Number of Work Sessions to Finish the Tasks

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks](https://leetcode.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks)
**Companies:** Amazon, Swiggy

---

## Problem Description

There are `n` tasks assigned to you. The task times are represented as an integer array `tasks` of length `n`, where the `i^th` task takes `tasks[i]` hours to finish. A **work session** is when you work for **at most** `sessionTime` consecutive hours and then take a break.

You should finish the given tasks in a way that satisfies the following conditions:

- If you start a task in a work session, you must complete it in the **same** work session.
- You can start a new task **immediately** after finishing the previous one.
- You may complete the tasks in **any order**.

Given `tasks` and `sessionTime`, return *the **minimum** number of **work sessions** needed to finish all the tasks following the conditions above.*

The tests are generated such that `sessionTime` is **greater** than or **equal** to the **maximum** element in `tasks[i]`.

**Constraints:**
- `n == tasks.length`
- `1 <= n <= 14`
- `1 <= tasks[i] <= 10`
- `max(tasks[i]) <= sessionTime <= 15`

## Examples

**Example 1:**
```
Input: tasks = [1,2,3], sessionTime = 3
Output: 2
Explanation: You can finish the tasks in two work sessions.
- First work session: finish the first and the second tasks in 1 + 2 = 3 hours.
- Second work session: finish the third task in 3 hours.
```

**Example 2:**
```
Input: tasks = [3,1,3,1,1], sessionTime = 8
Output: 2
Explanation: You can finish the tasks in two work sessions.
- First work session: finish all the tasks except the last one in 3 + 1 + 3 + 1 = 8 hours.
- Second work session: finish the last task in 1 hour.
```

**Example 3:**
```
Input: tasks = [1,2,3,4,5], sessionTime = 15
Output: 1
Explanation: You can finish all the tasks in one work session.
```

## Approach
Use **DP with Bitmask**. Each subset of tasks is represented by a bitmask. For every mask we store the minimum number of sessions needed and the remaining time in the last session. Transition by adding an unused task to the current session if it fits, otherwise start a new session.

## Walkthrough
| Step | Mask (binary) | Sessions | Remaining time |
|------|---------------|----------|----------------|
| Start | 0000 | 1 | sessionTime |
| Add task 0 (1) | 0001 | 1 | 3 |
| Add task 1 (2) | 0011 | 1 | 1 |
| Add task 2 (3) – does not fit, start new | 0111 | 2 | 1 |
| … | … | … | … |
The final mask `1111` yields 2 sessions.

## Complexity Analysis
Time: O(2^n * n) – each mask iterates over n tasks.
Space: O(2^n) – DP table for masks.

## Follow‑Up Questions
* How would the solution change if the number of sessions is limited?
* Can we output the actual grouping of tasks, not just the count?
* What if tasks can be split across sessions?

## Key Takeaway
Bitmask DP efficiently explores all task groupings, enabling the minimum‑session count by tracking sessions and remaining time for each subset.
