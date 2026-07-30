# 555. Split Concatenated Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-concatenated-strings](https://leetcode.com/problems/split-concatenated-strings)
**Companies:** Alibaba

---

## Problem Description
You are given a string `s` formed by concatenating several unknown substrings in order. The original substrings are unknown, but you know that each substring appears at least twice in `s`. Determine if `s` can be split into a sequence of substrings such that each substring occurs at least twice in the concatenation. Return `true` if possible, otherwise `false`.

## Examples
- **Input:** `s = "abcabcabc"`
  **Output:** `true`
  *Explanation:* Split as `["abc", "abc", "abc"]`; each part appears three times.
- **Input:** `s = "ababa"`
  **Output:** `false`
  *Explanation:* No valid split where every piece appears at least twice.

## Approach
Use dynamic programming. Let `dp[i]` be true if the prefix `s[0:i]` can be split according to the rule. For each position `i`, try all possible substring lengths `len` that end at `i`. A candidate substring `sub = s[i‑len:i]` is valid if it appears at least twice in the prefix `s[0:i]` (including the current occurrence). If `dp[i‑len]` is true and `sub` satisfies the frequency condition, set `dp[i] = true`.

```text
FUNCTION canSplitConcatenated(s):
    SET n ← LENGTH(s)
    SET dp ← ARRAY of size n+1 initialized to false
    SET dp[0] ← true
    FOR i ← 1 TO n:
        FOR len ← 1 TO i:
            SET sub ← s[i‑len : i]
            // Count occurrences of sub in prefix s[0:i]
            SET count ← 0
            FOR start ← 0 TO i‑len:
                IF s[start : start+len] == sub:
                    SET count ← count + 1
            IF count >= 2 AND dp[i‑len] == true:
                SET dp[i] ← true
                BREAK
    RETURN dp[n]
```

## Walkthrough
For `s = "abcabcabc"` (n=9):
- At `i=3`, `sub = "abc"` appears once → not enough.
- At `i=6`, `sub = "abc"` appears twice in prefix `"abcabc"`; `dp[3]` is false, but `sub` itself can start a new split, so `dp[6]` becomes true.
- At `i=9`, `sub = "abc"` appears three times; `dp[6]` is true, so `dp[9]` becomes true → overall `true`.

## Complexity Analysis
- **Time:** The double loop with substring counting leads to `O(n³)` in the worst case.
- **Space:** `O(n)` for the DP array.

## Follow‑Up Questions
1. How can we improve the time complexity using a suffix automaton or rolling hash?
2. What if the requirement changes to each substring appearing exactly `k` times?
3. Can the problem be solved in linear time for binary strings?

## Key Takeaway
Dynamic programming combined with frequency checks on each candidate substring determines whether a concatenated string can be partitioned into repeatedly occurring pieces.
