# 151. Reverse Words in a String

**Difficulty:** 🟡 Medium
**Acceptance:** 50.0%
**LeetCode:** [https://leetcode.com/problems/reverse-words-in-a-string](https://leetcode.com/problems/reverse-words-in-a-string)
**Companies:** Accenture, Amazon, Apple, Barclays, Bloomberg, Cisco, Citadel, Epam Systems, Goldman Sachs, Google, Hcl, Ibm, Infosys, Intel, Linkedin, Meta, Microsoft, Nvidia, Nykaa, Oracle, Philips, Servicenow, Snapchat, Tcs, Tiktok, Visa, Yelp, Zoho, Zopsmart

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Split and Reverse — O(n) ✅](#3-approach-1-split-and-reverse--on-)
4. [Approach 2: In-Place Reverse — O(n)](#4-approach-2-in-place-reverse--on)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Given an input string `s`, reverse the order of the **words**.

A word is defined as a sequence of non-space characters. Words are separated by at least one space.

Return a string of the words in reverse order concatenated by a single space. The result should not contain leading or trailing spaces.

**Constraints:**
- `1 <= s.length <= 10⁴`
- `s` contains English letters, digits, and spaces.
- There is at least one word in `s`.

---

## 2. Examples

```
Example 1:
  Input:  s = "the sky is blue"
  Output: "blue is sky the"

Example 2:
  Input:  s = "  hello world  "
  Output: "world hello"

Example 3:
  Input:  s = "a good   example"
  Output: "example good a"
```

---

## 3. Approach 1: Split and Reverse — O(n) ✅

```
FUNCTION reverseWords(s):
    words = SPLIT s by whitespace (ignoring empty strings)
    RETURN JOIN(REVERSE(words), " ")
```

One-liner in most languages. Uses O(n) space.

---

## 4. Approach 2: In-Place Reverse — O(n)

For languages with mutable strings (C/C++):

1. **Reverse** the entire string.
2. **Reverse** each individual word.
3. **Clean up** extra spaces.

```
FUNCTION reverseWords(s):
    // Step 1: Reverse entire string
    REVERSE(s, 0, len(s) - 1)

    // Step 2: Reverse each word
    start = 0
    FOR i ← 0 TO len(s):
        IF i == len(s) OR s[i] == ' ':
            REVERSE(s, start, i - 1)
            start = i + 1

    // Step 3: Remove extra spaces (two-pointer)
    write = 0
    FOR i ← 0 TO len(s) - 1:
        IF s[i] != ' ':
            IF write > 0: s[write++] = ' '
            WHILE i < len(s) AND s[i] != ' ':
                s[write++] = s[i++]

    RETURN s[0..write]
```

---

## 5. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| **Split + Reverse** | **O(n)** | **O(n)** |
| In-Place | O(n) | O(1) |

---

## 6. Follow-Up Questions

### 6.1 Reverse Words in a String II (LeetCode #186)?

Given a char array, reverse words in-place. Same three-step approach: reverse all, reverse each word.

### 6.2 What if we need to preserve multiple spaces?

Don't clean up spaces. Reverse each word and the spaces between them separately. This is rarely asked.

### 6.3 Reverse only specific words?

Track word indices, reverse only even/odd positioned words, or reverse words matching a pattern.

---

## Key Takeaway

> The "reverse all, then reverse parts" technique is elegant for in-place transformations. For interviews, the split+reverse approach is perfectly acceptable and clean. The in-place approach demonstrates deeper understanding of string manipulation.
