# 555. Split Concatenated Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-concatenated-strings](https://leetcode.com/problems/split-concatenated-strings)
**Companies:** Alibaba

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode. The Approach/Walkthrough below solve an invented problem. Correct idea: first replace every string by the larger of itself and its reverse; then for each string `i` (both orientations) and each cut position `j` inside it, the candidate is `s_i[j:] + (all strings after i) + (all strings before i) + s_i[:j]`; return the maximum. O(L²).*

You are given an array of strings `strs`. You could concatenate these strings together into a loop, where for each string, you could choose to reverse it or not. Among all the possible loops

Return *the lexicographically largest string after cutting the loop, which will make the looped string into a regular one*.

Specifically, to find the lexicographically largest string, you need to experience two phases:

1. Concatenate all the strings into a loop, where you can reverse some strings or not and connect them in the same order as given.
2. Cut and make one breakpoint in any place of the loop, which will make the looped string into a regular one starting from the character at the cutpoint.

And your job is to find the lexicographically largest one among all the possible regular strings.

**Constraints:**
- `1 <= strs.length <= 1000`
- `1 <= strs[i].length <= 1000`
- `1 <= sum(strs[i].length) <= 1000`
- `strs[i]` consists of lowercase English letters.

## Examples

**Example 1:**
```
Input: strs = ["abc","xyz"]
Output: "zyxcba"
Explanation: You can get the looped string "-abcxyz-", "-abczyx-", "-cbaxyz-", "-cbazyx-", where '-' represents the looped status.
The answer string came from the fourth looped one, where you could cut from the middle character 'a' and get "zyxcba".
```

**Example 2:**
```
Input: strs = ["abc"]
Output: "cba"
```

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
