# 893. Groups of Special-Equivalent Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/groups-of-special-equivalent-strings](https://leetcode.com/problems/groups-of-special-equivalent-strings)
**Companies:** Meta

---

## 1. Problem Description

You are given an array of strings of the same length `words`.

In one **move**, you can swap any two even indexed characters or any two odd indexed characters of a string `words[i]`.

Two strings `words[i]` and `words[j]` are **special-equivalent** if after any number of moves, `words[i] == words[j]`.

- For example, `words[i] = "zzxy"` and `words[j] = "xyzz"` are **special-equivalent** because we may make the moves `"zzxy" -> "xzzy" -> "xyzz"`.

A **group of special-equivalent strings** from `words` is a non-empty subset of words such that:

- Every pair of strings in the group are special equivalent, and
- The group is the largest size possible (i.e., there is not a string `words[i]` not in the group such that `words[i]` is special-equivalent to every string in the group).

Return *the number of **groups of special-equivalent strings** from* `words`.

**Constraints:**
- `1 <= words.length <= 1000`
- `1 <= words[i].length <= 20`
- `words[i]` consist of lowercase English letters.
- All the strings are of the same length.

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

```
Example 1:
  Input: words = ["abcd","cdab","cbad","xyzz","zzxy","zzyx"]
  Output: 3
  Explanation:
  One group is ["abcd", "cdab", "cbad"], since they are all pairwise special equivalent, and none of the other strings is all pairwise special equivalent to these.
  The other two groups are ["xyzz", "zzxy"] and ["zzyx"].
  Note that in particular, "zzxy" is not special equivalent to "zzyx".
```
```
Example 2:
  Input: words = ["abc","acb","bac","bca","cab","cba"]
  Output: 3
```

*Explanation*: Each string’s even-position characters and odd-position characters are sorted to form a canonical key. Strings sharing the same key belong to the same group.

## 4. Walkthrough

1. Take "abc": even indices → "a","c" → sorted → "ac"; odd index → "b".
2. Canonical key = ("ac", "b").
3. Process "acb": even → "a","b" → "ab"; odd → "c" → key = ("ab", "c").
4. Continue for all strings; unique keys count = 3.

## 5. Complexity Analysis

- **Time:** O(n·k log k) where *n* is number of words and *k* is average word length (sorting each half).
- **Space:** O(n·k) for storing the set of canonical keys.

## 6. Follow-Up Questions

- How would the solution change if swaps were allowed between any positions, not just even/odd?
- Can you extend the approach to handle Unicode characters?
- What is the impact on complexity if the alphabet size is very large?

## Key Takeaway

> Canonicalize each string by sorting its even-indexed and odd-indexed characters separately; identical canonical keys define a special-equivalent group.
