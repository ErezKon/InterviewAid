# 1832. Check if the Sentence Is Pangram

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/check-if-the-sentence-is-pangram
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft
---
## Problem Description
A **pangram** is a sentence where every letter of the English alphabet appears at least once.

Given a string `sentence` containing only lowercase English letters, return `true` *if* `sentence` *is a **pangram**, or* `false` *otherwise.*

**Constraints:**
- `1 <= sentence.length <= 1000`
- `sentence` consists of lowercase English letters.

## Examples
```
Example 1:
  Input: sentence = "thequickbrownfoxjumpsoverthelazydog"
  Output: true
  Explanation: sentence contains at least one of every letter of the English alphabet.
```

```
Example 2:
  Input: sentence = "leetcode"
  Output: false
```

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

## Follow-Up Questions
- How would you handle uppercase letters or punctuation?
- Can you solve the problem using a bit-mask instead of a set?
- What is the minimum length a pangram can have?

## Key Takeaway
A sentence is a pangram if, after scanning, the collection of distinct lowercase letters reaches the full alphabet size of 26.