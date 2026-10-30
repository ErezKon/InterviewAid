# 2047. Number of Valid Words in a Sentence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-valid-words-in-a-sentence](https://leetcode.com/problems/number-of-valid-words-in-a-sentence)
**Companies:** Cisco, Meta, Oracle

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#examples)
3. [Approach: Validation — O(n)](#approach)
4. [Walkthrough](#walkthrough)
5. [Complexity Analysis](#complexity-analysis)
6. [Follow-Up Questions](#follow-up-questions)
7. [Key Takeaway](#key-takeaway)

---

## 1. Problem Description

A sentence consists of lowercase letters (`'a'` to `'z'`), digits (`'0'` to `'9'`), hyphens (`'-'`), punctuation marks (`'!'`, `'.'`, and `','`), and spaces (`' '`) only. Each sentence can be broken down into **one or more tokens** separated by one or more spaces `' '`.

A token is a valid word if **all three** of the following are true:

- It only contains lowercase letters, hyphens, and/or punctuation (**no** digits).
- There is **at most one** hyphen `'-'`. If present, it **must** be surrounded by lowercase characters (`"a-b"` is valid, but `"-ab"` and `"ab-"` are not valid).
- There is **at most one** punctuation mark. If present, it **must** be at the **end** of the token (`"ab,"`, `"cd!"`, and `"."` are valid, but `"a!b"` and `"c.,"` are not valid).

Examples of valid words include `"a-b."`, `"afad"`, `"ba-c"`, `"a!"`, and `"!"`.

Given a string `sentence`, return *the **number** of valid words in *`sentence`.

**Constraints:**
- `1 <= sentence.length <= 1000`
- `sentence` only contains lowercase English letters, digits, `' '`, `'-'`, `'!'`, `'.'`, and `','`.
- There will be at least `1` token.

---

## Examples

**Example 1:**
```
Input: sentence = "cat and  dog"
Output: 3
Explanation: The valid words in the sentence are "cat", "and", and "dog".
```

**Example 2:**
```
Input: sentence = "!this  1-s b8d!"
Output: 0
Explanation: There are no valid words in the sentence.
"!this" is invalid because it starts with a punctuation mark.
"1-s" and "b8d" are invalid because they contain digits.
```

**Example 3:**
```
Input: sentence = "alice and  bob are playing stone-game10"
Output: 5
Explanation: The valid words in the sentence are "alice", "and", "bob", "are", and "playing".
"stone-game10" is invalid because it contains digits.
```

---

## 2. Approach: Validation — O(n) ✅

```text
FUNCTION countValidWords(sentence):
    SET tokens ← SPLIT(sentence, ' ')
    SET validCount ← 0
    FOR token IN tokens:
        IF token IS EMPTY: CONTINUE
        SET hasDigit ← FALSE
        SET hyphenCount ← 0
        SET punctuationCount ← 0
        FOR i ← 0 TO LENGTH(token)-1:
            SET ch ← token[i]
            IF ch IS DIGIT:
                SET hasDigit ← TRUE
                BREAK
            IF ch = '-':
                SET hyphenCount ← hyphenCount + 1
                IF i = 0 OR i = LENGTH(token)-1 OR NOT (token[i-1] IS LETTER AND token[i+1] IS LETTER):
                    SET hasDigit ← TRUE   // reuse flag to invalidate
                    BREAK
            IF ch IN {'.',',','!','?'}:
                SET punctuationCount ← punctuationCount + 1
                IF i != LENGTH(token)-1:
                    SET hasDigit ← TRUE
                    BREAK
        IF NOT hasDigit AND hyphenCount ≤ 1 AND punctuationCount ≤ 1:
            SET validCount ← validCount + 1
    RETURN validCount
```

---

## Walkthrough

Take the sentence `"cat and  dog"`:
| Token | Checks | Result |
|-------|--------|--------|
| `cat` | No digits, no hyphen, no punctuation → valid | +1 |
| `and` | Same checks → valid | +1 |
| `dog` | Same checks → valid | +1 |
Total valid words = 3.

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) – each character examined once |
| **Space** | O(1) extra beyond input |

---

## Follow-Up Questions

1. How would you modify the algorithm to handle Unicode letters and punctuation?
2. Can you solve the problem in a single pass without splitting the sentence into tokens?
3. What changes are needed if multiple punctuation marks are allowed at the end of a token?

---

## Key Takeaway

> **Careful character validation per token.** Check three rules: no digits, hyphen constraints, punctuation constraints. Split then validate each token.
