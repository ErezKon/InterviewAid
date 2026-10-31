# 966. Vowel Spellchecker

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/vowel-spellchecker](https://leetcode.com/problems/vowel-spellchecker)
**Companies:** Amazon, Bloomberg, Google, Grammarly, Meta, Microsoft, Thumbtack

---

## Problem Description

Given a `wordlist`, we want to implement a spellchecker that converts a query word into a correct word.

For a given `query` word, the spell checker handles two categories of spelling mistakes:

- Capitalization: If the query matches a word in the wordlist (**case-insensitive**), then the query word is returned with the same case as the case in the wordlist.
  - Example: `wordlist = ["yellow"]`, `query = "YellOw"`: `correct = "yellow"`
  - Example: `wordlist = ["Yellow"]`, `query = "yellow"`: `correct = "Yellow"`
  - Example: `wordlist = ["yellow"]`, `query = "yellow"`: `correct = "yellow"`
- Vowel Errors: If after replacing the vowels `('a', 'e', 'i', 'o', 'u')` of the query word with any vowel individually, it matches a word in the wordlist (**case-insensitive**), then the query word is returned with the same case as the match in the wordlist.
  - Example: `wordlist = ["YellOw"]`, `query = "yollow"`: `correct = "YellOw"`
  - Example: `wordlist = ["YellOw"]`, `query = "yeellow"`: `correct = ""` (no match)
  - Example: `wordlist = ["YellOw"]`, `query = "yllw"`: `correct = ""` (no match)

In addition, the spell checker operates under the following precedence rules:

- When the query exactly matches a word in the wordlist (**case-sensitive**), you should return the same word back.
- When the query matches a word up to capitlization, you should return the first such match in the wordlist.
- When the query matches a word up to vowel errors, you should return the first such match in the wordlist.
- If the query has no matches in the wordlist, you should return the empty string.

Given some `queries`, return a list of words `answer`, where `answer[i]` is the correct word for `query = queries[i]`.

**Constraints:**
- `1 <= wordlist.length, queries.length <= 5000`
- `1 <= wordlist[i].length, queries[i].length <= 7`
- `wordlist[i]` and `queries[i]` consist only of only English letters.

## Examples

**Example 1:**
```
Input: wordlist = ["KiTe","kite","hare","Hare"], queries = ["kite","Kite","KiTe","Hare","HARE","Hear","hear","keti","keet","keto"]
Output: ["kite","KiTe","KiTe","Hare","hare","","","KiTe","","KiTe"]
```

**Example 2:**
```
Input: wordlist = ["yellow"], queries = ["YellOw"]
Output: ["yellow"]
```

## Approach
Preprocess the wordlist into three hash maps:
- `exactSet` for O(1) exact lookup.
- `caseMap` mapping lowercase word → first original word (case-insensitive).
- `vowelMap` mapping devoweled lowercase word (replace vowels with '*') → first original word.
For each query, check these maps in order.

```text
FUNCTION spellchecker(wordlist, queries):
    SET exactSet ← EMPTY SET
    SET caseMap ← EMPTY MAP
    SET vowelMap ← EMPTY MAP
    FOR word IN wordlist:
        ADD word TO exactSet
        SET low ← word.TO_LOWER()
        IF low NOT IN caseMap:
            caseMap[low] ← word
        SET devowel ← REPLACE_VOWELS(low, '*')
        IF devowel NOT IN vowelMap:
            vowelMap[devowel] ← word
    SET result ← []
    FOR q IN queries:
        IF q IN exactSet:
            APPEND q TO result
        ELSE IF q.TO_LOWER() IN caseMap:
            APPEND caseMap[q.TO_LOWER()] TO result
        ELSE IF REPLACE_VOWELS(q.TO_LOWER(), '*') IN vowelMap:
            APPEND vowelMap[REPLACE_VOWELS(q.TO_LOWER(), '*')] TO result
        ELSE:
            APPEND "" TO result
    RETURN result
```

## Walkthrough
| Query | Exact? | Case-insensitive? | Vowel error? | Returned |
|-------|--------|-------------------|--------------|----------|
| "Kite" | No | Yes (`kite`) | — | `kite` |
| "KiTe" | No | No | Yes (`k*t*`) → `KiTe` | `KiTe` |
| "Hear" | No | No | No | `""` |

## Complexity Analysis
- Time: O(L) where L is total characters across wordlist and queries (each processed a constant number of times).
- Space: O(N) for the three maps, N = number of words in wordlist.

## Follow-Up Questions
1. How would you extend the solution to support other character equivalence groups (e.g., leet speak)?
2. Can you design a trie-based approach to reduce memory usage?
3. How would you handle Unicode characters and diacritics?

## Key Takeaway
Precomputing exact, case-insensitive, and vowel-error mappings lets you answer each query in O(1) by checking the maps in priority order.
