# 893. Groups of Special-Equivalent Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/groups-of-special-equivalent-strings](https://leetcode.com/problems/groups-of-special-equivalent-strings)
**Companies:** Meta

---

## 1. Problem Description

Two strings are *special‑equivalent* if you can swap characters at even indices among themselves and characters at odd indices among themselves any number of times to make the strings equal. Given an array of strings, count how many distinct groups of special‑equivalent strings exist.

---

## 2. Approach: Canonical Key — O(n·k) ✅

```
FUNCTION numSpecialEquivGroups(words):
    keys ← SET()
    FOR word IN words DO
        evenChars ← SORT([char FOR index, char IN ENUMERATE(word) IF index MOD 2 == 0])
        oddChars  ← SORT([char FOR index, char IN ENUMERATE(word) IF index MOD 2 == 1])
        keys.ADD((evenChars, oddChars))
    RETURN LENGTH(keys)
```

---

## 3. Examples

| words | Output |
|-------|--------|
| ["abc","acb","bac","bca","cab","cba"] | 3 |
| ["abcd","cdab","adcb","cbad"] | 1 |

*Explanation*: Each string’s even‑position characters and odd‑position characters are sorted to form a canonical key. Strings sharing the same key belong to the same group.

## 4. Walkthrough

1. Take "abc": even indices → "a","c" → sorted → "ac"; odd index → "b".
2. Canonical key = ("ac", "b").
3. Process "acb": even → "a","b" → "ab"; odd → "c" → key = ("ab", "c").
4. Continue for all strings; unique keys count = 3.

## 5. Complexity Analysis

- **Time:** O(n·k log k) where *n* is number of words and *k* is average word length (sorting each half).
- **Space:** O(n·k) for storing the set of canonical keys.

## 6. Follow‑Up Questions

- How would the solution change if swaps were allowed between any positions, not just even/odd?
- Can you extend the approach to handle Unicode characters?
- What is the impact on complexity if the alphabet size is very large?

## Key Takeaway

> Canonicalize each string by sorting its even‑indexed and odd‑indexed characters separately; identical canonical keys define a special‑equivalent group.
