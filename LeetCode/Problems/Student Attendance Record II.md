# 552. Student Attendance Record II

**Difficulty:** 🔴 Hard
**LeetCode:** https://leetcode.com/problems/student-attendance-record-ii
**Companies:** Bloomberg, Google, Sprinklr
---

## Problem Description
Given an integer `n`, count the number of possible attendance records of length `n` that are *rewardable*. A record is rewardable if it contains **strictly fewer than two** `'A'` (Absent) characters and **no** occurrence of three consecutive `'L'` (Late) characters. Return the count modulo `10^9 + 7`.

## Examples
| n | Output | Explanation |
|---|--------|-------------|
| 1 | 3 | "P", "L", "A" are all valid. |
| 2 | 8 | All combinations except "AA" and "LLL" (which is impossible at length 2). |
| 3 | 19 | Enumerating shows 19 rewardable strings of length 3. |

## Approach
Use dynamic programming where the state captures the number of `'A'` used (0 or 1) and the count of trailing `'L'` (0, 1, or 2). Transition by appending `'P'`, `'L'`, or `'A'` while respecting constraints.

### Pseudocode
```text
FUNCTION countRewardable(n):
    SET MOD ← 1_000_000_007
    // dp[a][l] = ways with a absences and l trailing lates
    CREATE dp[2][3] ← 0
    SET dp[0][0] ← 1
    FOR i FROM 1 TO n:
        CREATE newDp[2][3] ← 0
        // Append 'P' – resets trailing L
        FOR a IN [0,1]:
            SET sum ← dp[a][0] + dp[a][1] + dp[a][2]
            SET newDp[a][0] ← (newDp[a][0] + sum) MOD MOD
        // Append 'L' – increase trailing L if <2
        FOR a IN [0,1]:
            FOR l IN [0,1]:
                SET newDp[a][l+1] ← (newDp[a][l+1] + dp[a][l]) MOD MOD
        // Append 'A' – only if no previous A
        SET sum0 ← dp[0][0] + dp[0][1] + dp[0][2]
        SET newDp[1][0] ← (newDp[1][0] + sum0) MOD MOD
        SET dp ← newDp
    RETURN (dp[0][0] + dp[0][1] + dp[0][2] + dp[1][0] + dp[1][1] + dp[1][2]) MOD MOD
```

## Walkthrough
For `n = 2`:
| Step | a (absences) | l (trailing L) | Ways |
|------|--------------|----------------|------|
| Init | 0 | 0 | 1 |
| After 1st char 'P' | 0 | 0 | 1 |
| After 1st char 'L' | 0 | 1 | 1 |
| After 1st char 'A' | 1 | 0 | 1 |
| Combine transitions for second character yields total 8 ways (as in example). |

## Complexity Analysis
- **Time:** O(n) – each length iterates over constant 6 states.
- **Space:** O(1) – only two 2×3 tables are stored.

## Follow-Up Questions
1. How would you adapt the DP to also return the actual list of rewardable records for small `n`?
2. Can the solution be extended to allow up to `k` absences?
3. What is the impact on complexity if the maximum allowed consecutive lates changes from 2 to `m`?

## Key Takeaway
By compressing the problem into a small DP state of absences and trailing lates, we achieve linear time and constant space counting of rewardable attendance records.
