# 1223. Dice Roll Simulation

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/dice-roll-simulation](https://leetcode.com/problems/dice-roll-simulation)
**Companies:** Akuna Capital

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DP with Face and Consecutive Count](#approach-dp-with-face-and-consecutive-count)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

A die simulator generates a random number from `1` to `6` for each roll. You have a constraint array `rollMax[i]` meaning the die cannot roll number `i` more than `rollMax[i]` **consecutive** times.

Given `n` (number of rolls) and `rollMax`, return the number of distinct sequences that can be obtained. Return the answer modulo `10^9 + 7`.

**Constraints:**
- `1 <= n <= 5000`
- `rollMax.length == 6`
- `1 <= rollMax[i] <= 15`

---

## Examples

**Example 1:**
```
Input: n = 2, rollMax = [1,1,2,2,2,3]
Output: 34
Explanation: With 2 rolls and these constraints, there are 34 valid sequences.
  Face 1 can appear at most 1 time consecutively → can't roll [1,1]
  Face 2 can appear at most 1 time consecutively → can't roll [2,2]
  36 total - 2 invalid = 34
```

**Example 2:**
```
Input: n = 2, rollMax = [1,1,1,1,1,1]
Output: 30
Explanation: No face can repeat → 6 × 5 = 30
```

---

## Key Insight

> Track the state as `(roll number, last face, consecutive count of that face)`. At each roll, you either continue the same face (if consecutive count < rollMax) or switch to a different face (resetting count to 1).

---

## Approach: DP with Face and Consecutive Count ✅

State: `dp[i][j][k]` = number of sequences of length `i` where the last face is `j` (0-5) and it has appeared `k` consecutive times at the end.

```
FUNCTION dieSimulator(n, rollMax):
    MOD ← 10^9 + 7
    // dp[face][consecutiveCount]
    // Initialize: after 1 roll
    dp = array[6][16] of 0
    FOR j ← 0 TO 5:
        dp[j][1] = 1

    FOR roll ← 2 TO n DO
        newDp = array[6][16] of 0
        FOR j ← 0 TO 5 DO           // current face
            FOR prev ← 0 TO 5 DO    // previous face
                IF prev = j THEN
                    // Continue same face: extend consecutive count
                    FOR k ← 1 TO rollMax[j] - 1 DO
                        newDp[j][k+1] = (newDp[j][k+1] + dp[j][k]) MOD MOD
                ELSE
                    // Switch to different face: reset count to 1
                    FOR k ← 1 TO rollMax[prev] DO
                        newDp[j][1] = (newDp[j][1] + dp[prev][k]) MOD MOD
        dp = newDp

    // Sum all valid ending states
    result ← 0
    FOR j ← 0 TO 5 DO
        FOR k ← 1 TO rollMax[j] DO
            result = (result + dp[j][k]) MOD MOD
    RETURN result
END FUNCTION
```

---

## Walkthrough

```
n = 2, rollMax = [1,1,2,2,2,3]
```

**After roll 1:** Each face appears once: `dp[j][1] = 1` for j = 0..5.

**Roll 2 transitions:**
- Face 0 (max 1): can't continue (k+1=2 > 1), can switch from others → `newDp[0][1] = 5`
- Face 1 (max 1): same → `newDp[1][1] = 5`
- Face 2 (max 2): continue from dp[2][1] → `newDp[2][2] = 1`, switch from others → `newDp[2][1] = 5`
- Face 3 (max 2): similarly → `newDp[3][2] = 1, newDp[3][1] = 5`
- Face 4 (max 2): similarly → `newDp[4][2] = 1, newDp[4][1] = 5`
- Face 5 (max 3): continue → `newDp[5][2] = 1`, switch → `newDp[5][1] = 5`

Total = 5+5+5+1+5+1+5+1+5+1 = **34** ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n × 6 × 6 × maxK) | n rolls × 6 faces × 6 prev faces × max consecutive |
| **Space** | O(6 × maxK) | Two DP layers |

With maxK ≤ 15: O(n × 6 × 6 × 15) ≈ O(540n) — very fast.

---

## Follow-Up Questions

**Q1: Can you optimize to O(n × 6) with prefix sums?**
> Yes — instead of tracking each consecutive count separately, track the total for each face and subtract the over-counted sequences. This reduces the state to `dp[face]` with a correction term.

**Q2: What if all rollMax values are infinity?**
> No constraints → answer is `6^n`.

**Q3: How does this relate to string problems with run-length constraints?**
> Same DP structure — track (position, last character, run length). Common in problems limiting consecutive identical characters.

---

## Key Takeaway

> **When consecutive repetitions are constrained, add a "run length" dimension to your DP state — `dp[position][value][consecutive_count]` captures exactly which transitions are valid.**
