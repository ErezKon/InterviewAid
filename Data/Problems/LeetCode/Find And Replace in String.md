# 833. Find And Replace in String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-and-replace-in-string](https://leetcode.com/problems/find-and-replace-in-string)
**Companies:** Bloomberg, Google

---

## Problem Description

Simultaneously apply replacements to string `s`. For each `(index, source, target)`: if `source` matches at `index`, replace it with `target`. Replacements don't affect each other.

---

## Examples

| s | indices | sources | targets | Output |
|---|---------|---------|---------|--------|
| "abcd" | [0,2] | ["a","cd"] | ["eee","ffff"] | "eeebffff" |
| "abc" | [0,1] | ["a","b"] | ["c","d"] | "cdc" |

*Explanation*: In the first example, replace "a" at index 0 with "eee" and "cd" at index 2 with "ffff".

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
2. Apply operation at index 2: substring "cd" matches, replace → `"abffff"`.
3. Apply operation at index 0: substring "a" matches, replace → `"eeebffff"`.
4. Final string returned.

---

## Complexity Analysis

- **Time:** O(n + m log m) where *n* is length of `s` and *m* is number of operations (sorting dominates).
- **Space:** O(m) for storing sorted operations.

---

## Follow-Up Questions

- How would you handle overlapping replacements?
- Can you solve it without sorting, using a hash map of indices?
- Extend to support regex‑style pattern replacements.

---

## Key Takeaway

> **Sort replacements by index descending and apply right‑to‑left so earlier positions aren't shifted. Classic string mutation pattern.**