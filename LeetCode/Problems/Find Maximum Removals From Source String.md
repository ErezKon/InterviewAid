# 3316. Find Maximum Removals From Source String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-maximum-removals-from-source-string](https://leetcode.com/problems/find-maximum-removals-from-source-string)
**Companies:** Google

---

## Problem Description
Given a source string `s` and a target string `t`, you may remove characters from `s` in any order. After each removal, the remaining characters keep their original relative order. Find the maximum number of characters that can be removed while still being able to obtain `t` as a subsequence of the remaining string.

## Examples
**Example 1**
```
s = "abcde", t = "ace"
Maximum removals = 2  // remove 'b' and 'd', remaining "ace" contains t.
```
**Example 2**
```
s = "ababc", t = "abc"
Maximum removals = 1  // remove the second 'a' (index 2), remaining "abcb" still has "abc" as subsequence.
```

## Approach
The problem can be solved with a **two‑pointer greedy** strategy combined with a binary search on the answer.
1. Pre‑compute for each position in `s` the earliest index in `t` it can match when scanning from left to right (`leftMatch`).
2. Similarly compute from right to left (`rightMatch`).
3. Binary search the number `k` of removals. For a candidate `k`, mark the first `k` removable indices (given by the removal order) and check if `t` is still a subsequence using the pre‑computed matches.

### Pseudocode
```text
FUNCTION maxRemovals(s, t, removalOrder):
    n ← LENGTH(s)
    m ← LENGTH(t)
    // leftMatch[i] = earliest position in t matched up to s[i]
    leftMatch ← ARRAY of size n filled with -1
    j ← 0
    FOR i ← 0 TO n-1:
        IF j < m AND s[i] = t[j]:
            j ← j + 1
        leftMatch[i] ← j
    // rightMatch[i] = latest position in t matched from s[i] to end
    rightMatch ← ARRAY of size n filled with -1
    j ← m-1
    FOR i ← n-1 DOWNTO 0:
        IF j >= 0 AND s[i] = t[j]:
            j ← j - 1
        rightMatch[i] ← j
    // binary search answer
    lo ← 0; hi ← n
    WHILE lo < hi:
        mid ← (lo + hi + 1) // 2
        IF canKeep(mid, s, t, removalOrder, leftMatch, rightMatch):
            lo ← mid
        ELSE:
            hi ← mid - 1
    RETURN lo

FUNCTION canKeep(k, s, t, removalOrder, leftMatch, rightMatch):
    removed ← SET of first k indices from removalOrder
    i ← 0; j ← 0
    WHILE i < LENGTH(s) AND j < LENGTH(t):
        IF i IN removed:
            i ← i + 1
            CONTINUE
        IF s[i] = t[j]:
            j ← j + 1
        i ← i + 1
    RETURN j = LENGTH(t)
```

## Walkthrough
Consider `s = "abcde"`, `t = "ace"`, removal order `[1,3,0,2,4]` (0‑based indices). Binary search tests `k = 2`:
1. Removed indices `{1,3}` → characters `'b'` and `'d'` are gone.
2. Remaining string = `"ace"`.
3. Scanning confirms `t` is a subsequence, so `k = 2` is feasible. Trying `k = 3` fails because removing index `0` would delete `'a'`.
Thus the maximum removable count is `2`.

## Complexity Analysis
*Pre‑processing*: O(|s|) time, O(|s|) space.
*Binary search*: O(log |s|) iterations, each `canKeep` runs O(|s|). Overall O(|s| log |s|) time, O(|s|) extra space.

## Follow‑Up Questions
1. How would the solution change if removals must be contiguous?
2. Can the algorithm be adapted to return the actual set of removable indices?
3. What if `t` itself can also be modified (e.g., characters can be replaced) while preserving a subsequence relationship?

## Key Takeaway
By pre‑computing prefix and suffix match information and binary searching the removal count, we can efficiently determine the maximum deletions while still keeping the target as a subsequence.
