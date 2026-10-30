# 1723. Find Minimum Time to Finish All Jobs

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs](https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs)
**Companies:** Amazon, Google, Meta, Microsoft, Pinterest

---

## Problem Description

You are given an integer array `jobs`, where `jobs[i]` is the amount of time it takes to complete the `i^th` job.

There are `k` workers that you can assign jobs to. Each job should be assigned to **exactly** one worker. The **working time** of a worker is the sum of the time it takes to complete all jobs assigned to them. Your goal is to devise an optimal assignment such that the **maximum working time** of any worker is **minimized**.

*Return the **minimum** possible **maximum working time** of any assignment. *

**Constraints:**
- `1 <= k <= jobs.length <= 12`
- `1 <= jobs[i] <= 10^7`

## Examples

**Example 1:**
```
Input: jobs = [3,2,3], k = 3
Output: 3
Explanation: By assigning each person one job, the maximum time is 3.
```

**Example 2:**
```
Input: jobs = [1,2,4,7,8], k = 2
Output: 11
Explanation: Assign the jobs the following way:
Worker 1: 1, 2, 8 (working time = 1 + 2 + 8 = 11)
Worker 2: 4, 7 (working time = 4 + 7 = 11)
The maximum working time is 11.
```

## Approach
The optimal maximum load lies between `max(jobs)` and `sum(jobs)`. Perform binary search on this range. For each candidate `mid`, run a backtracking feasibility check:
- Sort jobs descending to place large jobs first.
- Recursively try to assign the current job to any worker whose load + job ≤ `mid`.
- Prune symmetric states by skipping placement into another empty worker after the first.
If all jobs can be placed, `mid` is feasible; otherwise increase the lower bound.

## Walkthrough
| Step | Worker loads (k=2) | Current job | Decision |
|------|--------------------|------------|----------|
| 1    | [0,0]              | 8          | Place in worker 1 → [8,0]
| 2    | [8,0]              | 7          | Place in worker 2 → [8,7]
| 3    | [8,7]              | 4          | Worker 2 can take 4 (7+4≤11) → [8,11]
| 4    | [8,11]             | 2          | Worker 1 can take 2 (8+2≤11) → [10,11]
| 5    | [10,11]            | 1          | Worker 1 can take 1 (10+1≤11) → [11,11]
All jobs placed with max load 11, confirming feasibility.

## Complexity Analysis
Binary search: `O(log sum(jobs))` iterations.
Feasibility check: worst‑case `O(k^n)` but heavily pruned; with `n ≤ 12` it is fast.
Overall time: `O(k^n · log sum)`; Space: `O(k + n)` for worker loads and recursion stack.

## Follow‑Up Questions
1. How would the algorithm adapt if `k` could exceed `jobs.length`?
2. Can a DP with bitmasking solve the problem more deterministically?
3. What changes if workers have different speed multipliers?

## Key Takeaway
Binary search on the answer combined with a pruned backtracking check efficiently yields the minimal possible maximum workload.
