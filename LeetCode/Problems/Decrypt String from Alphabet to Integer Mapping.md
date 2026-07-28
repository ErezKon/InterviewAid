# 1309. Decrypt String from Alphabet to Integer Mapping

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/decrypt-string-from-alphabet-to-integer-mapping](https://leetcode.com/problems/decrypt-string-from-alphabet-to-integer-mapping)
**Companies:** Bloomberg, Google, Meta, Microsoft, Oracle

---

## Problem Description

Decode a string where `1-9` map to `a-i` and `10#-26#` map to `j-z`.

---

## Examples

**Example 1:**
```
Input: s = "10#11#12"
Output: "jkab"
Explanation: "10#" -> "j", "11#" -> "k", "1" -> "a", "2" -> "b".
```

**Example 2:**
```
Input: s = "1326#"
Output: "acz"
Explanation: "1" -> "a", "3" -> "c", "26#" -> "z".
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