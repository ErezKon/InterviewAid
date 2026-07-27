# 2141. Maximum Running Time of N Computers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-running-time-of-n-computers](https://leetcode.com/problems/maximum-running-time-of-n-computers)
**Companies:** Amazon, Bloomberg, Capital One, Deutsche Bank, Google, Meta

---

## Approach: Binary Search — O(m log S) ✅

```
FUNCTION maxRunTime(n, batteries):
    lo, hi = 0, SUM(batteries)

    WHILE lo < hi:
        mid = (lo + hi + 1) / 2
        // Can all n computers run for 'mid' minutes?
        // Each battery contributes min(charge, mid) minutes
        total = SUM(MIN(b, mid) for b in batteries)
        IF total >= n * mid:
            lo = mid
        ELSE:
            hi = mid - 1

    RETURN lo
```

Binary search on time. A battery with charge > T can only contribute T minutes to one computer.
