# 1723. Find Minimum Time to Finish All Jobs

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs](https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs)
**Companies:** Amazon, Google, Meta, Microsoft, Pinterest

---

## Approach: Binary Search + Backtracking — O(k^n) with pruning ✅

```
FUNCTION minimumTimeRequired(jobs, k):
    SORT jobs in descending order

    lo, hi = MAX(jobs), SUM(jobs)
    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF canDistribute(jobs, k, mid): hi = mid
        ELSE: lo = mid + 1
    RETURN lo

FUNCTION canDistribute(jobs, k, limit):
    workers = [0] * k
    FUNCTION backtrack(idx):
        IF idx == len(jobs): RETURN true
        FOR i ← 0 TO k - 1:
            IF workers[i] + jobs[idx] <= limit:
                workers[i] += jobs[idx]
                IF backtrack(idx + 1): RETURN true
                workers[i] -= jobs[idx]
            IF workers[i] == 0: BREAK    // prune symmetric
        RETURN false
    RETURN backtrack(0)
```
