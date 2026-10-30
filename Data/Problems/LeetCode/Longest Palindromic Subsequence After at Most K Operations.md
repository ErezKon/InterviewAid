# 3472. Longest Palindromic Subsequence After at Most K Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-palindromic-subsequence-after-at-most-k-operations](https://leetcode.com/problems/longest-palindromic-subsequence-after-at-most-k-operations)
**Companies:** Google

---

## 1. Problem Description

You are given a string `s` and an integer `k`.

In one operation, you can replace the character at any position with the next or previous letter in the alphabet (wrapping around so that `'a'` is after `'z'`). For example, replacing `'a'` with the next letter results in `'b'`, and replacing `'a'` with the previous letter results in `'z'`. Similarly, replacing `'z'` with the next letter results in `'a'`, and replacing `'z'` with the previous letter results in `'y'`.

Return the length of the **longest palindromic subsequence** of `s` that can be obtained after performing **at most** `k` operations.

**Constraints:**
- `1 <= s.length <= 200`
- `1 <= k <= 200`
- `s` consists of only lowercase English letters.

---

## 2. Approach: 2D DP with Cost Budget — O(n²·k) ✅

```
FUNCTION LongestPalindromicSubseqWithBudget(s, k):
    n ← LENGTH(s)
    CREATE dp[n][n][k+1] INITIALIZED TO 0
    FOR i ← n-1 DOWNTO 0:
        dp[i][i][0] ← 1
        FOR j ← i+1 TO n-1:
            FOR cost ← 0 TO k:
                IF s[i] == s[j]:
                    dp[i][j][cost] ← dp[i+1][j-1][cost] + 2
                ELSE:
                    dist ← CIRCULAR_DISTANCE(s[i], s[j])
                    IF cost >= dist:
                        dp[i][j][cost] ← dp[i+1][j-1][cost-dist] + 2
                    dp[i][j][cost] ← MAX(dp[i][j][cost], dp[i+1][j][cost], dp[i][j-1][cost])
    RETURN MAX(dp[0][n-1][c] FOR c IN 0..k)
```

---

## Examples

**Example 1:**
```
Input: s = "abced", k = 2
Output: 3
Explanation: - Replace s[1] with the next letter, and s becomes "acced".
- Replace s[4] with the previous letter, and s becomes "accec".
The subsequence "ccc" forms a palindrome of length 3, which is the maximum.
```

**Example 2:**
```
Input: s = "aaazzz", k = 4
Output: 6
Explanation: - Replace s[0] with the previous letter, and s becomes "zaazzz".
- Replace s[4] with the next letter, and s becomes "zaazaz".
- Replace s[3] with the next letter, and s becomes "zaaaaz".
The entire string forms a palindrome of length 6.
```

---

## Walkthrough

Consider `s = "abcd"`, `k = 2`.

| Step | i | j | cost used | dp[i][j][cost] |
|------|---|---|-----------|----------------|
| Init | 0 | 0 | 0 | 1 |
| Init | 1 | 1 | 0 | 1 |
| ... |   |   |   |   |
| Combine | 0 | 3 | 2 (change `a`→`d`) | 3 |

The algorithm explores changing characters to match ends while respecting the budget.

---

## Complexity Analysis

- **Time:** O(n²·k) – iterate over all substrings and possible budgets.
- **Space:** O(n²·k) – DP table storing results for each `(i, j, cost)`.

---

## Follow-Up Questions

1. How would the solution change if each character change had a different cost array?
2. Can the problem be solved in O(n·k) space using rolling arrays?
3. What if the budget `k` is unlimited – reduces to classic LPS.

---

## Key Takeaway

> Extension of standard LPS DP with a third dimension for change budget. Cost of matching `s[i]` to `s[j]` = min circular distance between the two characters.
