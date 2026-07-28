# 2707. Extra Characters in a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/extra-characters-in-a-string](https://leetcode.com/problems/extra-characters-in-a-string)
**Companies:** Amazon, Google, Meta

---

## Problem Description

Given string `s` and a dictionary, break `s` into non-overlapping substrings from the dictionary. Return the **minimum number of extra characters** left over (not part of any dictionary word).

---

## Examples

| Input | Dictionary | Output | Explanation |
|-------|------------|--------|-------------|
| `"leetscode"` | `["leet","code","leetcode"]` | `1` | The substring "leet" and "code" can be used, leaving the extra character "s".
| `"applepie"` | `["apple","pie","app","le"]` | `0` | The whole string can be segmented as "apple" + "pie" with no extra characters.
| `"abcd"` | `["ab","cd"]` | `0` | Both "ab" and "cd" are in the dictionary, covering the entire string.

---

## Key Insight

> DP where `dp[i]` = min extra chars for `s[0..i-1]`. Either skip char `i` (dp[i-1]+1) or match a dictionary word ending at `i` (`dp[j]` if `s[j:i]` is in dictionary).

---

## Approach: DP — O(n² × L) ✅

```
FUNCTION minExtraChar(s, dictionary):
    wordSet = SET(dictionary); n = len(s)
    dp = [0] * (n + 1)
    FOR i ← 1 TO n:
        dp[i] = dp[i-1] + 1    // skip char
        FOR j ← 0 TO i - 1:
            IF s[j:i] IN wordSet: dp[i] = MIN(dp[i], dp[j])
    RETURN dp[n]
```

---

## Walkthrough

```
s = "leetscode", dictionary = ["leet","code","leetcode"]

dp[0]=0
dp[1]: skip='l' → 1. s[0:1]="l" ✗ → dp[1]=1
dp[2]: skip → 2. s[0:2]="le" ✗, s[1:2]="e" ✗ → dp[2]=2
dp[3]: skip → 3. No matches → dp[3]=3
dp[4]: skip → 4. s[0:4]="leet" ✅ → dp[0]=0 → dp[4]=0
dp[5]: skip → 1. s[0:5]..s[4:5]="s" ✗ → dp[5]=1
dp[6]-dp[8]: no matches → dp[8]=4
dp[9]: s[5:9]="code" ✅ → dp[5]=1 → dp[9]=1

Answer: 1 ✅ (the 's' is extra)
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n² × L) — L for hashing substring |
| **Space** | O(n + D) — dp + dictionary set |

---

## Key Takeaway

> **Word break variant: minimize leftover characters instead of checking feasibility. DP with substring matching against a set. Can optimize with Trie for large dictionaries.**