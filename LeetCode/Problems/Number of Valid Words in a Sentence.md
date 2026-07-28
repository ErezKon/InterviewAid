# 2047. Number of Valid Words in a Sentence

**Difficulty:** 🟢 Easy
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

Count valid tokens in a sentence. A token is valid if: no digits, at most one hyphen (not at start/end, surrounded by letters), at most one punctuation (only at end).

---

## Examples

**Example 1:**
```
s = "Hello world"
```
**Output:** `2`
- Both "Hello" and "world" satisfy all rules.

**Example 2:**
```
s = "cat and  dog"
```
**Output:** `3`
- "cat", "and", and "dog" are valid; the extra space creates an empty token which is ignored.

**Example 3:**
```
s = "!this  1-s b8d!"
```
**Output:** `0`
- Tokens contain digits or misplaced punctuation/hyphens, so none are valid.

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
