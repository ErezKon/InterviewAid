# 966. Vowel Spellchecker

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/vowel-spellchecker](https://leetcode.com/problems/vowel-spellchecker)
**Companies:** Amazon, Bloomberg, Google, Grammarly, Meta, Microsoft, Thumbtack

---

## Problem Description
Given a list of correct `wordlist` strings and a list of `queries`, return for each query the first matching word from the wordlist according to the following priority:
1. Exact match (case‑sensitive).
2. Case‑insensitive match.
3. Vowel error match – treat all vowels (a, e, i, o, u) as interchangeable.
If no match exists, return an empty string for that query.

## Examples
- Input: `wordlist = ["KiTe","kite","hare","Hare"]`, `queries = ["kite","Kite","KiTe","Hare","hare","Hear"]`
  Output: `["kite","KiTe","KiTe","Hare","hare",""]`
  Explanation: Exact matches for "kite" and "hare"; case‑insensitive for "Kite" and "Hare"; vowel error for "KiTe"; no match for "Hear".
- Input: `wordlist = ["yellow"]`, `queries = ["YellOw","yellOw","YELLOW"]`
  Output: `["yellow","yellow","yellow"]`

## Approach
Preprocess the wordlist into three hash maps:
- `exactSet` for O(1) exact lookup.
- `caseMap` mapping lowercase word → first original word (case‑insensitive).
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
| Query | Exact? | Case‑insensitive? | Vowel error? | Returned |
|-------|--------|-------------------|--------------|----------|
| "Kite" | No | Yes (`kite`) | — | `kite` |
| "KiTe" | No | No | Yes (`k*t*`) → `KiTe` | `KiTe` |
| "Hear" | No | No | No | `""` |

## Complexity Analysis
- Time: O(L) where L is total characters across wordlist and queries (each processed a constant number of times).
- Space: O(N) for the three maps, N = number of words in wordlist.

## Follow-Up Questions
1. How would you extend the solution to support other character equivalence groups (e.g., leet speak)?
2. Can you design a trie‑based approach to reduce memory usage?
3. How would you handle Unicode characters and diacritics?

## Key Takeaway
Precomputing exact, case‑insensitive, and vowel‑error mappings lets you answer each query in O(1) by checking the maps in priority order.
