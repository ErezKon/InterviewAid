# 3291. Minimum Number of Valid Strings to Form Target I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-valid-strings-to-form-target-i](https://leetcode.com/problems/minimum-number-of-valid-strings-to-form-target-i)
**Companies:** Medianet

---

## Problem Description

You are given an array of strings `words` and a string `target`.

A string `x` is called **valid** if `x` is a prefix of **any** string in `words`.

Return the **minimum** number of **valid** strings that can be *concatenated* to form `target`. If it is **not** possible to form `target`, return `-1`.

**Constraints:**
- `1 <= words.length <= 100`
- `1 <= words[i].length <= 5 * 10^3`
- The input is generated such that `sum(words[i].length) <= 10^5`.
- `words[i]` consists only of lowercase English letters.
- `1 <= target.length <= 5 * 10^3`
- `target` consists only of lowercase English letters.

## Examples

**Example 1:**
```
Input: words = ["abc","aaaaa","bcdef"], target = "aabcdabc"
Output: 3
Explanation: The target string can be formed by concatenating:
- Prefix of length 2 of words[1], i.e. "aa".
- Prefix of length 3 of words[2], i.e. "bcd".
- Prefix of length 3 of words[0], i.e. "abc".
```

**Example 2:**
```
Input: words = ["abababab","ab"], target = "ababaababa"
Output: 2
Explanation: The target string can be formed by concatenating:
- Prefix of length 5 of words[0], i.e. "ababa".
- Prefix of length 5 of words[0], i.e. "ababa".
```

**Example 3:**
```
Input: words = ["abcdef"], target = "xyz"
Output: -1
```

## Approach
Treat the problem as a shortest‑path (DP) over the prefix of `target`. For each position `i`, try every word that matches the substring starting at `i`; if it matches, update `dp[i+len(word)]` with `dp[i] + 1`. The answer is `dp[n]` where `n` is `target` length.

### Pseudocode
```text
FUNCTION minValidStrings(target, words):
    SET n ← LENGTH(target)
    // dp[i] = minimum words to build prefix target[0:i]
    SET dp[0..n] ← ARRAY FILLED WITH INFINITY
    SET dp[0] ← 0
    FOR i ← 0 TO n-1:
        IF dp[i] = INFINITY: CONTINUE
        FOR w IN words:
            SET lenW ← LENGTH(w)
            IF i + lenW ≤ n AND target[i : i+lenW] = w:
                SET dp[i+lenW] ← MIN(dp[i+lenW], dp[i] + 1)
    RETURN dp[n] IF dp[n] ≠ INFINITY ELSE -1
```

## Walkthrough
For `target = "leetcode"` and `words = ["leet","code","co","de"]`:
1. `dp[0]=0`. At `i=0`, word "leet" matches, set `dp[4]=1`.
2. At `i=4`, word "code" matches, set `dp[8]=2`.
3. End of loop, `dp[8]=2` → answer `2`.

## Complexity Analysis
- **Time:** O(n * m * L) where `m` is number of words and `L` average word length (matching substrings).
- **Space:** O(n) for the DP array.

## Follow-Up Questions
- How would you modify the solution if each word has an associated cost and you need to minimize total cost?
- Can the approach be extended to return the actual sequence of words used?
- What changes are needed if words can be used at most once?

## Key Takeaway
Dynamic programming over the target prefix, trying all matching words, yields the minimum count of words needed to form the target.
