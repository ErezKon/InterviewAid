# 664. Strange Printer

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/strange-printer](https://leetcode.com/problems/strange-printer)
**Companies:** Amazon, Bloomberg, Google, Inmobi, Intuit, Meta, Microsoft, Netease, Salesforce

---

## Problem Description

There is a strange printer with the following two special properties:

- The printer can only print a sequence of **the same character** each time.
- At each turn, the printer can print new characters starting from and ending at any place and will cover the original existing characters.

Given a string `s`, return *the minimum number of turns the printer needed to print it*.

**Constraints:**
- `1 <= s.length <= 100`
- `s` consists of lowercase English letters.

## Examples

**Example 1:**
```
Input: s = "aaabbb"
Output: 2
Explanation: Print "aaa" first and then print "bbb".
```

**Example 2:**
```
Input: s = "aba"
Output: 2
Explanation: Print "aaa" first and then print "b" from the second place of the string, which will cover the existing character 'a'.
```

## Approach
**Algorithm:** Interval Dynamic Programming.
- **Insight:** After removing consecutive duplicate characters, the optimal strategy for a substring `s[i..j]` either prints `s[i]` separately or merges it with a later occurrence of the same character to reduce turns.

### Pseudocode
```text
FUNCTION strangePrinter(s):
    // Remove consecutive duplicates to simplify
    s ← REMOVE_CONSECUTIVE_DUPLICATES(s)
    n ← LENGTH(s)
    CREATE dp[n][n]
    FOR i ← 0 TO n-1:
        dp[i][i] ← 1
    FOR length ← 2 TO n:
        FOR i ← 0 TO n - length:
            j ← i + length - 1
            dp[i][j] ← dp[i+1][j] + 1  // print s[i] alone
            FOR k ← i+1 TO j:
                IF s[k] = s[i]:
                    // Merge printing of s[i] with s[k]
                    dp[i][j] ← MIN(dp[i][j], dp[i+1][k] + dp[k+1][j])
    RETURN dp[0][n-1]
```

## Walkthrough
Consider `s = "aba"` after deduplication remains `"aba"`.
| i | j | Substring | Computation | dp[i][j] |
|---|---|-----------|-------------|----------|
|0|0|`a`|base|1|
|1|1|`b`|base|1|
|2|2|`a`|base|1|
|0|1|`ab`|dp[1][1]+1=2|2|
|1|2|`ba`|dp[2][2]+1=2|2|
|0|2|`aba`|dp[1][2]+1=3, but s[2]=`a` matches s[0] → min( dp[1][2] + dp[3][2]=2 )|2|
Result = 2 turns.

## Complexity Analysis
- **Time:** O(n³) due to three nested loops over the string length.
- **Space:** O(n²) for the DP table.

## Follow-Up Questions
- How would the solution change if the printer could print any substring (not necessarily contiguous) of the same character?
- Can the DP be optimized to O(n²) by precomputing matching character positions?
- What is the answer for very long strings with only a few distinct characters?

## Key Takeaway
Interval DP captures the ability to merge printing of identical characters across a substring, yielding the minimal number of turns.
