# 818. Race Car

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/race-car](https://leetcode.com/problems/race-car)
**Companies:** Amazon, Anduril, Google, Meta, Turing

---

## Problem Description
You control a car that starts at position `0` with speed `+1`. At each instruction you can either **Accelerate** (`A`) which moves the car forward by its current speed and then doubles the speed, or **Reverse** (`R`) which changes the direction of the speed to `+1` if it was negative or `-1` if it was positive (speed magnitude resets to `1`). Given a target position `target` (positive integer), determine the minimum number of instructions required to reach exactly that position.

## Examples
**Example 1:**
```
target = 3
Output: 2
Explanation: A -> position 1, speed 2; A -> position 3.
```
**Example 2:**
```
target = 6
Output: 5
Explanation: A, A, R, A, A reaches position 6.
```

## Approach
**Dynamic Programming (DP) – Bottom‑Up**
For each position `t` from `1` to `target` compute the minimal instructions `dp[t]`. Let `k` be the smallest integer such that `2^k - 1 >= t`. Two cases:
1. **Exact overshoot:** If `2^k - 1 == t`, then `dp[t] = k`.
2. **Overshoot then reverse:** Reach `2^k - 1` (k moves), reverse, and move back the excess.
3. **Undershoot, reverse, then continue:** Try stopping one acceleration short (`2^{k-1} - 1`), reverse, make `j` accelerations, reverse again, and finish.
The recurrence evaluates these possibilities and keeps the minimum.

```text
FUNCTION racecar(target):
    SET dp ← ARRAY of size target+1 filled with 0
    FOR t ← 1 TO target:
        SET k ← CEIL(LOG2(t + 1))
        IF (1 << k) - 1 == t:
            SET dp[t] ← k
            CONTINUE
        // Overshoot then reverse
        SET dp[t] ← k + 1 + dp[(1 << k) - 1 - t]
        // Undershoot, reverse, then continue
        FOR j ← 0 TO k - 2:
            SET distance ← (1 << (k - 1)) - 1 - (1 << j) + 1
            SET remain ← t - distance
            SET dp[t] ← MIN(dp[t], k - 1 + j + 2 + dp[remain])
    RETURN dp[target]
```

## Walkthrough
Target `6`:
- `k = 3` because `2^3-1 = 7 >= 6`.
- Overshoot case: `dp[6] = 3 + 1 + dp[7-6] = 4 + dp[1] = 5`.
- Undershoot loop (`j = 0,1`): yields larger values, so minimum is `5`.
Thus the optimal sequence is `A A R A A`.

## Complexity Analysis
Time: O(target * log target) due to the inner loop over `j` (at most `log target`).
Space: O(target) for the DP array.

## Follow‑Up Questions
1. How would you adapt the solution for a target that could be negative?
2. Can the problem be solved with BFS in comparable time?
3. What if the car could also decelerate (speed halved) as an operation?

## Key Takeaway
By breaking the problem into overshoot and undershoot scenarios and using a DP table, we can compute the minimal instruction count efficiently for any target.
