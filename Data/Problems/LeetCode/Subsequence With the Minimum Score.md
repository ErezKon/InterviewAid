# 2565. Subsequence With the Minimum Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/subsequence-with-the-minimum-score](https://leetcode.com/problems/subsequence-with-the-minimum-score)
**Companies:** Doordash

---

## Problem Description

You are given two strings `s` and `t`.

You are allowed to remove any number of characters from the string `t`.

The score of the string is `0` if no characters are removed from the string `t`, otherwise:

- Let `left` be the minimum index among all removed characters.
- Let `right` be the maximum index among all removed characters.

Then the score of the string is `right - left + 1`.

Return *the minimum possible score to make* `t` *a subsequence of* `s`*.*

A **subsequence** of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., `"ace"` is a subsequence of `"abcde"` while `"aec"` is not).

**Constraints:**
- `1 <= s.length, t.length <= 10^5`
- `s` and `t` consist of only lowercase English letters.

## Examples

**Example 1:**
```
Input: s = "abacaba", t = "bzaa"
Output: 1
Explanation: In this example, we remove the character "z" at index 1 (0-indexed).
The string t becomes "baa" which is a subsequence of the string "abacaba" and the score is 1 - 1 + 1 = 1.
It can be proven that 1 is the minimum score that we can achieve.
```

**Example 2:**
```
Input: s = "cde", t = "xyz"
Output: 3
Explanation: In this example, we remove characters "x", "y" and "z" at indices 0, 1, and 2 (0-indexed).
The string t becomes "" which is a subsequence of the string "cde" and the score is 2 - 0 + 1 = 3.
It can be proven that 3 is the minimum score that we can achieve.
```

## Approach
The score depends only on `left` and `right`, so we may as well remove the whole block `t[left..right]`: what remains is a prefix `t[0..i]` and a suffix `t[j..m-1]` that must together be a subsequence of `s`. Match greedily from both ends:
- `suf[j]` = the largest index in `s` such that `t[j..]` is a subsequence of `s[suf[j]..]` (greedy matching from the right; `suf[m] = n`, and `-1` if impossible).
- Walking the prefix greedily from the left, let `p` be the index in `s` where `t[i]` is matched. The suffix `t[j..]` fits after it iff `suf[j] > p`.

Because `p` only grows as `i` grows, the smallest valid `j` only moves right, so a two-pointer sweep finds the minimum `j − i − 1`. Also consider the empty prefix (remove `t[0..j-1]`, score `j`).

```text
FUNCTION MinimumScore(s, t):
    SET n ← LENGTH(s), m ← LENGTH(t)
    SET suf ← ARRAY of size m+1 filled with -1
    SET suf[m] ← n
    SET p ← n - 1
    FOR j FROM m-1 DOWNTO 0:
        WHILE p ≥ 0 AND s[p] ≠ t[j]: SET p ← p - 1
        IF p < 0: BREAK
        SET suf[j] ← p
        SET p ← p - 1
    SET j ← smallest index with suf[j] ≥ 0
    SET best ← j                         // empty prefix: remove t[0..j-1]
    IF best = 0: RETURN 0                // t is already a subsequence
    SET p ← 0
    FOR i FROM 0 TO m-1:
        WHILE p < n AND s[p] ≠ t[i]: SET p ← p + 1
        IF p = n: BREAK                  // prefix t[0..i] cannot be matched
        SET j ← MAX(j, i + 1)
        WHILE j < m AND suf[j] ≤ p: SET j ← j + 1
        SET best ← MIN(best, j - i - 1)
        SET p ← p + 1
    RETURN best
```

## Walkthrough
`s = "abacaba"` (indices 0..6), `t = "bzaa"`.

Suffix matching from the right:
| j | t[j] | matched at s index | suf[j] |
|---|------|--------------------|--------|
| 4 | - | - | 7 |
| 3 | a | 6 | 6 |
| 2 | a | 4 | 4 |
| 1 | z | not found | -1 |
| 0 | b | (stopped) | -1 |

Smallest `j` with `suf[j] ≥ 0` is 2 → `best = 2` (remove `"bz"`).

Prefix sweep:
| i | t[i] | p (match in s) | j after advancing | score `j − i − 1` | best |
|---|------|----------------|-------------------|-------------------|------|
| 0 | b | 1 | 2 (`suf[2] = 4 > 1`) | 1 | 1 |
| 1 | z | not found → stop | - | - | 1 |

Answer: 1 (remove only `t[1] = 'z'`), matching the expected output.

## Complexity Analysis
- **Time:** O(n + m) – each pointer moves monotonically.
- **Space:** O(m) for the `suf` array.

## Follow-Up Questions
- How would you return the actual `left` and `right` indices achieving the minimum?
- Can you solve it with binary search on the answer plus a sliding-window check, and what is its complexity?
- What if the score were the **number** of removed characters (not the span)? (It becomes a longest-common-subsequence problem.)

## Key Takeaway
When the cost depends only on the span of removals, remove a contiguous block; greedy prefix/suffix matching positions plus a monotone two-pointer sweep then solve it in linear time.
