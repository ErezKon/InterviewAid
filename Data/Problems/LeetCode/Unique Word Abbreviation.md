# 288. Unique Word Abbreviation

**Difficulty:** 🟡 Medium

**Companies:** Google, Meta
---

## Problem Description
Given a list of words (the dictionary), an abbreviation of a word is formed by taking its first letter, the count of characters between the first and last letter, and its last letter (e.g., "internationalization" → "i18n"). Implement a class that can determine whether a given word's abbreviation is unique among all words in the dictionary.

## Examples
- Input: dictionary = ["deer", "door", "cake", "card"], word = "dear"
  Output: true // "d2r" is not used by any other word.
- Input: dictionary = ["deer", "door", "cake", "card"], word = "cane"
  Output: false // "c2e" collides with "cake".

## Approach
**Algorithm:** Hash Table of abbreviations.
1. Pre‑process the dictionary: for each word compute its abbreviation and store the set of original words sharing that abbreviation.
2. To check uniqueness, compute the abbreviation of the query word and verify that either the abbreviation is absent from the table or the stored set contains only that word.

**Pseudocode:**
```text
CLASS ValidWordAbbr:
    CONSTRUCTOR(dictionary):
        SET abbrMap ← EMPTY MAP
        FOR w IN dictionary:
            SET a ← getAbbr(w)
            IF a NOT IN abbrMap:
                abbrMap[a] ← EMPTY SET
            ADD w TO abbrMap[a]
    FUNCTION isUnique(word):
        SET a ← getAbbr(word)
        IF a NOT IN abbrMap:
            RETURN TRUE
        RETURN abbrMap[a] == {word}
    FUNCTION getAbbr(word):
        IF LENGTH(word) <= 2:
            RETURN word
        RETURN word[0] + STRING(LENGTH(word)-2) + word[-1]
```

## Walkthrough
| Step | Word | Abbreviation | abbrMap entry |
|------|------|--------------|--------------|
| 1 | "deer" | "d2r" | {"deer"} |
| 2 | "door" | "d2r" | {"deer", "door"} |
| 3 | "cake" | "c2e" | {"cake"} |
| 4 | "card" | "c2d" | {"card"} |
When checking "dear": abbreviation "d2r" exists with {"deer","door"} ≠ {"dear"} → false. For "cane": abbreviation "c2e" maps to {"cake"} → false. For a word not in dictionary like "dog": "d1g" not in map → true.

## Complexity Analysis
- Pre‑processing: O(N * L) time, O(N) space where N is number of dictionary words and L is average word length.
- Query: O(L) time, O(1) additional space.

## Follow‑Up Questions
1. How would you support dynamic updates (add/remove words) efficiently?
2. Can you design a version that works without storing the full sets of words, only counts?
3. How would you handle case‑insensitive abbreviations?

## Key Takeaway
Using a hash map to store abbreviation → word set lets you answer uniqueness queries in linear time per word.
