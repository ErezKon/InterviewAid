# 132. Palindrome Partitioning II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/palindrome-partitioning-ii](https://leetcode.com/problems/palindrome-partitioning-ii)
**Companies:** Amazon, Bloomberg, Google, Josh Technology, Meta, Microsoft, Mykaarma, Nutanix, Scaler, Zeta

---

## Problem Description
Given a string *s*, partition it into the fewest possible substrings such that each substring is a palindrome. Return the minimum number of cuts needed to achieve this.

## Examples
**Example 1:**
```
Input: "aab"
Output: 1
Explanation: Split into "aa" | "b", one cut.
```
**Example 2:**
```
Input: "a"
Output: 0
Explanation: The string is already a palindrome; no cuts needed.
```

## Approach
Use dynamic programming. Pre‑compute a table `isPalin[i][j]` indicating whether `s[i..j]` is a palindrome. Then `dp[i]` stores the minimum cuts for the prefix `s[0..i]`. For each `i`, if `s[0..i]` is a palindrome, `dp[i]=0`; otherwise try every possible cut position `j` and update `dp[i]` with `dp[j-1]+1` when `s[j..i]` is a palindrome.

```text
FUNCTION minCut(s):
    n ← LEN(s)
    // palindrome table
    isPalin ← MATRIX n×n FALSE
    FOR r ← n-1 DOWNTO 0:
        FOR c ← r TO n-1:
            isPalin[r][c] ← (s[r] = s[c]) AND (c - r <= 2 OR isPalin[r+1][c-1])
    dp ← ARRAY n WITH VALUE n   // worst case: cut each character
    FOR i ← 0 TO n-1:
        IF isPalin[0][i]:
            dp[i] ← 0
        ELSE:
            FOR j ← 1 TO i:
                IF isPalin[j][i]:
                    dp[i] ← MIN(dp[i], dp[j-1] + 1)
    RETURN dp[n-1]
```

## Walkthrough
Consider `s = "aab"` (n=3).
1. Build `isPalin` table → true for (0,0), (1,1), (2,2), (0,1) because "aa".
2. Compute `dp`:
   - i=0: `isPalin[0][0]` true → dp[0]=0.
   - i=1: `isPalin[0][1]` true → dp[1]=0.
   - i=2: `isPalin[0][2]` false, check j=1 (`isPalin[1][2]` false), j=2 (`isPalin[2][2]` true) → dp[2]=dp[1]+1=1.
Result = 1 cut.

## Complexity Analysis
- **Time:** O(n²) for building the palindrome table and DP loops.
- **Space:** O(n²) for the palindrome table plus O(n) for the DP array.

## Follow-Up Questions
1. How would you adapt the solution to also return the actual palindrome partitions?
2. Can the space usage be reduced to O(n) by checking palindromes on the fly?
3. How does the problem change if you are allowed to reorder the substrings?

## Key Takeaway
Pre‑computing palindrome substrings enables a simple DP that iteratively builds the minimum cut count for each prefix.
