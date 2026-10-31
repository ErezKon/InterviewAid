# 936. Stamping The Sequence

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/stamping-the-sequence](https://leetcode.com/problems/stamping-the-sequence)
**Companies:** Morgan Stanley

---

## Problem Description

You are given two strings `stamp` and `target`. Initially, there is a string `s` of length `target.length` with all `s[i] == '?'`.

In one turn, you can place `stamp` over `s` and replace every letter in the `s` with the corresponding letter from `stamp`.

- For example, if `stamp = "abc"` and `target = "abcba"`, then `s` is `"?????"` initially. In one turn you can:

- place `stamp` at index `0` of `s` to obtain `"abc??"`,
- place `stamp` at index `1` of `s` to obtain `"?abc?"`, or
- place `stamp` at index `2` of `s` to obtain `"??abc"`.

  Note that `stamp` must be fully contained in the boundaries of `s` in order to stamp (i.e., you cannot place `stamp` at index `3` of `s`).

We want to convert `s` to `target` using **at most** `10 * target.length` turns.

Return *an array of the index of the left-most letter being stamped at each turn*. If we cannot obtain `target` from `s` within `10 * target.length` turns, return an empty array.

**Constraints:**
- `1 <= stamp.length <= target.length <= 1000`
- `stamp` and `target` consist of lowercase English letters.

## Examples

**Example 1:**
```
Input: stamp = "abc", target = "ababc"
Output: [0,2]
Explanation: Initially s = "?????".
- Place stamp at index 0 to get "abc??".
- Place stamp at index 2 to get "ababc".
[1,0,2] would also be accepted as an answer, as well as some other answers.
```

**Example 2:**
```
Input: stamp = "abca", target = "aabcaca"
Output: [3,0,1]
Explanation: Initially s = "???????".
- Place stamp at index 3 to get "???abca".
- Place stamp at index 0 to get "abcabca".
- Place stamp at index 1 to get "aabcaca".
```

## Approach
Work backwards: repeatedly find a window of length `m` that can be turned into all `'*'` (i.e., it matches `stamp` in all non-`'*'` positions). Replace that window with `'*'` and record the position. Continue until the whole string is `'*'` or no progress can be made. The recorded positions reversed give a valid stamping order.

## Walkthrough
For `stamp = "abc"`, `target = "ababc"`:
1. Scan windows of size 3. Window at index 2 (`"abc"`) matches fully → replace → `ab***` (record 2).
2. Scan again. Window at index 0 now sees `"ab*"`; non-`'*'` chars match `stamp` → replace → `*****` (record 0).
3. Reverse recorded list → `[0,2]`.

## Complexity Analysis
- Time: `O(n * m)` in the worst case because each replacement scans up to `m` characters and we may scan the string up to `n` times.
- Space: `O(n)` for the result list and mutable character array.

## Follow-Up Questions
1. Can the algorithm be optimized to `O(n)` using a queue of “ready” windows?
2. How would the solution change if stamping could replace characters with any other character, not just `'*'`?
3. What is the minimum number of stamps needed for a given `target` without constructing the sequence?

## Key Takeaway
By stamping from right to left—converting windows that are already compatible—you can greedily achieve the target in linear passes, then reverse the recorded positions for a valid forward sequence.
