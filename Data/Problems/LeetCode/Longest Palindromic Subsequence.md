# 516. Longest Palindromic Subsequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-palindromic-subsequence](https://leetcode.com/problems/longest-palindromic-subsequence)
**Companies:** Accenture, Amazon, Bloomberg, Goldman Sachs, Google, Infosys, Linkedin, Maq Software, Meta, Microsoft, Nutanix, Tcs, Uber, Zoho

---

## Problem Description
Given a string `s`, find the length of the longest subsequence of `s` that is also a palindrome. A subsequence is derived by deleting zero or more characters without changing the order of the remaining characters.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| "bbbab" | 4 | The longest palindromic subsequence is "bbbb". |
| "cbbd" | 2 | The longest palindromic subsequence is "bb". |

## Approach
Use **Dynamic Programming** on intervals. `dp[i][j]` stores the length of the longest palindromic subsequence within `s[i..j]`.

```text
FUNCTION longestPalindromeSubseq(s):
    n ← LENGTH(s)
    CREATE dp[n][n] INITIALIZED TO 0
    FOR i FROM n-1 DOWNTO 0:
        dp[i][i] ← 1
        FOR j FROM i+1 TO n-1:
            IF s[i] == s[j]:
                dp[i][j] ← dp[i+1][j-1] + 2
            ELSE:
                dp[i][j] ← MAX(dp[i+1][j], dp[i][j-1])
    RETURN dp[0][n-1]
```
The same result can be obtained via **LCS** between `s` and its reverse.

## Walkthrough
Consider `s = "bbbab"` (n = 5):
1. Initialize diagonal `dp[i][i] = 1` for all i.
2. Fill table bottom‑up:
   - For i=3, j=4 (`a` vs `b`): dp[3][4] = 1.
   - For i=2, j=3 (`b` vs `a`): dp[2][3] = 1.
   - For i=2, j=4 (`b` vs `b`): dp[2][4] = dp[3][3] + 2 = 3.
   - Continue until dp[0][4] = 4.
3. Result `4` corresponds to subsequence "bbbb".

## Complexity Analysis
*Time*: **O(n²)** – each pair (i, j) is processed once.
*Space*: **O(n²)** – the DP table. Can be reduced to **O(n)** by keeping only two rows.

## Follow‑Up Questions
1. How would you adapt the solution to also return the actual subsequence, not just its length?
2. Can you solve the problem using only **O(n)** extra space?
3. How does the DP change if the input string can contain wildcard characters that match any letter?

## Key Takeaway
Interval DP captures the relationship between the ends of a substring: matching ends extend the palindrome, otherwise we drop one end and keep the best.
