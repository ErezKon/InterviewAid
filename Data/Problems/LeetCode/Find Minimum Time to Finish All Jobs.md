# 1723. Find Minimum Time to Finish All Jobs

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs](https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs)
**Companies:** Amazon, Google, Meta, Microsoft, Pinterest

---

## Problem Description
Given an array `jobs` where `jobs[i]` is the processing time of the *i*‑th job and an integer `k` representing the number of workers, assign each job to exactly one worker. The **finish time** of a worker is the sum of processing times of jobs assigned to them. Return the smallest possible value of the maximum finish time among all workers.

Constraints: `1 ≤ k ≤ jobs.length ≤ 12`, `1 ≤ jobs[i] ≤ 10⁷`.

## Examples
**Example 1**
```
Input: jobs = [3,2,3], k = 3
Output: 3
Explanation: Assign each job to a different worker; the maximum workload is 3.
```
**Example 2**
```
Input: jobs = [1,2,4,7,8], k = 2
Output: 11
Explanation: One optimal distribution is {8,1,2} → 11 and {7,4} → 11.
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
