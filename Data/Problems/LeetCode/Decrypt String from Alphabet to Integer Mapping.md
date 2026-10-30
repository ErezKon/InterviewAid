# 1309. Decrypt String from Alphabet to Integer Mapping

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/decrypt-string-from-alphabet-to-integer-mapping](https://leetcode.com/problems/decrypt-string-from-alphabet-to-integer-mapping)
**Companies:** Bloomberg, Google, Meta, Microsoft, Oracle

---

## Problem Description

You are given a string `s` formed by digits and `'#'`. We want to map `s` to English lowercase characters as follows:

- Characters (`'a'` to `'i'`) are represented by (`'1'` to `'9'`) respectively.
- Characters (`'j'` to `'z'`) are represented by (`'10#'` to `'26#'`) respectively.

Return *the string formed after mapping*.

The test cases are generated so that a unique mapping will always exist.

**Constraints:**

- `1 <= s.length <= 1000`
- `s` consists of digits and the `'#'` letter.
- `s` will be a valid string such that mapping is always possible.

---

## Examples

```
Example 1:
  Input: s = "10#11#12"
  Output: "jkab"
  Explanation: "j" -> "10#" , "k" -> "11#" , "a" -> "1" , "b" -> "2".
```

```
Example 2:
  Input: s = "1326#"
  Output: "acz"
```

---

## Approach

```
FUNCTION freqAlphabets(s):
    result ← []
    i ← len(s) - 1
    WHILE i ≥ 0:
        IF s[i] = '#':
            num ← int(s[i-2:i])
            result.ADD(chr(num + ord('a') - 1))
            i ← i - 3
        ELSE:
            num ← int(s[i])
            result.ADD(chr(num + ord('a') - 1))
            i ← i - 1
    RETURN JOIN(REVERSED(result))
```

---

## Walkthrough

**Example 1:** `s = "10#11#12"`

| Step | i (index) | Char | Action | Result (reversed) |
|------|-----------|------|--------|-------------------|
| 1 | 7 | '2' | Single digit → 'b' | ['b'] |
| 2 | 6 | '1' | Single digit → 'a' | ['b','a'] |
| 3 | 5 | '#' | Take "11" → 'k' | ['b','a','k'] |
| 4 | 2 | '#' | Take "10" → 'j' | ['b','a','k','j'] |

Reverse result → "jkab".

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |

---

## Key Takeaway

> **Parse from right to left: if current char is `#`, consume 3 characters (two-digit number), else consume 1. Map number to letter via ASCII offset.**