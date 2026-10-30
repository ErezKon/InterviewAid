# 2323. Find Minimum Time to Finish All Jobs II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs-ii](https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs-ii)
**Companies:** Amazon

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given two **0-indexed** integer arrays `jobs` and `workers` of **equal** length, where `jobs[i]` is the amount of time needed to complete the `i^th` job, and `workers[j]` is the amount of time the `j^th` worker can work each day.

Each job should be assigned to **exactly** one worker, such that each worker completes **exactly** one job.

Return *the **minimum** number of days needed to complete all the jobs after assignment.*

**Constraints:**
- `n == jobs.length == workers.length`
- `1 <= n <= 10^5`
- `1 <= jobs[i], workers[i] <= 10^5`

## Examples

**Example 1:**
```
Input: jobs = [5,2,4], workers = [1,7,5]
Output: 2
Explanation: - Assign the 2^nd worker to the 0^th job. It takes them 1 day to finish the job.
- Assign the 0^th worker to the 1^st job. It takes them 2 days to finish the job.
- Assign the 1^st worker to the 2^nd job. It takes them 1 day to finish the job.
It takes 2 days for all the jobs to be completed, so return 2.
It can be proven that 2 days is the minimum number of days needed.
```

**Example 2:**
```
Input: jobs = [3,18,15,9], workers = [6,5,1,3]
Output: 3
Explanation: - Assign the 2^nd worker to the 0^th job. It takes them 3 days to finish the job.
- Assign the 0^th worker to the 1^st job. It takes them 3 days to finish the job.
- Assign the 1^st worker to the 2^nd job. It takes them 3 days to finish the job.
- Assign the 3^rd worker to the 3^rd job. It takes them 3 days to finish the job.
It takes 3 days for all the jobs to be completed, so return 3.
It can be proven that 3 days is the minimum number of days needed.
```

## Approach
The answer lies between `max(jobs)` (the fastest possible maximum) and `sum(jobs)` (all jobs to one worker). Perform binary search on this range. For a candidate limit `mid`, check if we can assign all jobs to at most `k` workers without any worker exceeding `mid`. The feasibility check is a depth‑first search with pruning:
- Sort jobs in descending order to place large jobs first.
- Try to put the current job into each worker whose current load + job ≤ `mid`.
- Skip symmetric states by not placing a job into an empty worker if a previous empty worker was already tried.
If the DFS succeeds, `mid` is feasible; otherwise, increase the lower bound.

## Walkthrough
| Step | Workers loads (k=2) | Current job | Decision |
|------|--------------------|------------|----------|
| 1    | [0,0]              | 8          | Put into worker 1 → [8,0]
| 2    | [8,0]              | 7          | Put into worker 2 → [8,7]
| 3    | [8,7]              | 4          | Worker 2 can take 4 (7+4≤11) → [8,11]
| 4    | [8,11]             | 2          | Worker 1 can take 2 (8+2≤11) → [10,11]
| 5    | [10,11]            | 1          | Worker 1 can take 1 (10+1≤11) → [11,11]
All jobs placed with max load 11, so 11 is feasible.

## Complexity Analysis
- Binary search runs `O(log sum(jobs))` iterations.
- Each feasibility check explores at most `k^n` states, but pruning reduces it dramatically; with `n ≤ 12` it runs comfortably.
Overall time: `O(k^n · log sum)` (acceptable for the given limits). Space: `O(k)` for worker loads plus recursion stack `O(n)`.

## Follow‑Up Questions
1. How would the solution change if `k` could be larger than `jobs.length`?
2. Can the problem be solved with dynamic programming using bitmasking?
3. What if each worker has a different speed factor?

## Key Takeaway
Binary search on the answer combined with a backtracking feasibility check efficiently finds the optimal workload distribution.
