# 1961. Check If String Is a Prefix of Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-string-is-a-prefix-of-array](https://leetcode.com/problems/check-if-string-is-a-prefix-of-array)
**Companies:** Uber

---

## Problem Description

Given a string `s` and an array of strings `words`, determine whether `s` is a **prefix string** of `words`.

A string `s` is a **prefix string** of `words` if `s` can be made by concatenating the first `k` strings in `words` for some **positive** `k` no larger than `words.length`.

Return `true` *if* `s` *is a **prefix string** of* `words`*, or* `false` *otherwise*.

**Constraints:**
- `1 <= words.length <= 100`
- `1 <= words[i].length <= 20`
- `1 <= s.length <= 1000`
- `words[i]` and `s` consist of only lowercase English letters.

---

## Examples

```
Example 1:
  Input: s = "iloveleetcode", words = ["i","love","leetcode","apples"]
  Output: true
  Explanation: s can be made by concatenating "i", "love", and "leetcode" together.
```

```
Example 2:
  Input: s = "iloveleetcode", words = ["apples","i","love","leetcode"]
  Output: false
  Explanation: It is impossible to make s using a prefix of arr.
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
