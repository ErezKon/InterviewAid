# 552. Student Attendance Record II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/student-attendance-record-ii](https://leetcode.com/problems/student-attendance-record-ii)
**Companies:** Bloomberg, Google, Sprinklr

---

## Problem Description

An attendance record for a student can be represented as a string where each character signifies whether the student was absent, late, or present on that day. The record only contains the following three characters:

- `'A'`: Absent.
- `'L'`: Late.
- `'P'`: Present.

Any student is eligible for an attendance award if they meet **both** of the following criteria:

- The student was absent (`'A'`) for **strictly** fewer than 2 days **total**.
- The student was **never** late (`'L'`) for 3 or more **consecutive** days.

Given an integer `n`, return *the **number** of possible attendance records of length* `n` *that make a student eligible for an attendance award. The answer may be very large, so return it **modulo*** `10^9 + 7`.

**Constraints:**
- `1 <= n <= 10^5`

## Examples

**Example 1:**
```
Input: n = 2
Output: 8
Explanation: There are 8 records with length 2 that are eligible for an award:
"PP", "AP", "PA", "LP", "PL", "AL", "LA", "LL"
Only "AA" is not eligible because there are 2 absences (there need to be fewer than 2).
```

**Example 2:**
```
Input: n = 1
Output: 3
```

**Example 3:**
```
Input: n = 10101
Output: 183236316
```

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
