# 2323. Find Minimum Time to Finish All Jobs II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs-ii](https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs-ii)
**Companies:** Amazon

---

## Problem Description
Given an array `jobs` where `jobs[i]` is the time required to complete the *i*‑th job, and an integer `k` representing the number of workers, assign each job to exactly one worker. The **finish time** of a worker is the sum of times of jobs assigned to them. Return the minimum possible value of the maximum finish time among all workers.

Constraints typically include `1 ≤ k ≤ jobs.length ≤ 12` and `1 ≤ jobs[i] ≤ 10⁷`.

## Examples
**Example 1**
```
Input: jobs = [3,2,3], k = 3
Output: 3
Explanation: Assign each job to a different worker. The maximum workload is 3.
```
**Example 2**
```
Input: jobs = [1,2,4,7,8], k = 2
Output: 11
Explanation: One optimal assignment is {8,1,2} → 11 and {7,4} → 11. The maximum workload is 11.
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
