# 2707. Extra Characters in a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/extra-characters-in-a-string](https://leetcode.com/problems/extra-characters-in-a-string)
**Companies:** Amazon, Google, Meta

---

## Problem Description

You are given a **0-indexed** string `s` and a dictionary of words `dictionary`. You have to break `s` into one or more **non-overlapping** substrings such that each substring is present in `dictionary`. There may be some **extra characters** in `s` which are not present in any of the substrings.

Return *the **minimum** number of extra characters left over if you break up* `s` *optimally.*

**Constraints:**
- `1 <= s.length <= 50`
- `1 <= dictionary.length <= 50`
- `1 <= dictionary[i].length <= 50`
- `dictionary[i]` and `s` consists of only lowercase English letters
- `dictionary` contains distinct words

---

## Examples

```
Example 1:
  Input: s = "leetscode", dictionary = ["leet","code","leetcode"]
  Output: 1
  Explanation: We can break s in two substrings: "leet" from index 0 to 3 and "code" from index 5 to 8. There is only 1 unused character (at index 4), so we return 1.
```

```
Example 2:
  Input: s = "sayhelloworld", dictionary = ["hello","world"]
  Output: 3
  Explanation: We can break s in two substrings: "hello" from index 3 to 7 and "world" from index 8 to 12. The characters at indices 0, 1, 2 are not used in any substring and thus are considered as extra characters. Hence, we return 3.
```

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