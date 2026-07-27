# 552. Student Attendance Record II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/student-attendance-record-ii](https://leetcode.com/problems/student-attendance-record-ii)
**Companies:** Bloomberg, Google, Sprinklr

---

## Approach: DP — O(n) ✅

```
FUNCTION checkRecord(n):
    MOD = 10^9 + 7
    // dp[a][l] = ways with 'a' absences and 'l' trailing lates
    dp = [[0]*3 for _ in range(2)]
    dp[0][0] = 1

    FOR _ ← 1 TO n:
        newDp = [[0]*3 for _ in range(2)]
        // Add P: resets trailing L
        FOR a IN [0,1]:
            newDp[a][0] = (newDp[a][0] + SUM(dp[a])) % MOD
        // Add L: extends trailing L
        FOR a IN [0,1]:
            FOR l IN [0,1]:
                newDp[a][l+1] = (newDp[a][l+1] + dp[a][l]) % MOD
        // Add A: resets trailing L, uses absence
        newDp[1][0] = (newDp[1][0] + SUM(dp[0])) % MOD
        dp = newDp

    RETURN SUM(SUM(row) for row in dp) % MOD
```
