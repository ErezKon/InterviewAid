# 1745. Palindrome Partitioning IV

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/palindrome-partitioning-iv](https://leetcode.com/problems/palindrome-partitioning-iv)
**Companies:** Tcs

---

## Problem Description
Given a string `s`, return `true` *if it is possible to split the string* `s` *into three **non-empty** palindromic substrings. Otherwise, return* `false`.

A string is said to be palindrome if it the same string when reversed.

**Constraints:**

- `3 <= s.length <= 2000`
- `s` consists only of lowercase English letters.

## Examples

```
Example 1:
  Input: s = "abcbdd"
  Output: true
  Explanation: "abcbdd" = "a" + "bcb" + "dd", and all three substrings are palindromes.
```

```
Example 2:
  Input: s = "bcbddxy"
  Output: false
  Explanation: s cannot be split into 3 palindromes.
```

## Approach
Use dynamic programming. Pre‑compute `isPalin[i][j]` indicating whether `s[i..j]` is a palindrome. Then define `dp[i][c]` as whether the prefix `s[0..i]` can be split into exactly `c` palindromic substrings. Transition: for each end index `i` and possible cut position `j ≤ i`, if `isPalin[j][i]` is true and `dp[j-1][c-1]` is true, then `dp[i][c]` becomes true.

```text
FUNCTION canPartitionKPalindromes(s, k):
    n ← LEN(s)
    // palindrome table
    isPalin ← MATRIX n×n FALSE
    FOR r ← n-1 DOWNTO 0:
        FOR c ← r TO n-1:
            isPalin[r][c] ← (s[r] = s[c]) AND (c - r <= 2 OR isPalin[r+1][c-1])
    // dp[i][c] → prefix 0..i can be split into c palindromes
    dp ← MATRIX n×(k+1) FALSE
    FOR i ← 0 TO n-1:
        IF isPalin[0][i]:
            dp[i][1] ← TRUE
        FOR c ← 2 TO k:
            FOR j ← 1 TO i:
                IF isPalin[j][i] AND dp[j-1][c-1]:
                    dp[i][c] ← TRUE
                    BREAK
    RETURN dp[n-1][k]
```

## Walkthrough
Consider `s = "aab"`, `k = 2`.
1. `isPalin` table true for (0,0), (1,1), (2,2), (0,1) because "aa".
2. Initialize `dp`:
   - `dp[0][1]` true ("a").
   - `dp[1][1]` true ("aa").
3. For `c = 2` and `i = 2` (char 'b'):
   - Check `j = 2`: `isPalin[2][2]` true and `dp[1][1]` true → `dp[2][2]` becomes true.
Result: `dp[2][2]` true → return `true`.

## Complexity Analysis
- **Time:** O(n²·k) – building the palindrome table O(n²) and DP transitions O(n²·k).
- **Space:** O(n² + n·k) for the palindrome table and DP matrix.

## Follow-Up Questions
1. How can the space be reduced to O(n·k) by computing palindromes on the fly?
2. How would you modify the algorithm to also output one valid partition when it exists?
3. What changes are needed if the order of substrings does not matter (i.e., you can reorder pieces)?

## Key Takeaway
Pre‑computing palindrome substrings lets a DP efficiently answer whether a string can be split into an exact number of palindrome pieces.
