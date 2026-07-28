# 1832. Check if the Sentence Is Pangram

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/check-if-the-sentence-is-pangram
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft
---
## Problem Description
Given an English sentence containing only lowercase letters and spaces, determine whether it contains every letter of the alphabet ('a' to 'z') at least once. Return true if the sentence is a pangram, otherwise false.

## Examples
| Sentence | Output | Explanation |
|----------|--------|-------------|
| "the quick brown fox jumps over the lazy dog" | true | All 26 letters appear.
| "hello world" | false | Missing many letters.

## Approach
Collect each distinct alphabetic character in a set while scanning the sentence. After processing, the sentence is a pangram if the set size equals 26.

### Pseudocode
```text
FUNCTION IsPangram(sentence):
    SET letters ← EMPTY SET
    FOR ch IN sentence:
        IF ch IS BETWEEN 'a' AND 'z':
            ADD ch TO letters
    RETURN SIZE(letters) == 26
```

## Walkthrough
For "the quick brown fox jumps over the lazy dog":
- Iterate characters, adding each new letter to `letters`.
- After the full scan, `letters` contains 26 entries, so the function returns true.

## Complexity Analysis
- Time: O(n), where n is the length of the sentence.
- Space: O(1) extra (the set holds at most 26 characters).

## Follow‑Up Questions
- How would you handle uppercase letters or punctuation?
- Can you solve the problem using a bit‑mask instead of a set?
- What is the minimum length a pangram can have?

## Key Takeaway
A sentence is a pangram if, after scanning, the collection of distinct lowercase letters reaches the full alphabet size of 26.