# 471. Encode String with Shortest Length

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/encode-string-with-shortest-length](https://leetcode.com/problems/encode-string-with-shortest-length)
**Companies:** Google

---

## Problem Description
Given a string `s`, encode it to the shortest possible length using the rule `k[encoded]` where `encoded` is a substring that repeats `k` times. The encoding may be applied recursively. Return the minimum length of the encoded string.

## Examples
```text
Input: s = "aaaaa"
Output: "5[a]"
Explanation: Repeating "a" five times can be encoded as "5[a]".

Input: s = "ababcababc"
Output: "2[ababc]"
Explanation: The whole string repeats twice.
```

## Approach
Dynamic programming on substrings. Let `dp[i][j]` be the shortest encoded length for `s[i..j]`. For each interval, try splitting at `k` and combine `dp[i][k] + dp[k+1][j]`. Also check if the substring can be represented as multiple repetitions of a pattern; if so, encode as `repeatCount[pattern]` where pattern length is the smallest period.

## Pseudocode
```text
FUNCTION encodeShortest(s):
    n ← LENGTH(s)
    CREATE dp[n][n] initialized to 0
    FOR len FROM 1 TO n:
        FOR i FROM 0 TO n - len:
            j ← i + len - 1
            SET dp[i][j] ← len   // no encoding
            // try all splits
            FOR k FROM i TO j-1:
                SET dp[i][j] ← MIN(dp[i][j], dp[i][k] + dp[k+1][j])
            // check repetition
            SET substr ← s[i..j]
            SET pattern ← smallestRepeatingPattern(substr)
            IF pattern EXISTS AND pattern != substr:
                SET repeat ← len / LENGTH(pattern)
                SET encodedLen ← LENGTH(str(repeat)) + 2 + dp[i][i+LENGTH(pattern)-1]
                SET dp[i][j] ← MIN(dp[i][j], encodedLen)
    RETURN dp[0][n-1]
```

## Walkthrough
| Substring | Best split/encoding | dp value |
|-----------|---------------------|----------|
| "aaaa"   | repeat 4 times → "4[a]" | 4 |
| "ababc"  | no repetition, keep length 5 | 5 |
| "ababcababc" | repeat 2 × "ababc" → "2[ababc]" | 8 |

## Complexity Analysis
- **Time:** O(n³) – three nested loops for interval length, start index, and split point.
- **Space:** O(n²) for the DP table.

## Follow‑Up Questions
- Can the algorithm be optimized to O(n²) using KMP to find repetitions?
- How would you modify it to output the actual encoded string, not just its length?
- What changes are needed if the encoding format allows nested encodings like `2[3[a]b]`?

## Key Takeaway
Dynamic programming over substrings combined with pattern detection yields the minimal encoding by exploring all possible splits and repetitions.
