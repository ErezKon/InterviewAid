# 3316. Find Maximum Removals From Source String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-maximum-removals-from-source-string](https://leetcode.com/problems/find-maximum-removals-from-source-string)
**Companies:** Google

---

## Problem Description
> *Note: the previous description omitted `targetIndices` (only indices listed there may be removed); the Approach/Walkthrough below may not account for it.*

You are given a string `source` of size `n`, a string `pattern` that is a subsequence of `source`, and a **sorted** integer array `targetIndices` that contains **distinct** numbers in the range `[0, n - 1]`.

We define an **operation** as removing a character at an index `idx` from `source` such that:

- `idx` is an element of `targetIndices`.
- `pattern` remains a subsequence of `source` after removing the character.

Performing an operation **does not** change the indices of the other characters in `source`. For example, if you remove `'c'` from `"acb"`, the character at index 2 would still be `'b'`.

Return the **maximum** number of *operations* that can be performed.

**Constraints:**
- `1 <= n == source.length <= 3 * 10^3`
- `1 <= pattern.length <= n`
- `1 <= targetIndices.length <= n`
- `targetIndices` is sorted in ascending order.
- The input is generated such that `targetIndices` contains distinct elements in the range `[0, n - 1]`.
- `source` and `pattern` consist only of lowercase English letters.
- The input is generated such that `pattern` appears as a subsequence in `source`.

## Examples
```
Example 1:
  Input: source = "abbaa", pattern = "aba", targetIndices = [0,1,2]
  Output: 1
  Explanation: We can't remove source[0] but we can do either of these two operations:
  - Remove source[1], so that source becomes "a_baa".
  - Remove source[2], so that source becomes "ab_aa".
```

```
Example 2:
  Input: source = "bcda", pattern = "d", targetIndices = [0,3]
  Output: 2
  Explanation: We can remove source[0] and source[3] in two operations.
```

```
Example 3:
  Input: source = "dda", pattern = "dda", targetIndices = [0,1,2]
  Output: 0
  Explanation: We can't remove any character from source.
```

```
Example 4:
  Input: source = "yeyeykyded", pattern = "yeyyd", targetIndices = [0,2,3,4]
  Output: 2
  Explanation: We can remove source[2] and source[3] in two operations.
```

## Approach
The problem can be solved with a **two-pointer greedy** strategy combined with a binary search on the answer.
1. Pre-compute for each position in `s` the earliest index in `t` it can match when scanning from left to right (`leftMatch`).
2. Similarly compute from right to left (`rightMatch`).
3. Binary search the number `k` of removals. For a candidate `k`, mark the first `k` removable indices (given by the removal order) and check if `t` is still a subsequence using the pre-computed matches.

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
Consider `s = "abcde"`, `t = "ace"`, removal order `[1,3,0,2,4]` (0-based indices). Binary search tests `k = 2`:
1. Removed indices `{1,3}` → characters `'b'` and `'d'` are gone.
2. Remaining string = `"ace"`.
3. Scanning confirms `t` is a subsequence, so `k = 2` is feasible. Trying `k = 3` fails because removing index `0` would delete `'a'`.
Thus the maximum removable count is `2`.

## Complexity Analysis
*Pre-processing*: O(|s|) time, O(|s|) space.
*Binary search*: O(log |s|) iterations, each `canKeep` runs O(|s|). Overall O(|s| log |s|) time, O(|s|) extra space.

## Follow-Up Questions
1. How would the solution change if removals must be contiguous?
2. Can the algorithm be adapted to return the actual set of removable indices?
3. What if `t` itself can also be modified (e.g., characters can be replaced) while preserving a subsequence relationship?

## Key Takeaway
By pre-computing prefix and suffix match information and binary searching the removal count, we can efficiently determine the maximum deletions while still keeping the target as a subsequence.
