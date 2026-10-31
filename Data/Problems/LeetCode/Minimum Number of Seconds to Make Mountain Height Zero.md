# 3296. Minimum Number of Seconds to Make Mountain Height Zero

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-seconds-to-make-mountain-height-zero](https://leetcode.com/problems/minimum-number-of-seconds-to-make-mountain-height-zero)
**Companies:** Amazon, Google, Meta

---

## Problem Description

You are given an integer `mountainHeight` denoting the height of a mountain.

You are also given an integer array `workerTimes` representing the work time of workers in **seconds**.

Each worker may reduce the mountain's height by any **non-negative integer** amount. If worker i` reduces the height by x`, then:

  reducing the first unit of height takes workerTimes[i]` seconds,
  reducing the second unit takes workerTimes[i] * 2` seconds,
  ...
  reducing the x`-th unit takes workerTimes[i] * x` seconds.

The total time spent by worker i` is the sum of the times required for all x` units they reduce. As all workers operate simultaneously, the total time required is the **maximum** time spent by any worker.

Return an integer representing the **minimum** number of seconds required for the workers to make the height of the mountain 0.

**Constraints:**
- `1 <= mountainHeight <= 10^5`
- `1 <= workerTimes.length <= 10^4`
- `1 <= workerTimes[i] <= 10^6`

## Examples

**Example 1:**
```
Input: mountainHeight = 4, workerTimes = [2,1,1]
Output: 3
Explanation: One way the height of the mountain can be reduced to 0 is:
- Worker 0 reduces the height by 1, taking workerTimes[0] = 2 seconds.
- Worker 1 reduces the height by 2, taking workerTimes[1] + workerTimes[1] * 2 = 3 seconds.
- Worker 2 reduces the height by 1, taking workerTimes[2] = 1 second.
Since they work simultaneously, the minimum time needed is max(2, 3, 1) = 3 seconds.
```

**Example 2:**
```
Input: mountainHeight = 10, workerTimes = [3,2,2,4]
Output: 12
Explanation: - Worker 0 reduces the height by 2, taking workerTimes[0] + workerTimes[0] * 2 = 9 seconds.
- Worker 1 reduces the height by 3, taking workerTimes[1] + workerTimes[1] * 2 + workerTimes[1] * 3 = 12 seconds.
- Worker 2 reduces the height by 3, taking workerTimes[2] + workerTimes[2] * 2 + workerTimes[2] * 3 = 12 seconds.
- Worker 3 reduces the height by 2, taking workerTimes[3] + workerTimes[3] * 2 = 12 seconds.
The number of seconds needed is max(9, 12, 12, 12) = 12 seconds.
```

**Example 3:**
```
Input: mountainHeight = 5, workerTimes = [1]
Output: 15
Explanation: There is only one worker in this example, so the answer is workerTimes[0] + workerTimes[0] * 2 + workerTimes[0] * 3 + workerTimes[0] * 4 + workerTimes[0] * 5 = 15.
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

## Follow-Up Questions
1. How would the solution change if each worker could only work once?
2. What if workers have a maximum number of units they can reduce?
3. Can you extend the approach to handle fractional times?

## Key Takeaway
Binary searching the time and checking feasibility via a quadratic-solve per worker yields an efficient solution.
