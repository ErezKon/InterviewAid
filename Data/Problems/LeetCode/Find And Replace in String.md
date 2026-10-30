# 833. Find And Replace in String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-and-replace-in-string](https://leetcode.com/problems/find-and-replace-in-string)
**Companies:** Bloomberg, Google

---

## Problem Description

You are given a **0-indexed** string `s` that you must perform `k` replacement operations on. The replacement operations are given as three **0-indexed** parallel arrays, `indices`, `sources`, and `targets`, all of length `k`.

To complete the `i^th` replacement operation:

1. Check if the **substring** `sources[i]` occurs at index `indices[i]` in the **original string** `s`.
2. If it does not occur, **do nothing**.
3. Otherwise if it does occur, **replace** that substring with `targets[i]`.

For example, if `s = "abcd"`, `indices[i] = 0`, `sources[i] = "ab"`, and `targets[i] = "eee"`, then the result of this replacement will be `"eeecd"`.

All replacement operations must occur **simultaneously**, meaning the replacement operations should not affect the indexing of each other. The testcases will be generated such that the replacements will **not overlap**.

- For example, a testcase with `s = "abc"`, `indices = [0, 1]`, and `sources = ["ab","bc"]` will not be generated because the `"ab"` and `"bc"` replacements overlap.

Return *the **resulting string** after performing all replacement operations on* `s`.

A **substring** is a contiguous sequence of characters in a string.

**Constraints:**

- `1 <= s.length <= 1000`
- `k == indices.length == sources.length == targets.length`
- `1 <= k <= 100`
- `0 <= indexes[i] < s.length`
- `1 <= sources[i].length, targets[i].length <= 50`
- `s` consists of only lowercase English letters.
- `sources[i]` and `targets[i]` consist of only lowercase English letters.

---

## Examples

```
Example 1:
  Input: s = "abcd", indices = [0, 2], sources = ["a", "cd"], targets = ["eee", "ffff"]
  Output: "eeebffff"
  Explanation:
  "a" occurs at index 0 in s, so we replace it with "eee".
  "cd" occurs at index 2 in s, so we replace it with "ffff".
```

```
Example 2:
  Input: s = "abcd", indices = [0, 2], sources = ["ab","ec"], targets = ["eee","ffff"]
  Output: "eeecd"
  Explanation:
  "ab" occurs at index 0 in s, so we replace it with "eee".
  "ec" does not occur at index 2 in s, so we do nothing.
```

---

## Approach: Process Right to Left — O(n) ✅

```text
FUNCTION findReplaceString(s, indices, sources, targets):
    ops ← zip(indices, sources, targets)
    SORT ops BY index DESCENDING
    FOR idx, src, tgt IN ops:
        IF s[idx:idx+LEN(src)] == src:
            s ← s[:idx] + tgt + s[idx+LEN(src):]
    RETURN s
```

Processing right‑to‑left ensures earlier indices remain valid after later replacements.

---

## Walkthrough

**Example 1** – `s = "abcd"`, `indices = [0,2]`, `sources = ["a","cd"]`, `targets = ["eee","ffff"]`
1. Pair and sort operations: `[(2,"cd","ffff"), (0,"a","eee")]`.
2. Apply operation at index 2: substring "cd" matches, replace → `"abffff"`.
3. Apply operation at index 0: substring "a" matches, replace → `"eeebffff"`.
4. Final string returned.

---

## Complexity Analysis

- **Time:** O(n + m log m) where *n* is length of `s` and *m* is number of operations (sorting dominates).
- **Space:** O(m) for storing sorted operations.

---

## Follow-Up Questions

- How would you handle overlapping replacements?
- Can you solve it without sorting, using a hash map of indices?
- Extend to support regex‑style pattern replacements.

---

## Key Takeaway

> **Sort replacements by index descending and apply right‑to‑left so earlier positions aren't shifted. Classic string mutation pattern.**
