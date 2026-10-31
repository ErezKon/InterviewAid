# 818. Race Car

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/race-car](https://leetcode.com/problems/race-car)
**Companies:** Amazon, Anduril, Google, Meta, Turing

---

## Problem Description
Your car starts at position `0` and speed `+1` on an infinite number line. Your car can go into negative positions. Your car drives automatically according to a sequence of instructions `'A'` (accelerate) and `'R'` (reverse):

- When you get an instruction `'A'`, your car does the following:
  - `position += speed`
  - `speed *= 2`
- When you get an instruction `'R'`, your car does the following:
  - If your speed is positive then `speed = -1`
  - otherwise `speed = 1`

  Your position stays the same.

For example, after commands `"AAR"`, your car goes to positions `0 --> 1 --> 3 --> 3`, and your speed goes to `1 --> 2 --> 4 --> -1`.

Given a target position `target`, return *the length of the shortest sequence of instructions to get there*.

**Constraints:**

- `1 <= target <= 10⁴`

## Examples

```
Example 1:
  Input: target = 3
  Output: 2
  Explanation:
    The shortest instruction sequence is "AA".
    Your position goes from 0 --> 1 --> 3.
```

```
Example 2:
  Input: target = 6
  Output: 5
  Explanation:
    The shortest instruction sequence is "AAARA".
    Your position goes from 0 --> 1 --> 3 --> 7 --> 7 --> 6.
```

## Approach
**Dynamic Programming (DP) – Bottom-Up**
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

## Follow-Up Questions
1. How would you adapt the solution for a target that could be negative?
2. Can the problem be solved with BFS in comparable time?
3. What if the car could also decelerate (speed halved) as an operation?

## Key Takeaway
By breaking the problem into overshoot and undershoot scenarios and using a DP table, we can compute the minimal instruction count efficiently for any target.
