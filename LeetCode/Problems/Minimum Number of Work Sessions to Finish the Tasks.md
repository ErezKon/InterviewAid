# 1986. Minimum Number of Work Sessions to Finish the Tasks

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks](https://leetcode.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks)
**Companies:** Amazon, Swiggy

---

## Problem Description
Given an array `tasks` where `tasks[i]` is the duration of the i‑th task and an integer `sessionTime` representing the maximum allowed time per work session, partition the tasks into the minimum number of sessions such that the sum of durations in each session does not exceed `sessionTime`.

## Examples
**Example 1**
```
Input: tasks = [1,2,3,4], sessionTime = 4
Output: 2
Explanation: One optimal partition is [1,3] and [2,4].
```
**Example 2**
```
Input: tasks = [2,2,2,2,2], sessionTime = 3
Output: 5
Explanation: Each task must be in its own session because any two exceed the limit.
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
