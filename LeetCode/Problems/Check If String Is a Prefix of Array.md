# 1961. Check If String Is a Prefix of Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-string-is-a-prefix-of-array](https://leetcode.com/problems/check-if-string-is-a-prefix-of-array)
**Companies:** Uber

---

## Problem Description

Given a string `s` and an array of strings `words`, determine whether `s` equals the concatenation of the first `k` strings in `words` for some `k ≥ 1`. In other words, `s` should be a prefix of the string formed by joining `words` in order.

---

## Examples

**Example 1:**
```
Input: s = "iloveleetcode", words = ["i","love","leet","code"]
Output: true
Explanation: Concatenating the first three words yields "iloveleet", which is a prefix of `s`. Adding the fourth word gives "iloveleetcode", exactly `s`.
```

**Example 2:**
```
Input: s = "applepenapple", words = ["apple","pen","apple","pen"]
Output: false
Explanation: The concatenation "applepenapple" matches the first three words, but the next word would extend beyond `s` without matching.
```

---

## Approach

**Algorithm:** Incremental concatenation — O(n)

Build the concatenated string progressively. After adding each word, compare it with `s`. If it matches exactly, return true. If it ever becomes longer than `s` or diverges, return false.

```text
FUNCTION isPrefixString(s, words):
    built ← ""
    FOR word IN words:
        built ← built + word
        IF built == s: RETURN true
        IF LENGTH(built) > LENGTH(s): RETURN false
    RETURN false
```

---

## Walkthrough

Take `s = "iloveleetcode"`, `words = ["i","love","leet","code"]`.
| Step | word added | built string | Comparison with `s` |
|------|------------|--------------|----------------------|
| 1 | "i" | "i" | prefix, continue |
| 2 | "love" | "ilove" | prefix, continue |
| 3 | "leet" | "iloveleet" | prefix, continue |
| 4 | "code" | "iloveleetcode" | equals `s` → return true |

The algorithm stops as soon as an exact match is found.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

`n` is the total length of processed words until a match or mismatch. Only a few variables are stored.

---

## Follow-Up Questions

1. How would you modify the solution if `words` could be used in any order?
2. Can the approach be extended to support wildcard characters in `s`?
3. What is the optimal solution when `words` is extremely large and cannot be fully loaded into memory?

---

## Key Takeaway

Incrementally building the concatenation and comparing it to the target string allows an O(n) solution that stops early once the prefix condition is satisfied or violated.
