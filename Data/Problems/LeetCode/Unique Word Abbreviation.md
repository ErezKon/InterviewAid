# 288. Unique Word Abbreviation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/unique-word-abbreviation](https://leetcode.com/problems/unique-word-abbreviation)
**Companies:** Google, Meta

---

## Problem Description

> *Note: premium problem (statement checked against the official text with verify.py).*

The **abbreviation** of a word is a concatenation of its first letter, the number of characters between the first and last letter, and its last letter. If a word has only two characters, then it is an **abbreviation** of itself.

For example:

- `dog --> d1g` because there is one letter between the first letter `'d'` and the last letter `'g'`.
- `internationalization --> i18n` because there are 18 letters between the first letter `'i'` and the last letter `'n'`.
- `it --> it` because any word with only two characters is an **abbreviation** of itself.

Implement the `ValidWordAbbr` class:

- `ValidWordAbbr(String[] dictionary)` Initializes the object with a `dictionary` of words.
- `boolean isUnique(string word)` Returns `true` if **either** of the following conditions are met (otherwise returns `false`):
  - There is no word in `dictionary` whose **abbreviation** is equal to `word`'s **abbreviation**.
  - For any word in `dictionary` whose **abbreviation** is equal to `word`'s **abbreviation**, that word and `word` are **the same**.

**Constraints:**
- `1 <= dictionary.length <= 3 * 10^4`
- `1 <= dictionary[i].length <= 20`
- `dictionary[i]` consists of lowercase English letters.
- `1 <= word.length <= 20`
- `word` consists of lowercase English letters.
- At most `5000` calls will be made to `isUnique`.

## Examples

**Example 1:**
```
Input
["ValidWordAbbr", "isUnique", "isUnique", "isUnique", "isUnique", "isUnique"]
[[["deer", "door", "cake", "card"]], ["dear"], ["cart"], ["cane"], ["make"], ["cake"]]
Output
[null, false, true, false, true, true]

Explanation
ValidWordAbbr validWordAbbr = new ValidWordAbbr(["deer", "door", "cake", "card"]);
validWordAbbr.isUnique("dear"); // return false, dictionary word "deer" and word "dear" have the same abbreviation "d2r" but are not the same.
validWordAbbr.isUnique("cart"); // return true, no words in the dictionary have the abbreviation "c2t".
validWordAbbr.isUnique("cane"); // return false, dictionary word "cake" and word "cane" have the same abbreviation "c2e" but are not the same.
validWordAbbr.isUnique("make"); // return true, no words in the dictionary have the abbreviation "m2e".
validWordAbbr.isUnique("cake"); // return true, because "cake" is already in the dictionary and no other word in the dictionary has "c2e" abbreviation.
```

## Approach
**Algorithm:** Hash Table of abbreviations.
1. Pre-process the dictionary: for each word compute its abbreviation and store the set of original words sharing that abbreviation.
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
- Pre-processing: O(N * L) time, O(N) space where N is number of dictionary words and L is average word length.
- Query: O(L) time, O(1) additional space.

## Follow-Up Questions
1. How would you support dynamic updates (add/remove words) efficiently?
2. Can you design a version that works without storing the full sets of words, only counts?
3. How would you handle case-insensitive abbreviations?

## Key Takeaway
Using a hash map to store abbreviation → word set lets you answer uniqueness queries in linear time per word.
