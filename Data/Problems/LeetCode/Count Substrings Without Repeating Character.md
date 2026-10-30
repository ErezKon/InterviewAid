# 2743. Count Substrings Without Repeating Character

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-substrings-without-repeating-character](https://leetcode.com/problems/count-substrings-without-repeating-character)
**Companies:** Yandex

---

## Problem Description

You are given a string `s` consisting only of lowercase English letters. We call a substring **special** if it contains no character which has occurred at least twice (in other words, it does not contain a repeating character). Your task is to count the number of **special** substrings. For example, in the string `"pop"`, the substring `"po"` is a **special** substring, however, `"pop"` is not **special** (since `'p'` has occurred twice).

Return *the number of **special** substrings.*

A **substring** is a contiguous sequence of characters within a string. For example, `"abc"` is a substring of `"abcd"`, but `"acd"` is not.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of lowercase English letters

---

## Examples

```
Example 1:
  Input: s = "abcd"
  Output: 10
  Explanation: Since each character occurs once, every substring is a special substring. We have 4 substrings of length one, 3 of length two, 2 of length three, and 1 substring of length four. So overall there are 4 + 3 + 2 + 1 = 10 special substrings.
```

```
Example 2:
  Input: s = "ooo"
  Output: 3
  Explanation: Any substring with a length of at least two contains a repeating character. So we have to count the number of substrings of length one, which is 3.
```

```
Example 3:
  Input: s = "abab"
  Output: 7
  Explanation: Special substrings are as follows (sorted by their start positions):
  Special substrings of length 1: "a", "b", "a", "b"
  Special substrings of length 2: "ab", "ba", "ab"
  And it can be shown that there are no special substrings with a length of at least three. So the answer would be 4 + 3 = 7.
```

---

## Approach

```text
FUNCTION countSubstrings(s):
    SET left ← 0; SET result ← 0
    SET seen ← {}  // map char → last index
    FOR right ← 0 TO LENGTH(s) - 1 DO
        IF s[right] IN seen AND seen[s[right]] ≥ left:
            SET left ← seen[s[right]] + 1
        SET seen[s[right]] ← right
        SET result ← result + (right - left + 1)
    RETURN result
```

---

## Walkthrough

Consider `s = "aba"`.

| step | left | right | char | window | result |
|------|------|-------|------|--------|--------|
| init | 0 | - | - | '' | 0 |
| 1 | 0 | 0 | `a` | `a` | +1 → 1 |
| 2 | 0 | 1 | `b` | `ab` | +2 → 3 |
| 3 | 0 | 2 | `a` (repeat) | move left to 1, window `ba` | +2 → 5 |

The sum of window lengths gives the total count `5`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(σ) where σ is alphabet size (≤26 for lowercase) |

---

## Follow-Up Questions

1. How would the solution change for Unicode characters with a large alphabet?
2. Can you adapt the algorithm to return the **longest** substring without repeating characters instead of counting all?
3. What if you need to count substrings with at most `k` distinct characters?

---

## Key Takeaway

> **Counting all-unique-character substrings = sliding window tracking last seen index. Each position contributes `window_length` valid substrings ending there.**