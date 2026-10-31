# 555. Split Concatenated Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-concatenated-strings](https://leetcode.com/problems/split-concatenated-strings)
**Companies:** Alibaba

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

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
Every string that is not cut should be oriented to its lexicographically larger form (`max(s, reverse(s))`), because it appears as a contiguous block in the middle of the answer. Only the string containing the cut point needs both orientations tried. So: normalize all strings, then for each string `i`, each orientation `t` of it, and each cut position `j` inside `t`, build the candidate `t[j:] + (strings after i) + (strings before i) + t[:j]` and keep the maximum.

**Pseudocode**
```text
FUNCTION splitLoopedString(strs):
    FOR k ← 0 TO LENGTH(strs) - 1:
        SET strs[k] ← MAX(strs[k], REVERSE(strs[k]))
    SET best ← ""
    FOR i ← 0 TO LENGTH(strs) - 1:
        SET mid ← CONCAT(strs[i+1 ..]) + CONCAT(strs[.. i-1])
        FOR t IN [strs[i], REVERSE(strs[i])]:
            FOR j ← 0 TO LENGTH(t) - 1:
                SET cand ← t[j:] + mid + t[:j]
                IF cand > best:
                    SET best ← cand
    RETURN best
```

## Walkthrough
`strs = ["abc","xyz"]`

Normalize: `"abc"` → `"cba"`, `"xyz"` → `"zyx"`, so `strs = ["cba","zyx"]`.

| i | mid | t | j | candidate |
|---|-----|---|---|-----------|
| 0 | `"zyx"` | `"cba"` | 0,1,2 | `"cbazyx"`, `"bazyxc"`, `"azyxcb"` |
| 0 | `"zyx"` | `"abc"` | 0,1,2 | `"abczyx"`, `"bczyxa"`, `"czyxab"` |
| 1 | `"cba"` | `"zyx"` | 0 | `"zyxcba"` |
| 1 | `"cba"` | `"zyx"` | 1,2 | `"yxcbaz"`, `"xcbazy"` |
| 1 | `"cba"` | `"xyz"` | 0,1,2 | `"xyzcba"`, `"yzcbax"`, `"zcbaxy"` |

The maximum is `"zyxcba"` (beats `"zcbaxy"` at index 1: `'y' > 'c'`). Output: `"zyxcba"`.

## Complexity Analysis
- **Time:** `O(L²)` where `L = sum(strs[i].length)`: there are `2L` cut candidates, each built and compared in `O(L)`.
- **Space:** `O(L)` for the current candidate and the best string.

## Follow-Up Questions
1. Why is it safe to fix the orientation of every string except the one being cut?
2. How could you prune candidates, e.g. only cut at positions where `t[j]` equals the maximum character overall?
3. How would you find the lexicographically largest rotation of a single string in `O(n)` (Booth's algorithm / Duval)?

## Key Takeaway
Greedy normalization (each uncut piece takes its larger orientation) reduces the exponential choice of reversals to just trying every cut point in both orientations of one string, giving a simple `O(L²)` enumeration.
