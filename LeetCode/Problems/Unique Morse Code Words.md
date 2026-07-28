# 804. Unique Morse Code Words

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Wix
---

## Problem Description
Given an array of lowercase English words, each word can be transformed into a Morse code string by concatenating the Morse code of each character. Return the number of different Morse code representations among all given words.

## Examples
**Example 1:**
Input: `["gin","zen","gig","msg"]`
Output: `2`
Explanation: The transformations are `"--...-."`, `"--...-."`, `"--...--."`, `"--...--."`; only two are distinct.

**Example 2:**
Input: `["a","b","c","a"]`
Output: `3`
Explanation: Transformations are `".-"`, `"-..."`, `"-.-."`, `".-"`; distinct count is 3.

## Approach
Map each character to its Morse code, then for each word build its representation by concatenating the codes. Store each representation in a hash set to automatically keep only unique values.

```text
FUNCTION uniqueMorseCount(words):
    SET morseMap ← { 'a':' .-', 'b':'-...', /* ... all 26 letters ... */ }
    SET uniqueSet ← EMPTY SET
    FOR word IN words:
        SET code ← ''
        FOR ch IN word:
            SET code ← CONCAT(code, morseMap[ch])
        ADD code TO uniqueSet
    RETURN SIZE(uniqueSet)
```

## Walkthrough
| Word | Transformation |
|------|----------------|
| `gin` | `--...-.` |
| `zen` | `--...-.` |
| `gig` | `--...--.` |
| `msg` | `--...--.` |
Unique set = {`--...-.`, `--...--.`} → count 2.

## Complexity Analysis
- **Time:** O(N · L) where N is number of words and L is average word length.
- **Space:** O(N) for the set of unique Morse strings.

## Follow-Up Questions
1. How would you handle a very large list of words that cannot fit into memory?
2. Can the solution be extended to support uppercase letters or custom alphabets?
3. What if you need to return the actual distinct Morse strings instead of just the count?

## Key Takeaway
Convert each word to Morse code and use a hash set to count distinct representations.
