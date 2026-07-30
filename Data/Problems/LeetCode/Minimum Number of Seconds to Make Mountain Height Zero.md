# 3296. Minimum Number of Seconds to Make Mountain Height Zero

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-seconds-to-make-mountain-height-zero](https://leetcode.com/problems/minimum-number-of-seconds-to-make-mountain-height-zero)
**Companies:** Amazon, Google, Meta

---

## Problem Description
You are given an integer `mountainHeight` representing the height of a mountain and an array `workerTimes` where `workerTimes[i]` is the time (in seconds) a worker needs to reduce the height by one unit. In one second, a worker can reduce the height by at most one unit, and a worker can work multiple times. Determine the minimum number of seconds required to reduce the mountain height to zero using any combination of workers.

## Examples
**Example 1:**
```
mountainHeight = 4
workerTimes = [1,2]
Output: 3
Explanation: Use the first worker three times (1+1+1) = 3 seconds.
```
**Example 2:**
```
mountainHeight = 5
workerTimes = [2,3]
Output: 5
Explanation: Best schedule is 2+3 seconds using both workers.
```

## Approach
Binary search on the answer `T`. For a given time `T`, each worker with time `t` can contribute `k` units where `k*(k+1)/2 * t ≤ T`. Sum contributions across workers; if total ≥ `mountainHeight`, `T` is feasible.

```text
FUNCTION minNumberOfSeconds(mountainHeight, workerTimes):
    SET low ← 0
    SET high ← mountainHeight * MIN(workerTimes) * mountainHeight  // safe upper bound
    WHILE low < high:
        SET mid ← (low + high) // 2
        IF canFinish(mid, mountainHeight, workerTimes):
            high ← mid
        ELSE:
            low ← mid + 1
    RETURN low

FUNCTION canFinish(T, mountainHeight, workerTimes):
    SET total ← 0
    FOR each t IN workerTimes:
        // solve k such that k*(k+1)/2 * t ≤ T
        SET k ← FLOOR( (SQRT(1 + 8*T/t) - 1) / 2 )
        total ← total + k
        IF total ≥ mountainHeight: RETURN TRUE
    RETURN FALSE
```

## Walkthrough
For `mountainHeight = 4`, `workerTimes = [1,2]`:
1. Binary search range `[0, 16]`.
2. Mid = 8 → contributions: worker 1 → k=3 (3*4/2*1=6≤8), worker 2 → k=2 (2*3/2*2=6≤8). Total=5≥4 → feasible, set high=8.
3. Continue until low converges to 3, the minimal seconds.

## Complexity Analysis
- Time: `O(log U * w)` where `U` is the upper bound and `w` is number of workers (binary search iterations × workers).
- Space: `O(1)`.

## Follow‑Up Questions
1. How would the solution change if each worker could only work once?
2. What if workers have a maximum number of units they can reduce?
3. Can you extend the approach to handle fractional times?

## Key Takeaway
Binary searching the time and checking feasibility via a quadratic‑solve per worker yields an efficient solution.
