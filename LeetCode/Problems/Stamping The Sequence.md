# 936. Stamping The Sequence

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/stamping-the-sequence](https://leetcode.com/problems/stamping-the-sequence)
**Companies:** Morgan Stanley

---

## Problem Description
You are given a target string `target` and a stamp string `stamp` of equal length `m`. In one move you can place the stamp over `target` at any position `i` (0 ≤ i ≤ n‑m) and replace every character in the covered window with `'*'` **only** if the characters either already match `stamp` or are already `'*'`. The goal is to turn the entire `target` into all `'*'` characters using the minimum number of moves. Return any sequence of stamp positions that achieves this, or an empty array if impossible.

Constraints: `1 ≤ stamp.length ≤ target.length ≤ 10^4`; both strings consist of lowercase English letters.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `stamp = "abc"`, `target = "ababc"` | `[0,2]` | Stamp at position 2 → `ab***`; then at 0 → `*****`. |
| `stamp = "abca"`, `target = "aabcaca"` | `[3,0,1]` | One possible sequence of three moves. |

## Approach
Work backwards: repeatedly find a window of length `m` that can be turned into all `'*'` (i.e., it matches `stamp` in all non‑`'*'` positions). Replace that window with `'*'` and record the position. Continue until the whole string is `'*'` or no progress can be made. The recorded positions reversed give a valid stamping order.

## Walkthrough
For `stamp = "abc"`, `target = "ababc"`:
1. Scan windows of size 3. Window at index 2 (`"abc"`) matches fully → replace → `ab***` (record 2).
2. Scan again. Window at index 0 now sees `"ab*"`; non‑`'*'` chars match `stamp` → replace → `*****` (record 0).
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
